import { test, expect, Locator } from "@playwright/test";

test("XPath demo in playwright", async ({ page }) => {
  await page.goto("https://demowebshop.tricentis.com/");

  // --------- Absolute XPath -------------------------

  const absoluteLogo: Locator = page.locator(
    "//html[1]/body[1]/div[4]/div[1]/div[1]/div[1]/a[1]/img[1]",
  );
  await expect(absoluteLogo).toBeVisible();

  // --------  Relative XPath --------------------------

  const relativeLogo: Locator = page.locator(
    "//img[@alt='Tricentis Demo Web Shop']",
  );
  await expect(relativeLogo).toBeVisible();

  // ----- .contain --------------

  const product: Locator = page.locator("//h2/a[contains(@href,'computer')]");
  const productCount: number = await product.count();
  console.log("No of computer related prodcut: ", productCount);
  expect(productCount).toBeGreaterThan(0);

  // console.log(await product.textContent());     // strict mode violation

  console.log(
    "First computer related product: ",
    await product.first().textContent(),
  );
  console.log(
    "Last computer related product: ",
    await product.last().textContent(),
  );
  console.log(
    "Nth computer related product: ",
    await product.nth(2).textContent(),
  ); // Index starting from zero

  let productTitle: string[] = await product.allTextContents(); // getting all the matched product into an array
  console.log("All computer related product: ", productTitle);

  for (let pt of productTitle) {
    console.log(pt);
  }

  // ----------  start-with() --------------------

  const buildingProduct: Locator = page.locator(
    "//h2/a[starts-with(@href,'/build')]",
  ); // return multiple element

  const count: number = await buildingProduct.count();
  expect(count).toBeGreaterThan(0);

  // -------- text() ------------------
  const regLink: Locator = page.locator("//a[text()='Register']");
  expect(regLink).toBeVisible();
});
