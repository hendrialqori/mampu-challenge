import { test, expect } from '@playwright/test';

test("user can sort data by clicking column headers", async ({ page }) => {
  await page.goto("/users");

  // Sort by Name ascending
  await page.getByRole("columnheader", { name: "Name" }).click();
  await expect(page).toHaveURL('/users?sort=name:asc');

  // Sort by Name descending
  await page.getByRole("columnheader", { name: "Name" }).click();
  await expect(page).toHaveURL('/users?sort=name:desc');

  // Switch sort to Pending (preserves desc direction)
  await page.getByRole("columnheader", { name: "Pending" }).click();
  await expect(page).toHaveURL('/users?sort=pending:desc');

  // Toggle Pending to ascending
  await page.getByRole("columnheader", { name: "Pending" }).click();
  await expect(page).toHaveURL('/users?sort=pending:asc');

  // Switch sort to Done (preserves asc direction)
  await page.getByRole("columnheader", { name: "Done" }).click();
  await expect(page).toHaveURL('/users?sort=done:desc');
});
