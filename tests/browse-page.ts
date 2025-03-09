import { Page } from "@playwright/test";
import { BasePage } from "./base-page";

export class BrowsePage extends BasePage {
  readonly url = "http://localhost:3000/browse";

  constructor(page: Page) {
    super(page);
  }

  async goto() {
    await this.page.goto(this.url);
  }
}
