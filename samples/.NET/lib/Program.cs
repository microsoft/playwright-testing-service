using Microsoft.Playwright;
using System.Runtime.InteropServices;

// Function to get connection options
static (string wsEndpoint, BrowserTypeConnectOptions options) GetConnectOptions()
{
    var runId = Guid.NewGuid().ToString();
    var os = "linux"; // Change to "windows" if wants to run on Windows
    var apiVersion = "2025-09-01"; // DONOT change

    var serviceUrl = Environment.GetEnvironmentVariable("PLAYWRIGHT_SERVICE_URL") ?? "";
    var accessToken = Environment.GetEnvironmentVariable("PLAYWRIGHT_SERVICE_ACCESS_TOKEN") ?? "";
    
    var wsEndpoint = $"{serviceUrl}?runId={Uri.EscapeDataString(runId)}&os={os}&api-version={apiVersion}";
    
    var options = new BrowserTypeConnectOptions
    {
        Timeout = 3 * 60 * 1000, // 3 minutes
        Headers = new Dictionary<string, string>
        {
            { "Authorization", $"Bearer {accessToken}" }
        },
        ExposeNetwork = "<loopback>", // Use loopback to expose network
    };
    
    return (wsEndpoint, options);
}

using var playwright = await Playwright.CreateAsync();

// Get connection options
var (wsEndpoint, connectOptions) = GetConnectOptions();

await using var browser = await playwright.Chromium.ConnectAsync(wsEndpoint, connectOptions);
var page = await browser.NewPageAsync();
await page.GotoAsync("https://playwright.dev/dotnet");
var title = await page.TitleAsync();
Console.WriteLine($"Title: {title}");
await page.ScreenshotAsync(new()
{
    Path = "screenshot.png"
});