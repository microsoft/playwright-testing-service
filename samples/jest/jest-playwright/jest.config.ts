import playwrightService from './playwright-service';
require('dotenv').config();

const playwrightServiceConnectOptions = playwrightService.connectOptions({

  // Your access key, generated at https://aka.ms/mpt/portal
  accessKey: process.env.PLAYWRIGHT_SERVICE_ACCESS_KEY || '',

  // Set the browser's operating system. Can be: 'linux' or 'windows'.
  os: 'linux',

  // Whether to expose local network to the browser running on the service.
  // exposeNetwork: 'localhost',
  
  // Connection timeout in milliseconds.
  timeout: 3 * 60 * 1000,
});

module.exports = {
  verbose: true,
  testTimeout: 60 * 1000,
  preset: 'jest-playwright-preset',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  maxWorkers: 10,
  testEnvironmentOptions: {
    'jest-playwright': {
      testDir: './tests',
      connectOptions: {
        wsEndpoint: playwrightServiceConnectOptions.wsEndpoint,
        options: playwrightServiceConnectOptions,
      },
      browsers: ['chromium', 'firefox', 'webkit'],
      exitOnPageError: true,
      launchOptions: {
        headless: true,
      },
      ignoreHTTPSErrors: true,
    },
  },
  reporters: ['default'],
};