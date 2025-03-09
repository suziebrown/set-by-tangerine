import { expect, test, type Page } from "@playwright/test";
import { PuzzleDetailPage } from "./puzzle-detail.pom";

test.beforeEach(async ({ page }) => {
  const insidersCrosswordDetailPage = new PuzzleDetailPage(page);
  await insidersCrosswordDetailPage.goto();
});

test("displays puzzle title", async ({ page }) => {
  const insidersCrosswordDetailPage = new PuzzleDetailPage(page);

  await insidersCrosswordDetailPage.expectHeading("Insiders");
});

test("displays metadata", async ({ page }) => {
  const insidersCrosswordDetailPage = new PuzzleDetailPage(page);

  await insidersCrosswordDetailPage.expectMetadata();
});

test("clicking info icon hides metadata", async ({ page }) => {
  const insidersCrosswordDetailPage = new PuzzleDetailPage(page);

  await insidersCrosswordDetailPage.hideMetadata();

  await insidersCrosswordDetailPage.expectMetadataHidden();
});
