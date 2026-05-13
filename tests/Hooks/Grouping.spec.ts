import { test } from "@playwright/test";

test.describe("Group1", async () => {
  test("Test 1", async () => {
    console.log("this is test 1 ....");
  });

  test("Test 2", async () => {
    console.log("this is test 2 ....");
  });
});

test.describe("Group2", async () => {
  test("Test 3", async () => {
    console.log("this is test 3 ....");
  });

  test("Test 4", async () => {
    console.log("this is test 4 ....");
  });
});
