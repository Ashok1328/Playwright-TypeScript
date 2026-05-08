import { Page } from "@playwright/test";

export async function selectDate(
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
    } else {
      if (isFuture) {
        await page.locator(".ui-datepicker-next").click();
      } else {
        await page.locator(".ui-datepicker-prev").click();
      }
    }
  }

  const allDates = await page.locator(".ui-datepicker-calendar tbody td").all();

  for (let dt of allDates) {
    const dateText = await dt.innerText();
    if (dateText === targetDate) {
      await dt.click();
      break;
    }
  }
}
