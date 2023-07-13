import ListTitles from "@/app/titles/[date]/ListTitles";
import { getDailyTitleDates, isDailyTitle } from "@/lib/netflix";
import { getFriendlyFormattedDate, parseDateString } from "@/lib/date";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

type TitlePageParams = {
  params: {
    date: string;
  };
};

function checkDailyTitle(date: string): Promise<boolean> {
  return isDailyTitle(date);
}

export async function generateStaticParams() {
  const dates: string[] = await getDailyTitleDates();

  return dates.map((date: string) => ({
    date,
  }));
}

export default async function TitlePage({ params }: TitlePageParams) {
  const queryDate = parseDateString(params.date);
  const isTitle = await checkDailyTitle(params.date);
  // TODO: implement trpc server side to handle white flash upon going to page (could be just dev)
  if (!isTitle) notFound();

  const date = new Date(queryDate);

  return (
    <div>
      <Link
        href="/titles"
        className={cn(buttonVariants({ variant: "outline" }), "mb-2")}
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Go back
      </Link>

      <div>
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          {getFriendlyFormattedDate(date)}
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          View below what&#39;s been added and deleted on Netflix.
        </p>
      </div>

      <ListTitles date={date} />
    </div>
  );
}
