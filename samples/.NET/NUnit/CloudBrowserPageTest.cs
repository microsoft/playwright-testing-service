using Microsoft.Playwright.NUnit;
using Azure.Developer.Playwright;
using Azure.Identity;
using Microsoft.Playwright;

namespace PlaywrightTests;      // Remember to change this as per your project namespace
public class CloudBrowserPageTest : PageTest
{
public override async Task<(string, BrowserTypeConnectOptions?)?> ConnectOptionsAsync()
    {
        PlaywrightServiceBrowserClient client = new PlaywrightServiceBrowserClient(
            credential: new DefaultAzureCredential(),
            options: new PlaywrightServiceBrowserClientOptions
            {
                ServiceAuth = ServiceAuthType.EntraId // optional
            });
        var connectOptions = await client.GetConnectOptionsAsync<BrowserTypeConnectOptions>();
        return (connectOptions.WsEndpoint, connectOptions.Options);
    }
}