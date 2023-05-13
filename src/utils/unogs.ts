import { env } from "../env/server.mjs";
import type { NetflixJSONData } from "./db";
import { formatJSONData, parseTitleInputData } from "./db";

const { RAPIDAPI_KEY, RAPIDAPI_HOST } = env;

const url = new URL(`https://${RAPIDAPI_HOST}/search/titles`);
url.searchParams.append("order_by", "date");

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": RAPIDAPI_KEY,
    "X-RapidAPI-Host": RAPIDAPI_HOST,
  },
};

export const fetchNewTitles = async (date: Date) => {
  const getFormattedDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const currentDate = date;
  currentDate.setDate(currentDate.getDate() + 1);
  const initialDate = new Date(date);
  initialDate.setDate(currentDate.getDate() - 2);
  const queryDate = `${getFormattedDate(initialDate)},${getFormattedDate(
    currentDate
  )}`;

  url.searchParams.set("new_date", queryDate);

  const res = await fetch(url, options)
    .then((res) => res.json())
    .then((res) => res.results as NetflixJSONData[]);

  if (!res) return [];

  return res.map(formatJSONData);
};
