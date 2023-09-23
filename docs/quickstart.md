# How to start

In this quickstart, you'll learn how to run your existing tests with highly parallel cloud browsers using Microsoft Playwright Testing service.

> [!NOTE]
> We're still building the service and we understand that the process might still be a bit rough around the edges, or that some of the steps may be unfamiliar. Feel free to [reach out to us](https://aka.ms/mpt/feedback) if you encounter any challenges or have any questions.


## Confirm access to the private preview

> [!NOTE]
> This is a temporary step during the private preview.

While we're in private preview, you'll need to follow a few one-off steps in this guide: [Enable your Azure subscription for Microsoft Playwright Testing](./onboard-subscription.md)

## Create a Workspace

1. Sign in to the [Playwright portal](https://aka.ms/mpt/portal) using your Azure account credentials. You may want to bookmark the website.

1. You might get "No subscriptions found.", even if you enabled the Playwright Resource provider [here](./onboard-subscription.md), thats most likely because you have the wrong Directory selected. To change the Directory, click on your user account profile at the top right and select, "Switch Directory".

1. Create the Workspace.

    ![Create new workspace](https://github.com/microsoft/playwright-testing-service/assets/1908215/379dee60-52f9-4ae0-8915-c34816d3538a)

    |Field  |Description  |
    |---------|---------|
    |**Workspace Name** | A unique name to identify your workspace.<BR>The name can't contain special characters or whitespace. |
    |**Azure Subscription** | Select an Azure subscription. If you don't see anything in the drop-down, you need to [onboard an Azure subscription to the private preview](./onboard-subscription.md). |
    |**Region** | This is where test run data will be stored for your workspace. |

  > [!NOTE]
  > If you don't see this screen, select an existing workspace and go to the next section.

## Generate Access Token

1. In the [Playwright portal](https://aka.ms/mpt/portal), select **Generate token** to create the access token.

    ![Generate Access token](https://github.com/microsoft/playwright-testing-service/assets/4140290/3efdfd73-6dae-4a01-a3e5-bfa7ca0eb7fc)

1. Copy the access token.

## Obtain region endpoint

> [!NOTE]
> This is a temporary step during the private preview.

1. In the [Playwright portal](https://aka.ms/mpt/portal), copy the command under **Add region endpoint in your set up** and run in your terminal.

    ![Set workspace endpoint](https://github.com/microsoft/playwright-testing-service/assets/1908215/1c095f72-a735-4aea-bdd1-d472afe80e84)

    > [!NOTE]
    > The endpoint URL corresponds to the workspace region. You might see a different endpoint URL in the Playwright portal, depending on the region you selected when creating the workspace. 

## Set up environment

Ensure that the `PLAYWRIGHT_SERVICE_ACCESS_TOKEN` and `PLAYWRIGHT_SERVICE_URL` that you obtained in previous steps are available in your environment.

We recommend using `dotenv` module to manage your environment. With `dotenv` you'll be using the `.env` file to define your environment variables.

> [!NOTE]
> Don't forget to add `.env` file to your `.gitignore` file in order to not leak your secrets.

```sh
npm i --save-dev dotenv
```

`.env` file
```
PLAYWRIGHT_SERVICE_ACCESS_TOKEN=eyJh...
PLAYWRIGHT_SERVICE_URL=wss://westus3.api.playwright-int.io/api/authorize/connectSession
```

## Add service configuration

Add the service configuration to your project in the same location as your existing Playwright config file. Use [playwright.service.config.ts](https://aka.ms/mpt/service-config) as a starting point:

```js
// playwright.service.config.ts

import { defineConfig } from '@playwright/test';
import config from './playwright.config';
import dotenv from 'dotenv';

dotenv.config();

// Name the test run if it's not named yet.
process.env.PLAYWRIGHT_SERVICE_RUN_ID = process.env.PLAYWRIGHT_SERVICE_RUN_ID || new Date().toISOString();

export default defineConfig(config, {
    // Define more generous timeout for the service operation if necessary.
    // timeout: 60000,
    // expect: {
    //   timeout: 10000,
    // },
    use: {
    connectOptions: {
      // Specify the service endpoint.
      wsEndpoint: `${process.env.PLAYWRIGHT_SERVICE_URL}?cap=${JSON.stringify({
        os: process.env.PLAYWRIGHT_SERVICE_OS || 'linux',
        runId: process.env.PLAYWRIGHT_SERVICE_RUN_ID
      })}`,
      timeout: 30000,
      headers: {
        'x-mpt-access-key': process.env.PLAYWRIGHT_SERVICE_ACCESS_TOKEN!
      },
      // Allow service to access the localhost.
      exposeNetwork: '<loopback>'
    }
  }
});
```

The service configuration is used to:
- Point Playwright at Microsoft Playwright Testing server.
- Override timeouts for service operations if necessary.

> [!NOTE]
> Make sure your project uses @playwright/test version 1.37 or above.

## Run the tests

Run Playwright tests against browsers managed by the service using the configuration you created above.

```sh
npx playwright test --config=playwright.service.config.ts --workers=20
```

# Next Steps
- Experiment with different levels of parallelism. Learn more about how [parallelism](./concept-understanding-parallelism.md) works with Playwright.

- Run tests in a [CI/CD pipeline.](./configure-tests-with-ci-cd-pipeline.md)

- Learn how to [manage access](./how-to-assign-roles.md) to the created workspace.

- Explore [troubleshooting guide](./troubleshooting.md) and [known issues](./known-issues.md).
