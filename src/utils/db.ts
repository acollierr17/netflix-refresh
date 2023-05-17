import { z } from "zod";
import type { NetflixJSONData } from "./netflix";

export const TitleSchema = z.object({
  imdbId: z.string(),
  img: z.string(),
  netflixId: z.number(),
  poster: z.string(),
  rating: z.string(),
  runtime: z.string(),
  synopsis: z.string(),
  title: z.string(),
  titleDate: z.string(),
  titleType: z.string(),
  top250: z.number(),
  top250tv: z.number(),
  year: z.string(),
});

export const TitlesSchema = z.array(TitleSchema);

export const parseTitles = (data: NetflixJSONData[]) => {
  const formatted = data.map(formatJSONData);
  return TitlesSchema.parse(formatted);
};

export const formatJSONData = (data: NetflixJSONData) => ({
  imdbId: data["imdb_id"],
  img: data["img"],
  netflixId: data["netflix_id"],
  poster: data["poster"],
  rating: data["rating"],
  runtime: data["runtime"],
  synopsis: data["synopsis"],
  title: data["title"],
  titleDate: data["title_date"],
  titleType: data["title_type"],
  top250: data["top250"],
  top250tv: data["top250tv"],
  year: data["year"],
});
