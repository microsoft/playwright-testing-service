# Scale Playwright .NET tests with Microsoft Playwright Testing (Experimental)

This sample demonstrates how to run Playwright .NET tests at scale using Microsoft Playwright Testing. It showcases the benefits of accelerating test suite completion by leveraging more parallel cloud browsers. The tests are executed using MSTest test runner.

Note: Since service integration is done via [playwright MSTEST base class](https://playwright.dev/dotnet/docs/test-runners) which uses BrowserService so it only works out of the box when you use one of the following base class BrowserTest, Page, ContextTest

If you have not yet created a workspace, please follow the [Get Started guide](../../../README.md#get-started)

## Sample setup
1. Clone this sample:
    ```powershell
    git clone https://github.com/microsoft/playwright-testing-service
    cd playwright-testing-service/samples/.NET/MSTest
    ```

1. Install dependencies:
    ```powershell
    dotnet add package Microsoft.Playwright.MSTest
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
    $env:PLAYWRIGHT_SERVICE_ACCESS_TOKEN= # Paste Access Token value from previous step
    ```
    NOTE: If you are using Playwright version 1.39, the name of this variable should be `PLAYWRIGHT_SERVICE_ACCESS_KEY`.

1. In the [Playwright portal](https://aka.ms/mpt/portal), copy the command under **Add region endpoint in your set up** and set the following environment variable:
    ```powershell
    $env:PLAYWRIGHT_SERVICE_URL= # Paste region endpoint URL
    ```


## Run tests

Run Playwright tests against browsers managed by the service using the configuration you created above. You can run up to 50 parallel workers with the service
```powershell
dotnet test --settings:.runsettings -- MSTest.Parallelize.Workers=10
```
Note that by default MSTest will run all classes in parallel, while running tests inside each class sequentially (ExecutionScope.ClassLevel). You can adjust this behavior by using the following CLI parameter or using a .runsettings file as shown above. Running tests in parallel at the method level (ExecutionScope.MethodLevel) is not supported. Please refer to [Playwright documentation](https://playwright.dev/dotnet/docs/test-runners#running-mstest-tests-in-parallel).

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
