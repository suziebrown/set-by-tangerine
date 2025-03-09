import { expect, test, type Page } from "@playwright/test";
import { BrowsePage } from "./browse-page";

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

test("clicking a card navigates to puzzle detail page", async ({ page }) => {
  const browsePage = new BrowsePage(page);

  await browsePage.clickPuzzleCard("Insiders");

  expect(page.url()).toMatch("/puzzle/");
});
