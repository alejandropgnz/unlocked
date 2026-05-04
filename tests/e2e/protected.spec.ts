import { test, expect } from "@playwright/test";

test("descubrir requires login", async ({ page }) => {
  await page.goto("/descubrir");
  await expect(page).toHaveURL(/\/login/);
});

test("crear requires login", async ({ page }) => {
  await page.goto("/crear");
  await expect(page).toHaveURL(/\/login/);
});

test("yo requires login", async ({ page }) => {
  await page.goto("/yo");
  await expect(page).toHaveURL(/\/login/);
});

test("admin requires login", async ({ page }) => {
  await page.goto("/admin");
  await expect(page).toHaveURL(/\/login/);
});
