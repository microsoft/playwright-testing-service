using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.Playwright;
using Microsoft.Playwright.NUnit;
using NUnit.Framework;

namespace PlaywrightTests;

[Parallelizable(ParallelScope.All)]
[TestFixture]
public class Tests : BrowserTest
{
    [Test]
    [TestCase(1, TestName = "Test Iteration 1")]
    [TestCase(2, TestName = "Test Iteration 2")]
    [TestCase(3, TestName = "Test Iteration 3")]
    [TestCase(4, TestName = "Test Iteration 4")]
    [TestCase(5, TestName = "Test Iteration 5")]
    [TestCase(6, TestName = "Test Iteration 6")]
    [TestCase(7, TestName = "Test Iteration 7")]
    [TestCase(8, TestName = "Test Iteration 8")]
    [TestCase(9, TestName = "Test Iteration 9")]
    [TestCase(10, TestName = "Test Iteration 10")]
   

    public async Task HomepageHasPlaywrightInTitleAndGetStartedLinkLinkingtoTheIntroPage(int iteration)
    {
        await using var browser = await Playwright.Chromium.LaunchAsync();
        await using var context = await browser.NewContextAsync();

        //// Start tracing.
        // await context.Tracing.StartAsync(new()
        // {
        //     Screenshots = true,
        //     Snapshots = true,
        //     Sources = true
        // });

        var page = await context.NewPageAsync();
        await page.GotoAsync("https://playwright.dev");

        // Expect a title "to contain" a substring.
        await Expect(page).ToHaveTitleAsync(new Regex("Playwright"));

        // create a locator
        var getStarted = page.GetByRole(AriaRole.Link, new() { Name = "Get started" });

        // Expect an attribute "to be strictly equal" to the value.
        await Expect(getStarted).ToHaveAttributeAsync("href", "/docs/intro");

        // Click the get started link.
        await getStarted.ClickAsync();

        // Expects the URL to contain intro.
        await Expect(page).ToHaveURLAsync(new Regex(".*intro"));

        // // Stop tracing and export it into a zip archive.
        // await context.Tracing.StopAsync(new()
        // {
        //     Path = "trace"+iteration.ToString()+".zip"
        // });

    }
}
