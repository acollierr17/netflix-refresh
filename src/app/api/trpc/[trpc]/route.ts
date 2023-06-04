import {
  type FetchCreateContextFnOptions,
  fetchRequestHandler,
} from "@trpc/server/adapters/fetch";
// import { appRouter } from "../trpc-router";
import { appRouter } from "@/server/api/root";
import { env } from "@/env.mjs";
import { prisma } from "@/server/db";

const handler = (request: Request) => {
  console.log(`incoming request ${request.url}`);
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req: request,
    router: appRouter,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore we're just testing the router rq
    createContext: function (
      opts: FetchCreateContextFnOptions
    ): object | Promise<object> {
      return {
        prisma,
      };
    },
    onError:
      env.NODE_ENV === "development"
        ? ({ path, error }) => {
            console.error(
              `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`
            );
          }
        : undefined,
  });
};

export { handler as GET, handler as POST };
