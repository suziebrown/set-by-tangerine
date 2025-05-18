import { expect, type Locator, type Page } from "@playwright/test";
import { BasePage } from "../base.pom";

export class BrowsePage extends BasePage {
  readonly url = "";

  constructor(page: Page) {
    super(page);
  }

  async goto() {
    await this.page.goto(this.url);
  }

  expectPuzzleTitles(titles: string[]) {
    titles.forEach((title) => {
      expect(this.page.getByRole("heading", { name: title })).toBeVisible();
    });
  }

  getPuzzleCard(title: string) {
    return this.page.getByRole("link", { name: title });
  }

  async expectTags(puzzleCard: Locator, tags: string[]) {
    tags.forEach(async (tag) => {
      const badges = await puzzleCard.getByRole("listitem").allTextContents();
      expect(badges).toContain(tag);
    });
  }
}
