import { expect, test } from '@playwright/test';
import { readFileSync } from 'node:fs';
import {
  footerCopyright,
  footerDate,
  footerName,
  footerPlace,
} from '@/src/parts/footer/footer.data';

/** The one place the number is maintained - the spec reads it from there too. */
const { version } = JSON.parse(
  readFileSync(new URL('../../package.json', import.meta.url), 'utf8'),
) as { version: string };

test.describe('Seitenfuß', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('zeigt Ort, Datum und Name', async ({ page }) => {
    const footer = page.locator('.my-footer');

    await expect(footer).toContainText(footerPlace);
    await expect(footer.locator('time')).toHaveAttribute(
      'datetime',
      footerDate.iso,
    );
    await expect(footer.locator('time')).toHaveText(footerDate.label);
    await expect(footer.locator('.my-footer__name')).toHaveText(
      `${footerCopyright} ${footerName}`,
    );
  });

  test('zeigt die Version aus der package.json in der rechten Ecke', async ({
    page,
  }) => {
    const stamp = page.locator('.my-footer__version');

    await expect(stamp).toHaveText(version);
  });

  test('steht als letztes Element der Seite', async ({ page }) => {
    // Nothing visible stands behind the footer - the only thing allowed is
    // the RouteAnnouncer, a live region (an empty div before hydration).
    const nothingVisibleBehind = await page
      .locator('.my-footer')
      .evaluate((element) => {
        const siblings = [...(element.parentElement?.children ?? [])];

        return siblings
          .slice(siblings.indexOf(element) + 1)
          .every(
            (node) =>
              node.textContent?.trim() === ''
              || node.querySelector('[aria-live]') !== null,
          );
      });

    expect(nothingVisibleBehind).toBe(true);
    await expect(page.locator('.my-footer')).toHaveRole('contentinfo');

    // And it sits below the last section, not somewhere in between.
    const section = await page.locator('#github').boundingBox();
    const footer = await page.locator('.my-footer').boundingBox();

    expect(footer?.y).toBeGreaterThanOrEqual(
      (section?.y ?? 0) + (section?.height ?? 0),
    );
  });

  test('bleibt beim Druck außen vor', async ({ page }) => {
    // The CV alone gets printed - the footer does not belong on the sheet.
    await page.emulateMedia({ media: 'print' });

    await expect(page.locator('.my-footer')).toBeHidden();
    await expect(page.locator('#github')).toBeHidden();
  });
});
