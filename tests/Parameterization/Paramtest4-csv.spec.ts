/* 
  Pre-requisite:
  Install the csv-parse module to read csv files:
  npm install csv-parse
*/

import { expect, test } from "@playwright/test";
import { parse } from "csv-parse/sync";
import fs from "fs";

// Read CSV file
const csvPath = "TestData/data.csv";
const fileContent = fs.readFileSync(csvPath, "utf-8");

// Parse CSV data
const records = parse(fileContent, {
  columns: true,
  skip_empty_lines: true,
});

test.describe("Login data driven test", () => {
  for (const data of records) {
    test(`Login test with email: "${data.email}" and password: "${data.password}" `, async ({
      page,
    }) => {
      await page.goto("https://demowebshop.tricentis.com/login");

      // Fill login form
      await page.locator("#Email").fill(data.email);
      await page.locator("#Password").fill(data.password);

      // Click login
      await page.locator("input[value='Log in']").click();

      // Validation
      if (data.validity?.trim().toLowerCase() === "valid") {
        // Successful login
        const logoutLink = page.locator("a[href='/logout']");

        await expect(logoutLink).toBeVisible({ timeout: 5000 });
      } else {
        // Invalid login
        const errorMessage = page.locator(".validation-summary-errors");

        await expect(errorMessage).toBeVisible({ timeout: 5000 });

        await expect(page).toHaveURL("https://demowebshop.tricentis.com/login");
      }
    });
  }
});
