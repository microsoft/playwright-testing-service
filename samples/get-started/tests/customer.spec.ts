import { test, expect } from '@playwright/test';
// test('debug test', async ({ page }) => {
//     const response = await page.request.get('https://api.ipify.org', {
//      headers: {
//       'Content-Type': 'application/json',
//      },
//     });
//     console.log((await response.body()).toString());
//    });


   test('debug test1', async ({ page }) => {
    await page.goto('http://localhost:4000');
    const email = 'EMAIL';
    const password = 'PW';
    const response = await page.request.post('http://localhost:4000/rpc', {
    headers: { 'Content-Type': 'application/json' },
    data: {
    "username": 'some1@gmail.com'
    },
    });
    console.log((await response.body()).toString());
    });
    