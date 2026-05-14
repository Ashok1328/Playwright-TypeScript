/* 
  Pre-requisite:
  Install the xlsx-parse module to read xlsx files:
  npm install xlsx
*/

import { expect, test } from "@playwright/test";
import * as XLSX from "xlsx";
import fs from "fs";

// Load excel file
// file --> workbook --> sheets --> row & columns

const excelPath = "TestData/data.xlsx";
const workBook = XLSX.readFile(excelPath);
const sheetName = workBook.SheetNames[0];
const workSheet = workBook.Sheets[sheetName];

// convert sheet into json
const loginData: any = XLSX.utils.sheet_to_json(workSheet);
console.log(loginData);

test.describe("Login data driven test", () => {
  for (const { email, password, validity } of loginData) {
    test(`Login test with email: "${email}" and password: "${password}" `, async ({
      page,
    }) => {
      await page.goto("https://demowebshop.tricentis.com/login");

      // Fill login form
      await page.locator("#Email").fill(email);
      await page.locator("#Password").fill(password);

      // Click login
      await page.locator("input[value='Log in']").click();

      // Validation
      if (validity.toLowerCase() === "valid") {
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
