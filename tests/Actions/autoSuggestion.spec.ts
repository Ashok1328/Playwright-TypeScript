import { test, expect, Locator } from "@playwright/test";

test("Auto-Suggest Dropdown", async ({ page }) => {
  await page.goto("https://www.flipkart.com/");

  await page.locator("input[name='q']").first().pressSequentially("smart"); // press Sequentially is used if it is not able to capture the suggested items properly

  await page.waitForTimeout(5000);

  // get all the suggested options --> Ctrl + Shift + P on DOM --> emulate focused page

  const options: Locator = page.locator("ul>li");

  const count = await options.count();
  console.log("Number of suggested option: ", count);

  // ----- printing all the sugeested options in the console -----------

  console.log("5 th options: ", await options.nth(5).innerText());

  console.log("Printing all the auto suggestion....");

  for (let i = 0; i < count; i++) {
    console.log(await options.nth(i).innerText());
  }

  await page.waitForTimeout(3000);
  // ------ select/click on the smartphone option

  for (let i = 0; i < count; i++) {
    const text = await options.nth(i).innerText();
    if (text === "smartphone") {
      options.nth(i).click();
      break;
    }
  }
  await page.waitForTimeout(3000);
});
