import { chromium, devices } from 'playwright';
import { randomUUID } from 'crypto';

// Define your runId, os, and apiVersion
const runId = randomUUID(); // replace it with env variable if needed.
const os = 'linux'; // Replace with your desired OS linux or windows
const apiVersion = '2025-07-01-preview'; // DONOT change

// implement getConnectOption to generate wsendpoint
async function getConnectOptions() {
  // Get the connection options
  
  return {
    wsEndpoint: `${process.env['PLAYWRIGHT_SERVICE_URL']}?runId=${encodeURIComponent(runId)}&os=${os}&api-version=${apiVersion}`,
    options: {
      headers: {
        Authorization: `Bearer ${process.env['PLAYWRIGHT_SERVICE_ACCESS_TOKEN'] || ''}`,
      },
      timeout: 3 * 60 * 1000, // 3 minutes
      exposeNetwork: '<loopback>', // Use loopback to expose network
    },
  };
}

(async () => {
  // Setup
  const { wsEndpoint, options } = await getConnectOptions();
  const browser = await chromium.connect(wsEndpoint, options);
  const context = await browser.newContext(devices['iPhone 11']);
  const page = await context.newPage();

  // The actual interesting bit
  await context.route('**.jpg', route => route.abort());
  await page.goto('https://example.com/');
    console.log('Page title:', await page.title());

  // Teardown
  await context.close();
  await browser.close();
})();