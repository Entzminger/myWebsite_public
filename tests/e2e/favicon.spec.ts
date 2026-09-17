import { expect, test } from '@playwright/test';

/** Icons linked in the <head> that have to be served for real. */
const icons = [
  { selector: 'link[rel="icon"][type="image/x-icon"]', href: '/favicon.ico', type: /icon/ },
  { selector: 'link[rel="icon"][type="image/svg+xml"]', href: '/favicon.svg', type: /image\/svg\+xml/ },
  { selector: 'link[rel="apple-touch-icon"]', href: '/apple-touch-icon.png', type: /image\/png/ },
];

test.describe('Favicon', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('nennt das .ico vor dem SVG', async ({ page }) => {
    // Google reads one favicon per host and does not support SVG, so the first
    // `rel="icon"` in the document has to be a format it knows - otherwise the
    // search result shows the grey placeholder. Browsers pick by `type`, not by
    // order, and are unaffected.
    const first = page.locator('link[rel="icon"]').first();

    await expect(first).toHaveAttribute('type', 'image/x-icon');
    await expect(first).toHaveAttribute('href', '/favicon.ico');
  });

  for (const icon of icons) {
    test(`verlinkt ${icon.href} im head`, async ({ page }) => {
      await expect(page.locator(icon.selector)).toHaveAttribute('href', icon.href);
    });

    test(`liefert ${icon.href} aus`, async ({ request }) => {
      const response = await request.get(icon.href);

      expect(response.status()).toBe(200);
      expect(response.headers()['content-type']).toMatch(icon.type);
      expect((await response.body()).byteLength).toBeGreaterThan(0);
    });
  }
});
