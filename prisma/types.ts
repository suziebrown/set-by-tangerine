import { Prisma } from "@prisma/client";

const puzzleWithTags = Prisma.validator<Prisma.PuzzleDefaultArgs>()({
  include: { tags: true },
});

export type PuzzleWithTags = Prisma.PuzzleGetPayload<typeof puzzleWithTags>;

const crosswordWithClues = Prisma.validator<Prisma.CrosswordDefaultArgs>()({
  include: { clues: true },
});

export type CrosswordWithClues = Prisma.CrosswordGetPayload<
  typeof crosswordWithClues
>;

const puzzleWithCrossword = Prisma.validator<Prisma.PuzzleDefaultArgs>()({
  include: { crossword: { include: { clues: true } } },
});

export type PuzzleWithCrossword = Prisma.PuzzleGetPayload<
  typeof puzzleWithCrossword
>;
