import type { AppType } from "next/app";
import { ThemeProvider } from "next-themes";

import { trpc } from "../utils/trpc";
import "../styles/globals.css";

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

export default trpc.withTRPC(MyApp);
