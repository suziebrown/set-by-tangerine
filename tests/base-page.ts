import { expect, Page } from "@playwright/test";

export class BasePage {
  readonly page: Page;
  readonly url: string;

  constructor(page: Page, url: string) {
    this.page = page;
    this.url = url;
  }

  async goto() {
    await this.page.goto(this.url);
  }

  async expectHeading(heading: string) {
    const headingLocator = await this.page.getByRole("heading", {
      name: heading,
    });
    await expect(headingLocator).toBeVisible();
  }
}
