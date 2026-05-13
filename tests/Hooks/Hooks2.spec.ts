/* 
Open App

Login 
  find products
Logout

Login
  add product to cart
Logout

close app

*/

import { expect, Page, test } from "@playwright/test";

let page: Page;

test.beforeAll("Open App", async ({ browser }) => {
  page = await browser.newPage();

  await page.goto("https://demoblaze.com/");
});

test.afterAll("Close App", async () => {
  await page.close();
});

test.beforeEach("Login", async () => {
  await page.locator("#login2").click();
  await page.locator("#loginusername").fill("fakriti");
  await page.locator("#loginpassword").fill("fakriti");
  await page.locator("button[onclick='logIn()']").click();
  await page.waitForTimeout(5000);
});

test.afterEach("Logout", async () => {
  await page.locator("#logout2").click();
});

test.describe("Grouping", async () => {
  test("Find No Of Products", async () => {
    const products = page.locator("#tbodyid .hrefch");
    const count = await products.count();
    console.log("Number of products: ", count);
    await expect(products).toHaveCount(9);
  });

  test("Add Product To Cart", async () => {
    await page.locator("text='Samsung galaxy s7'").click();

    // Handle alerts before the click
    page.on("dialog", async (dialog) => {
      expect(dialog.message).toContain("Product added.");
      await dialog.accept();
    });
    await page.locator(".btn.btn-success.btn-lg").click();
  });
});
