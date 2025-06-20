import { expect, type Page } from "@playwright/test";
import { BasePage } from "../base.pom";

export class PuzzleDetailPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async goto() {
    await this.page.goto("");
    const puzzleCard = this.page.getByRole("link", { name: "Insiders" });
    await puzzleCard.click();
  }

  async expectMetadata() {
    await expect(this.page.getByText(`Published on `)).toBeVisible();
  }

  async expectMetadataHidden() {
    await expect(this.page.getByText(`Published on `)).not.toBeVisible();
  }

  async showMetadata() {
    const infoButton = this.page.getByRole("button", { name: "Show info" });
    await infoButton.click();
  }
}
