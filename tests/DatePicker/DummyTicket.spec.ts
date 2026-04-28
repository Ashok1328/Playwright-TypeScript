import { test } from "@playwright/test";

test("Dummy Ticket", async ({ page }) => {
  await page.goto(
    "https://www.dummyticket.com/dummy-ticket-for-visa-application/",
  );
});
  