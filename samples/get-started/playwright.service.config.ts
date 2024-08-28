import { defineConfig } from '@playwright/test';
import { getServiceConfig } from '@azure/microsoft-playwright-testing';
import config from './playwright.config';

/* Learn more about service configuration at https://aka.ms/mpt/config */
export default defineConfig(config, getServiceConfig(config), {
	/* Service reporter is added by default. This will override any reporter options specified in the base playwright config */
	reporter: [['@azure/microsoft-playwright-testing/reporter']]
});
