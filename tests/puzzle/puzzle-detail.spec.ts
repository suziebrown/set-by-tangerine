import { test } from "@playwright/test";
import { PuzzleDetailPage } from "./puzzle-detail.pom";

test.beforeEach(async ({ page }) => {
  const detailPage = new PuzzleDetailPage(page);
  await detailPage.goto();
});

test("Adds puzzle title to page title", async ({ page }) => {
  const detailPage = new PuzzleDetailPage(page);

  await detailPage.expectPageTitle("Insiders | Set by Tangerine");
});

test("displays puzzle title", async ({ page }) => {
  const detailPage = new PuzzleDetailPage(page);

  await detailPage.expectHeading("Insiders");
});

test("displays metadata", async ({ page }) => {
  const detailPage = new PuzzleDetailPage(page);

  await detailPage.expectMetadataHidden();
});

test.skip("clicking info icon shows metadata", async ({ page }) => {
  const detailPage = new PuzzleDetailPage(page);

  await detailPage.showMetadata();

  await detailPage.expectMetadata();
});
