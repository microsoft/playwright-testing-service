import { test, expect } from '@playwright/test';

// This sample simulates a larger test suite
const TEST_ITERATIONS = parseInt(process.env.TEST_ITERATIONS || "100");
for (var i = 0; i < TEST_ITERATIONS; i++) {

  test('has title ' + i, async ({ page }) => {
    await page.goto('https://playwright.dev/');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Playwright/);
  });

  test('get started link ' + i, async ({ page }) => {
    await page.goto('https://playwright.dev/');

    // Click the get started link.
    await page.getByRole('link', { name: 'Get started' }).click();

    // Expects the URL to contain intro.
    await expect(page).toHaveURL(/.*intro/);
  });

}
