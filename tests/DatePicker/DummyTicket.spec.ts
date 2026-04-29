import { expect, Locator, Page, test } from "@playwright/test";

test("Dummy Ticket", async ({ page }) => {
  await page.goto(
    "https://www.dummyticket.com/dummy-ticket-for-visa-application/",
  );

  await page.locator("#product_7441").check();
  await page.locator("#travname").fill("Beastay");
  await page.locator("#travlastname").fill("Jethan");

  const dateINput: Locator = page.locator("#dob");
  expect(dateINput).toBeVisible();
  await dateINput.click();

  const year = "2026";
  const month = "July";
  const date = "12";

  selectDate(year, month, date, page, true);

  await page.waitForTimeout(3000);
});

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
    } else {
      if (isFuture) {
        await page.locator(".ui-datepicker-next").click();
      } else {
        await page.locator(".ui-datepicker-prev").click();
      }
    }

    const allDates = await page
      .locator(".ui-datepicker-calendar tbody td")
      .all();

    for (let dt of allDates) {
      const dateText = await dt.innerText();
      if (dateText === targetDate) {
        await dt.click();
        break;
      }
    }
  }
}
