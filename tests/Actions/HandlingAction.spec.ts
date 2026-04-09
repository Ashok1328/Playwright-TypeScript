import { test, expect, Locator } from "@playwright/test";

/* Text Input, Text Box, Input Box, Radio Buttons */

test("Text Input Action", async ({ page }) => {
  await page.goto("https://demowebshop.tricentis.com/register");
  const textBox: Locator = page.locator("#FirstName");
  await expect(textBox).toBeVisible();
  await expect(textBox).toBeEnabled();

  const maxlength: string | null = await textBox.getAttribute("maxlength"); // returns value of maxlenght attribute of the element
  //expect(maxlength).toBe("15");

  await textBox.fill("Beast Bhai");

  const enteredValue: string = await textBox.inputValue();
  console.log("Text content of firstName: ", await textBox.textContent()); // return empty
  console.log("Input value of the firstName: ", await textBox.inputValue()); // returns the input value of text box
  expect(enteredValue).toBe("Beast Bhai");

  await page.waitForTimeout(3000);
});
// --------  Radio Buttons ------------------------

test("Radio Button Action", async ({ page }) => {
  await page.goto("https://demowebshop.tricentis.com/register");

  const maleRadio: Locator = page.locator("#gender-male"); // male radio button

  await expect(maleRadio).toBeVisible();
  await expect(maleRadio).toBeEnabled();
  expect(await maleRadio.isChecked()).toBe(false);

  await maleRadio.check(); // select radio button
  expect(await maleRadio.isChecked()).toBe(true);
  await expect(maleRadio).toBeChecked(); // Preferrable

  await page.waitForTimeout(3000);
});

test.only("CheckBox Actions", async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com/");

  // 1. Select specific checkbox using getByLabel and assert --------------------------
  const sundayCheckBox: Locator = page.getByLabel("Sunday");
  await sundayCheckBox.check();
  await expect(sundayCheckBox).toBeChecked();

  // 2. Select all checkbox and assert each is checked ----------------------------------

  const days: string[] = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const checkBoxes: Locator[] = days.map((index) => page.getByLabel(index));
  expect(checkBoxes.length).toBe(7);

  // ------------ for of ----------------

  for (const checkbox of checkBoxes) {
    await checkbox.check();
    await expect(checkbox).toBeChecked();
  }

  await page.waitForTimeout(2000);

  // ---- Uncheck last three checkbox -----------------------------------------

  for (const checkbox of checkBoxes.slice(-3)) {
    await checkbox.uncheck();
    await expect(checkbox).not.toBeChecked();
  }

  await page.waitForTimeout(3000);
  // -- Toggle checkoxes: if checked then uncheck if unchecked then check ---------------------

  for (const checkbox of checkBoxes) {
    // --- only if check
    if (await checkbox.isChecked()) {
      await checkbox.uncheck();
      await expect(checkbox).not.toBeChecked();
    } else {
      // --- only if uncheck
      await checkbox.check();
      await expect(checkbox).toBeChecked();
    }
  }
  await page.waitForTimeout(5000);

  // --- randomly select check box by index [1, 3, 6] and assert -------------------------

  const indexes: number[] = [1, 3, 6];

  for (const i of indexes) {
    await checkBoxes[i].check();
    await expect(checkBoxes[i]).toBeChecked();
  }

  // --- select checkbox based on the label -------------------------------

  const weekName: string = "Friday";
  for (const label of days) {
    if (label.toLowerCase() === weekName.toLowerCase()) {
      const checkbox = page.getByLabel(label);
      await checkbox.check();
      await expect(checkbox).toBeChecked();
    }
  }

  await page.waitForTimeout(3000);
});
