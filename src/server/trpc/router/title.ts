import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const titleRouter = router({
  getByNetflixId: publicProcedure.input(z.number()).query(({ ctx, input }) => {
    return ctx.prisma.title.findUnique({
      where: {
        netflixId: input,
      },
    });
  }),
  getNetflixByName: publicProcedure
    .input(z.string().min(3))
    .query(({ ctx, input }) => {
      const cleanTitle = input.replace(/[^a-zA-Z ]/g, "").trim();
      const yearMatch = input.match(/\d{4}/);

      return ctx.prisma.title.findMany({
        where: {
          title: {
            search: `'${cleanTitle}'`,
          },
          year: {
            search: yearMatch ? yearMatch[0] : undefined,
          },
        },
      });
    }),
});
