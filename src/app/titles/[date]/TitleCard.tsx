"use client";

import Image, { type ImageProps } from "next/image";
import he from "he";
import { Play } from "lucide-react";
import { useEffect, useState } from "react";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { api } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import fallbackImage from "public/fallback-poster.png";
import { MovieBadge, SeriesBadge } from "@/components/badges";

interface ImageWithFallbackProps extends ImageProps {
  fallback?: ImageProps["src"];
}

type TitleCardProps = {
  netflixId: number;
  type: "added" | "deleted";
};

const ImageWithFallback = ({
  fallback,
  alt,
  src,
  ...props
}: ImageWithFallbackProps) => {
  const [error, setError] = useState<React.SyntheticEvent<
    HTMLImageElement,
    Event
  > | null>(null);

  useEffect(() => {
    setError(null);
  }, [src]);

  return (
    <Image
      alt={alt}
      onError={setError}
      src={error ? fallback ?? fallbackImage : src}
      {...props}
    />
  );
};

export default function TitleCard({ netflixId, type }: TitleCardProps) {
  const { data, isLoading } = api.netflix.getTitle.useQuery({
    netflixId,
  });

  if (isLoading) return <div>Loading title data...</div>;
  if (!data) return <div>Not title found!</div>;

  return (
    <Card>
      <CardHeader>
        <ImageWithFallback
          src={data.img}
          fallback={fallbackImage}
          alt={`${he.decode(data.title)}'s poster`}
          width={166}
          height={233}
          className="h-auto w-full"
          placeholder="blur"
          blurDataURL="iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8yilSDwAEYAGDFRus/QAAAABJRU5ErkJggg=="
        />
        <CardTitle>
          {`${data.title} (${data.year})`}{" "}
          {data.titleType === "movie" ? <MovieBadge /> : <SeriesBadge />}
        </CardTitle>
        <CardDescription>{he.decode(data.synopsis)}</CardDescription>
      </CardHeader>
      {type === "added" && (
        <CardFooter>
          <Button variant="link" className="w-full">
            <Play className="mr-2 h-4 w-4" />{" "}
            <a href={`https://netflix.com/title/${netflixId}`} target="_blank">
              Watch on Netflix
            </a>
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
