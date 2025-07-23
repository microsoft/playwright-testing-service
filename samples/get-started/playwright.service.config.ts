import { defineConfig } from '@playwright/test';
import { getServiceConfig, ServiceOS } from '@azure/playwright';
import config from './playwright.config';
import { DefaultAzureCredential } from '@azure/identity';

/* Learn more about service configuration at https://aka.ms/mpt/config */
export default defineConfig(
  config,
  getServiceConfig(config, {
    exposeNetwork: '<loopback>',
    timeout: 30000,
    os: ServiceOS.LINUX,
    useCloudHostedBrowsers: true,
    credential: new DefaultAzureCredential() // if serviceAuthType is ENTRA_ID (default)
  })
);
