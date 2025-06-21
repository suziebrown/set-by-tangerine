import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const puzzleRouter = createTRPCRouter({
  list: publicProcedure.query(async ({ ctx }) => {
    const puzzles = await ctx.db.puzzle.findMany({
      orderBy: { publishedAt: "desc" },
      include: { tags: true },
    });

    return puzzles ?? [];
  }),

  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.puzzle.findUniqueOrThrow({
        where: { id: input.id },
        include: { tags: true, crossword: true },
      });
    }),
});
