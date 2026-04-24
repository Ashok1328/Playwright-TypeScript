import { expect, Locator, test } from "@playwright/test";

test("Flight booking automation", async ({ page }) => {
  await page.goto("https://blazedemo.com/");

  // Select departure & destination
  await page.locator("[name='fromPort']").selectOption("Philadelphia");
  await page.locator("[name='toPort']").selectOption("London");

  await page.getByRole("button", { name: "Find Flights" }).click();

  // Wait for table
  const rows = page.locator("table tbody tr");
  await expect(rows.first()).toBeVisible();

  const rowCount = await rows.count();
  console.log("Row count:", rowCount);

  /*let totalPrice = 0;

  for (let i = 0; i < rowCount; i++) {
    const row = rows.nth(i);

    const cells = await row.locator("td").allInnerTexts();
    console.log(cells);

    const priceText = cells[5]; // e.g. "$472.56"
    const price = parseFloat(priceText.replace("$", ""));

    totalPrice += price;
  }

  console.log("Total Price:", totalPrice);  */

  // ------- get cheapest price -------------------

  let minPrice = Number.MAX_VALUE;
  let cheapestFlight = "";

  for (let i = 0; i < rowCount; i++) {
    const row = rows.nth(i);
    const cells = await row.locator("td").allInnerTexts();

    const price = parseFloat(cells[5].replace("$", ""));

    if (price < minPrice) {
      minPrice = price;
      cheapestFlight = cells.join(" | ");
    }
  }
  console.log("Cheapest Flight: ", cheapestFlight);

  await rows
    .filter({ hasText: minPrice.toString() })
    .locator("input[type='Submit']")
    .click();

  await page.waitForTimeout(3000);

  // ---------------------- Fill up the form ----------------------------

  await page.locator("#inputName").fill("Beast Khati");
  await page.locator("#address").fill("Stanford 12th Street Mid Bazzar");
  await page.locator("#city").fill("Hawkins");
  await page.locator("#state").fill("Chummary");
  await page.locator("#zipCode").fill("44600");
  await page.locator("#cardType").selectOption({ value: "visa" });
  await page.locator("#creditCardNumber").fill("1751542646411646");
  await page.locator("#creditCardMonth").fill("February");
  await page.locator("#creditCardYear").fill("July");
  await page.locator("#nameOnCard").fill("Beast Pasa");
  await page.locator("#rememberMe").check();
  await page.locator("//input[@type='submit']").click();

  await expect(
    page.locator(
      "//h1[normalize-space()='Thank you for your purchase today!']",
    ),
  ).toBeVisible();
});
