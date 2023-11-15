# Get Started Sample 

This sample uses a basic test to show how the service can speed up test suite completion with more parallel cloud browsers.


If you have not yet created a workspace, please follow the [Get Started guide](../../README.md#get-started)


## Sample setup
1. Clone this sample:
    ```bash
    git clone https://github.com/microsoft/playwright-testing-service
    cd playwright-testing-service/samples/get-started
    ```

1. Install dependencies:
    ```bash
    npm install
    ```

1. Open the [Playwright portal](https://aka.ms/mpt/portal) and generate an Access Token.
1. Create a `.env` file in the sample's directory and define the following environment variable:
    ```bash
    PLAYWRIGHT_SERVICE_ACCESS_TOKEN= # Paste Access Token value from previous step
    ```
1. In the [Playwright portal](https://aka.ms/mpt/portal), copy the command under **Add region endpoint in your set up** and set the following environment variable:
    ```bash
    PLAYWRIGHT_SERVICE_URL= # Paste region endpoint URL
    ```

1. Edit `playwright.service.config.ts` to customize Playwright Service connection.

## Run tests

Run Playwright tests against browsers managed by the service using the configuration you created above. You can run up to 50 parallel workers with the service

```bash
npx playwright test --config=playwright.service.config.ts --workers=20
```

## Run tests in a GitHub workflow
1. Copy the file [get-started.yaml](.github/workflows/get-started.yml) to your repository's `.github/workflows` directory. 
1. Then follow the instructions in the article [Configure Playwright Service in a CI/CD pipeline](https://aka.ms/mpt/configure-pipeline).
