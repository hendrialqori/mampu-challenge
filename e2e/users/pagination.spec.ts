import { test, expect } from '@playwright/test';

test("pagination preserves sort state", async ({ page }) => {
  await page.goto("/users");

  // Sort by Name ascending first
  await page.getByRole("columnheader", { name: "Name" }).click();
  await expect(page).toHaveURL('/users?sort=name:asc');

  // Verify initial page state
  await expect(page.getByText("Page 1 of")).toBeVisible();

  // Click Next page
  await page.getByTestId(/next/i).click();
  await expect(page).toHaveURL('/users?sort=name:asc&page=2');

  // Verify page indicator updated
  await expect(page.getByText("Page 2 of")).toBeVisible();

  // Click Previous page
  await page.getByTestId(/previous/i).click();
  await expect(page).toHaveURL('/users?sort=name:asc');

  // Change page size while sorted
  await page.getByTestId('select-rows').selectOption("10");
  await expect(page).toHaveURL('/users?sort=name:asc&size=10');

  // Verify rows are rendered (page size 10)
  const rows = page.getByRole("row");
  await expect(rows).toHaveCount(11); // 1 header + 10 data rows
});
