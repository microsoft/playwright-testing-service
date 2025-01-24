import { defineConfig } from '@playwright/test';
import { getServiceConfig, ServiceOS } from '@azure/microsoft-playwright-testing';
import config from './playwright.config';
import dotenv from 'dotenv';
dotenv.config();
/* Learn more about service configuration at https://aka.ms/mpt/config */
export default defineConfig(
  config,
  getServiceConfig(config, {
    exposeNetwork: 'localhost',
    timeout: 30000,
    os: ServiceOS.LINUX,
    useCloudHostedBrowsers: true,
    serviceAuthType: 'ACCESS_TOKEN'
  }),
  {
    /* 
    Playwright Testing service reporter is added by default.
    This will override any reporter options specified in the base playwright config.
    If you are using more reporters, please update your configuration accordingly.
    */
    reporter: [['list'], ['@azure/microsoft-playwright-testing/reporter']],
  }
);
