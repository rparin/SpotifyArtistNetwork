import { test, expect } from "@playwright/test";
import { PAGE } from "@test-utils/playwright.utils";
import { APP_NAME, CR, SEARCH_PLACEHOLDER } from "@/constants/AppConstants";

test.describe("Home Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${PAGE}`);
  });

  test("it should have the correct title", async ({ page }) => {
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(APP_NAME);
  });

  test("it should have the correct placeholder", async ({ page }) => {
    await expect(page.getByRole("search")).toBeVisible();
    const placeholder = await page.locator("input").getAttribute("placeholder");
    expect(placeholder).toBe(SEARCH_PLACEHOLDER);
  });

  test("it should show the footer credits", async ({ page }) => {
    const footerCred = page.locator("footer");
    await expect(footerCred).toBeVisible();
    await expect(footerCred).toHaveText(CR);
  });

  test("it should show the header", async ({ page }) => {
    const header = page.locator("header");
    await expect(header).toBeVisible();
    await expect(page.getByLabel("Toggle Theme")).toBeVisible();
  });
});
