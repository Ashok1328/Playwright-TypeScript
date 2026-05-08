import { test, expect, Page, Locator } from "@playwright/test";

test("Dummy Ticket", async ({ page }) => {
  await page.goto(
    "https://www.dummyticket.com/dummy-ticket-for-visa-application/",
  );

  // Select product
  await page.locator("#product_7441").check();

  // Passenger 1 details
  await page.locator("#travname").fill("Beastay");
  await page.locator("#travlastname").fill("Jethan");

  // Date of birth
  const dateInput: Locator = page.locator("#dob");
  await expect(dateInput).toBeVisible();
  await dateInput.click();

  await selectDate("2026", "July", "12", page);

  // Gender
  await page.locator("#sex_2").check();

  // Add passenger
  await page.locator("#addmorepax").check();

  // Handle Select2 dropdown (not native select)
  await page.locator("#select2-addpaxno-container").click();
  const input = page.locator("input.select2-search__field");
  await input.fill("add 1 more passenger");
  await input.press("Enter");

  // Passenger 2 details
  await page.locator("#travname2").fill("Batasey");
  await page.locator("#travlastname2").fill("Bhai");

  const travelDate: Locator = page.locator("#dob2");
  await expect(travelDate).toBeVisible();
  await travelDate.click();

  await selectDate("2025", "June", "12", page);

  // Passenger 2 gender
  await page.locator("#sex2_1").check();

  // Passenger type (Select2)
  await page.locator("#select2-paxtype2-container").click();

  const inputField = page.locator("input.select2-search__field");
  await inputField.fill("Child");
  await inputField.press("Enter");

  // Travel type
  await page.locator("#traveltype_2").check();

  // Cities
  await page.locator("#fromcity").fill("New Wales");
  await page.locator("#tocity").fill("South Wales");

  // select departure date
  // const departureDate: Locator = page.locator("#pdepdate");
  // await expect(departureDate).toBeVisible();
  // await departureDate.click();

  await page.getByRole("textbox", { name: "Departure date" }).click();

  await selectDate("2026", "July", "28", page);

  // select return date
  // const returnDate: Locator = page.locator("#preturndate");
  // await expect(returnDate).toBeVisible();
  // await returnDate.click();

  await page.getByRole("textbox", { name: "Return date" }).click();

  await selectDate("2027", "February", "10", page);

  // Add additional information

  await page
    .locator("#notes")
    .fill("Hello, its me the one testing this dummy ticket app!!");

  await page.locator("#select2-reasondummy-container").click();

  // Delivery Options - Purpose of ticket
  const deliveryInput: Locator = page.locator("input.select2-search__field");
  await deliveryInput.fill("Proof of return at airport");
  await deliveryInput.press("Enter");

  // Appointment/Submission Date
  // const appointmentDate: Locator = page.locator("#appoinmentdate");
  // await expect(appointmentDate).toBeVisible();
  // await appointmentDate.click();

  await page.getByRole("textbox", { name: "Departure date from home" }).click();

  await selectDate("2027", "August", "15", page);

  // Dummy ticket receive
  await page.locator("#deliverymethod_1").check();

  // Billing Name
  await page.locator("#billname").fill("YoungMinds");

  // Billing Phone
  await page.locator("#billing_phone").fill("987646545455");

  // Billing Email Address
  await page.locator("#billing_email").fill("young@gmail.com");

  // Country
  await page.locator("#select2-billing_country-container").click();

  const countryInput: Locator = page.locator("input.select2-search__field");
  await countryInput.fill("Netherlands");
  await countryInput.press("Enter");

  // Street Address
  await page.locator("#billing_address_1").fill("Ranipauwa 15");

  // Postal Code
  await page.locator("#billing_postcode").fill("44600");

  // Town/City details
  await page.locator("#billing_city").fill("Hilton");

  // Order with details
  const orderRows = page.locator("//tdody//tr");
  const count = await orderRows.count();

  for (let i = 0; i < count; i++) {
    const name = await orderRows
      .nth(i)
      .locator(".product-details")
      .textContent();
    const price = await orderRows
      .nth(i)
      .locator(".product-total")
      .textContent();

    console.log(name, price);
  }

  // CreditCard / Debit Card details
  const frame = page.frameLocator("iframe[title='Secure payment input frame']");

  await frame.locator("#payment-numberInput").fill("4242 4242 4242 4242");
  await frame.locator("#payment-expiryInput").fill("12 / 30");
  await frame.locator("#payment-cvcInput").fill("123");

  // Place Order
  await page.locator("#place_order").click();
});

//  Date selection for <select>-based month/year
async function selectDate(
  targetYear: string,
  targetMonth: string,
  targetDate: string,
  page: Page,
) {
  const frame = page.frameLocator("iframe");
  // Map month name → value (0-based index)
  const monthMap: Record<string, string> = {
    January: "0",
    February: "1",
    March: "2",
    April: "3",
    May: "4",
    June: "5",
    July: "6",
    August: "7",
    September: "8",
    October: "9",
    November: "10",
    December: "11",
  };

  // Select Year
  await page.locator(".ui-datepicker-year").selectOption({ value: targetYear });

  // Select Month
  await page
    .locator(".ui-datepicker-month")
    .selectOption({ value: monthMap[targetMonth] });

  // Select Date
  await page
    .locator(`.ui-datepicker-calendar td >> text=${targetDate}`)
    .click();
}
