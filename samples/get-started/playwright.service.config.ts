/*
* This file enables Playwright client to connect to remote browsers.
* It should be placed in the same directory as playwright.config.ts.
* The file is temporary for private preview.
*/

import { defineConfig } from '@playwright/test';
import config from './playwright.config';
import dotenv from 'dotenv';

// Define environment on the dev box in .env file:
//  .env:
//    PLAYWRIGHT_SERVICE_ACCESS_KEY=XXX
//    PLAYWRIGHT_SERVICE_URL=XXX

// Define environment in your GitHub workflow spec.
//  env:
//    PLAYWRIGHT_SERVICE_ACCESS_KEY: ${{ secrets.PLAYWRIGHT_SERVICE_ACCESS_KEY }}
//    PLAYWRIGHT_SERVICE_URL: ${{ secrets.PLAYWRIGHT_SERVICE_URL }}
//    PLAYWRIGHT_SERVICE_RUN_ID: ${{ github.run_id }}-${{ github.run_attempt }}-${{ github.sha }}

dotenv.config();

// assert MPT Service variables are defined.
if (!process.env.PLAYWRIGHT_SERVICE_ACCESS_KEY) {
  throw new Error('PLAYWRIGHT_SERVICE_ACCESS_KEY is not defined');
}
if (!process.env.PLAYWRIGHT_SERVICE_URL) {
  throw new Error('PLAYWRIGHT_SERVICE_URL is not defined');
}
// assert @playwright/test version >= 1.37.0
const playwrightTestVersion = require('@playwright/test/package.json').version;
if (playwrightTestVersion < '1.37.0') {
  throw new Error(`@playwright/test version ${playwrightTestVersion} is not supported. Please upgrade to 1.37.0 or higher.`);
}

// Name the test run if it's not named yet.
process.env.PLAYWRIGHT_SERVICE_RUN_ID = process.env.PLAYWRIGHT_SERVICE_RUN_ID || new Date().toISOString();

export default defineConfig(config, {
  // Define more generous timeout for the service operation if necessary.
  // timeout: 60000,
  // expect: {
  //   timeout: 10000,
  // },
  workers: 20,
  use: {
    // Specify the service endpoint.
    connectOptions: {
      wsEndpoint: `${process.env.PLAYWRIGHT_SERVICE_URL}?cap=${JSON.stringify({
        // Can be 'linux' or 'windows'.
        os: process.env.PLAYWRIGHT_SERVICE_OS || 'linux',
        runId: process.env.PLAYWRIGHT_SERVICE_RUN_ID
      })}`,
      timeout: 30000,
      headers: {
        'x-mpt-access-key': process.env.PLAYWRIGHT_SERVICE_ACCESS_KEY!
      },
      // Allow service to access the localhost.
      exposeNetwork: '<loopback>'
    }
  }
});

// Assert that the serviceConfig has connectOptions defined.
import serviceConfig from './playwright.service.config';
if (!serviceConfig.use || !serviceConfig.use.connectOptions) {
  throw new Error('connectOptions are not defined');
}
