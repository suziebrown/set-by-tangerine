import { Page } from "@playwright/test";
import { BasePage } from "./base-page";

export class PuzzleDetailPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async goto() {
    await this.page.goto("browse");
    const puzzleCard = this.page.getByRole("link", { name: "Insiders" });
    await puzzleCard.click();
  }
}
