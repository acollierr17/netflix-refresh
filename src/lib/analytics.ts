import { useEffect } from "react";
import { useRouter } from "next/router";
import * as Fathom from "fathom-client";

import { env as clientEnv } from "../env/client.mjs";
import { env as serverEnv } from "../env/server.mjs";

export function useAnalytics() {
  const router = useRouter();

  useEffect(() => {
    if (serverEnv.NODE_ENV === "production") {
      Fathom.load(clientEnv.NEXT_PUBLIC_FATHOM_SITE_ID, {
        includedDomains: ["netflix-refresh.acollier.dev"],
      });
    }

    function onRouteChangeComplete() {
      Fathom.trackPageview();
    }

    router.events.on("routeChangeComplete", onRouteChangeComplete);

    return () => {
      router.events.off("routeChangeComplete", onRouteChangeComplete);
    };
  }, [router.events]);
}
