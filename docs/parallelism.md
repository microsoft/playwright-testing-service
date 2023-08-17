# Parallelism

With Microsoft Playwright Testing you can speed up test execution by increasing parallelism at cloud-scale. This article explains the different levels to configure parallelism for your tests.

## Worker processes

In [@playwright/test](https://playwright.dev/docs/intro), all tests run in worker processes. These processes are OS processes, running independently, in parallel, orchestrated by the Playwright Test Runner. All workers have identical environments and *each process starts its own browser*. Generally, increasing the number of parallel workers can reduce the time it takes to complete the full test suite. You can learn more about Playwright Test parallelism [here](https://playwright.dev/docs/test-parallel).

### Local execution

By default, @playwright/test will limit the number of workers to 1/2 of the number of CPU cores on your machine. You can override the number of workers using the command line [flag](https://playwright.dev/docs/test-cli#reference):

```bash
npx playwright test --workers=30
```

or via the Playwright Test Config [workers](https://playwright.dev/docs/next/api/class-testconfig#test-config-workers) option 

```js
export default defineConfig({
  ...
  workers: 5;
  ...
});
```

When you run tests locally, you're limited to the number of CPU cores on your machine. Beyond a certain point, adding more workers will lead to resource contention, slowing down each worker and introducing test flakiness.

### Service scale

When you use the Playwright Testing Service, you can increase the number of workers at cloud-scale to much bigger numbers. In this setup, the worker processes continue to run locally but the browser instances -- which are resource-intensive -- now run in the cloud.

```bash
npx playwright test --workers=30
```

## Service limits

Microsoft Playwright Testing currently allows for up to 50 parallel workers per workspace. This limit is applicable to all active tests within a workspace. For example, multiple CI pipelines may concurrently initiate browser requests to Microsoft Playwright Testing. If the demand for parallel workers exceeds the 50-worker limit, any excess connection requests will be placed in a queue. Subsequently, one of two events will happen:

1. When a browser becomes available within the workspace, a queued request will be allocated a browser. The corresponding worker's tests will then begin executing.

## ⚠️ FIXME ⚠️

1. If a queued request cannot be fulfilled before a specified timeout, a test timeout error will be generated and the request will be removed from the queue. The timeout duration can be adjusted via [Playwright test timeout properties](https://playwright.dev/docs/test-timeouts) in the Playwright configuration. (Note that server timeout may also occur, but this is not user-customizable.)

Please note that the service will return an HTTP status code of 429 (Too Many Requests) if it receives an excessive number of requests.

> [!NOTE]
> We continuously monitor service operations and make adjustments as needed. If you find that your test execution scenarios are being disrupted without good reason, or if the service is not meeting your expectations, please [share your feedback](https://aka.ms/mpt/feedback) with us.

> [!NOTE]
> If you'd like to get greater parallelism enabled for your workspace, [send us a note](https://aka.ms/mpt/feedback).

## Scaling the client

When using the Testing Service with high parallelism, host machine talks to all the browsers running in the cloud. As the number of the workers grows, the host machine could become a bottleneck for the scalable execution. In this case, you can [shard](https://playwright.dev/docs/next/test-sharding) your client tests. That way, 5 shards, each having 30 workers, will deliver a total of 5 * 30 = 150 parallelism.

## Next steps

- For more information about configuring workers and test order in Playwright Test, see [Playwright Test Parallelism](https://playwright.dev/docs/test-parallel).

- For more information about sharding, see [Playwright Test Sharding](https://playwright.dev/docs/test-sharding).

- Integrate Microsoft Playwright Testing into a [CI/CD pipeline.](./cicd.md).
