import { Prisma } from "@prisma/client";

const crosswordWithClues = Prisma.validator<Prisma.CrosswordDefaultArgs>()({
  include: { clues: true },
});

export type CrosswordWithClues = Prisma.CrosswordGetPayload<
  typeof crosswordWithClues
>;
