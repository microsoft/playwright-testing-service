import { strict as assert } from 'node:assert';

/*
This file enables Playwright client to connect to remote browsers.
It should be placed in the same directory as playwright.service.config.ts.
The file is temporary for private preview.
*/
export type SupportedOS = 'linux' | 'windows';
const kDefaultTimeout = 3 * 60 * 1000;  // 3 minutes

function connectOptions(params: { accessKey: string, os?: SupportedOS, timeout?: number, exposeNetwork?: string }) {
  assert(params.accessKey, 'PLAYWRIGHT_SERVICE_ACCESS_KEY env var is not set');
  assert(process.env.PLAYWRIGHT_SERVICE_URL, 'PLAYWRIGHT_SERVICE_URL env var is not set');
  return {
    wsEndpoint: `${process.env.PLAYWRIGHT_SERVICE_URL}?accessKey=${params.accessKey}&cap=${JSON.stringify({
      os: params.os ?? 'linux',
      runId: generateRunId()
    })}`,
    timeout: params.timeout ?? kDefaultTimeout,
    _exposeNetwork: params.exposeNetwork ?? ''
  };
}

function generateRunId() {
	const runId = process.env.PLAYWRIGHT_SERVICE_RUN_ID || require("crypto").randomUUID();
	process.env.PLAYWRIGHT_SERVICE_RUN_ID = runId;
	return runId;
}

export default { connectOptions };
