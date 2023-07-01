"use client";

import { load, trackPageview } from "fathom-client";
import { useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";

import { env } from "@/env.mjs";

function TrackPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  useEffect(() => {
    if (env.NEXT_PUBLIC_ENABLE_ANALYTICS === "true")
      load(env.NEXT_PUBLIC_FATHOM_SITE_ID, {
        includedDomains: [
          "netflix-refresh.acollier.dev",
          "netflix-refresh.com",
          "netflix-refresh.ngrok.io",
        ],
        auto: false,
      });
  }, []);

  // Record a pageview when route changes
  useEffect(() => {
    trackPageview();
  }, [pathname, searchParams]);

  return null;
}

export default function Fathom() {
  return (
    <Suspense fallback={null}>
      <TrackPageView />
    </Suspense>
  );
}
