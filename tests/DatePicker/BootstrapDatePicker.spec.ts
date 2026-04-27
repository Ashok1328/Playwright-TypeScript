import { expect, test } from "@playwright/test";

test("Booking.com Date Picker Test - Check-in and Check-out", async ({
  page,
}) => {
  await page.goto("http://www.booking.com/");

  //---- Click on the date picker field to open calender -----------------

  await page.getByTestId("searchbox-dates-container").click();

  // ------ Check-in Date Selection -----------------------------------
  let checkinYear: string = "2026";
  let checkinMonth: string = "June";
  let checkinDate: string = "20";

  // ----- Navigate through the calender to find the desired check-in month and year -------

  while (true) {
    const checkInMonthYear = await page
      .locator("//h3[contains(@id,'bui-calendar-month')]")
      .nth(0)
      .innerText();
    const currentMonth = checkInMonthYear.split(" ")[0];
    const currentYear = checkInMonthYear.split(" ")[1];

    if (currentMonth === checkinMonth && currentYear === checkinYear) {
      break;
    } else {
      await page.locator("//button[@aria-label='Next month']").click();
    }
  }

  // ----------- select the specific check-in data --------------------------

  let allDates = await page
    .locator("table.b8fcb0c66a tbody")
    .nth(0)
    .locator("td")
    .all();
  let checkInDateSelected = false;

  for (let date of allDates) {
    const dataText = await date.innerText();
    if (dataText === checkinDate) {
      await date.click();
      checkInDateSelected = true;
      break;
    }
  }

  // ---------- Assertion to confirm check-in date was selected --------------------------

  expect(checkInDateSelected).toBeTruthy();

  // ======================= Check-out date selection ======================================================

  let checkoutYear: string = "2026";
  let checkoutMonth: string = "July";
  let checkoutDate: string = "25";

  // --------- Navigate to the required check-out month and year --------------------

  while (true) {
    const checkoutMonthYear = await page
      .locator("//h3[contains(@id,'bui-calendar-month')]")
      .nth(1)
      .innerText();
    const currentMonth = checkoutMonthYear.split(" ")[0];
    const currentYear = checkoutMonthYear.split(" ")[1];

    if (currentMonth === checkoutMonth && currentYear === checkoutYear) {
      break;
    } else {
      await page.locator("//button[@aria-label='Next month']").click();
    }
  }

  // ---------- Select the specific check-out date ------------------

  allDates = await page
    .locator("table.b8fcb0c66a tbody")
    .nth(1)
    .locator("td")
    .all();
  let checkoutDateSelected = false;

  for (let date of allDates) {
    const dataText = await date.innerText();
    if (dataText === checkoutDate) {
      await date.click();
      checkoutDateSelected = true;
      break;
    }
  }

  // ----------- Assertion to confirm check-out date was selected -------------------

  expect(checkoutDateSelected).toBeTruthy();

  await page.waitForTimeout(5000); // just to visually observe the result during test run (optional)
});
