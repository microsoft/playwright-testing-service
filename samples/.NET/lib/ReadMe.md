# Run Playwright .NET tests with Microsoft Playwright Testing 

This sample demonstrates how to run Playwright .NET to use browser at scale using Microsoft Playwright Testing. It showcases the benefits of accelerating test suite completion by leveraging more parallel cloud browsers. The tests are executed using dotnet library without Any runner.

If you have not yet created a workspace, please follow the [Get Started guide](../../../README.md#get-started)

### Sample setup
1. Clone this sample:
    ```powershell
    git clone https://github.com/microsoft/playwright-testing-service
    cd playwright-workspaces/samples/.NET/lib
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


1. Set up environment: 
   In the [Playwright portal](https://aka.ms/mpt/portal), copy the command under **Add region endpoint in your set up** and set the following environment variable:

   ```bash
   PLAYWRIGHT_SERVICE_URL= # Paste region endpoint URL
    ```
   - Generate access token following [guide](https://aka.ms/mpt/generate-access-token)
    - Set the token generated in the previous step
    ```
    $env:PLAYWRIGHT_SERVICE_ACCESS_TOKEN="TOKEN_VALUE"
    ```

### Run program

Run Playwright script against browsers managed by the service using the configuration you created above. You can run up to 50 parallel workers with the service
```powershell
    dotnet run
``` 

   
## Next steps
1. Follow the [quickstart guide](https://learn.microsoft.com/en-us/azure/playwright-testing/quickstart-run-end-to-end-tests?tabs=playwrightcli&pivots=nunit-test-runner)
2. [Integrate CI/CD pipelines](https://learn.microsoft.com/en-us/azure/playwright-testing/quickstart-automate-end-to-end-testing?tabs=github&pivots=nunit-test-runner)
3. Learn about [package options](https://learn.microsoft.com/en-us/azure/playwright-testing/how-to-use-service-config-file?pivots=nunit-test-runner).
