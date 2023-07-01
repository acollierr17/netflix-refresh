"use client";

import Image from "next/image";
import he from "he";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { api } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

type TitleCardProps = {
  netflixId: number;
  type: "added" | "deleted";
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
        <Image
          src={data.img}
          alt={`${he.decode(data.title)}'s poster`}
          width={166}
          height={233}
          className="h-auto w-full"
        />
        <CardTitle>{data.title}</CardTitle>
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
