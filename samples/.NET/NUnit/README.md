# Scale Playwright .NET tests with Microsoft Playwright Testing (Experimental)

This sample demonstrates how to run Playwright .NET tests at scale using Microsoft Playwright Testing. It showcases the benefits of accelerating test suite completion by leveraging more parallel cloud browsers. The tests are executed using NUnit test runner.

If you have not yet created a workspace, please follow the [Get Started guide](../../../README.md#get-started)

## Sample setup
1. Clone this sample:
    ```powershell
    git clone https://github.com/microsoft/playwright-testing-service
    cd playwright-testing-service/samples/.NET/NUnit
    ```

1. Install dependencies:
    ```powershell
    dotnet add package Microsoft.Playwright.NUnit
    ```
1. Build the project so the playwright.ps1 is available inside the bin directory:
    ```powershell
    dotnet build
    ```
 

1. Install required browsers by replacing netX with the actual output folder name, e.g. net6.0:

    ```powershell
    pwsh bin/Debug/netX/playwright.ps1 install
    ```

    If pwsh is not available, you have to [install PowerShell](https://docs.microsoft.com/powershell/scripting/install/installing-powershell).

1. Open the [Playwright portal](https://aka.ms/mpt/portal) and generate an [Access Token](../../../README.md#generate-access-token).

1. Set access token generated above as environment variable for your project: 
    ```powershell
    $env:PLAYWRIGHT_SERVICE_ACCESS_KEY= # Paste Access Token value from previous step
    ```
1. In the [Playwright portal](https://aka.ms/mpt/portal), copy the command under **Add region endpoint in your set up** and set the following environment variable:
    ```powershell
    $env:PLAYWRIGHT_SERVICE_URL= # Paste region endpoint URL
    ```


## Run tests

Run Playwright tests against browsers managed by the service using the configuration you created above. You can run up to 50 parallel workers with the service
```powershell
    dotnet test -- NUnit.NumberOfTestWorkers=20
```

## Add more configuration

You can use the following environment variables to specify configuration parameters for the service:


1. **PLAYWRIGHT_SERVICE_EXPOSE_NETWORK**: This variable allows you to control the network access for your service. You can set it to `<loopback>` to enable the service to access the localhost and test locally hosted applications.

   Example:
   ```powershell
   $env:PLAYWRIGHT_SERVICE_EXPOSE_NETWORK = "<loopback>"
    ```

2. **PLAYWRIGHT_SERVICE_OS**: Use this variable to specify the operating system where browsers are hosted. You can choose between 'linux' or 'windows' based on your requirements.

    Example:
    ```powershell
    $env:PLAYWRIGHT_SERVICE_OS = "linux"
    ```

3. **PLAYWRIGHT_SERVICE_RUN_ID**: This variable allows you to change the ID of the test run. The run ID is a unique identifier for a test run and is used to track test runs in the portal.

    Example :
    ```powershell
    $env:PLAYWRIGHT_SERVICE_RUN_ID = "my_custom_runId"
    ```