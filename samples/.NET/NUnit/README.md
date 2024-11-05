# Scale Playwright .NET tests with Microsoft Playwright Testing (Experimental)

This sample demonstrates how to run Playwright .NET tests at scale using Microsoft Playwright Testing. It showcases the benefits of accelerating test suite completion by leveraging more parallel cloud browsers. The tests are executed using NUnit test runner.

Note: Since service integration is done via [playwright NUnit base class](https://playwright.dev/dotnet/docs/test-runners) which uses BrowserService so it only works out of the box when you use one of the following base class BrowserTest, Page, ContextTest

If you have not yet created a workspace, please follow the [Get Started guide](../../../README.md#get-started)

## MPT package integration

Follow Documentation [here](https://github.com/Azure/azure-sdk-for-net/tree/main/sdk/playwrighttesting/Azure.Developer.MicrosoftPlaywrightTesting.NUnit)

### Content on this sample project
- [PlaywrightServiceSetup.cs](./PlaywrightServiceSetup.cs): **Requiried** to be added to your project to setup the service, make sure to change the namespace to your project namespace
- [.runsettings](./.runsettings): Optional but recommended to be added to your project to better control service configuration params like Os, RunId, ServiceAuthType, UseCloudHostedBrowsers, ExposeNetwork
- [PageTestWithArtifact.cs](./PageTestWithArtifact.cs): Optional but recommended, If you use PageTest fixture in your test class, this enherit class enable and attach artifacts to the test results
- [ContextTestWithArtifact.cs](./ContextTestWithArtifact.cs): Optional but recommended, If you use ContextTest fixture in your test class, this enherit class enable and attach artifacts to the test results
- [BrowserTestWithArtifact.cs](./BrowserTestWithArtifact.cs): Optional but recommended, If you use BrowserTest fixture in your test class, this enherit class enable and attach artifacts to the test results
- [PlaywrightTestWithArtifact.cs](./PlaywrightTestWithArtifact.cs): Optional but recommended, If you use PlaywrightTest fixture in your test class, this enherit class enable and attach artifacts to the test results

### Sample way to extend new fixtures
- public class Tests : PageTestWithArtifact // for PageTest fixture
- public class Tests : ContextTestWithArtifact // for ContextTest fixture
- public class Tests : BrowserTestWithArtifact // for BrowserTest fixture
- public class Tests : PlaywrightTestWithArtifact // for PlaywrightTest fixture

### How to run tests
- set the environment variable `PLAYWRIGHT_SERVICE_URL` to the region endpoint URL, Detailed steps [here](https://github.com/Azure/azure-sdk-for-net/tree/main/sdk/playwrighttesting/Azure.Developer.MicrosoftPlaywrightTesting.NUnit)
- az login // login with your azure credentials, make sure this credential have access to the workspace
- dotnet test --settings .runsettings // if using .runsettings
- dotnet test --logger "microsoft-playwright-testing" -- NUnit.NumberOfTestWorkers=10 // if not using .runsettings

## Legacy way (Without Package -  No Reporting )
### Sample setup
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

1. Set up Authentication using Access Tokens
    Currently, only access tokens are supported for NUnit. See [Set up authentication using access tokens](../../../README.md#set-up-authentication-using-access-tokens)

1. Set access token generated above as environment variable for your project: 
    ```powershell
    $env:PLAYWRIGHT_SERVICE_ACCESS_TOKEN= # Paste Access Token value from previous step
    ```
    NOTE: If you are using Playwright version 1.39, the name of this variable should be `PLAYWRIGHT_SERVICE_ACCESS_KEY`.
    
1. In the [Playwright portal](https://aka.ms/mpt/portal), copy the command under **Add region endpoint in your set up** and set the following environment variable:
    ```powershell
    $env:PLAYWRIGHT_SERVICE_URL= # Paste region endpoint URL
    ```


### Run tests

Run Playwright tests against browsers managed by the service using the configuration you created above. You can run up to 50 parallel workers with the service
```powershell
    dotnet test -- NUnit.NumberOfTestWorkers=20
```
Note that by default NUnit will run all test files in parallel, while running tests inside each file sequentially (ParallelScope.Self). You can adjust this behavior using the NUnit.NumberOfTestWorkers parameter. Running test in parallel using ParallelScope.All or ParallelScope.Fixtures is not supported. Please refer to [Playwright documentation](https://playwright.dev/dotnet/docs/test-runners#running-nunit-tests-in-parallel). 

### Add more configuration

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
