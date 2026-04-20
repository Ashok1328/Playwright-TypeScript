import { test, expect, Locator } from "@playwright/test";

test("Static web tables", async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com/");

  const table: Locator = page.locator("table[name='BookTable'] tbody");
  await expect(table).toBeVisible();

  // 1. --- count no.of rows in the table ----------------

  const rows: Locator = page.locator("table[name='BookTable'] tbody tr"); //returns all the row including header
  await expect(rows).toHaveCount(7); // approach 1

  const rowCount: number = await rows.count();
  console.log("Number of rows in a table: ", rowCount);
  expect(rowCount).toBe(7); // approach 2

  // 2. ----------- count no.of headers/column ----------------

  //const columns: Locator = page.locator("table[name='BookTable'] tbody tr th");

  const columns: Locator = rows.locator("th");
  await expect(columns).toHaveCount(4); // approach 1

  const columnCount: number = await columns.count();
  console.log("number of column/headers: ", columnCount);
  expect(columnCount).toBe(4); //approach 2

  // 3. ---------- Read all the data from 2nd row (index 2 means 3rd row includig header) -----

  const secondRowCells: Locator = rows.nth(2).locator("td");

  const secondRowTexts: string[] = await secondRowCells.allInnerTexts();
  console.log("2nd Row data: ", secondRowTexts); // ['Learn Java', 'Mukesh', 'Java', '500']

  await expect(secondRowCells).toHaveText([
    "Learn Java",
    "Mukesh",
    "Java",
    "500",
  ]); // assertion

  console.log("printing 2nd row data .......");

  for (let text of secondRowTexts) {
    console.log(text);
  }

  // 4. ----- Read all the data from the table(excluding header)

  console.log("Printing all Table Data .......");

  const allRowData = await rows.all(); // get all row locators // all() return array of locators

  console.log("BookName       Author    Subject   Price");

  for (let row of allRowData.slice(1)) {
    //slice(1) --> skip header row
    const cols = await row.locator("td").allInnerTexts();
    console.log(cols);
  }

  // 5. ------ Print book names where author is mukesh -------

  console.log("Book written by Mukesh......");

  const mukeshBooks: string[] = [];

  for (let row of allRowData.slice(1)) {
    // slice(1)  --> skip header
    const cells = await row.locator("td").allInnerTexts();
    const author = cells[1];
    const book = cells[0];

    if (author === "Mukesh") {
      console.log(`${author} \t ${book}`);
      mukeshBooks.push(book);
    }
  }

  expect(mukeshBooks).toHaveLength(2); //Assertion

  // 6. --- Calculate total price of all books --------------------

  let totalPrice: number = 0;

  for (let row of allRowData.slice(1)) {
    const cells = await row.locator("td").allInnerTexts();
    const price = cells[3];

    totalPrice = totalPrice + parseInt(price);
  }
  console.log("Total Price: ", totalPrice);
  expect(totalPrice).toBe(7100);
});
