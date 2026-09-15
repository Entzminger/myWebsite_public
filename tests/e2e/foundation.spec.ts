import { expect, test } from '@playwright/test';
import {
  facts,
  foundationCtaLabel,
  foundationLead,
  foundationTitle,
  highlights,
  site,
} from '@/src/sections/foundation/foundation.data';
import { waitForHydration } from './hydration';

test.describe('Stiftungs-Sektion', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('rendert Überschrift, Einleitung und Stiftungsdaten', async ({
    page,
  }) => {
    const section = page.locator('#voluntary');

    await expect(section).toBeVisible();
    await expect(
      section.getByRole('heading', { name: foundationTitle, level: 2 }),
    ).toBeVisible();
    await expect(section).toContainText(foundationLead);
    await expect(section).toContainText(site.description);
    await expect(section.locator('.my-foundation__name')).toContainText(site.name);
    await expect(section.locator('.my-foundation__domain')).toHaveText(site.domain);
    await expect(section.locator('.my-foundation__purposes .my-chips__chip')).toHaveCount(
      site.purposes.length,
    );
    await expect(section.locator('.my-foundation__highlights .my-highlights__item')).toHaveCount(
      highlights.length,
    );
  });

  test('zeigt die Kennzahlen der Förderung', async ({ page }) => {
    const section = page.locator('#voluntary');

    await expect(section.locator('.my-foundation__fact')).toHaveCount(facts.length);

    for (const [index, fact] of facts.entries()) {
      const entry = section.locator('.my-foundation__fact').nth(index);

      await expect(entry.locator('.my-foundation__fact-value')).toHaveText(fact.value);
      await expect(entry.locator('.my-foundation__fact-label')).toHaveText(fact.label);
    }
  });

  test('verlinkt die Website der Stiftung in einem neuen Tab', async ({
    page,
  }) => {
    const cta = page.locator('#voluntary .my-foundation__cta');

    await expect(cta).toHaveAttribute('href', site.url);
    await expect(cta).toHaveAttribute('target', '_blank');
    await expect(cta).toHaveAttribute('rel', /noopener/);
    await expect(cta).toHaveAccessibleName(new RegExp(foundationCtaLabel));
  });

  test('ist über die Navigation erreichbar', async ({ page, isMobile }) => {
    if (isMobile) {
      // The scrollspy marks the first section only after hydration - before
      // that the click on the burger would go nowhere.
      await waitForHydration(page);
      await page.locator('.my-navi__burger').click();
      await expect(page.locator('.my-navi__nav')).toBeVisible();
    }

    const link = page.locator('.my-navi__link[href="/#voluntary"]');

    await expect(link).toHaveText('Ehrenamt');
    await link.click();

    await expect(page.locator('#voluntary')).toBeInViewport();
  });
});
