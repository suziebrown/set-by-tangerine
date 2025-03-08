import { PrismaClient } from "@prisma/client";

import insidersCrosswordData from "./crossword-data/insiders.json";
import helloMyNameIsCrosswordData from "./crossword-data/hello-my-name-is.json";

const prisma = new PrismaClient();

async function clearDatabase(): Promise<void> {
  console.log("Dropping static data from database...");

  await prisma.clue.deleteMany();
  await prisma.crossword.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.puzzle.deleteMany();
}

async function seedData(): Promise<void> {
  console.log("Seeding static data into database...");

  const insidersPuzzle = await prisma.puzzle.create({
    data: {
      title: "Insiders",
      setBy: "Tangerine",
      blurb:
        "I created this themed crossword for the Free Political Prisoners action at the Royal Courts of Justice on 29-30 Janurary 2025, where 16 peaceful climate protestors were appealing their long prison sentences. The completed puzzle alludes to some of these and other climate activists imprisoned in the UK at the time of publication.",
      publishedAt: new Date(2025, 1, 8, 18, 0, 0),
      firstPublishedAt: new Date(2025, 0, 13, 10, 0, 0),
      downloadUrl: "insiders-crossword.pdf",
      imageUrl: "insiders_grid.jpg",
      tags: {
        create: [{ label: "crossword" }],
      },
      crossword: {
        create: { instructions: insidersCrosswordData.instructions },
      },
    },
    include: { crossword: true },
  });

  await Promise.all(
    insidersCrosswordData.clues.map(async (clue) => {
      const response = await prisma.clue.create({
        data: {
          ...clue,
          crossword: { connect: { id: insidersPuzzle.crossword!.id } },
        },
      });
      return response;
    }),
  );

  const helloMyNameIsPuzzle = await prisma.puzzle.create({
    data: {
      title: "Hello My Name Is",
      setBy: "Tangerine",
      blurb: "",
      publishedAt: new Date(2025, 1, 16, 14, 0, 0),
      firstPublishedAt: new Date(2025, 1, 16, 14, 0, 0),
      downloadUrl: "hello-my-name-is.pdf",
      imageUrl: "hello-my-name-is_grid.jpg",
      tags: {
        connect: [{ label: "crossword" }],
      },
      crossword: {
        create: { instructions: helloMyNameIsCrosswordData.instructions },
      },
    },
    include: { crossword: true },
  });

  await Promise.all(
    helloMyNameIsCrosswordData.clues.map(async (clue) => {
      const response = await prisma.clue.create({
        data: {
          ...clue,
          crossword: { connect: { id: helloMyNameIsPuzzle.crossword!.id } },
        },
      });
      return response;
    }),
  );
}

clearDatabase()
  .then(seedData)
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
