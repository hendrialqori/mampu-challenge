import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/users');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Todo app/i);
});
