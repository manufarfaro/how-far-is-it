import { test, expect } from '@playwright/test';

const todayStr = new Date(2022, 0, 3).toISOString().split('T')[0];

test.describe('search spec', () => {
  test.beforeEach(async ({ page, baseURL }) => {
    await page.goto(baseURL!);
    await expect(page.getByTestId('search')).toBeVisible();
  });

  test('should display a toast error message when no cities are selected', async ({ page }) => {
    await page.getByTestId('search').click();
    await expect(page.locator('.chakra-toast')).toBeVisible();
    await expect(page.getByText('Invalid Form')).toBeVisible();
  });

  test('should show results page with processed data', async ({ page, baseURL }) => {
    await page.locator('#form-city-origin').click();
    await page.locator('#form-city-origin input[role="combobox"]').fill('Marse');
    await page.keyboard.press('Enter');

    await page.getByTestId('add-intermediate').click();
    await page.locator('#form-intermedate-city-0').click();
    await page.locator('#form-intermedate-city-0 input[role="combobox"]').fill('Toulouse');
    await page.keyboard.press('Enter');

    await page.locator('#form-city-origin').click();
    await page.locator('#form-city-origin input[role="combobox"]').fill('Nant');
    await page.keyboard.press('Enter');

    await page.locator('#form-city-destination').click();
    await page.locator('#form-city-destination input[role="combobox"]').fill('Pari');
    await page.keyboard.press('Enter');

    await page.getByTestId('travel-date').click();
    await page.getByTestId('travel-date').fill(todayStr);

    await page.getByTestId('passenger-qty').fill('');
    await page.getByTestId('passenger-qty').type('2');

    await page.getByTestId('search').click();

    await expect(page).toHaveURL(new RegExp(`${baseURL}/searchResult\\?origin=Nantes&destination=Paris&intermediateCities=Toulouse&passengerQty=2&date=${todayStr}`));
    await expect(page.getByTestId('city-origin')).toContainText('Nantes');
  });
});
