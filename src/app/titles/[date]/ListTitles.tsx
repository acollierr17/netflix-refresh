"use client";

import TitleCard from "@/app/titles/[date]/TitleCard";
import { api } from "@/lib/trpc";

type ListTitlesProps = {
  date: Date;
};

export default function ListTitles({ date }: ListTitlesProps) {
  const { data, isLoading } = api.netflix.getDailyTitles.useQuery({ date });

  if (isLoading) return <div>Loading titles...</div>;
  if (!data) return <div>No titles...</div>;

  return (
    <div className="container mx-auto p-4">
      {/* Added Titles*/}
      {data.added.length > 0 && (
        <div className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">
            <a href="#added-titles" className="hover:underline">
              Added Titles
            </a>
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {data.added.map(({ netflix_id }) => (
              <TitleCard key={netflix_id} netflixId={netflix_id} type="added" />
            ))}
          </div>
        </div>
      )}

      {/* Deleted Titles*/}
      {data.deleted.length > 0 && (
        <div>
          <h2 className="mb-4 text-2xl font-semibold">
            <a href="#deleted-titles" className="hover:underline">
              Deleted Titles
            </a>
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {data.deleted.map(({ netflix_id }) => (
              <TitleCard
                key={netflix_id}
                netflixId={netflix_id}
                type="deleted"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
