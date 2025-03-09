import { expect, Locator } from "@playwright/test";

export class CardLocator {
  constructor(private card: Locator) {}

  expectTags(tags: string[]) {
    tags.forEach((tag) => {
      const badge = this.card.getByRole("listitem", { name: tag });
      expect(badge).toBeVisible();
    });
  }

  async click() {
    await this.card.click();
  }
}
