/*
An iframe (short for inline frame) is an HTML element that allows you to embed another HTML document within the current document.
Iframes are commonly used to embed external content such as videos, maps, or other web pages (as seen here) into a web page without affecting the parent document
*/

import { Frame, test } from "@playwright/test";
import { url } from "node:inspector";

test("Frames demo", async ({ page }) => {
  await page.goto("https://ui.vision/demo/webtest/frames/");

  // total number of frames present on the page

  const frames = page.frames();
  console.log("No of frames: ", frames.length);

  // ----- Approach 1: using page.frame() -------------------------

  const frame = page.frame({
    url: "https://ui.vision/demo/webtest/frames/frame_1.html",
  });
  // await frame?.locator("[name='mytext1']").fill("Hello");
  if (frame) {
    await frame.locator("[name='mytext1']").fill("Hello");
    //await frame.fill("[name='mytext1']", "Hello")
  } else {
    console.log("Frame is not available");
  }
  await page.waitForTimeout(3000);

  // ----------------- Approach 2: using frame locator -------------------------

  const inputBox = page
    .frameLocator("[src='frame_1.html']")
    .locator("[name='mytext1']");
  inputBox.fill("John");
  await page.waitForTimeout(3000);
});

test("Inner/child frames demo", async ({ page }) => {
  await page.goto("https://ui.vision/demo/webtest/frames/");

  const frame3 = page.frame({
    url: "https://ui.vision/demo/webtest/frames/frame_3.html",
  });

  if (frame3) {
    // Fill text box inside parent frame
    await frame3.locator("[name='mytext3']").fill("Welcome Beast");

    // Get child iframes
    const childFrames = frame3.childFrames();

    console.log("Child frame inside the frame3: ", childFrames.length); // only 1 child from exist

    const childFrame = childFrames[0];

    // Check box
    await childFrame.getByLabel("I am a human").check();

    // Another CheckBox
    await childFrame.getByLabel("General Web Automation").check();

    //DrowDown
    await childFrame.locator("//div[@role='listbox']").click();
    await childFrame.locator("//span[text()='Yes']").click();
  } else {
    console.log("Frame3 is not found");
  }
  await page.waitForTimeout(3000);
});
