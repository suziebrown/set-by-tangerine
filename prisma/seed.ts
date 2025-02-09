import { PrismaClient } from "@prisma/client";

import insidersCrosswordData from "./crossword-data/insiders.json";

const prisma = new PrismaClient();

async function main() {
  await prisma.clue.deleteMany();
  await prisma.crossword.deleteMany();
  await prisma.puzzle.deleteMany();
  await prisma.tag.deleteMany();

  const insidersCrossword = await prisma.puzzle.create({
    data: {
      title: "Insiders",
      setBy: "Tangerine",
      blurb:
        "I created this themed crossword for the Free Political Prisoners action at the Royal Courts of Justice on 29 and 30 Janurary 2025. It alludes to some of the peaceful climate protesters being held in prison in the UK at the time.",
      publishedAt: new Date(2025, 2, 8, 18, 0, 0),
      firstPublishedAt: new Date(2025, 2, 8, 12, 0, 0),
      downloadUrl: null,
      thumbnailUrl: null,
      tags: {
        create: [{ label: "crossword" }],
      },
      crossword: {
        create: { instructions: insidersCrosswordData.instructions },
      },
    },
  });

  await Promise.all(
    insidersCrosswordData.clues.map(async (clue) => {
      const response = await prisma.clue.create({
        data: {
          ...clue,
          crosswordId: insidersCrossword.id,
        },
      });
      return response;
    }),
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
