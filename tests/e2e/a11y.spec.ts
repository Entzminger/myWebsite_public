import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';
import { privacyPath, startPath } from '@/src/parts/navi/navi.data';
import { waitForHydration } from './hydration';

/**
 * Automated WCAG 2.1 AA check over everything the visitor gets to see: the
 * sections of the start page, the bar above them, and the privacy notice on
 * its own route - there as a whole document, so frame and content are scanned
 * together.
 */
const sections = [
  { name: 'Presenter', selector: '#profile' },
  { name: 'Resume', selector: '#cv' },
  { name: 'Stiftung', selector: '#voluntary' },
  { name: 'GitHub', selector: '#github' },
  { name: 'Kontakt', selector: '#contact' },
  { name: 'Impressum', selector: '#imprint' },
];

/**
 * One scan, reduced to what a failure should print. Without a selector the
 * whole document is checked, navigation and footer included.
 */
const violationsOf = async (page: Page, selector?: string) => {
  const builder = new AxeBuilder({ page }).withTags([
    'wcag2a',
    'wcag2aa',
    'wcag21a',
    'wcag21aa',
  ]);

  if (selector) {
    builder.include(selector);
  }

  const results = await builder.analyze();

  return results.violations.map((violation) => ({
    id: violation.id,
    nodes: violation.nodes.map((node) => node.html),
  }));
};

/**
 * The heading levels of `scope` in document order. An empty scope takes the
 * whole page.
 */
const headingLevels = (page: Page, scope = '') =>
  page
    .locator(`${scope}:is(h1, h2, h3, h4, h5, h6)`)
    .evaluateAll((elements) =>
      elements.map((element) => Number(element.tagName.slice(1))),
    );

/** No level may skip one on its way down. */
const expectGapless = (levels: number[]) => {
  for (const [index, level] of levels.entries()) {
    if (index === 0) {
      continue;
    }

    expect(level - levels[index - 1]!).toBeLessThanOrEqual(1);
  }
};

test.describe('Barrierefreiheit', () => {
  for (const section of sections) {
    test(`${section.name}-Sektion hat keine WCAG-2.1-AA-Verstöße`, async ({
      page,
    }) => {
      await page.goto('/');
      await expect(page.locator(section.selector)).toBeVisible();

      expect(await violationsOf(page, section.selector)).toEqual([]);
    });
  }

  test('Navigation hat keine WCAG-2.1-AA-Verstöße', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.my-navi')).toBeVisible();

    expect(await violationsOf(page, '.my-navi')).toEqual([]);
  });

  test('Navigation hat auch mit offenem Menü keine Verstöße', async ({
    page,
    isMobile,
  }) => {
    // Above the medium breakpoint there is no burger; the list stands open
    // anyway and the test above already covers it.
    test.skip(!isMobile, 'Das Menü hinter dem Burger gibt es nur mobil.');

    await page.goto('/');
    await waitForHydration(page);
    await page.locator('.my-navi__burger').click();
    await expect(page.locator('.my-navi__nav')).toBeVisible();

    expect(await violationsOf(page, '.my-navi')).toEqual([]);
  });

  test('Datenschutz-Route hat keine WCAG-2.1-AA-Verstöße', async ({ page }) => {
    await page.goto(privacyPath);
    await expect(page.locator('#privacy')).toBeVisible();

    // No `include` here: on its own route the notice is the whole document,
    // so the bar above it and the footer below belong to the scan.
    expect(await violationsOf(page)).toEqual([]);
  });

  test('hat auf jeder Route genau eine main-Landmark', async ({ page }) => {
    // Without one, everything on the page counts as unstructured content: a
    // screen reader has nothing to jump to, and Lighthouse says so too. It
    // wraps `<NuxtPage>` in `app.vue`, so each route brings exactly one.
    for (const path of [startPath, privacyPath]) {
      await page.goto(path);

      await expect(page.locator('main')).toHaveCount(1);
      await expect(page.getByRole('main')).toBeVisible();
    }
  });

  test('legt den Inhalt in die main-Landmark, den Rahmen daneben', async ({
    page,
  }) => {
    await page.goto(startPath);

    // The sections are the content; bar and signature line are the frame and
    // have landmarks of their own.
    for (const section of sections) {
      await expect(page.locator(`main ${section.selector}`)).toHaveCount(1);
    }

    await expect(page.locator('main .my-navi')).toHaveCount(0);
    await expect(page.locator('main .my-footer')).toHaveCount(0);
  });

  test('hat genau eine h1, und die steht am Anfang der Seite', async ({
    page,
  }) => {
    await page.goto('/');

    const levels = await headingLevels(page);

    expect(levels.filter((level) => level === 1)).toHaveLength(1);
    expect(levels[0]).toBe(1);
  });

  test('Überschriften sind lückenlos verschachtelt', async ({ page }) => {
    await page.goto('/');

    const levels = await headingLevels(page, '#cv ');

    expect(levels.length).toBeGreaterThan(0);
    expect(levels[0]).toBe(2);

    expectGapless(levels);
  });

  test('Datenschutz-Route hat genau eine h1 an ihrem Anfang', async ({
    page,
  }) => {
    await page.goto(privacyPath);

    // A document of its own, so the notice brings its own `h1` - and only
    // one, even though the frame around it is the same.
    const levels = await headingLevels(page);

    expect(levels.filter((level) => level === 1)).toHaveLength(1);
    expect(levels[0]).toBe(1);
  });

  test('Überschriften der Datenschutz-Route sind lückenlos verschachtelt', async ({
    page,
  }) => {
    await page.goto(privacyPath);

    const levels = await headingLevels(page, '#privacy ');

    expect(levels.length).toBeGreaterThan(0);
    expect(levels[0]).toBe(1);

    expectGapless(levels);
  });

  test('Links sind per Tastatur fokussierbar und sichtbar markiert', async ({
    page,
  }) => {
    await page.goto('/');

    const link = page.locator('#cv a[href^="mailto:"]');

    // Out once and back in by keyboard: `:focus-visible` only takes hold when
    // focus arrives from the keyboard, not from a scripted `focus()`.
    await link.focus();
    await page.keyboard.press('Shift+Tab');
    await page.keyboard.press('Tab');

    await expect(link).toBeFocused();

    const outlineWidth = await link.evaluate(
      (element) => getComputedStyle(element).outlineWidth,
    );
    expect(Number.parseFloat(outlineWidth)).toBeGreaterThan(0);
  });

  test('Navigationslinks sind per Tastatur fokussierbar und sichtbar markiert', async ({
    page,
    isMobile,
  }) => {
    await page.goto('/');
    await waitForHydration(page);

    if (isMobile) {
      await page.locator('.my-navi__burger').click();
      await expect(page.locator('.my-navi__nav')).toBeVisible();
    }

    const link = page.locator('.my-navi__link').first();

    await link.focus();
    await page.keyboard.press('Shift+Tab');
    await page.keyboard.press('Tab');

    await expect(link).toBeFocused();

    const outlineWidth = await link.evaluate(
      (element) => getComputedStyle(element).outlineWidth,
    );
    expect(Number.parseFloat(outlineWidth)).toBeGreaterThan(0);
  });
});
