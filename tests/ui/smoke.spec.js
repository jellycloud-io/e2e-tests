const { expect, test } = require('@playwright/test');

test.describe('UI smoke tests', () => {
 test.skip(!process.env.UI_BASE_URL, 'Set UI_BASE_URL to run UI smoke tests');

 test('UI is available and its ready element is visible', async ({ page }) => {
   const response = await page.goto('/');
   expect(response).not.toBeNull();
   expect(response.status()).toBeLessThan(400);
   await expect(page.locator(process.env.UI_READY_SELECTOR || 'body')).toBeVisible();
 });
});
