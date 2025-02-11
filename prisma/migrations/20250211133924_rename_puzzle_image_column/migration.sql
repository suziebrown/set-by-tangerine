/*
  Warnings:

  - You are about to drop the column `thumbnailUrl` on the `Puzzle` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Puzzle" DROP COLUMN "thumbnailUrl",
ADD COLUMN     "imageUrl" TEXT;
