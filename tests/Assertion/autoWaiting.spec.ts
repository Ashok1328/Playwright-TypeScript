/* 
Playwright has a powerful feature called auto-waiting, which simplifies test automation by automatically 
waiting for the right condition before performing actions. 
*/

import { expect, test } from "@playwright/test";

test("Autowaiting and Forcing", async ({ page }) => {
  await page.goto("https://demowebshop.tricentis.com/");

  //---- Assertion - auto wait works  -------------------------
  await expect(page).toHaveURL("https://demowebshop.tricentis.com/");
  await expect(page.locator("text=Welcome to our store")).toBeVisible();

  // ----- Actions - auto wait works ----------------------
  await page.locator("#small-searchterms").fill("Laptop", { force: true }); // search box - force action
  await page.locator(".button-1.search-box-button").click({ force: true }); // clicking on search button - Force action
});
