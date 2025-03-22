/*
  Warnings:

  - You are about to drop the `Clue` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Clue" DROP CONSTRAINT "Clue_crosswordId_fkey";

-- AlterTable
ALTER TABLE "Crossword" ADD COLUMN     "data" JSONB NOT NULL DEFAULT '{}';

-- DropTable
DROP TABLE "Clue";
