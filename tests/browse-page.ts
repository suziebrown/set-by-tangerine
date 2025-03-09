import { expect, Page } from "@playwright/test";
import { BasePage } from "./base-page";

export class BrowsePage extends BasePage {
  readonly url = "browse";

  constructor(page: Page) {
    super(page);
  }

  async goto() {
    await this.page.goto(this.url);
  }

  async expectPuzzleTitles(titles: string[]) {
    titles.forEach((title) => {
      expect(this.page.getByRole("link", { name: title })).toBeVisible();
    });
  }
}
