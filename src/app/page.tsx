import Link from "next/link";

import { siteConfig } from "@/config/site";
import { buttonVariants } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div>
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Your daily update <br className="hidden sm:inline" />
          on Netflix&#39;s revolving door.
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          See what&#39;s in and what&#39;s out in the US, create collaborative
          watchlists, and explore the Netflix universe.
        </p>
      </div>
      <div className="flex gap-4">
        <Link
          href={siteConfig.links.twitter}
          target="_blank"
          rel="noreferrer"
          className={buttonVariants()}
        >
          Twitter
        </Link>
        <Link
          target="_blank"
          rel="noreferrer"
          href={siteConfig.links.github}
          className={buttonVariants({ variant: "outline" })}
        >
          GitHub
        </Link>
      </div>
    </div>
  );
}
