import { expect, test } from '@playwright/test';
import {
  personImageAlt,
  personShareImage,
  personShareImageSize,
  siteUrl,
} from '@/src/parts/person/person.data';
import {
  actions,
  focusAreas,
  presenterDescription,
  presenterIntro,
  presenterName,
  presenterOgDescription,
  presenterPortrait,
  presenterRole,
  presenterTitle,
} from '@/src/sections/presenter/presenter.data';

/** Vue condenses line breaks in the template into spaces. */
const normalize = (value: string | null) =>
  (value ?? '').replace(/\s+/g, ' ').trim();

test.describe('Presenter-Sektion', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('rendert die Hero-Sektion mit Name und Rolle als h1', async ({ page }) => {
    const presenter = page.locator('#profile');

    await expect(presenter).toBeVisible();

    const headings = page.locator('h1');

    // Exactly one h1 per page - and it belongs to the presenter.
    await expect(headings).toHaveCount(1);
    await expect(headings).toContainText(presenterName);
    await expect(headings).toContainText(presenterRole);
  });

  test('gibt den Vorstellungstext vollständig wieder', async ({ page }) => {
    const paragraphs = page.locator('#profile .my-presenter__text');

    await expect(paragraphs).toHaveCount(presenterIntro.length);

    for (const [index, expected] of presenterIntro.entries()) {
      const text = await paragraphs.nth(index).textContent();

      expect(normalize(text)).toBe(expected);
    }
  });

  test('listet Schwerpunkte', async ({ page }) => {
    const presenter = page.locator('#profile');

    const chips = presenter.locator('.my-presenter__focus .my-chips__chip');
    await expect(chips).toHaveCount(focusAreas.length);

    for (const [index, area] of focusAreas.entries()) {
      await expect(chips.nth(index)).toHaveText(area.label);
    }
  });

  test('zeigt das Porträt in der Bildspalte', async ({ page }) => {
    const portrait = page.locator('#profile .my-presenter__portrait-image');

    await expect(portrait).toBeVisible();
    await expect(portrait).toHaveAttribute('alt', presenterPortrait.alt);

    // The file has to be served for real - a dead path would otherwise go
    // unnoticed inside the round frame. It also has to be one of the two cut
    // variants: the 2364 px master would load five times the pixels the box is
    // ever wide.
    const naturalWidth = await portrait.evaluate(
      (image: HTMLImageElement) => image.naturalWidth,
    );

    expect(naturalWidth).toBeGreaterThan(0);
    expect(naturalWidth).toBeLessThanOrEqual(832);
  });

  test('bietet dem breiten Layout die dichtere Fassung an', async ({ page }) => {
    const source = page.locator('#profile .my-presenter__portrait-picture source');

    await expect(source).toHaveAttribute('media', presenterPortrait.wideFrom);
    await expect(source).toHaveAttribute('srcset', /philipp-832/);
  });

  test('führt über den Hauptknopf zum Kontakt', async ({ page }) => {
    const contact = actions.find((action) => action.id === 'contact');
    const link = page.locator(`#profile a[href="${contact?.href}"]`);

    await expect(link).toBeVisible();
    await expect(link).toHaveText(contact?.label ?? '');
    await link.click();

    await expect(page).toHaveURL(/#contact$/);
    await expect(page.locator('#contact')).toBeInViewport();
  });

  test('setzt Titel und Beschreibung für Suchmaschinen', async ({ page }) => {
    await expect(page).toHaveTitle(presenterTitle);

    const description = page.locator('meta[name="description"]');
    await expect(description).toHaveAttribute('content', presenterDescription);

    // The snippet is cut off beyond this, and the name has to survive it.
    expect(presenterDescription.length).toBeLessThanOrEqual(160);
    expect(presenterDescription.startsWith(presenterName)).toBe(true);

    const ogTitle = page.locator('meta[property="og:title"]');
    await expect(ogTitle).toHaveAttribute('content', new RegExp(presenterName));
  });

  test('nennt die Sprache des Dokuments', async ({ page }) => {
    // Both a ranking signal and WCAG 2.1 3.1.1 (Language of Page, Level A).
    await expect(page.locator('html')).toHaveAttribute('lang', 'de');
  });

  test('benennt genau eine kanonische URL', async ({ page }) => {
    const canonical = page.locator('link[rel="canonical"]');

    await expect(canonical).toHaveCount(1);
    await expect(canonical).toHaveAttribute('href', siteUrl);
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
      'content',
      siteUrl,
    );
  });

  test('liefert ein Vorschaubild für geteilte Links', async ({ page }) => {
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
      'content',
      personShareImage,
    );

    // Under 300px wide on purpose: that is the line Meta draws between the wide
    // banner preview and the compact card with the thumbnail on the left. Over
    // it, WhatsApp would stack the image above title and text again.
    expect(personShareImageSize.width).toBeLessThan(300);
    expect(personShareImageSize.width).toBeGreaterThanOrEqual(100);
    await expect(page.locator('meta[property="og:image:width"]')).toHaveAttribute(
      'content',
      String(personShareImageSize.width),
    );
    await expect(page.locator('meta[property="og:image:alt"]')).toHaveAttribute(
      'content',
      personImageAlt,
    );
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
      'content',
      'summary',
    );
    await expect(page.locator('meta[property="og:description"]')).toHaveAttribute(
      'content',
      presenterOgDescription,
    );

    // The file stands in `public/`, so the URL survives the next build - a
    // preview that 404s is worse than none at all.
    const response = await page.request.get(personShareImage.replace(siteUrl, '/'));
    expect(response.status()).toBe(200);
  });

  test('schaltet die dekorativen Animationen bei reduzierter Bewegung ab', async ({
    page,
  }) => {
    const animation = (selector: string) =>
      page
        .locator(selector)
        .first()
        .evaluate((element) => getComputedStyle(element).animationName);

    // Scoped styles append a hash to the keyframes name.
    expect(await animation('.my-presenter__glyph')).toMatch(/^my-presenter-float/);
    expect(await animation('.my-presenter__portrait')).toMatch(/^my-presenter-float/);

    await page.emulateMedia({ reducedMotion: 'reduce' });

    expect(await animation('.my-presenter__glyph')).toBe('none');
    expect(await animation('.my-presenter__portrait')).toBe('none');
  });

  test('hydriert ohne Server/Client-Mismatch', async ({ page }) => {
    const problems: string[] = [];

    page.on('console', (message) => {
      if (message.type() !== 'error' && message.type() !== 'warning') return;
      if (/hydrat|mismatch/i.test(message.text())) problems.push(message.text());
    });
    page.on('pageerror', (error) => problems.push(error.message));

    await page.goto('/');
    await expect(page.locator('#profile')).toBeVisible();
    // Vue reports hydration problems only after the client mount.
    await page.waitForLoadState('networkidle');

    expect(problems).toEqual([]);
  });
});
