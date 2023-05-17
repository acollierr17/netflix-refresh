import { env } from "../env/server.mjs";
import redis from "../server/redis";
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
  results: T[];
};

type RequestOptions = {
  route: string;
  method?: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
  body?: BodyInit | null;
  headers?: HeadersInit | null;
  queries?: URLSearchParams | null;
};

const BASE_URL = `https://${RAPIDAPI_HOST}`;

const makeNetflixRequest = async <T>(options: RequestOptions): Promise<T> => {
  const url = new URL(`${BASE_URL + options.route}`);
  if (options.queries) {
    options.queries.set("country_list", "78");
    url.search = options.queries.toString();
  }

  return fetch(url, {
    headers: {
      ...options.headers,
      "X-RapidAPI-Key": RAPIDAPI_KEY,
      "X-RapidAPI-Host": RAPIDAPI_HOST,
    },
    body: options.body,
  }).then((res: Response) => res.json() as T);
};

export const fetchDailyTitles = async (date: Date) => {
  const queryDate = formatDateQueryString(date);
  const data: DailyNetflixJSON = {
    size: 0,
    added: [],
    deleted: [],
  };

  const promises = [fetchNewTitles(date), fetchDeletedTitles(date)];
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

  const cachedDateExists = await redis.sismember("dates", queryDate);
  if (!cachedDateExists) await redis.sadd("dates", queryDate);

  return data;
};

export const fetchDeletedTitles = async (date: Date) => {
  const queryDate = formatDateQueryString(date);
  const queries = new URLSearchParams();
  queries.set("delete_date", queryDate);

  const cached = await redis.hget<NetflixDeleteJSONData[]>(
    "deleted-titles",
    queryDate
  );
  if (!cached)
    return makeNetflixRequest<BaseNetflixData<NetflixDeleteJSONData>>({
      route: "/search/deleted",
      queries,
    }).then(async (data) => {
      await redis.hset<NetflixDeleteJSONData[]>("deleted-titles", {
        [queryDate]: data.results,
      });

      return data.results;
    });

  return cached;
};

export const fetchNewTitles = async (date: Date) => {
  const queryDate = formatDateQueryString(date);
  const queries = new URLSearchParams();
  queries.set("order_by", "date");
  queries.set("new_date", queryDate);

  const cached = await redis.hget<NetflixJSONData[]>("added-titles", queryDate);
  if (!cached)
    return makeNetflixRequest<BaseNetflixData<NetflixJSONData>>({
      route: "/search/titles",
      queries,
    }).then(async (data) => {
      await redis.hset<NetflixJSONData[]>("added-titles", {
        [queryDate]: data.results,
      });

      return data.results;
    });

  return cached;
};
