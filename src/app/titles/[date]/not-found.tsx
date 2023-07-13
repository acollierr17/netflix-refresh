import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
        Not Found
      </h1>
      <p className="max-w-[700px] text-lg text-muted-foreground">
        Could not find available titles for this date.
      </p>
      <p>
        View <Link href="/titles">previous daily titles</Link>
      </p>
    </div>
  );
}
