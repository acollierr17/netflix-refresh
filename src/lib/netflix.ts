import { env } from "@/env.mjs";
import redis from "@/server/redis";
import { formatDateQueryString, getFormattedDate } from "./date";

const { RAPIDAPI_KEY, RAPIDAPI_HOST } = env;

export type NetflixJSONData = {
  imdb_id: string;
  img: string;
  netflix_id: number;
  poster: string;
  rating: string;
  runtime: string;
  synopsis: string;
  title: string;
  title_date: string;
  title_type: "series" | "movie";
  top250: number;
  top250tv: number;
  year: string;
};

export type DailyNetflixJSON = {
  size: number;
  added: NetflixJSONData[];
  deleted: NetflixDeleteJSONData[];
};

export type NetflixDeleteJSONData = {
  netflix_id: number;
  country_id: number;
  title: string;
  delete_date: string;
  country_code: string;
};

export type BaseNetflixData<T> = {
  Object: {
    total: number;
    limit: number;
    offset: number;
  };
  results: T[] | null;
};

type RequestOptions = {
  route: string;
  method?: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
  body?: BodyInit | null;
  headers?: HeadersInit | null;
  queries?: URLSearchParams | null;
  fetchAllCountries?: boolean | null;
};

type FetchTitleOptions = {
  date: Date;
  force?: boolean;
  fetchAllCountries?: boolean;
};

const BASE_URL = `https://${RAPIDAPI_HOST}`;

const makeNetflixRequest = async <T>(
  options: RequestOptions
): Promise<BaseNetflixData<T>> => {
  const url = new URL(`${BASE_URL + options.route}`);
  if (!options.queries) {
    const params = new URLSearchParams();
    if (!options.fetchAllCountries) params.set("country_list", "78");
    options.queries = params;
  }

  if (!options.fetchAllCountries) options.queries.set("country_list", "78");

  url.search = options.queries.toString();

  return fetch(url, {
    headers: {
      ...options.headers,
      "X-RapidAPI-Key": RAPIDAPI_KEY,
      "X-RapidAPI-Host": RAPIDAPI_HOST,
    },
    body: options.body,
  }).then((res: Response) => res.json() as Promise<BaseNetflixData<T>>);
};

export const fetchDailyTitles = async ({ date }: FetchTitleOptions) => {
  const queryDate = formatDateQueryString(date);
  const data: DailyNetflixJSON = {
    size: 0,
    added: [],
    deleted: [],
  };

  const promises = [fetchNewTitles({ date }), fetchDeletedTitles({ date })];
  const results = await Promise.allSettled(promises);

  const addedContent =
    results[0]?.status === "fulfilled" ? results[0].value : [];
  const deletedContent =
    results[1]?.status === "fulfilled" ? results[1].value : [];

  if (addedContent) {
    data.added = [...data.added, ...addedContent] as NetflixJSONData[];
    data.size += data.added.length;
  }
  if (deletedContent) {
    data.deleted = [
      ...data.deleted,
      ...deletedContent,
    ] as NetflixDeleteJSONData[];
    data.size += data.deleted.length;
  }

  const dateFormatted = getFormattedDate(date);
  const cachedDateExists = await redis.sismember("dates", queryDate);
  if (!cachedDateExists && data.size > 0) {
    await redis.sadd("dates", dateFormatted);
    await redis.hset<DailyNetflixJSON>("daily-titles", {
      [dateFormatted]: data,
    });
  }

  return data;
};

export const fetchDeletedTitles = async ({
  date,
  force,
  fetchAllCountries,
}: FetchTitleOptions) => {
  const queryDate = formatDateQueryString(date);
  const queries = new URLSearchParams({
    delete_date: queryDate,
  });

  const cached = force
    ? null
    : await redis.hget<NetflixDeleteJSONData[]>("deleted-titles", queryDate);
  if (cached) return cached;

  const { results } = await makeNetflixRequest<NetflixDeleteJSONData>({
    route: "/search/deleted",
    queries,
    fetchAllCountries,
  });

  if (!results) return [] as NetflixJSONData[];

  if (!force)
    await redis.hset<NetflixDeleteJSONData[]>("deleted-titles", {
      [getFormattedDate(date)]: results,
    });

  return results;
};

export const fetchNewTitles = async ({
  date,
  force,
  fetchAllCountries,
}: FetchTitleOptions) => {
  const queryDate = formatDateQueryString(date);
  const queries = new URLSearchParams({
    order_by: "date",
    new_date: queryDate,
  });

  const cached = force
    ? null
    : await redis.hget<NetflixJSONData[]>("added-titles", queryDate);
  if (cached) return cached;

  const { results } = await makeNetflixRequest<NetflixJSONData>({
    route: "/search/titles",
    queries,
    fetchAllCountries,
  });

  if (!results) return [] as NetflixJSONData[];

  if (!force)
    await redis.hset<NetflixJSONData[]>("added-titles", {
      [getFormattedDate(date)]: results,
    });

  return results;
};

export const getDailyTitleDates = (): Promise<string[]> => {
  return redis.smembers("dates");
};
