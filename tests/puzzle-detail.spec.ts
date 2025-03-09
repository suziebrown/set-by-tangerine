import { expect, test, type Page } from "@playwright/test";
import { PuzzleDetailPage } from "./puzzle-detail-page";

test.beforeEach(async ({ page }) => {
  const insidersCrosswordDetailPage = new PuzzleDetailPage(page);
  await insidersCrosswordDetailPage.goto();
});

test("displays puzzle title", async ({ page }) => {
  const insidersCrosswordDetailPage = new PuzzleDetailPage(page);
  await insidersCrosswordDetailPage.expectHeading("Insiders");
});
