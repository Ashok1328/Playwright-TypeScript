import { expect, test } from "@playwright/test";

test("Hard vs Soft Assertion", async ({ page }) => {
  await page.goto("https://demowebshop.tricentis.com/");

  // ------------   Hard Assertion --------------------------------------
  expect(page).toHaveTitle("Demo Web Shop");
  expect(page).toHaveURL("https://demowebshop.tricentis.com/");

  const logo = page.locator("img[alt='Tricentis Demo Web Shop']");
  await expect(logo).toBeVisible();

  // ------------------ Soft Assertion ---------------------------------
  await expect.soft(page).toHaveTitle("Demo Web Shop2");
  await expect.soft(page).toHaveURL("https://demowebshop.tricentis.com/");

  const logos = page.locator("img[alt='Tricentis Demo Web Shop']");
  await expect.soft(logos).toBeVisible();
});
