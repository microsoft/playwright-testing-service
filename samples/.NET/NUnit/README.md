# Run Playwright .NET tests with Microsoft Playwright Testing 

This sample demonstrates how to run Playwright .NET tests at scale using Microsoft Playwright Testing. It showcases the benefits of accelerating test suite completion by leveraging more parallel cloud browsers. The tests are executed using NUnit test runner.

Note: Since service integration is done via [playwright NUnit base class](https://playwright.dev/dotnet/docs/test-runners) which uses BrowserService so it only works out of the box when you use one of the following base class BrowserTest, Page, ContextTest

If you have not yet created a workspace, please follow the [Get Started guide](../../../README.md#get-started)

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
1. Install service package
   ```powershell
   dotnet add package Azure.Developer.MicrosoftPlaywrightTesting.NUnit --prerelease
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

1. Set up Authentication 

    To run your Playwright tests in your Microsoft Playwright Testing workspace, you need to authenticate the Playwright client where you are running the tests with the service. This could be your local dev machine or CI machine. To run tests from your local machine, you can use Azure CLI. Run this command to sign-in 
    
    ```CLI
    az login
    ```
    **NOTE**: If you are a part of multiple Microsoft Entra tenants, make sure you sign-in to the tenant where your workspace belongs. You can get the tenant id from Azure portal, see [Find your Microsoft Entra Tenant](https://learn.microsoft.com/en-us/azure/azure-portal/get-subscription-tenant-id#find-your-microsoft-entra-tenant). Once you get the id, sign in using the command `az login --tenant <TenantID>`

1. Set up environment: 
   In the [Playwright portal](https://aka.ms/mpt/portal), copy the command under **Add region endpoint in your set up** and set the following environment variable:

   ```bash
   PLAYWRIGHT_SERVICE_URL= # Paste region endpoint URL
    ```
   
### Run tests

Run Playwright tests against browsers managed by the service using the configuration you created above. You can run up to 50 parallel workers with the service
```powershell
    dotnet test --logger "microsoft-playwright-testing" -- NUnit.NumberOfTestWorkers=20
```
Note that by default NUnit will run all test files in parallel, while running tests inside each file sequentially (ParallelScope.Self). You can adjust this behavior using the NUnit.NumberOfTestWorkers parameter. Running test in parallel using ParallelScope.All or ParallelScope.Fixtures is not supported. Please refer to [Playwright documentation](https://playwright.dev/dotnet/docs/test-runners#running-nunit-tests-in-parallel). 

   
## Next steps
1. Follow the [quickstart guide](https://learn.microsoft.com/en-us/azure/playwright-testing/quickstart-run-end-to-end-tests?tabs=playwrightcli&pivots=nunit-test-runner)
2. [Integrate CI/CD pipelines](https://learn.microsoft.com/en-us/azure/playwright-testing/quickstart-automate-end-to-end-testing?tabs=github&pivots=nunit-test-runner)
3. Learn about [package options](https://learn.microsoft.com/en-us/azure/playwright-testing/how-to-use-service-config-file?pivots=nunit-test-runner).

### Details of the files on this sample project
- [PlaywrightServiceSetup.cs](./PlaywrightServiceSetup.cs): **Requiried** to be added to your project to setup the service, make sure to change the namespace to your project namespace
- [.runsettings](./.runsettings): Optional but recommended to be added to your project to better control service configuration params like Os, RunId, ServiceAuthType, UseCloudHostedBrowsers, ExposeNetwork
- [PageTestWithArtifact.cs](./PageTestWithArtifact.cs): Optional but recommended, If you use PageTest fixture in your test class, this inherit class enable and attach artifacts to the test results
- [ContextTestWithArtifact.cs](./ContextTestWithArtifact.cs): Optional but recommended, If you use ContextTest fixture in your test class, this inherit class enable and attach artifacts to the test results
- [BrowserTestWithArtifact.cs](./BrowserTestWithArtifact.cs): Optional but recommended, If you use BrowserTest fixture in your test class, this inherit class enable and attach artifacts to the test results
- [PlaywrightTestWithArtifact.cs](./PlaywrightTestWithArtifact.cs): Optional but recommended, If you use PlaywrightTest fixture in your test class, this inherit class enable and attach artifacts to the test results

### How to extend new fixtures
- public class Tests : PageTestWithArtifact // for PageTest fixture
- public class Tests : ContextTestWithArtifact // for ContextTest fixture
- public class Tests : BrowserTestWithArtifact // for BrowserTest fixture
- public class Tests : PlaywrightTestWithArtifact // for PlaywrightTest fixture

