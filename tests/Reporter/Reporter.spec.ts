import { expect, test } from "@playwright/test";

test.beforeEach("Launching App", async ({ page }) => {
  await page.goto("https://demowebshop.tricentis.com/");
});

test("Logo Test", async ({ page }) => {
  await expect(
    page.locator("img[alt='Tricentis Demo Web Shop']"),
  ).toBeVisible();
});

test("Title Test", async ({ page }) => {
  expect(await page.title()).toContain("Demo Web Shop");
});

test("Search Test", async ({ page }) => {
  await page.locator("#small-searchterms").fill("laptop"); // fill the text in the search box
  await page.locator("input[value='Search']").click(); // click on the search button
  await expect
    .soft(page.locator("h2 a").nth(0))
    .toContainText("laptop", { ignoreCase: true });
});
