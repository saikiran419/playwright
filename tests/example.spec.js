const { test, expect } = require("@playwright/test");

const testUsers = [
	{ username: "standard_user", password: "secret_sauce" },
	{ username: "problem_user", password: "secret_sauce" }
];

testUsers.forEach(({ username, password }) => {
	test(`Login test for ${username}`, async ({ page }) => {
		// Navigate to SauceDemo
		await page.goto("https://www.saucedemo.com/");
		
		// Fill login credentials
		await page.locator("#user-name").fill(username);
		await page.locator("#password").fill(password);
        await page.waitForTimeout(2000);
		
		// Click login button
		await page.locator("#login-button").click();
        await page.waitForTimeout(2000);
		
		// Wait for navigation to complete
		await page.waitForURL(/inventory\.html/);
		
		// Verify successful login
		await expect(page).toHaveURL(/inventory\.html/);
		await expect(page).toHaveTitle(/Swag Labs/);
		await expect(page.locator(".inventory_list")).toBeVisible();
	});
});

