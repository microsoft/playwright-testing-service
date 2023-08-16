it('homepage has title and links to intro page', async () => {
  await page.goto('https://playwright.dev/');
  expect(await page.title()).toMatch(/Playwright/);
  const getStarted = page.getByRole('link', { name: 'Get started' });
  expect(await getStarted.getAttribute('href')).toBe('/docs/intro');
  await getStarted.click();
  expect(page.url()).toMatch(/.*intro/);
});