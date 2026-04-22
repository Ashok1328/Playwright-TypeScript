import { expect, Locator, test } from "@playwright/test";

test("Extract and compare process data from a dynamic web table", async ({
  page,
}) => {
  await page.goto("https://testautomationpractice.blogspot.com/");

  // Retrieve the CPU load value from the Chrome Process and compare it against the value displayed in the yellow label

  const table: Locator = page.locator("#taskTable tbody");
  await expect(table).toBeVisible();

  const rows: Locator = table.locator("tr");
  const rowCount = await rows.count();

  console.log("Number of rows: ", rowCount);
  expect(rowCount).toBe(4);

  let cpuLoad = "";

  for (let i = 0; i < rowCount; i++) {
    const row = rows.nth(i);

    const processName: string = await row.locator("td").nth(0).innerText();
    if (processName.trim() === "Chrome") {
      cpuLoad = await row.locator(`td:has-text("%")`).innerText();
      console.log("CPU Load of Chrome: ", cpuLoad);
      break;
    }
  }

  // get value from yellow label

  const yellowLabel = page.locator("//strong[@class='chrome-cpu']");
  const labelValue = await yellowLabel.innerText();
  console.log("Chrome CPU Load from yellow label: ", labelValue);

  // assertion
  expect(cpuLoad.trim()).toBe(labelValue.trim());

  // -------------------------------------------------------------------------//

  // Retrieve the Memory usage value from the firefox process and compare it against the values displayed in the blue label

  let memoryUsage = "";

  for (let i = 0; i < rowCount; i++) {
    const row = rows.nth(i);

    const processName: string = await row.locator("td").nth(0).innerText();
    if (processName.trim() === "Firefox") {
      memoryUsage = await row.locator(`td:has-text("MB")`).innerText();
      console.log("Memory usage of firefox: ", memoryUsage);
      break;
    }
  }

  //get value from the blue label

  const blueLabel = page.locator("//strong[@class='firefox-memory']");
  const label = await blueLabel.innerText();
  console.log("Firefox memory usage from blue label: ", label);
});

/* ---------------------------------------------------------------------- */

test.only("Read data and check checkbox across pagination", async ({
  page,
}) => {
  await page.goto("https://testautomationpractice.blogspot.com/");

  const pages = page.locator("#pagination li a");
  const pageCount = await pages.count();

  for (let i = 0; i < pageCount; i++) {
    console.log(`\n--- Page ${i + 1} ---`);

    // Navigate to page
    await pages.nth(i).click();

    // Wait for table to load
    const rows = page.locator("#productTable tbody tr");
    await rows.first().waitFor();

    const rowCount = await rows.count();

    for (let j = 0; j < rowCount; j++) {
      const row = rows.nth(j);

      const id = (await row.locator("td").nth(0).innerText()).trim();
      const name = (await row.locator("td").nth(1).innerText()).trim();
      const price = (await row.locator("td").nth(2).innerText()).trim();

      const checkbox = row.locator("input[type='checkbox']");
      const isChecked = await checkbox.isChecked();

      // Print before action
      console.log(
        `ID: ${id}, Name: ${name}, Price: ${price}, Checked: ${isChecked}`,
      );

      //  Check checkbox if not checked
      if (!isChecked) {
        await checkbox.check();
        console.log(`--> Checkbox checked for ID: ${id}`);
      }
    }
  }
});
