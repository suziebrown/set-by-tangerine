import { Prisma } from "@prisma/client";

const puzzleWithTags = Prisma.validator<Prisma.PuzzleDefaultArgs>()({
  include: { tags: true },
});

export type PuzzleWithTags = Prisma.PuzzleGetPayload<typeof puzzleWithTags>;

const puzzleWithCrossword = Prisma.validator<Prisma.PuzzleDefaultArgs>()({
  include: { tags: true, crossword: true },
});

export type PuzzleWithCrossword = Prisma.PuzzleGetPayload<
  typeof puzzleWithCrossword
>;
