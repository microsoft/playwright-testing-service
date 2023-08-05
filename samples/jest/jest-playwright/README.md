# Typescript Sample with Jest-Playwright
This sample makes use of [Jest-Playwright](https://github.com/playwright-community/jest-playwright) to showcase how to integrate Playwright Service using Jest-Playwright.

## Prerequisites
Before running this sample, ensure you have completed these steps:
1. [Onboard your Azure subscription to Microsoft Playwright Testing Preview](../../../docs/onboard-subscription.md).
1. Create a workspace as described in the [Create a Workspace](../../../docs/quickstart.md/#create-a-workspace) section of the quickstart.

## Set up sample
1. Clone this sample:
    ```bash
    git clone https://github.com/microsoft/playwright-service-preview
    cd playwright-service-preview/samples/jest/jest-playwright
    ```

1. Open the [Playwright portal](https://17157345.playwright-int.io/) and generate an Access Key.

1. Create a `.env` file in the sample's directory and define the following environment variable:
    ```bash
    PLAYWRIGHT_SERVICE_ACCESS_KEY= # Paste Access Key value from previous step
    ```
1. Install the necessary dependencies.
    ```bash
    npm install
    ```
1. Edit `jest.config.ts` to customize Playwright Service connection.

## Run sample tests with Playwright Service
```bash
npm test
```