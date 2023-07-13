"use client";

import { api } from "@/lib/trpc";
import DateCard from "@/app/titles/DateCard";

export default function ListDates() {
  const { data, isLoading } = api.netflix.getDates.useQuery();

  if (isLoading) return <div>Loading dates...</div>;
  if (!data) return <div>No dates...</div>;
  const sortedDates = data.sort((a, b) => {
    return new Date(b).getTime() - new Date(a).getTime();
  });

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {sortedDates.map((date) => (
          <DateCard key={date} date={date} />
        ))}
      </div>
    </div>
  );
}
