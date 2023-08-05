import playwrightService from './playwright-service';
// Import your existing config here.
import config from './playwright.config';

if (!config.use)
  config.use = {};

// Set connectOptions to instruct Playwright to connect to the service.
config.use.connectOptions = playwrightService.connectOptions({

  // Your access key, generated at https://17157345.playwright-int.io/
  accessKey: process.env.PLAYWRIGHT_SERVICE_ACCESS_KEY || '',

  // Set the browser's operating system. Can be: 'linux' or 'windows'.
  os: 'linux',


  // Comment out if your tests only target public endpoints.
  exposeNetwork: '<loopback>', // Expose localhost, 127.0.0.1, [:1] to the service

  // Connection timeout in milliseconds.
  timeout: 3 * 60 * 1000,
});

// Enable high parallelism when using the service
config.workers = 20;

// Enable retries
config.retries = 2;

// Increase timeouts when running in service mode to accommodate network latency
// Un-comment below lines to adjust timeouts if you are getting timeout error while running tests on the service.
//config.timeout = config.timeout ? config.timeout * 2 : 180000;
//config.use.actionTimeout = config.use.actionTimeout ? config.use.actionTimeout * 2 : 0;
//(!config.expect ? (config.expect = { timeout: 5000 }) : (config.expect.timeout && (config.expect.timeout *= 2)));

export default config;
