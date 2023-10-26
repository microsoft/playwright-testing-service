# Scale Playwright .NET tests with Microsoft Playwright Testing (Experimental)

This sample demonstrates how to run Playwright .NET tests at scale using Microsoft Playwright Testing. It showcases the benefits of accelerating test suite completion by leveraging more parallel cloud browsers. The tests are executed using popular .NET test runners, specifically NUnit or MSTest.

If you have not yet created a workspace or configured your subscription, please follow the [Get Started guide](../../../README.md#get-started).

## Sample setup
1. Clone this sample:
    ```bash
    git clone https://github.com/microsoft/playwright-testing-service
    cd playwright-testing-service/samples/experimental/.NET/PlaywrightTests
    ```

1. Install dependencies:
    ```bash
    dotnet add package Microsoft.Playwright.NUnit
    ```
1. Build the project so the playwright.ps1 is available inside the bin directory:
    ```
    dotnet build
    ```
 

1. Install required browsers by replacing netX with the actual output folder name, e.g. net6.0:

    ```
    pwsh bin/Debug/netX/playwright.ps1 install
    ```

    If pwsh is not available, you have to [install PowerShell](https://docs.microsoft.com/powershell/scripting/install/installing-powershell).

1. Open the [Playwright portal](https://aka.ms/mpt/portal) and generate an [Access Token](../../../README.md#generate-access-token).

1. Set access token generated above as environment variable for your project: 
    ```bash
    $env:PLAYWRIGHT_SERVICE_ACCESS_KEY= # Paste Access Token value from previous step
    ```
1. In the [Playwright portal](https://aka.ms/mpt/portal), copy the command under **Add region endpoint in your set up** and set the following environment variable:
    ```bash
    $env:PLAYWRIGHT_SERVICE_URL= # Paste region endpoint URL
    ```


## Run tests

Run Playwright tests against browsers managed by the service using the configuration you created above. You can run up to 50 parallel workers with the service
```bash
    dotnet test -- NUnit.NumberOfTestWorkers=20
```

