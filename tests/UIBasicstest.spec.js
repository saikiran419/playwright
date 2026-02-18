const { test, expect } = require("@playwright/test");

test("First Playwright Test", async ({browser}) =>
{
//  chrome - plugins/coolies
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://www.amazonin/");
    await page.getByRole("link", { name: "Hello, sign in" }).click();
    await page.getByLabel("Email or mobile phone number").fill(process.env.AMAZON_USER || "");
    await page.getByRole("button", { name: "Continue" }).click();
    await page.getByLabel("Password").fill(process.env.AMAZON_PASS || "");
    await page.getByRole("button", { name: "Sign in" }).click();
    console.log(await page.title());
    await page.waitForTimeout(3000);
});


test("page Playwright Test", async ({page}) =>
{
    await page.goto("https://google.com", { waitUntil: "load", timeout: 60_000 });

    
});



