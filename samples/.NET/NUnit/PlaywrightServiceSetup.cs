using Azure.Developer.Playwright.NUnit;
using Azure.Developer.Playwright;
using NUnit.Framework;
using Azure.Identity;

namespace PlaywrightTests; // Remember to change this as per your project namespace

[SetUpFixture]
public class PlaywrightServiceNUnitSetup : PlaywrightServiceBrowserNUnit
{
    public PlaywrightServiceNUnitSetup() : base(
        credential: new DefaultAzureCredential(),
        options: new PlaywrightServiceBrowserClientOptions
        {
            ServiceAuth = ServiceAuthType.EntraId // optional for default Entra Auth
        }
    )
    {}
}