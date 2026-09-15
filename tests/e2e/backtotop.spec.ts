import { expect, test } from '@playwright/test';
import {
  backToTopLabel,
  backToTopTarget,
} from '@/src/parts/backtotop/backtotop.data';
import { waitForHydration } from './hydration';

test.describe('Sprung nach oben', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('bleibt in der ersten Sektion verborgen', async ({ page }) => {
    const button = page.getByRole('link', { name: backToTopLabel });

    // The observer only attaches to the section after hydration.
    await waitForHydration(page);

    // `visibility: hidden` also takes the button out of the tab order.
    await expect(button).toBeHidden();
  });

  test('erscheint ab der zweiten Sektion', async ({ page }) => {
    const button = page.getByRole('link', { name: backToTopLabel });

    await page.locator('#cv').scrollIntoViewIfNeeded();

    await expect(button).toBeVisible();
  });

  test('springt zurueck zur ersten Sektion und verschwindet wieder', async ({
    page,
  }) => {
    const button = page.getByRole('link', { name: backToTopLabel });

    await page.locator('#contact').scrollIntoViewIfNeeded();
    await expect(button).toBeVisible();

    await button.click();

    await expect(page).toHaveURL(new RegExp(`#${backToTopTarget}$`));
    await expect(page.locator(`#${backToTopTarget}`)).toBeInViewport();
    // Once at the destination the button has nothing left to do.
    await expect(button).toBeHidden();
  });
});
