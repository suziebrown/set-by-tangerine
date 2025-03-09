import { expect, Page } from "@playwright/test";
import { BasePage } from "../base.pom";
import { CardLocator } from "./card.locator";

export class BrowsePage extends BasePage {
  readonly url = "browse";

  constructor(page: Page) {
    super(page);
  }

  async goto() {
    await this.page.goto(this.url);
  }

  expectPuzzleTitles(titles: string[]) {
    titles.forEach((title) => {
      expect(this.page.getByRole("link", { name: title })).toBeVisible();
    });
  }

  getPuzzleCard(title: string) {
    return new CardLocator(this.page.getByRole("link", { name: title }));
  }
}
