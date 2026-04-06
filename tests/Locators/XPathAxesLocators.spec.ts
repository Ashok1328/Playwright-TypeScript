import { test, expect, Locator } from "@playwright/test";

test("XPath Axes Demo", async ({ page }) => {
  await page.goto("https://www.w3schools.com/html/html_tables.asp");

  // 1. Self axis--- select the td element that contains "Germany"

  const germanyCell: Locator = page.locator("//td[text()='Germany']/self::td");
  await expect(germanyCell).toHaveText("Germany");

  // 2. Parent axis ---  Get parent <tr> of the germany cell

  const parentRow: Locator = page.locator("//td[text()='Germany']/parent::tr");
  await expect(parentRow).toContainText("Maria Anders");

  // 3. Child axis -- Get all <td/> children of the second <tr/> in the table

  const secondRowCell: Locator = page.locator(
    "//table[@id='customers']//tr[2]/child::td",
  );
  await expect(secondRowCell).toHaveCount(3);

  // 4. Ancestor axix --- Get ancestor <table/> of the "Germany" cell

  const table: Locator = page.locator("//td[text()='Germany']/ancestor::table");
  await expect(table).toHaveAttribute("id", "customers");

  // 5. preceding-axis -- Get the <td/> just before Germany

  const precedingCell: Locator = page.locator(
    "//td[text()='Germany']/preceding-sibling::td[1]",
  );
  await expect(precedingCell).toHaveText("Maria Anders");

  // 6. preceding-sibling-axis -- Get <td/> to the left of Germany

  const leftSibling: Locator = page.locator(
    "//td[text()='Germany']/preceding-sibling::td",
  );
  await expect(leftSibling).toHaveCount(2);
  expect(leftSibling.nth(0)).toHaveText("Alfreds Futterkiste");
  expect(leftSibling.nth(1)).toHaveText("Maria Anders");
});
