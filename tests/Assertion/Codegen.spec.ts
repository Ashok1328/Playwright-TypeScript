import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://demoblaze.com/');
  await expect(page.getByRole('link', { name: 'PRODUCT STORE' })).toBeVisible();
  await page.getByRole('link', { name: 'Log in' }).click();
  await page.locator('#loginusername').click();
  await page.locator('#loginusername').fill('fakriti');
  await page.locator('#loginpassword').click();
  await page.locator('#loginpassword').fill('fakriti');
  await page.getByRole('button', { name: 'Log in' }).click();
  await expect(page.getByRole('link', { name: 'Log out' })).toBeVisible();
  await page.getByRole('link', { name: 'Log out' }).click();
});



// npx playwright codegen -o tests/Assertion/Codegen.spec.ts - automatically creates you a file
// npx playwright codegen -o tests/Assertion/Codeng.spec.ts --device "iPhone 15"  - switches to responive screen of iPhone 15
//npx playwright codegen -o tests/Assertion/Codeng.spec.ts --browser firefox  - for different browser 
// npx playwright codegen -o tests/Assertion/Codeng.spec.ts --viewport-size "1280,170"  -- screen size resolution
