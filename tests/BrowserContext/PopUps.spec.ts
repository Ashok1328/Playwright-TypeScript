import { chromium, test } from "@playwright/test";

test("Handle PopUps", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://testautomationpractice.blogspot.com/");

  // Multiple PopUps

  // page.waitForEvent("popup");
  // await page.locator("#PopUp").click();

  await Promise.all([
    page.waitForEvent("popup"),
    await page.locator("#PopUp").click(),
  ]);

  const allPopupWindows = context.pages();
  console.log("Number of pages/windoes: ", allPopupWindows.length);

  console.log(allPopupWindows[0].url()); // returns url of main page
  console.log(allPopupWindows[1].url());
  console.log(allPopupWindows[2].url());

  for (const pw of allPopupWindows) {
    const title = await pw.title();
    if (title.includes("Playwright")) {
      await pw.locator(".getStarted_Sjon").click();
      await page.waitForTimeout(5000);

      // perform any other actions
      await pw.close(); // This will close playwright popup window
    }
  }
  await page.waitForTimeout(5000);
});
