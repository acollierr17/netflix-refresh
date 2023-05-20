import type { AppType } from "next/app";
import { ThemeProvider } from "next-themes";

import { api } from "@/utils/api";
import "@/styles/globals.css";

import { useAnalytics } from "@/lib/analytics";

const MyApp: AppType = ({ Component, pageProps }) => {
  useAnalytics();

  return (
    <>
      <ThemeProvider forcedTheme="dark" attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
