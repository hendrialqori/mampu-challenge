import { test, expect } from '@playwright/test';

test("user can search", async ({ page }) => {
  await page.goto("/users");

  await page.getByPlaceholder(/Search name or email/i).fill("Leanne");

  await expect(
    page.getByRole('cell', { name: 'Leanne Graham' })
  ).toBeVisible();
});
