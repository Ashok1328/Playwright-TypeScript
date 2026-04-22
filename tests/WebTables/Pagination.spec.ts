import { expect, Locator, test } from "@playwright/test";

test("Read data from all the table pages", async ({ page }) => {
  await page.goto(
    "https://datatables.net/examples/basic_init/zero_configuration.html",
  );

  let hasmorepages = true;

  while (hasmorepages) {
    const rows = await page.locator("#example tbody tr").all();
    for (let row of rows) {
      console.log(await row.innerText());
    }

    await page.waitForTimeout(3000);
    //"button[aria-label='Next']"
    //button[aria-label='Next']:hasText(">")
    //button[aria-label='Next']:nth-child(9)

    const nextButton: Locator = page.locator("button[aria-label='Next']");
    const isDisabled = await nextButton.getAttribute("class"); // dt-paging-button disabled next

    if (isDisabled?.includes("disabled")) {
      hasmorepages = false;
    } else {
      await nextButton.click();
    }
  }
});

test("Filter the rows and chech the row count", async ({ page }) => {
  await page.goto(
    "https://datatables.net/examples/basic_init/zero_configuration.html",
  );

  const dropDown: Locator = page.locator("#dt-length-0");
  await dropDown.selectOption({ label: "25" });

  await page.waitForTimeout(3000);

  // Appraoch 1
  const rows = await page.locator("#example tbody tr").all(); // if used all() then must specify .length
  expect(rows.length).toBe(25);

  // Approach 2
  const row2 = page.locator("#example tbody tr");
  expect(row2).toBe(25);
});

test("Search for specific data in the table", async ({ page }) => {
  await page.goto(
    "https://datatables.net/examples/basic_init/zero_configuration.html",
  );

  const searchBox: Locator = page.locator("#dt-search-0");
  await searchBox.fill("Paul Byrd");

  const rows = await page.locator("#example tbody tr").all();

  if (rows.length >= 1) {
    let matchFound = false;
    for (let row of rows) {
      const text = await row.innerText();
      if (text.includes("Paul Byrd")) {
        console.log("Record Exist - found");
        matchFound = true;
        break;
      }
    }
    expect(matchFound).toBeTruthy();
  } else {
    console.log("No rows found with search text");
  }
});
