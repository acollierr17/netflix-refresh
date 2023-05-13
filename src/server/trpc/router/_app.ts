import { router } from "../trpc";
import { exampleRouter } from "./example";
import { titleRouter } from "./title";

export const appRouter = router({
  example: exampleRouter,
  title: titleRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
