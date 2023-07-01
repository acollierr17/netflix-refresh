import { z } from "zod";
import ListTitles from "@/app/titles/[date]/ListTitles";

type TitlePageParams = {
  params: {
    date: string;
  };
};

export default async function TitlePage({ params }: TitlePageParams) {
  if (!params.date) return <div>No date...</div>;

  const validate = z
    .string()
    .regex(/^\d{4}-(0[1-9]|1[0-2])-([0-2][1-9]|3[0-1])$/, {
      message: "The date format is incorrect! (ex. YYYY-MM-DD)",
    });

  const queryDate = validate.parse(params.date);
  const date = new Date(queryDate);

  return (
    <div>
      <div>
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          {queryDate}
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          View below what&#39;s been added and deleted on Netflix.
        </p>
      </div>

      <ListTitles date={date} />
    </div>
  );
}
