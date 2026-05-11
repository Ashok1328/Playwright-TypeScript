// alert(), confirm(), prompt(), dialogs/JSalerts

// 1) By default, dialogs are auto-dismissed by Playwright, so you don't have to handle them
// 2) However, you can register a dialog handler before the action that triggers the dialog to either
// dialog.accept() or dialog.dissmiss() it.

import { expect, test } from "@playwright/test";

test("Simple Dialog", async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com/");

  page.on("dialog", (dialog) => {
    console.log("Dialog type: ", dialog.type()); // returns the type of dialog
    expect(dialog.type()).toContain("alert");

    console.log("Dialog type: ", dialog.message()); // returns message from dialog
    expect(dialog.message()).toContain("I am an alert box!");
    dialog.accept();
  });

  await page.locator("#alertBtn").click();

  await page.waitForTimeout(3000);
});

/* -------------------------------------------------------------------------------------------------------*/

test("Confirmation Dialog", async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com/");

  // Register a dialog handler

  page.on("dialog", (dialog) => {
    console.log("Dialog type is: ", dialog.type());
    expect(dialog.type()).toContain("confirm");

    console.log("Dialog text: ", dialog.message());
    expect(dialog.message()).toContain("Press a button!");

    // dialog.accept()        // close dialog by accepting
    dialog.dismiss(); // close dialog by dismissing
  });

  await page.locator("#confirmBtn").click(); // open confirmation dialog box

  const text: string = await page.locator("#demo").innerText();
  console.log("Output text: ", text);

  await expect(page.locator("#demo")).toHaveText("You pressed Cancel!");
  await page.waitForTimeout(3000);
});

/* ----------------------------------------------------------------------------------------------*/

test("Prompt Dialog", async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com/");

  // Register a dialog handler

  page.on("dialog", (dialog) => {
    console.log("Dialog type: ", dialog.type());
    expect(dialog.type()).toContain("prompt");

    console.log("Dialog text: ", dialog.message());
    expect(dialog.message()).toContain("Please enter your name:");
    expect(dialog.defaultValue()).toContain("Harry Potter"); // check default value of the dialog

    dialog.accept("Batasey"); // close dialog by accepting
  });

  await page.locator("#promptBtn").click(); // open prompt dialog

  const text: string = await page.locator("#demo").innerText();
  console.log("Output Text: ", text);
  await expect(page.locator("#demo")).toHaveText(
    "Hello Batasey! How are you today?",
  );
  await page.waitForTimeout(3000);
});
