/*
  Warnings:

  - The primary key for the `Puzzle` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `_PuzzleToTag` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Crossword" DROP CONSTRAINT "Crossword_puzzleId_fkey";

-- DropForeignKey
ALTER TABLE "_PuzzleToTag" DROP CONSTRAINT "_PuzzleToTag_A_fkey";

-- AlterTable
ALTER TABLE "Crossword" ALTER COLUMN "puzzleId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Puzzle" DROP CONSTRAINT "Puzzle_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Puzzle_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Puzzle_id_seq";

-- AlterTable
ALTER TABLE "_PuzzleToTag" DROP CONSTRAINT "_PuzzleToTag_AB_pkey",
ALTER COLUMN "A" SET DATA TYPE TEXT,
ADD CONSTRAINT "_PuzzleToTag_AB_pkey" PRIMARY KEY ("A", "B");

-- AddForeignKey
ALTER TABLE "Crossword" ADD CONSTRAINT "Crossword_puzzleId_fkey" FOREIGN KEY ("puzzleId") REFERENCES "Puzzle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PuzzleToTag" ADD CONSTRAINT "_PuzzleToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Puzzle"("id") ON DELETE CASCADE ON UPDATE CASCADE;
