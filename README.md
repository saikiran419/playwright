📚 README Step-by-Step Process:
1. Prerequisites
Node.js (v14+)
npm (comes with Node.js)
Git
2. Installation
3. Running Tests
All tests: npx playwright test
Specific file: npx playwright test tests/login.spec.js
Headed mode: npx playwright test --headed (see browser)
Debug mode: npx playwright test --debug
4. View Test Reports
5. Project Structure
tests/ - Contains all test files
playwright.config.js - Configuration settings
login.xlsx - Test data for data-driven tests
playwright-report/ - Generated test reports
6. Test Files Explained
example.spec.js - Login tests with multiple users
login.spec.js - Basic login functionality
login-from-excel.spec.js - Excel-based data-driven tests
UIBasicstest.spec.js - UI element tests
7. CI/CD Pipeline
GitHub Actions workflow automatically runs tests on push/pull requests
