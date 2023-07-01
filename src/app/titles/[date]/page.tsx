import ListTitles from "@/app/titles/[date]/ListTitles";
import { getDailyTitleDates } from "@/lib/netflix";
import { getFriendlyFormattedDate, parseDateString } from "@/lib/date";

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
