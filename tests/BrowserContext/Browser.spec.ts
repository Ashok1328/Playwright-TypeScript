import { test, expect, chromium, firefox } from "@playwright/test";

// Browser ---> context ---> pages

// Browser --> chromium, firefox, webkit

// Contexts ---> we can have multiple contexts for multiple users/apps for the same browser
// provide a way to operate multiple independent browser session

// page ---> Tab, Window, PopUp

test("Browser Context Demo", async () => {
  const browser = await chromium.launch(); // create browser
  const context = await browser.newContext(); // create context

  // creating 2 pages
  const page1 = await context.newPage();
  const page2 = await context.newPage();
  console.log("No of pages created: ", context.pages().length);

  // opening different browser
  await page1.goto("https://playwright.dev/");
  await expect(page1).toHaveTitle(
    "Fast and reliable end-to-end testing for modern web apps | Playwright",
  );

  await page2.goto("https://www.selenium.dev/");
  await expect(page2).toHaveTitle("Selenium");
});
