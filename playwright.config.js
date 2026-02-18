// @ts-check
import { defineConfig, devices } from '@playwright/test';

// /**
// * @see https://playwright.dev/docs/test-configuration
//  */

export default defineConfig({ 
  testDir: './tests',
  testMatch: ['**/*.spec.js'],
   timeout: 100000,
  expect: {
    timeout: 10000,
  },
     reporter: 'html',
   use: {

      browserName: 'chromium',
      headless: false,

   

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
   },


});