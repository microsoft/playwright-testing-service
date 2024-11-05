using Microsoft.Playwright;
using Microsoft.Playwright.NUnit;
using Microsoft.Playwright.TestAdapter;
using NUnit.Framework;
using NUnit.Framework.Interfaces;
using System.Globalization;

namespace PlaywrightTests
{
    /* 
     * PlaywrightTestWithArtifact is a base class for tests that require Playwright context and page.
     * It provides a setup and teardown methods for the test to run in a browser context.
     * It also provides a way to enable trace, screenshot, and video artifacts for the test.
     * Users need to inherit this class instead of PlaywrightTest to write tests.
     */
    [TestFixture]
    public class PlaywrightTestWithArtifact : PlaywrightTest
    {
        // Declare Browser, Context and Page
        private IPage Page;
        private IBrowserContext Context;
        private IBrowser Browser;
        private BrowserNewContextOptions ContextOption;

        [SetUp]
        public async Task Setup()
        {
            // Create Browser, context and page
            Browser = await CreateBrowser(BrowserType);
            ContextOption = new BrowserNewContextOptions { RecordVideoDir = ".videos" };
            Context = await Browser.NewContextAsync(ContextOption);

            // Enable Trace
            await Context.Tracing.StartAsync(new()
            {
                Title = $"{TestContext.CurrentContext.Test.Name}",
                Screenshots = true,
                Snapshots = true,
                Sources = true
            });
            // Create a new page
            Page = await Context.NewPageAsync();
        }

        [TearDown]
        public async Task TearDown()
        {
            var tracePath = Path.Combine(
                TestContext.CurrentContext.WorkDirectory,
                "playwright-traces",
                $"{TestContext.CurrentContext.Test.ClassName}.{TestContext.CurrentContext.Test.Name}.zip"
            );
            await Context.Tracing.StopAsync(new()
            {
                Path = tracePath
            });
            TestContext.AddTestAttachment(tracePath, description: "Trace");

            // Take a screenshot on error and add it as an attachment
            if (TestContext.CurrentContext.Result.Outcome == ResultState.Error)
            {
                var screenshotPath = Path.Combine(
                    TestContext.CurrentContext.WorkDirectory,
                    "playwright-screenshot",
                    $"{TestContext.CurrentContext.Test.Name}.{Guid.NewGuid()}.png");
                await Page.ScreenshotAsync(new()
                {
                    Path = screenshotPath,
                });
                TestContext.AddTestAttachment(screenshotPath, description: "Screenshot");
            }

            // Enable video artifact and add it as an attachment, Context close is required to save the video
            await Context.CloseAsync();
            var videoPath = Path.Combine(
                TestContext.CurrentContext.WorkDirectory,
                "playwright-videos",
                $"{TestContext.CurrentContext.Test.Name}.{Guid.NewGuid()}.webm");
            if (Page.Video != null)
            {
                await Page.Video.SaveAsAsync(videoPath);
                TestContext.AddTestAttachment(videoPath, description: "Video");
            }
            await Browser.CloseAsync();
        }

        /* 
         * Helper function to create browser.
         * Depend upon service url and access token, it will create browser
         * either using Playwright Local or Playwright Service.
         */
        private static async Task<IBrowser> CreateBrowser(IBrowserType browserType)
        {
            var accessToken = Environment.GetEnvironmentVariable("PLAYWRIGHT_SERVICE_ACCESS_TOKEN");
            var serviceUrl = Environment.GetEnvironmentVariable("PLAYWRIGHT_SERVICE_URL");

            if (string.IsNullOrEmpty(accessToken) || string.IsNullOrEmpty(serviceUrl))
            {
                return await browserType.LaunchAsync(PlaywrightSettingsProvider.LaunchOptions).ConfigureAwait(false);
            }

            var exposeNetwork = Environment.GetEnvironmentVariable("PLAYWRIGHT_SERVICE_EXPOSE_NETWORK") ?? "<loopback>";
            var os = Uri.EscapeDataString(Environment.GetEnvironmentVariable("PLAYWRIGHT_SERVICE_OS") ?? "linux");
            var runId = Uri.EscapeDataString(Environment.GetEnvironmentVariable("PLAYWRIGHT_SERVICE_RUN_ID") ?? DateTime.Now.ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ss", CultureInfo.InvariantCulture));
            var apiVersion = "2023-10-01-preview";
            var wsEndpoint = $"{serviceUrl}?os={os}&runId={runId}&api-version={apiVersion}";
            var connectOptions = new BrowserTypeConnectOptions
            {
                Timeout = 3 * 60 * 1000,
                ExposeNetwork = exposeNetwork,
                Headers = new Dictionary<string, string>
                {
                    ["Authorization"] = $"Bearer {accessToken}"
                }
            };

            return await browserType.ConnectAsync(wsEndpoint, connectOptions).ConfigureAwait(false);
        }
    }
}
