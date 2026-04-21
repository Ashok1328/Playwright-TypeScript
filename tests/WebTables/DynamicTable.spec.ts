import { test, expect, Locator } from "@playwright/test";

test("Verify Chrome CPU load in dynamic table", async ({ page }) => {
  await page.goto("https://practice.expandtesting.com/dynamic-table");

  const table: Locator = page.locator("table.table tbody");
  await expect(table).toBeVisible();

  // Select all the rows, then find the number of rows

  const rows: Locator[] = await table.locator("tr").all();
  console.log("Number of rows in a table: ", rows.length);
  expect(rows).toHaveLength(4);

  // Step1: --- For the chrome process get value of CPU load -----------
  // Read each row to check chrome presence

  let cpuLoad = "";

  for (const row of rows) {
    const processName: string = await row.locator("td").nth(0).innerText();
    if (processName === "Chrome") {
      cpuLoad = await row.locator(`td:has-text("%")`).innerText();
      console.log("CPU Load of Chrome: ", cpuLoad);
      break;
    }
  }

  // Step2 : ------  Compare it with value in the yellow label ------------------

  let yellowBoxText: string = await page.locator("#chrome-cpu").innerText();
  console.log("Chrome CPU Load from yellow box: ", yellowBoxText);

  if (yellowBoxText.includes(cpuLoad)) {
    console.log("CPU load of Chome is equal");
  } else {
    console.log("CPU load of Chome is not equal");
  }

  expect(yellowBoxText).toContain(cpuLoad);

  await page.waitForTimeout(5000);
});
