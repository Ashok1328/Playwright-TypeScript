import { test, expect, Locator } from "@playwright/test";

test("Comparing Methods", async ({ page }) => {
  await page.goto("https://demowebshop.tricentis.com/");

  const products: Locator = page.locator(".product-title"); //6

  // 1. ---------- innerText() vs textContent() ---------------

  console.log(await products.nth(1).innerText()); // 14.1-inch Laptop -- will return actual test of the element, whatever is visible in the web page
  console.log(await products.nth(1).textContent()); // will return everything including space, breaks, hidden elements

  const count = await products.count();

  for (let i = 0; i < count; i++) {
    // const productName: string = await products.nth(i).innerText(); // Extracts plain text. Eliminate whitespaces and line breaks
    // console.log(productName);

    // const productName: string | null = await products.nth(i).textContent(); // Extracts text including hidden elements. Includes extra whitespaces, line breaks, etc.
    // console.log(productName);

    const productName: string | null = await products.nth(i).textContent(); // Extracts text including hidden elements. Includes extra whitespaces, line breaks, etc.
    console.log(productName?.trim());
  }

  // 2. ---- allInnerText() vs allTextContent() -----------------------

  console.log("**** Comparing allinnerText() vs allTextContent()  ***********");

  // const productNames: string[] = await products.allInnerTexts();
  // console.log("Product name captured by allInnerText(): ", productNames);

  const productNames: string[] = await products.allTextContents();
  console.log("Product name captured by allTextContent(): ", productNames);

  const productNamesTrimmed: string[] = productNames.map((text) => text.trim());
  console.log("Product Names after trimmed: ", productNamesTrimmed);

  // 3. -------- all() - convert Locator ----> Locator[]

  console.log("***** all() text *************** ");

  const productLocators: Locator[] = await products.all();
  console.log(productLocators);

  //console.log(await productLocators[i].innerText());

  // ------- for of loop -------------------

  console.log("******* for of loop  ************");

  for (let productloc of productLocators) {
    console.log(await productloc.innerText());
  }

  // for in loop

  console.log("******* for in loop ***********");

  for (let i in productLocators) {
    console.log(await productLocators[i].innerText());
  }
});
