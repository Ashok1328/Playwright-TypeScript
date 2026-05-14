import { expect, test } from "@playwright/test";
import fs from "fs";

// Reading data from json file
const jsonPath = "TestData/data.json";
const loginData: any = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));

// main test
test.describe("Login data driven test", async () => {
  for (const { email, password, validity } of loginData) {
    test(`Login test for ${email} and ${password}`, async ({ page }) => {
      await page.goto("https://demowebshop.tricentis.com/login");

      // Fill the login form
      await page.locator("#Email").fill(email);
      await page.locator("#Password").fill(password);
      await page.locator("input[value='Log in']").click();

      // check the validity of the form
      if (validity.toLowerCase() === "valid") {
        // Assert logout link is visible - indicating successful login
        const logoutLink = page.locator("a[href='/logout']");
        await expect(logoutLink).toBeVisible({ timeout: 5000 });
      } else {
        // Assert error message is visible
        const errorMessage = page.locator(".validation-summary-errors");
        await expect(errorMessage).toBeVisible({ timeout: 5000 });

        // Assert user is still on the page
        await expect(page).toHaveURL("https://demowebshop.tricentis.com/login");
      }
    });
  }
});
