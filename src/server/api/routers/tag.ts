import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const tagRouter = createTRPCRouter({
  list: publicProcedure.query(async ({ ctx }) => {
    const tags = await ctx.db.tag.findMany({
      orderBy: { label: "asc" },
    });

    return tags ?? [];
  }),
});
