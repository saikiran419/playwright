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
  test(`Login Test - ${user.username}`, async ({ page }) => {
    await test.step('Navigate to login page', async () => {
      await page.goto('https://www.saucedemo.com/');
      await page.waitForTimeout(2000); // Wait 2 seconds after page load
    });

    await test.step(`Enter credentials for ${user.username}`, async () => {
      await page.locator('#user-name').fill(String(user.username));
      await page.waitForTimeout(1000); // Wait 1 second after entering username
      await page.locator('#password').fill(String(user.password));
      await page.waitForTimeout(1000); // Wait 1 second after entering password
    });

    await test.step('Click login button', async () => {
      await page.locator('#login-button').click();
      await page.waitForTimeout(2000); // Wait 2 seconds after clicking login
      await page.waitForLoadState('domcontentloaded');
    });

    await test.step('Verify login result', async () => {
      await page.waitForTimeout(1000); // Wait 1 second before verification
      // Check if login was successful
      const isInventoryVisible = await page.locator('.inventory_list').isVisible().catch(() => false);
      
      if (user.username === 'locked_out_user') {
        // This user should fail - verify error message is shown
        const errorVisible = await page.locator('.error-message-container').isVisible();
        expect(errorVisible).toBe(true);
        
        const errorText = await page.locator('.error-message-container').textContent();
        console.log(`Expected failure for ${user.username}: ${errorText}`);
      } else {
        // Other users should login successfully
        expect(isInventoryVisible).toBe(true);
      }
      await page.waitForTimeout(1000); // Wait 1 second at the end
    });
  });
});
