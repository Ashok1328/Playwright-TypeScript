import { test, expect, Locator, Page } from "@playwright/test";

async function selectDate(
  targetYear: string,
  targetMonth: string,
  targetDate: string,
  page: Page,
  isFuture: boolean,
) {
  while (true) {
    const currentMonth = await page
      .locator(".ui-datepicker-month")
      .textContent();
    const currentYear = await page.locator(".ui-datepicker-year").textContent();

    if (currentMonth === targetMonth && currentYear === targetYear) {
      break;
    }

    if (isFuture) {
      await page.locator(".ui-datepicker-next").click(); // Future
    } else {
      await page.locator(".ui-datepicker-prev").click(); // Past
    }
  }

  const allDates = await page.locator(".ui-datepicker-calendar td").all();

  for (let dt of allDates) {
    const dateText = await dt.innerText();
    if (dateText === targetDate) {
      await dt.click();
      break;
    }
  }
}

test("jQuery Date Picker", async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com/");

  const dateInput: Locator = page.locator("#datepicker");
  expect(dateInput).toBeVisible();

  // ------ Approach 1: using fill method -------------------------------
  //dateInput.fill("04/25/2026");

  //------------ Approach 2: using date picker -------------------------

  await dateInput.click(); // opens the date picker

  // select the target date

  const year = "2024";
  const month = "June";
  const date = "28";

  selectDate(year, month, date, page, false);  // future-date = true         past-date = false

  const expectedDate = "06/28/2024"; // mm/dd/yyyy
  await expect(dateInput).toHaveValue(expectedDate);

  await page.waitForTimeout(3000);
});
