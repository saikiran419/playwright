const { test, expect } = require('@playwright/test');
const XLSX = require('xlsx');
const path = require('path');

// Step 1 — Read Excel File
const workbook = XLSX.readFile(path.join(__dirname, 'login.xlsx'));
const sheet = workbook.Sheets[workbook.SheetNames[0]];

// Convert Excel → JSON
const users = XLSX.utils.sheet_to_json(sheet);

// Run test for each user
for (const user of users) {

  test(`Login Test for ${user.username}`, async ({ page }) => {

    // Open website
    await page.goto('https://www.saucedemo.com/');
    await page.waitForTimeout(2000); // Wait 2 seconds

    // Enter username
    await page.fill('#user-name', user.username.toString());
    await page.waitForTimeout(1000); // Wait 1 second

    // Enter password
    await page.fill('#password', user.password.toString());
    await page.waitForTimeout(1000); // Wait 1 second

    // Click login
    await page.click('#login-button');
    await page.waitForTimeout(2000); // Wait 2 seconds

    // Check login result

    // If locked user → expect error
    if (user.username === 'locked_out_user') {

      await expect(page.locator('.error-message-container'))
        .toBeVisible();

      console.log(`Login failed as expected for ${user.username}`);

    } else {

      // Other users should login successfully
      await expect(page.locator('.inventory_list'))
        .toBeVisible();

      console.log(`Login successful for ${user.username}`);
    }

    await page.waitForTimeout(1000); // Wait 1 second at end

  });

}
