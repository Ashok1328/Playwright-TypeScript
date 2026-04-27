import {test} from "@playwright/test"

test("Booking.com Date Picker Test - Check-in and Check-out", async ({page})=>
{
  await page.goto("http://www.booking.com/");

  //---- Click on the date picker field to open calender -----------------

  await page.getByTestId("searchbox-dates-container").click();

  // ------ Check-in Date Selection -----------------------------------
  let checkinYear: string = "2026";
  let checkinMonth: string = "June"
  let checkinDate: string = "28"

  // --- Navigate through the calender to find the desired check-in month and year ----
  while(true)
  {
    const checkInMonthYear = await page.locator("//h3[contains(@id,'bui-calendar-month')]").nth(0).innerText();
    const currentMonth = checkInMonthYear.split(" ")[0];
    const currentYear = checkInMonthYear.split(" ")[1];

    if(currentMonth === checkinMonth && currentYear === checkinYear)
    {
      break;
    }
    else
    {
      await page.locator("//button[@aria-label='Next month']").click();
    }
  }

  // --- select the specific check-in data --------------------------
})