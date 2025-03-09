import { expect, Page } from "@playwright/test";

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async expectHeading(heading: string) {
    const headingLocator = this.page.getByRole("heading", {
      name: heading,
    });
    await expect(headingLocator).toBeVisible();
  }
}
