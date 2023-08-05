# Get Started Sample 

This sample makes use of a very simple end to end test to showcase the performance benefits of running highly parallelized, long-running tests with Playwright Service. 

Follow the [quickstart](../../docs/quickstart.md) if you haven't created a workspace or set up your subscription for access to the private preview.

## Set up sample
1. Clone this sample:
    ```bash
    git clone https://github.com/microsoft/playwright-service-preview
    cd playwright-service-preview/samples/get-started
    ```

1. Install dependencies:
    ```bash
    npm install
    ```

1. Open the [Playwright portal](https://17157345.playwright-int.io/) and generate an Access Key.
1. Create a `.env` file in the sample's directory and define the following environment variable:
    ```bash
    PLAYWRIGHT_SERVICE_ACCESS_KEY= # Paste Access Key value from previous step
    ```
1. Edit `playwright.service.config.ts` to customize Playwright Service connection.

## Run sample tests with Playwright Service

```bash
# You can run up to 50 parallel workers with Playwright Service
npx playwright test -c playwright.service.config.ts --workers=20
```

## Run tests in a GitHub workflow
1. Copy the file [get-started.yaml](.github/get-started.yml) to your repository's `.github/workflows` directory. 
1. Then follow the instructions in the article [Configure Playwright Service in a CI/CD pipeline](../../docs/configure-tests-with-ci-cd-pipeline.md).
