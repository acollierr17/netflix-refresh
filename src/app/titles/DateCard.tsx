"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { getFriendlyFormattedDate } from "@/lib/date";
import Link from "next/link";

type DateCardProps = {
  date: string;
};

export default function DateCard({ date }: DateCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">
          <Link href={`/titles/${date}`}>
            {getFriendlyFormattedDate(new Date(date))}
          </Link>
        </CardTitle>
      </CardHeader>
    </Card>
  );
}
