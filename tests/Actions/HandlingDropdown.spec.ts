import { test, expect, Locator } from "@playwright/test";

test("Select Single dropdown", async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com/");

  // 1. ------------ select option from the drop down (4 ways) ------------------

  await page.locator("#country").selectOption("India"); // visible text
  await page.locator("#country").selectOption({ value: "japan" }); // by using value attribute
  await page.locator("#country").selectOption({ label: "China" }); // by using label attribute

  await page.waitForTimeout(3000);

  // 2. ------------ check number of option in dropdown ---------------------

  const dropdownOptions: Locator = page.locator("#country>option");
  await expect(dropdownOptions).toHaveCount(10);

  await page.waitForTimeout(3000);

  // 3. -------- check an option present in the dropdown

  const optionText: string[] = (await dropdownOptions.allTextContents()).map(
    (text) => text.trim(),
  );
  console.log(optionText);

  await page.waitForTimeout(3000);

  // 4. ------- printing option from dropdown  -----------------

  for (const option of optionText) {
    console.log(option);
  }
});

/* --------------------------------------------------------------------------------- */

test("Multi Select DropDown", async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com/");

  await page.locator("#colors").selectOption(["Red", "Blue", "Green"]); // using visible text
  await page.locator("#colors").selectOption(["red", "green", "white"]); // using value attribute
  await page
    .locator("#colors")
    .selectOption([{ label: "Red" }, { label: "Green" }, { label: "Yellow" }]); // using label attribute

  // 2. ------ check number of options in the dropdown

  const drowDownOptions: Locator = page.locator("#colors>option");
  await expect(drowDownOptions).toHaveCount(7);

  // 3. ------ check an option present in the dropdown

  const optionText: string[] = (await drowDownOptions.allTextContents()).map(
    (text) => text.trim(),
  );
  console.log(optionText);

  expect(optionText).toContain("Green"); // check if array contains specific option in the dropdown

  // 4. --- printing option from the dropdown

  for (const option of optionText) {
    console.log(option);
  }
  await page.waitForTimeout(3000);
});

/* -----------------------------------------------------------------------  */

test("Verify dropdown is sorted", async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com/");

  const drowDownOptions: Locator = page.locator("#animals>option"); // sorted
  // const drowDownOptions: Locator = page.locator("#colors>option");   // not sorted

  console.log(await drowDownOptions.allTextContents());

  const optionText: string[] = (await drowDownOptions.allTextContents()).map(
    (text) => text.trim(),
  );
  const originalList: string[] = [...optionText];
  const sortedList: string[] = [...optionText].sort();

  console.log("Origin List: ", originalList);
  console.log("Sorted List: ", sortedList);

  expect(originalList).toEqual(sortedList);

  await page.waitForTimeout(3000);
});

/* -----------------------------------------------------------------------  */

test.only("Verify dropdown contains duplicate", async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com/");

  //const dropdownOptions: Locator = page.locator("#colors>option"); // having duplicate option
  const dropdownOptions: Locator = page.locator("#animals>option"); // not having duplicate option

  const optionText: string[] = (await dropdownOptions.allTextContents()).map(
    (text) => text.trim(),
  );

  const mySet = new Set<string>(); // Set - duplicated not allowed
  const duplicate: string[] = []; // array - duplicated allowed

  for (const text of optionText) {
    if (mySet.has(text)) {
      duplicate.push(text);
    } else {
      mySet.add(text);
    }
  }
  console.log("Duplicate options are: ", duplicate);

  if (duplicate.length > 0) 
  {
    console.log("Duplicates option found..", duplicate);
  } 
  else 
  {
    console.log("No duplicates option found..");
  }

  expect(duplicate.length).toBe(0);

  await page.waitForTimeout(3000);
});
