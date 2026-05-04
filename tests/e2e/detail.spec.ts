import { test, expect } from "@playwright/test";

test("achievement detail page loads with title", async ({ page }) => {
  await page.goto("/l/mi-padre-tabaco");
  await expect(page.locator("h1")).toContainText("padre");
});

test("unknown slug returns 404 page content", async ({ page }) => {
  const response = await page.goto("/l/this-does-not-exist-1234");
  expect(response?.status()).toBe(404);
});
