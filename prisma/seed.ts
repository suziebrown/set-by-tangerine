import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const testPuzzle = await prisma.puzzle.upsert({
    where: { id: 1000 },
    update: {},
    create: {
      title: "Test Puzzle",
      setBy: "Tangerine",
      blurb:
        "This is just a test puzzle to check the database is working as expected, so there's really not much to say about it.",
      publishedAt: new Date(),
      firstPublishedAt: new Date(2025, 2, 8, 12, 0, 0),
      downloadUrl: "https://www.example.com/testpuzzle.pdf",
      thumbnailUrl: "https://www.example.com/testpuzzle.jpg",
      tags: {
        create: [{ label: "crossword" }, { label: "birthday" }],
      },
    },
  });
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
