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
