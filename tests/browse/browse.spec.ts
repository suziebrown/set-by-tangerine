import { expect, test, type Page } from "@playwright/test";
import { BrowsePage } from "./browse.pom";

test.beforeEach(async ({ page }) => {
  const browsePage = new BrowsePage(page);
  await browsePage.goto();
});

test("displays page heading", async ({ page }) => {
  const browsePage = new BrowsePage(page);

  await browsePage.expectHeading("Browse puzzles");
});

test("displays puzzle cards", async ({ page }) => {
  const browsePage = new BrowsePage(page);

  browsePage.expectPuzzleTitles(["Insiders", "Hello My Name Is"]);
});

test("displays tags on puzzle card", async ({ page }) => {
  const browsePage = new BrowsePage(page);
  const card = browsePage.getPuzzleCard("Insiders");

  await browsePage.expectTags(card, ["crossword"]);
});

test("clicking a card navigates to puzzle detail page", async ({ page }) => {
  const browsePage = new BrowsePage(page);

  await browsePage.getPuzzleCard("Insiders").click();

  expect(page.url()).toMatch("/puzzle/");
});
