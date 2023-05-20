import { useEffect } from "react";
import { useRouter } from "next/router";
import * as Fathom from "fathom-client";

import { env } from "@/env.mjs";

export function useAnalytics() {
  const router = useRouter();

  useEffect(() => {
    if (env.NEXT_PUBLIC_ENABLE_ANALYTICS === "true")
      Fathom.load(env.NEXT_PUBLIC_FATHOM_SITE_ID, {
        includedDomains: [
          "netflix-refresh.acollier.dev",
          "netflix-refresh.ngrok.io",
        ],
      });

    function onRouteChangeComplete() {
      Fathom.trackPageview();
    }

    router.events.on("routeChangeComplete", onRouteChangeComplete);

    return () => {
      router.events.off("routeChangeComplete", onRouteChangeComplete);
    };
  }, [router.events]);
}
