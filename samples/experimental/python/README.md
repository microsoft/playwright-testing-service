# Run Playwright Python tests with Microsoft Playwright Testing (Experimental)

This sample demonstrates how to run Playwright Python tests at scale using Microsoft Playwright Testing. It showcases the benefits of accelerating test suite completion by leveraging more parallel cloud browsers. The tests are executed using Pytest runner.

If you have not yet created a workspace, please follow the [Get Started guide](../../../README.md#get-started)

## Sample setup

1. Clone this sample:

    ```bash
    git clone https://github.com/microsoft/playwright-testing-service
    cd playwright-testing-service/samples/experimental/python
    ```

1. Install dependencies:

    ```bash
    pip install -r requirements.txt
    ```

1. Set up Authentication using Access Tokens:

    Currently, only access tokens are supported for Python. See [Set up authentication using access tokens](../../../../README.md#set-up-authentication-using-access-tokens)

1. Set access token generated above as environment variable for your project:

    ```bash
    PLAYWRIGHT_SERVICE_ACCESS_TOKEN= # Paste Access Token value from previous step
    ```

1. Set up environment:

    In the [Playwright portal](https://aka.ms/mpt/portal), copy the command under **Add region endpoint in your set up** and set the following environment variable:

    ```bash
    PLAYWRIGHT_SERVICE_URL= # Paste region endpoint URL
    ```

## Run tests

Run Playwright tests against browsers managed by the service using the configuration you created above. You can run up to 50 parallel workers with the service

```bash
pytest
```

## Add more configuration

You can use the following environment variables to specify configuration parameters for the service:

1. **PLAYWRIGHT_SERVICE_RUN_ID**: This variable allows you to change the ID of the test run. The run ID is a unique identifier for a test run and is used to track test runs in the portal.

    Example :

    ```bash
    export PLAYWRIGHT_SERVICE_RUN_ID = "my_custom_runId"
    ```
