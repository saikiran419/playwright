const { test, expect } = require('@playwright/test');
const XLSX = require('xlsx');
const path = require('path');

// Read Excel file before tests
const excelPath = path.join(__dirname, 'login.xlsx');
const workbook = XLSX.readFile(excelPath);
const sheetName = workbook.SheetNames[0];
const users = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { defval: '' });

// Create a test for each user in Excel
users.forEach((user, index) => {
  test(`Login Test - ${user.username} (Row ${index + 2})`, async ({ page }) => {
    test.step(`Navigate to login page`, async () => {
      await page.goto('https://www.saucedemo.com/');
    });

    test.step(`Enter credentials for ${user.username}`, async () => {
      await page.locator('#user-name').fill(user.username);
      await page.locator('#password').fill(user.password);
    });

    test.step(`Click login button`, async () => {
      await page.locator('#login-button').click();
    });

    test.step(`Verify login ${user.username === 'locked_out_user' ? 'fails' : 'succeeds'}`, async () => {
      await page.waitForLoadState('domcontentloaded');
      
      if (user.username === 'locked_out_user') {
        // This user should fail to login
        const errorMsg = await page.locator('.error-message-container').isVisible();
        expect(errorMsg).toBe(true);
      } else {
        // This user should login successfully
        const inventory = await page.locator('.inventory_list').isVisible();
        expect(inventory).toBe(true);
      }
    });
  });
});
