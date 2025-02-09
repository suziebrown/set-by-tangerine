-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Puzzle" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "setBy" TEXT NOT NULL,
    "blurb" TEXT NOT NULL,
    "publishedAt" TIMESTAMP(3) NOT NULL,
    "firstPublishedAt" TIMESTAMP(3),
    "downloadUrl" TEXT,
    "thumbnailUrl" TEXT,

    CONSTRAINT "Puzzle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Crossword" (
    "id" SERIAL NOT NULL,
    "puzzleId" INTEGER NOT NULL,
    "instructions" TEXT NOT NULL,

    CONSTRAINT "Crossword_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Clue" (
    "id" SERIAL NOT NULL,
    "crosswordId" INTEGER NOT NULL,
    "direction" TEXT NOT NULL,
    "numberLabel" TEXT NOT NULL,
    "clue" TEXT NOT NULL,
    "lengthLabel" TEXT NOT NULL,

    CONSTRAINT "Clue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PuzzleToTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_PuzzleToTag_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "Post_name_idx" ON "Post"("name");

-- CreateIndex
CREATE INDEX "Puzzle_title_idx" ON "Puzzle"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_label_key" ON "Tag"("label");

-- CreateIndex
CREATE INDEX "Tag_label_idx" ON "Tag"("label");

-- CreateIndex
CREATE UNIQUE INDEX "Crossword_puzzleId_key" ON "Crossword"("puzzleId");

-- CreateIndex
CREATE INDEX "_PuzzleToTag_B_index" ON "_PuzzleToTag"("B");

-- AddForeignKey
ALTER TABLE "Crossword" ADD CONSTRAINT "Crossword_puzzleId_fkey" FOREIGN KEY ("puzzleId") REFERENCES "Puzzle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Clue" ADD CONSTRAINT "Clue_crosswordId_fkey" FOREIGN KEY ("crosswordId") REFERENCES "Crossword"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PuzzleToTag" ADD CONSTRAINT "_PuzzleToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Puzzle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PuzzleToTag" ADD CONSTRAINT "_PuzzleToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
