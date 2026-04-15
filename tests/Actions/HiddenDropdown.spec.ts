import { test, expect, Locator } from "@playwright/test";

test("Bootstrap Hidden Dropdown", async ({ page }) => {
  await page.goto(
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
  );

  // ------- Login steps ------------------------

  await expect(page.locator("input[name='username']")).toBeVisible();
  await page.locator("input[name='username']").fill("Admin");
  await expect(page.locator("input[name='password']")).toBeVisible();
  await page.locator("input[name='password']").fill("admin123");
  await expect(
    page.locator("//button[normalize-space()='Login']"),
  ).toBeEnabled();
  await page.getByRole("button", { name: "Login" }).click();

  // click on the PIM

  await page.getByText("PIM").click();

  // click on Job Title dropdown

  await page.locator("form i").nth(2).click();
  const options: Locator = page.locator("//div[@role='listbox']//span");
  await page.waitForTimeout(3000);
  const count: number = await options.count();
  console.log("Number of option in dropdown: ", count);

  // ----- print all the option ------------

  console.log("All the text content: ", await options.allTextContents());

  console.log("Printing all the option...");
  for (let i = 0; i < count; i++) {
    //console.log(await options.nth(i).innerText());
    console.log(await options.nth(i).innerText());
  }

  // ---- select/click on option

  for (let i = 0; i < count; i++) {
    const text = await options.nth(i).innerText();
    if (text === "Automation Tester") {
      await options.nth(i).click();
      break;
    }
  }

  await page.waitForTimeout(3000);
});
