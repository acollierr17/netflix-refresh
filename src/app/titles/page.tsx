import ListDates from "@/app/titles/ListDates";

export default async function TitlesPage() {
  return (
    <div>
      <div>
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Daily Titles
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          Choose below to get more information on what&#39;s been added and
          removed on a particular day.
        </p>
      </div>

      <ListDates />
    </div>
  );
}
