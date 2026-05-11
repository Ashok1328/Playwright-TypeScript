import { expect, test } from "@playwright/test";

test("Authenticate PopUp", async ({ browser }) => {
  const context = await browser.newContext({
    httpCredentials: { username: "admin", password: "admin" },
  });
  const page = await context.newPage();

  // ----------- Appraoch 1 : directly pass login along with url  ----------------------
  await page.goto("http://admin:admin@the-internet.herokuapp.com/basic_auth");

  await page.waitForLoadState(); // wait for page load completely

  await expect(page.locator("text=Congratulations")).toBeVisible();

  await page.waitForTimeout(5000);

  // ---------- Approch 2 : pass the login with browser context -------------------------

  await page.goto("https://the-internet.herokuapp.com/basic_auth");

  await page.waitForLoadState();

  await expect(page.locator("text=Congratulations")).toBeVisible();

  await page.waitForTimeout(5000);
});
