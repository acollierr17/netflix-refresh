import type { AppType } from "next/app";
import { ThemeProvider } from "next-themes";

import { trpc } from "../utils/trpc";
import "../styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <ThemeProvider forcedTheme="dark" attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
};

export default trpc.withTRPC(MyApp);
