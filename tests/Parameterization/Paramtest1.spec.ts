import { expect, test } from "@playwright/test";

// test data
const searchItems: string[] = ["laptop", "Gift card", "smartphone", "computer"];

// ------------------ using for-of loop -----------------------------------------------------------------

for (const item of searchItems) {
  test(`search test for ${item}`, async ({ page }) => {
    await page.goto("https://demowebshop.tricentis.com/");

    await page.locator("#small-searchterms").fill(item); // fill the text in the search box
    await page.locator("input[value='Search']").click(); // click the search button
    await expect
      .soft(page.locator("h2 a").nth(0))
      .toContainText(item, { ignoreCase: true });
  });
}

// ----------------------- using forEach function -------------------------------------------------------

searchItems.forEach((item) => {
  test(`search test for ${item}`, async ({ page }) => {
    await page.goto("https://demowebshop.tricentis.com/");

    await page.locator("#small-searchterms").fill(item); // fill the text in the search box
    await page.locator("input[value='Search']").click(); // click the search button
    await expect
      .soft(page.locator("h2 a").nth(0))
      .toContainText(item, { ignoreCase: true });
  });
});

// ------------- using describe block ----------------------------------------------------------

test.describe("searching items", async () => {
  searchItems.forEach((item) => {
    test(`search test for ${item}`, async ({ page }) => {
      await page.goto("https://demowebshop.tricentis.com/");

      await page.locator("#small-searchterms").fill(item); // fill the text in the search box
      await page.locator("input[value='Search']").click(); // click the search button
      await expect
        .soft(page.locator("h2 a").nth(0))
        .toContainText(item, { ignoreCase: true });
    });
  });
});
