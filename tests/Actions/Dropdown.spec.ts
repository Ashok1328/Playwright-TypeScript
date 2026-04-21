import { test, expect, Locator } from "@playwright/test";

test("Order by Dropdown", async ({ page }) => {
  await page.goto("https://bstackdemo.com/");

  // ---- select option from the dropdown  -----------------

  await page
    .locator("//div[@class='sort']//select")
    .selectOption({ value: "lowestprice" });

  const orderBy: Locator = page.locator("//div[@class='sort']//select");
  await expect(orderBy).toBeVisible();
  await expect(orderBy).toBeEnabled();

  await page.waitForTimeout(3000);
});

/* ---------------------------------------------------------------------------------- */

test("Retrieve and print product information", async ({ page }) => {
  await page.goto("https://bstackdemo.com/");

  // ------- retrieve the list of products price element ------------------

  const priceList: Locator = page.locator("//div[@class='val']/b");

  const priceOption: string[] = (await priceList.allTextContents()).map(
    (text) => text.trim(),
  );
  console.log("Prices: ", priceOption);

  // -------  retrieve all the list of prodcut name elements ---------

  const productList: Locator = page.locator("//p[@class='shelf-item__title']");

  const productName: string[] = (await productList.allTextContents()).map(
    (text) => text.trim(),
  );
  console.log("Products: ", productName);

  // -------- verify product name and price list are equal -------------------

  expect(productName.length).toBe(priceOption.length);

  // ------- print each name along with its corresonding price in the console ----------

  for (let i = 0; i < productName.length; i++) {
    console.log(`${productName[i]} --> ${priceOption[i]}`);
  }

  // ---- access the first element of the product list and the first element of the product name list

  console.log("First Product: ", priceOption[0]);
  console.log("First Price: ", productName[0]);

  await page.waitForTimeout(3000);
});

/* ---------------------------------------------------------------------------------------  */

test("Identify and print the lowest price product", async ({ page }) => {
  await page.goto("https://bstackdemo.com/");

  // sort low to high

  await page.locator(".sort select").selectOption("lowestprice");

  // get first product name

  const lowestProduct = await page
    .locator(".shelf-item__title")
    .first()
    .textContent();

  // get the first price

  const lowestPrice = await page.locator(".val > b").first().textContent();

  console.log(`Lowest Price product: ${lowestProduct?.trim()}`);
  console.log(`Price: ${lowestPrice?.trim()}`);
});

/* ------------------------------------------------------------------------------------ */

test("Identify and print the highest priced product", async ({ page }) => {
  await page.goto("https://bstackdemo.com/");

  await page.locator(".sort select").selectOption("highestprice");

  // ------  access the first element of the product price list and the first element of the product --
  const lastProductLocator: Locator = page.locator(".shelf-item__title").last();
  await expect(lastProductLocator).toBeVisible();

  const lastProduct = await lastProductLocator.textContent();
  const lastPrice = await page.locator(".val > b").last().textContent();

  console.log(`${lastProduct?.trim()} --> ${lastPrice?.trim()}`);

  await page.waitForTimeout(3000);

  // ------ print the highest price product name and its price in the console -------

  const highestProduct: Locator = page.locator(".shelf-item__title").first();
  const highestPrice: Locator = page.locator(".val > b").first();

  console.log(await highestProduct.textContent());
  console.log(await highestPrice.textContent());

  await page.waitForTimeout(3000);
});

/* --------------------------------------------------------------------------------- */

test("Verify highest price is greater than lowest price", async ({ page }) => {
  await page.goto("https://bstackdemo.com/");

  // ------------ sort ascending ------------
  await page.locator(".sort select").selectOption("lowestprice");

  await page.waitForTimeout(3000); // wait for sorting

  const priceLocator: Locator = page.locator(".val >b");

  const lowestPriceText = await priceLocator.first().textContent();
  const highestPriceText = await priceLocator.last().textContent();

  // convert "$399.9" -> 390
  const lowestPrice = Number(lowestPriceText?.replace("$", "").trim());
  const highestPrice = Number(highestPriceText?.replace("$", "").trim());

  console.log("Lowest: ", lowestPrice);
  console.log("Highest: ", highestPrice);

  expect(highestPrice).toBeGreaterThanOrEqual(lowestPrice);
});

/* -------------------------------------------------------------------------------  */

test("Find lowest and highest product without UI sorting", async ({ page }) => {
  await page.goto("https://bstackdemo.com/");

  const productNames = await page
    .locator(".shelf-item__title")
    .allTextContents();

  const priceText = await page.locator(".val > b").allTextContents();

  const prices = priceText.map((price) =>
    Number(price.replace("$", "").trim()),
  );

  const lowestPrice = Math.min(...prices);
  const highestPrice = Math.max(...prices);

  const lowestIndex = prices.indexOf(lowestPrice);
  const highestIndex = prices.indexOf(highestPrice);

  console.log(
    `Lowest Product: ${productNames[lowestIndex].trim()} --> $${lowestPrice}`,
  );
  console.log(
    `Highest Product: ${productNames[highestIndex].trim()} --> $${highestPrice}`,
  );
});
