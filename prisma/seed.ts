import { PrismaClient } from "@prisma/client";

import { helloMyNameIs } from "./crossword-data/hello-my-name-is";

const prisma = new PrismaClient();

async function clearDatabase(): Promise<void> {
  console.log("Dropping static data from database...");

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
        "I created this themed crossword for the Free Political Prisoners action at the Royal Courts of Justice on 29-30 January 2025, where 16 peaceful climate protestors were appealing their long prison sentences. The completed puzzle alludes to some of these and other climate activists imprisoned in the UK at the time of publication.",
      publishedAt: new Date(2025, 1, 8, 18, 0, 0),
      firstPublishedAt: new Date(2025, 0, 13, 10, 0, 0),
      downloadUrl: "insiders.pdf",
      imageUrl: "insiders_grid.jpg",
      tags: {
        create: [{ label: "crossword" }, { label: "cryptic" }],
      },
      crossword: {
        create: {
          instructions:
            "The wordplay in 22 clues leads to an extra letter. In clue order, these spell a thematic slogan.",
          data: JSON.stringify(helloMyNameIs), // QQ create the Insiders crossword data
        },
      },
    },
    include: { crossword: true },
  });

  const helloMyNameIsPuzzle = await prisma.puzzle.create({
    data: {
      title: "Hello My Name Is",
      setBy: "Tangerine",
      blurb: "Allow me to introduce myself...",
      publishedAt: new Date(2025, 1, 16, 14, 0, 0),
      firstPublishedAt: new Date(2025, 1, 16, 14, 0, 0),
      downloadUrl: "hello-my-name-is.pdf",
      imageUrl: "hello-my-name-is_grid.png",
      tags: {
        connect: [{ label: "crossword" }, { label: "cryptic" }],
      },
      crossword: {
        create: { instructions: null, data: JSON.stringify(helloMyNameIs) },
      },
    },
    include: { crossword: true },
  });
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
