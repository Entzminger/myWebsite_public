import { expect, test } from '@playwright/test';
import { brandName, naviItems } from '@/src/parts/navi/navi.data';
import { waitForHydration } from './hydration';

/** Fixed viewports, so both Playwright projects check the same thing. */
const desktop = { width: 1280, height: 800 };
const mobile = { width: 390, height: 800 };

// The privacy notice is a route of its own; the scrollspy tests below need a
// section that really is part of the page flow.
const sectionItems = naviItems.filter((item) => !item.route);
const lastItem = sectionItems[sectionItems.length - 1]!;

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('zeigt Logo, Wortmarke und alle Navigationspunkte', async ({ page }) => {
    const navi = page.locator('.my-navi');

    await expect(navi).toBeVisible();
    await expect(navi.locator('.my-logo')).toBeVisible();
    await expect(navi.locator('.my-navi__wordmark')).toContainText(brandName);
    await expect(navi.locator('.my-navi__dot')).toHaveText('.');

    const links = navi.locator('.my-navi__link');

    await expect(links).toHaveCount(naviItems.length);

    for (const [index, item] of naviItems.entries()) {
      await expect(links.nth(index)).toHaveText(item.label);
      await expect(links.nth(index)).toHaveAttribute('href', item.href);
    }
  });

  test('bleibt beim Scrollen sichtbar', async ({ page }) => {
    const navi = page.locator('.my-navi');
    const box = await navi.boundingBox();

    await page.mouse.wheel(0, 2000);
    await expect(navi).toBeVisible();

    // Sticky: the bar still clings to the top edge of the viewport.
    const scrolledBox = await navi.boundingBox();
    expect(scrolledBox?.y).toBeCloseTo(box?.y ?? 0, 0);
  });
});

test.describe('Navigation (Desktop)', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize(desktop);
    await page.goto('/');
  });

  test('zeigt die Punkte offen und ohne Burger', async ({ page }) => {
    await expect(page.locator('.my-navi__burger')).toBeHidden();
    await expect(page.locator('.my-navi__nav')).toBeVisible();
    await expect(page.locator('.my-navi__link').first()).toBeVisible();
  });

  test('markiert den Abschnitt, der gerade sichtbar ist', async ({ page }) => {
    const link = page.locator(`.my-navi__link[href="${lastItem.href}"]`);

    await link.click();

    await expect(link).toHaveAttribute('aria-current', 'true');
    await expect(link).toHaveClass(/my-navi__link--active/);
  });
});

test.describe('Navigation (Mobil)', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize(mobile);
    await page.goto('/');
    // The burger only responds once Vue has hydrated.
    await waitForHydration(page);
  });

  test('versteckt die Punkte hinter dem Burger', async ({ page }) => {
    const burger = page.locator('.my-navi__burger');

    await expect(burger).toBeVisible();
    await expect(burger).toHaveAttribute('aria-expanded', 'false');
    await expect(burger).toHaveAttribute('aria-controls', 'my-navi-menu');
    await expect(burger).toHaveAccessibleName('Menü öffnen');
    await expect(page.locator('.my-navi__nav')).toBeHidden();
  });

  test('klappt das Menü auf und wieder zu', async ({ page }) => {
    const burger = page.locator('.my-navi__burger');
    const nav = page.locator('.my-navi__nav');

    await burger.click();

    await expect(nav).toBeVisible();
    await expect(burger).toHaveAttribute('aria-expanded', 'true');
    await expect(burger).toHaveAccessibleName('Menü schließen');

    await burger.click();

    await expect(nav).toBeHidden();
    await expect(burger).toHaveAttribute('aria-expanded', 'false');
  });

  test('faltet die Balken zum X', async ({ page }) => {
    const bars = page.locator('.my-navi__bar');
    const transform = () =>
      bars.first().evaluate((element) => getComputedStyle(element).transform);
    const middleOpacity = () =>
      bars.nth(1).evaluate((element) => getComputedStyle(element).opacity);

    expect(await transform()).toBe('none');
    expect(await middleOpacity()).toBe('1');

    await page.locator('.my-navi__burger').click();

    // The upper bar turns into the diagonal, the middle one fades out.
    await expect
      .poll(transform)
      .toMatch(/^matrix\(0\.7071/);
    await expect.poll(middleOpacity).toBe('0');
  });

  test('schließt beim Klick auf einen Punkt', async ({ page }) => {
    const nav = page.locator('.my-navi__nav');
    const link = page.locator(`.my-navi__link[href="${lastItem.href}"]`);

    await page.locator('.my-navi__burger').click();
    await expect(nav).toBeVisible();

    await link.click();

    await expect(nav).toBeHidden();
    await expect(link).toHaveAttribute('aria-current', 'true');
  });

  test('schließt mit Escape und gibt den Fokus zurück', async ({ page }) => {
    const burger = page.locator('.my-navi__burger');
    const nav = page.locator('.my-navi__nav');

    await burger.click();
    await expect(nav).toBeVisible();

    await page.keyboard.press('Escape');

    await expect(nav).toBeHidden();
    await expect(burger).toBeFocused();
  });
});
