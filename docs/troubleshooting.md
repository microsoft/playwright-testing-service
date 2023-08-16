# Troubleshooting

## Tests run slow 

Microsoft Playwright Testing currently hosts all service browsers in the following regions: East US, West US, West Europe, and East Asia. If your client device or web application is outside these regions, you might experience increased network latency. 

We are working on adding more regions to improve performance. If you have a specific region in mind, please suggest it through a [GitHub issue](https://aka.ms/mpt/feedback). Meanwhile, if suitable for your needs, consider using [GitHub Codespaces](https://docs.github.com/en/codespaces) in one of the supported regions. 

## Tests are failing with 401 error

Your access key may be invalid or expired. Make sure you are using the correct access key. You can generate a new access key from the home page of your workspace. 

## Tests are failing because of timeout

Your tests could be timing out because of the following reasons:    
    
1. Your client machine is in a different region than the browsers. 
    
    Connecting to service-hosted browsers introduces some network latency, so you'll need to increase your timeout settings in Playwright configuration. You can set new timeout values for the [these](https://playwright.dev/docs/test-timeouts) properties. If you are not sure, start with increasing the test timeout in `playwright.service.config.ts`.

2. Trace files cause performance issues (currently a known problem). 
        
    When the service sends trace files to the client, it can create congestion that causes tests to fail due to timeout issues. We are aware of this problem and are working on optimizing the data exchange between the service and client to prevent this from happening. In the meantime, try [disabling tracing in the Playwright configuration file](https://playwright.dev/docs/api/class-testoptions#test-options-trace).

## Tests seem to hang 

Your tests might hang due to a piece of code that's unintentionally paused the test execution. For example, you might have added pause statements while debugging your test.

Search for any instances of `pause()` in your code and comment them out.

## Tests are failing with error: "browserType.launch: Chromium distribution 'chrome'"

The service currently does not support testing on Google Chrome and Microsoft Edge. We are working on building this support. 

## The time displayed in the browser is different from my local time

Web applications often display the time based on the user's location. When testing with Microsoft Playwright Testing this can cause a mismatch because the client and the service browsers may be in different regions.

You can mitigate the issue by explicitly [setting the time zone in the Playwright configuration file](https://playwright.dev/docs/emulation#locale--timezone).

## Not able to test locally hosted web applications

Make sure to set `exposeNetwork` as `'localhost'` in the `playwright.service.config.ts` file. If your web application is hosted on a different IP, you can replace localhost with the IP or with `*`

## Azure subscription is inactive
If you have an inactive Azure subscription, you will not be able to access the Microsoft Playwright Testing Private preview. Inactive subscriptions commonly result from expired Azure account free trials. 

To confirm that you have a valid subscription, navigate to the [**Subscriptions**](https://portal.azure.com/#view/Microsoft_Azure_Billing/SubscriptionsBlade) blade in the Azure portal and check the **Status** column for your subscription. If it is not marked as *Active*, you will need to [reactivate the subscription](https://learn.microsoft.com/azure/cost-management-billing/manage/subscription-disabled) and select an appropriate plan. 

Important Note: Microsoft Playwright Testing is available at no cost while in private preview. Hence, if you are using your subscription exclusively for Microsoft Playwright Testing, there will be no associated charges. 

## Open an issue with the product team

If you are still facing problems, open an [issue on GitHub](https://aka.ms/mpt/feedback). To help us debug better, please attach log file on the issue. You can create it by setting the following environment variables in your machine before running your tests. 
        
        DEBUG=pw:*  
        DEBUG_FILE=log.log 

If you do not want to share the log on GitHub, email it to us at playwrighttesting@microsoft.com with the relevant GitHub issue link. 
