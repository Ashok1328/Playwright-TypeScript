/* CSS (Cascading Style Sheets)

2 Types of CSS locator

1. absolute CSS locator
2. relative CSS locator

tag with id                  --  #id
tag with class               --  .class
tag with any other attribute --  tag[attribute=value] 
tag with class and attribute --  tag.class[attribute=value]

page.locator(xpath/css)
*/

import { test, expect, Locator } from "@playwright/test";

test("Verfiy CSS Locator", async ({ page }) => {
  await page.goto("https://demowebshop.tricentis.com/");

  // ---- tag#id --------------------------------

  const searchBox: Locator = page.locator("input#small-searchterms");
  await searchBox.fill("T-shirts");

  await expect(page.locator("input#small-searchterms")).toBeVisible();
  await page.locator("input#small-searchterms").fill("T-shirts");
  await page.locator("#small-searchterms").fill("T-shirts");

  // ----- tag.class ----------------------

  await page.locator("input.search-box-text").fill("T-shirts");
  await page.locator(".search-box-text").fill("T-shirts");

  // ----- attribute ----------------------

  await page.locator("input[name='q']").fill("T-shirts");
  await page.locator("[name='q']").fill("T-shirts");

  // ---- class-attribute ----------------

  await page
    .locator("input.search-box-text[value='Search store']")
    .fill("T-shirts");
});
