import { exampleRouter } from "@/server/api/router/example";
import { netflixRouter } from "@/server/api/router/netflix";
import { createTRPCRouter } from "@/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  netflix: netflixRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
