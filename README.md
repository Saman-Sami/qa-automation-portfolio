# QA Automation Portfolio - UI, API & DB Validation

[![Playwright Tests](https://github.com/Saman-Sami/qa-automation-portfolio/actions/workflows/playwright.yml/badge.svg)](https://github.com/Saman-Sami/qa-automation-portfolio/actions/workflows/playwright.yml)

An end-to-end test automation framework built with Playwright and JavaScript, covering UI automation, API testing, and database validations. Implemented with independent and isolated tests.

### Target Application

[automationexercise.com](https://www.automationexercise.com/), a public demo e-commerce site for QA practice 

## What this demonstrates

- **UI Automation:** Page Object Model across login and product search flows, cross-browser testing (Chromium, Firefox, and Webkit) and a custom Playwright fixture for network-level ad blocking
- **API Testing:** CRUD flows, multi-step account flows with test creating and tearing down its own data, schema validation with Zod, documented API quirk (non-standard HTTP standard handling)
- **Known-bug Documentation:** Used `test.fail()` to document that pressing Enter doesn't trigger search on the site
- **Database Validation:** SQL based backend state verification with local SQLite DB layer, test isolation via each test reseeding, constraint testing
- **CI/CD:** GitHub Actions pipeline running the full suite on every push, with published HTML reports

## Tech Stack

- [Playwright](https://playwright.dev/): UI, API and test runner
- JavaScript (Node.js)
- [Zod](https://zod.dev/): API response schema validation
- SQLite (`better-sqlite3`): Local DB validation layer
- GitHub Actions: CI/CD

## Project Structure

```
QA_Portfolio/                      
├── pages/                      # Page Object Models
    ├── LoginPage.js            # Login Page 
    └── ProductsPage.js         # Products listing / search
├── fixtures/
    └── baseFixtures.js         # Custom Playwright fixture with ad-blocking
├── tests/
    ├── api/                        # API tests
        ├── accountsApi.spec.js   
        └── productsApi.spec.js
    ├── db/                         # DB Validation tests
        └── dbValidation.spec.js
    └── ui/                         # UI tests
        ├── login.spec.js           # Login flows with client-side validations
        └── searchProduct.spec.js   # Product search with relevancy
├── utils/
    ├── db.js                  # SQLite query helpers
    ├── schemas.js             # Zod schema for API response validations
    ├── seedDb.js              # Seed script
    └── testUserUtils.js       # API-based test user creation / deletion (used by UI tests) 
├── data/                      
    ├── seed.sql               # Table definition and seed data insertions for local DB
    └── tempDb.db              # SQLite local DB
├── .github/ workflows/
    └── playwright.yml         # CI pipeline
└── README.md

```
## Running locally

```bash
npm install
npx playwright install --with-deps
node utils/seedDb.js
npx playwright test

```

Run a specific layer only:

```bash
npx playwright test --project=chromium   # or firefox, webkit
npx playwright test --project=api
npx playwright test --project=db

```

View the HTML report after a run:

```bash
npx playwright show-report

```

## Notable design decisions 

**Test independence over shared setup:** All tests create and delete their own test data ensuring they are not impacted by the execution order of the tests or by side effects of other tests hence, they follow the test independence and isolation principles.

**Custom Playwright fixture for UI tests:** A custom fixture that overrides the built-in `page` fixture and is used by UI tests to block the ads rendering on the site which could hinder the test execution and result in test flakiness.  

**Local SQLite for DB validation:** The UI and API tests are running against a public demo site whose associated DB isn't available. To implement the DB validation tests, I have created a local SQLite DB following a similar structure of the `users` table I would be using if I had access to the staging DB of the demo site. On this DB, I'm verifying that the actions produce the required change in the DB state, with each test performing its own seeding and reset.

**Zod schema validation:** Manual validation of `productsAPI` response schema only confirmed the field existence and did not perform further in-depth validations like field type. Also the validation logic was spread against multiple expect statements per test, with no single definition of a valid product. Using zod schema validation solved both issues, so now the schema defines the expected shape once in `utils/schemas.js` and validates field types effectively.

**Using `test.fail()` for genuine bug:** In UI's product search test for *'Check Keyboard Enter works on the search'*, there is a real user-facing defect so it's marked as `test.fail()` to document the correct expected behavior while reporting as an expected failure.