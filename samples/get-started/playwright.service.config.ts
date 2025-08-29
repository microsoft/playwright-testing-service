import { defineConfig } from '@playwright/test';
import { createAzurePlaywrightConfig, ServiceOS } from '@azure/playwright';
import config from './playwright.config';
import { DefaultAzureCredential } from '@azure/identity';

/* Learn more about service configuration at https://aka.ms/mpt/config */
export default defineConfig(
  config,
  createAzurePlaywrightConfig(config, {
    exposeNetwork: '<loopback>',
    connectTimeout: 30000,
    os: ServiceOS.LINUX,
    credential: new DefaultAzureCredential() // if serviceAuthType is ENTRA_ID (default)
  })
);
