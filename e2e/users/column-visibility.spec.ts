import { test, expect } from '@playwright/test';

test("should toggle email column visibility", async ({ page }) => {
  await page.goto("/users");

  // Email terlihat
  await expect(page.getByRole("columnheader", { name: "Email" }))
    .toBeVisible();

  // Buka dropdown Columns
  await page.getByRole("button", { name: /column visible/i }).click();

  // Hilangkan kolom Email
  await page
    .getByRole("menuitemcheckbox", { name: /email/i })
    .click();

  // Header hilang
  await expect(
    page.getByRole("columnheader", { name: "Email" })
  ).toHaveCount(0);

  // Tampilkan lagi
  await page
    .getByRole("menuitemcheckbox", { name: /email/i })
    .click();

  // Header muncul lagi
  await expect(
    page.getByRole("columnheader", { name: "Email" })
  ).toBeVisible();
});
