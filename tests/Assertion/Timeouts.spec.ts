/*
Timeouts are used in playwright to define how long the framework should wait before failing a test or assertion.
Playwright provides flexible options to manage timeout globally or locally
*/

import { expect, test } from "@playwright/test";

test("Timeouts", async ({ page }) => {
  test.setTimeout(50000); // 50 sec
  test.slow(); // 90 secs (default is 30 sec)

  await page.goto("https://demowebshop.tricentis.com/");

  //---- Assertion - auto wait works  -------------------------
  await expect(page).toHaveURL("https://demowebshop.tricentis.com/", {
    timeout: 10000,
  });
  await expect(page.locator("text=Welcome to our store")).toBeVisible({
    timeout: 10000,
  });

  // ----- Actions - auto wait works ----------------------
  await page.locator("#small-searchterms").fill("Laptop", { force: true }); // search box - force action
  await page.locator(".button-1.search-box-button").click({ force: true }); // clicking on search button - Force action
});
