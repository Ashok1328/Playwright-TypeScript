/* 

Locator = identifies the element on the page
DOM = Document Object Model is the API interface provided by the browser itself

page.getByRole() to locate by explicit and implicit accessibility attributes.
page.getByText() to locate by text content.
page.getByLabel() to locate a form control by associated label's text.
page.getByPlaceholder() to locate an input by placeholder.
page.getByAltText() to locate an element, usually image, by its text alternative.
page.getByTitle() to locate an element by its title attribute.
page.getByTestId() to locate an element based on its data-testid attribute (other attributes can be configured).

*/

import { Locator, test, expect } from "@playwright/test";

test("Verify Playwright Locators", async ({ page }) => {
  await page.goto("https://demo.nopcommerce.com/");

  // 1. page.getByAltText() - identifies images (and similar elements) based on the alt attribut.
  // Use this locatow when your element supports alt text such as img and area elements

  const logo: Locator = page.getByAltText("nopCommerce demo store");
  //logo.click();
  await expect(logo).toBeVisible();

  /* 2. page.getByText() - find an element by the text it contains. You can match by a substring, exact string,
  Locator by visible text
  Use this locator to find non interactive element like div, span, p, e.t.c.
  For interactive element like button, a, input, e.t.c. use role locator   */

  // const text: Locator = page.getByText("Login");
  // await expect(text).toBeVisible();

  await expect(page.getByText("Welcome to our store")).toBeVisible();

  /* 3. page.getByRole() - Locating by role (role is not an attribute)
  Role locators include button, checkboxes, headings, links, list, heading and tables and many more 
  and follow W3C specification for ARIA role */

  await page.getByRole("link", { name: "register" }).click();
  await expect(page.getByRole("heading", { name: "register" })).toBeVisible();

  /* 4. page.getByLabel() - Locate form control by label's text 
  When to use : Ideal for form field with visible labels */

  await page.getByLabel("First name:").fill("John");
  await page.getByLabel("Last name:").fill("Wick");
  await page.getByLabel("Email:").fill("test@gmail.com");

  /* 5. page.getByPalceholder() - Find elements with a given placeholder text
  Best for the input without a label but having a placeholder */

  await page.getByPlaceholder("Search store").fill("Apple MacBook Pro");

  /* 6. page.getByTestId() : Locate on element based on its data-testId (other attribute can be config)
  When to use: when text or role-based locators are unstable or not suitable */
});
