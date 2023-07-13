import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { fetchDailyTitles, getDailyTitleDates } from "@/lib/netflix";

export const netflixRouter = createTRPCRouter({
  getTitle: publicProcedure
    .input(z.object({ netflixId: z.number() }))
    .query(({ input, ctx }) => {
      return ctx.prisma.title.findUnique({
        where: {
          netflixId: input.netflixId,
        },
      });
    }),
  getDailyTitles: publicProcedure
    .input(z.object({ date: z.date() }))
    .query(({ input }) => {
      return fetchDailyTitles({ date: input.date });
    }),
  getDates: publicProcedure.query(() => {
    return getDailyTitleDates();
  }),
});
