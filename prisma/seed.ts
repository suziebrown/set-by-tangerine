import { PrismaClient } from "@prisma/client";
import { helloMyNameIs } from "./crossword-data/hello-my-name-is";
import { insiders } from "./crossword-data/insiders";
import { partingGift } from "./crossword-data/parting-gift";
import { sailAway } from "./crossword-data/sail-away";

const prisma = new PrismaClient();

async function clearDatabase(): Promise<void> {
  console.log("Dropping static data from database...");

  await prisma.crossword.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.puzzle.deleteMany();
}

async function seedData(): Promise<void> {
  console.log("Seeding static data into database...");

  await prisma.tag.create({ data: { label: "crossword" } });
  await prisma.tag.create({ data: { label: "cryptic" } });

  await prisma.puzzle.create({
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
        connect: [{ label: "crossword" }, { label: "cryptic" }],
      },
      crossword: {
        create: {
          instructions:
            "The wordplay in 22 clues leads to an extra letter. In clue order, these spell a thematic slogan.",
          data: JSON.stringify(insiders),
        },
      },
    },
    include: { crossword: true },
  });

  await prisma.puzzle.create({
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

  await prisma.puzzle.create({
    data: {
      title: "Parting Gift",
      setBy: "Tangerine",
      blurb:
        "This puzzle was a leaving present to the crossword club at work when I left.",
      publishedAt: new Date(2025, 3, 21, 14, 0, 0),
      firstPublishedAt: new Date(2025, 3, 14, 10, 0, 0),
      downloadUrl: "parting-gift.pdf",
      imageUrl: "hello-my-name-is_grid.png",
      tags: {
        connect: [{ label: "crossword" }, { label: "cryptic" }],
      },
      crossword: {
        create: { instructions: null, data: JSON.stringify(partingGift) },
      },
    },
    include: { crossword: true },
  });

  await prisma.puzzle.create({
    data: {
      title: "Sail Away",
      setBy: "Tangerine",
      publishedAt: new Date(2025, 4, 15, 17, 0, 0),
      firstPublishedAt: new Date(2025, 4, 15, 17, 0, 0),
      downloadUrl: "sail-away.pdf",
      imageUrl: "insiders_grid.png",
      tags: {
        connect: [{ label: "crossword" }, { label: "cryptic" }],
      },
      crossword: {
        create: {
          instructions:
            "The wordplay in twenty-five clues indicates a superfluous letter. These letters, in clue order, give a thematic work. The remaining entries (not otherwise defined) are involved in the thematic journey.",
          data: JSON.stringify(sailAway),
        },
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
