import { z } from "zod";
import type { NetflixJSONData } from "./netflix";

export const TitleSchema = z.object({
  imdbId: z.string().max(16),
  img: z.string().max(1024),
  netflixId: z.number(),
  poster: z.string().max(1024),
  rating: z.string().max(255),
  runtime: z.string().max(255),
  synopsis: z.string().max(1024),
  title: z.string().max(255),
  titleDate: z.string().max(255),
  titleType: z.string().max(6),
  top250: z.number(),
  top250tv: z.number(),
  year: z.string().max(4),
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
