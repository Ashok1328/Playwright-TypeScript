import { expect, test } from "@playwright/test";

// fixture - global variable : page, browser

test("Verify page title", async({ page }) => {
  await page.goto("https://www.ebay.com/");

  let title: string = await page.title();
  console.log("Title: " + title);

  await expect(page).toHaveTitle(
    "Electronics, Cars, Fashion, Collectibles & More | eBay",
  );
});
 