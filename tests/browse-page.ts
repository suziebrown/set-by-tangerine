import { Page } from "@playwright/test";
import { BasePage } from "./base-page";

export class BrowsePage extends BasePage {
  constructor(page: Page) {
    super(page, "http://localhost:3000/browse");
  }
}
