# Playwright Test Automation

A comprehensive test automation suite using Playwright for testing web applications, including login tests, UI tests, and data-driven testing with Excel files.

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Running Tests](#running-tests)
- [Test Files](#test-files)
- [Configuration](#configuration)
- [Features](#features)

## Prerequisites

- **Node.js**: Version 14 or higher
- **npm**: Comes with Node.js
- **Git**: For version control

## Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/saikiran419/playwright.git
cd playwright12
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install:
- **@playwright/test** - Playwright testing framework
- **playwright** - Playwright browser automation library
- **xlsx** - Excel file reading for data-driven tests
- Other required dependencies

### Step 3: Verify Installation

```bash
npx playwright --version
```

## Project Structure

```
playwright12/
├── tests/                           # Test files directory
│   ├── example.spec.js             # Example login tests
│   ├── login.spec.js               # Basic login tests
│   ├── login-from-excel.spec.js    # Excel data-driven login tests
│   ├── login-excel.spec.js         # Excel integration tests
│   ├── UIBasicstest.spec.js        # UI element testing
│   └── login.xlsx                  # Test data (Excel file)
├── playwright.config.js             # Playwright configuration
├── package.json                     # Project dependencies
├── package-lock.json                # Locked dependency versions
├── .gitignore                       # Git ignore rules
├── .github/
│   └── workflows/
│       └── playwright.yml           # GitHub Actions CI/CD workflow
├── playwright-report/               # Generated test reports
├── test-results/                    # Test execution results
└── README.md                        # This file
```

## Running Tests

### Run All Tests

```bash
npx playwright test
```

### Run Specific Test File

```bash
npx playwright test tests/login.spec.js
```

### Run Tests with Specific Browser

```bash
npx playwright test --project=chromium
```

Available browsers: `chromium`, `firefox`, `webkit`

### Run Tests in Headed Mode (See Browser UI)

```bash
npx playwright test --headed
```

### Debug Tests

```bash
npx playwright test --debug
```

### Generate and View Test Report

```bash
npx playwright test
npx playwright show-report
```

## Test Files

### 1. **example.spec.js**
- Tests login functionality with multiple test users
- Uses Sauce Demo website for testing
- Tests both standard and problem user accounts

### 2. **login.spec.js**
- Basic login test suite
- Tests successful login scenarios
- Verifies page navigation after login

### 3. **login-from-excel.spec.js**
- Data-driven testing using Excel files
- Reads test data from `login.xlsx`
- Tests multiple user credentials from Excel

### 4. **login-excel.spec.js**
- Advanced Excel integration
- Different test scenarios based on Excel data
- Flexible data-driven approach

### 5. **UIBasicstest.spec.js**
- UI element interaction tests
- Tests button clicks, form fills, and page interactions
- Validates UI elements are present and functional

## Configuration

### Playwright Config File: `playwright.config.js`

Key configurations:

```javascript
// Browser timeout (in milliseconds)
timeout: 30000

// Navigation timeout
navigationTimeout: 30000

// Retry failed tests
retries: 1

// Run tests in parallel
fullyParallel: true

// Test reporter
reporter: 'html'
```

### Test Data: `login.xlsx`

The Excel file contains:
- **Column A**: Username
- **Column B**: Password
- **Column C**: Expected Result (pass/fail)

Update this file to add/modify test data.

## Features

✅ **Browser Automation** - Automate interactions with web browsers
✅ **Multiple Browsers** - Test on Chromium, Firefox, and WebKit
✅ **Data-Driven Testing** - Use Excel files for test data
✅ **Parallel Execution** - Run tests concurrently for faster results
✅ **HTML Reports** - Generate detailed test reports
✅ **Debugging** - Built-in debugging and inspector tools
✅ **CI/CD Integration** - GitHub Actions workflow included
✅ **Screenshots & Videos** - Capture on test failure

## Usage Example

### Basic Login Test

```javascript
const { test, expect } = require("@playwright/test");

test("Login with valid credentials", async ({ page }) => {
  // Navigate to website
  await page.goto("https://www.saucedemo.com/");
  
  // Fill login form
  await page.locator("#user-name").fill("standard_user");
  await page.locator("#password").fill("secret_sauce");
  
  // Click login button
  await page.locator("#login-button").click();
  
  // Wait and verify
  await page.waitForTimeout(2000);
  expect(page.url()).toContain("inventory");
});
```

## Analyzing Test Results

### View HTML Report

After running tests, view the report:

```bash
npx playwright show-report
```

### Check Test Results Directory

Test outputs are saved in `test-results/` folder with:
- Screenshots
- Videos (if enabled)
- Test logs

## Troubleshooting

### Tests Not Running?
1. Ensure Node.js is installed: `node --version`
2. Install/reinstall dependencies: `npm install`
3. Clear cache: `npm cache clean --force`

### Browser Issues?
1. Update Playwright: `npm install @playwright/test@latest`
2. Install browsers: `npx playwright install`

### Excel File Errors?
1. Verify `login.xlsx` exists in the project root
2. Check Excel file format (should be .xlsx)
3. Ensure columns match expected format

## CI/CD Pipeline

This project includes GitHub Actions workflow (`.github/workflows/playwright.yml`) that:
- Runs all tests automatically on push/pull request
- Generates test reports
- Uploads artifacts
- Notifies on test results

## Contributing

1. Create a new branch: `git checkout -b feature/new-test`
2. Add your tests
3. Commit changes: `git commit -m "Add new tests"`
4. Push to GitHub: `git push origin feature/new-test`
5. Create a Pull Request

## Resources

- [Playwright Documentation](https://playwright.dev)
- [Playwright Test API](https://playwright.dev/docs/api/class-test)
- [Sauce Demo Website](https://www.saucedemo.com)
- [Node.js Guide](https://nodejs.org)

## License

ISC

## Author

Sai Kiran Reddy

---

**Need Help?**
- Check Playwright docs: https://playwright.dev
- Review test examples in the `tests/` directory
- Check GitHub Issues: https://github.com/saikiran419/playwright/issues
