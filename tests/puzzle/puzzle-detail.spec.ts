import { expect, test, type Page } from "@playwright/test";
import { PuzzleDetailPage } from "./puzzle-detail.pom";

test.beforeEach(async ({ page }) => {
  const detailPage = new PuzzleDetailPage(page);
  await detailPage.goto();
});

test("displays puzzle title", async ({ page }) => {
  const detailPage = new PuzzleDetailPage(page);

  await detailPage.expectHeading("Insiders");
});

test("displays metadata", async ({ page }) => {
  const detailPage = new PuzzleDetailPage(page);

  await detailPage.expectMetadata();
});

test.skip("clicking info icon hides metadata", async ({ page }) => {
  const detailPage = new PuzzleDetailPage(page);

  await detailPage.hideMetadata();

  await detailPage.expectMetadataHidden();
});
