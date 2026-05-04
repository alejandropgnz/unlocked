import { test, expect } from "@playwright/test";

test("home loads with grid and login button when anonymous", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("text=UNLOCKED").first()).toBeVisible();
  await expect(page.locator("text=Entrar con Google")).toBeVisible();
});
