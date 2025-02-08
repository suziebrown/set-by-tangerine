import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const puzzleRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const puzzles = await ctx.db.puzzle.findMany({
      orderBy: { publishedAt: "desc" },
    });

    return puzzles ?? [];
  }),
});