import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const exampleRouter = router({
  title: publicProcedure
    .input(z.object({ name: z.string().nullish() }))
    .query(({ input }) => {
      return {
        greeting: `Hello, ${
          input?.name ?? "Anthony"
        }. Thanks for following along!`,
      };
    }),
});
