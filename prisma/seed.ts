import { PrismaClient } from "@prisma/client";
import { helloMyNameIs } from "./crossword-data/hello-my-name-is";
import { insiders } from "./crossword-data/insiders";
import { partingGift } from "./crossword-data/parting-gift";
import { sailAway } from "./crossword-data/sail-away";
import { paws } from "./crossword-data/paws";
import { bemiBugleIssue1 } from "./crossword-data/bemi-bugle-issue-1";
import { canIt } from "./crossword-data/can-it";
import { birthdayCard2021 } from "./crossword-data/birthday-card-2021";

const prisma = new PrismaClient();

async function clearDatabase(): Promise<void> {
  console.log("Dropping static data from database...");

  await prisma.crossword.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.puzzle.deleteMany();
}

async function seedData(): Promise<void> {
  console.log("Seeding static data into database...");

  console.log("Seeding tags...");

  await prisma.tag.createMany({
    data: [
      { label: "crossword" },
      { label: "cryptic" },
      { label: "quick" },
      { label: "jumbo" },
      { label: "mini" },
      { label: "birthday" },
    ],
  });

  console.log("Seeding puzzles...");

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
      imageUrl: "insiders_grid.jpg",
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
      imageUrl: "insiders_grid.jpg",
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
      imageUrl: "insiders_grid.jpg",
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

  await prisma.puzzle.create({
    data: {
      title: "Paws",
      setBy: "Tangerine",
      publishedAt: new Date(2025, 5, 20, 19, 0, 0),
      firstPublishedAt: new Date(2025, 5, 20, 19, 0, 0),
      downloadUrl: "paws.pdf",
      imageUrl: "insiders_grid.jpg",
      tags: {
        connect: [
          { label: "crossword" },
          { label: "cryptic" },
          { label: "jumbo" },
        ],
      },
      crossword: {
        create: {
          instructions: null,
          data: JSON.stringify(paws),
        },
      },
    },
    include: { crossword: true },
  });

  await prisma.puzzle.create({
    data: {
      title: "Can It!",
      setBy: "Tangerine",
      publishedAt: new Date(2025, 11, 22, 15, 0, 0),
      firstPublishedAt: new Date(2025, 9, 19, 12, 0, 0),
      downloadUrl: "can-it.pdf",
      imageUrl: "insiders_grid.jpg",
      tags: {
        connect: [{ label: "crossword" }, { label: "cryptic" }],
      },
      crossword: {
        create: {
          instructions: null,
          data: JSON.stringify(canIt),
        },
      },
    },
    include: { crossword: true },
  });

  await prisma.puzzle.create({
    data: {
      title: "Bemi Bugle Issue 1",
      setBy: "Tangerine",
      blurb:
        "This tiny crossword appeared in the inaugural issue of the Bemi Bugle, a Christmas newsletter pretending to be a newspaper.",
      publishedAt: new Date(2025, 11, 22, 13, 0, 0),
      firstPublishedAt: new Date(2025, 11, 1, 12, 0, 0),
      downloadUrl: "bemi-bugle-issue-1.pdf",
      imageUrl: "insiders_grid.jpg",
      tags: {
        connect: [
          { label: "crossword" },
          { label: "cryptic" },
          { label: "mini" },
        ],
      },
      crossword: {
        create: {
          instructions: null,
          data: JSON.stringify(bemiBugleIssue1),
        },
      },
    },
    include: { crossword: true },
  });

  await prisma.puzzle.create({
    data: {
      title: "Birthday Card 2021",
      setBy: "Tangerine",
      blurb:
        "Every year I make my dad a birthday card featuring a puzzle themed around his age. On this occasion it was a cryptic crossword.",
      publishedAt: new Date(2025, 11, 22, 15, 30, 0),
      firstPublishedAt: new Date(2021, 5, 14, 8, 0, 0),
      downloadUrl: "birthday-card-2021.pdf",
      imageUrl: "insiders_grid.jpg",
      tags: {
        connect: [
          { label: "crossword" },
          { label: "cryptic" },
          { label: "birthday" },
        ],
      },
      crossword: {
        create: {
          instructions: null,
          data: JSON.stringify(birthdayCard2021),
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
