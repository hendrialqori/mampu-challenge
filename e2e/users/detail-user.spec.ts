import { test, expect } from '@playwright/test';

test('user detail page shows Leanne Graham info', async ({ page }) => {
  await page.goto('/users/1');

  await expect(page.getByRole('heading', { name: 'Leanne Graham' })).toBeVisible();
  await expect(page.getByText('Sincere@april.biz').first()).toBeVisible();
});

test('user detail page has 3 tabs', async ({ page }) => {
  await page.goto('/users/1');

  await expect(page.getByRole('tab', { name: 'Personal Info' })).toBeVisible();
  await expect(page.getByRole('tab', { name: 'Posts' })).toBeVisible();
  await expect(page.getByRole('tab', { name: 'Todos' })).toBeVisible();
});

test('personal info tab is default and shows user details', async ({ page }) => {
  await page.goto('/users/1');

  await expect(page).toHaveURL('/users/1');
  await expect(page.getByRole('tab', { name: 'Personal Info' })).toHaveAttribute('aria-selected', 'true');
  await expect(page.getByRole('heading', { name: 'Leanne Graham' })).toBeVisible();
  await expect(page.getByText('Sincere@april.biz').first()).toBeVisible();
});

test('posts tab navigates to correct URL', async ({ page }) => {
  await page.goto('/users/1');

  await page.getByRole('tab', { name: 'Posts' }).click();
  await expect(page).toHaveURL('/users/1?tab=posts');
  await expect(page.getByRole('tab', { name: 'Posts' })).toHaveAttribute('aria-selected', 'true');
});

test('todos tab navigates to correct URL', async ({ page }) => {
  await page.goto('/users/1');

  await page.getByRole('tab', { name: 'Todos' }).click();
  await expect(page).toHaveURL('/users/1?tab=todos');
  await expect(page.getByRole('tab', { name: 'Todos' })).toHaveAttribute('aria-selected', 'true');
});