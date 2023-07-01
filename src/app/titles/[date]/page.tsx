import ListTitles from "@/app/titles/[date]/ListTitles";
import { getDailyTitleDates } from "@/lib/netflix";
import { getFriendlyFormattedDate, parseDateString } from "@/lib/date";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";

type TitlePageParams = {
  params: {
    date: string;
  };
};

const dynamicParams = false;

export { dynamicParams };

export async function generateStaticParams() {
  const dates: string[] = await getDailyTitleDates();

  return dates.map((date: string) => ({
    date,
  }));
}

export default async function TitlePage({ params }: TitlePageParams) {
  if (!params.date) return <div>No date...</div>;

  const queryDate = parseDateString(params.date);
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
