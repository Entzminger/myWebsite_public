import { expect, test } from '@playwright/test';
import {
  githubCtaLabel,
  githubLead,
  githubTitle,
  highlights,
  repository,
} from '@/src/sections/github/github.data';
import { waitForHydration } from './hydration';

test.describe('GitHub-Sektion', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('rendert Überschrift, Einleitung und Repository-Daten', async ({
    page,
  }) => {
    const section = page.locator('#github');

    await expect(section).toBeVisible();
    await expect(
      section.getByRole('heading', { name: githubTitle, level: 2 }),
    ).toBeVisible();
    await expect(section).toContainText(githubLead);
    await expect(section).toContainText(repository.description);
    await expect(section.locator('.my-github__repo')).toContainText(
      repository.fullName,
    );
    await expect(section.locator('.my-github__topics .my-chips__chip')).toHaveCount(
      repository.topics.length,
    );
    await expect(section.locator('.my-github__highlights .my-highlights__item')).toHaveCount(
      highlights.length,
    );
  });

  test('verlinkt das Repository in einem neuen Tab', async ({ page }) => {
    const cta = page.locator('#github .my-github__cta');

    await expect(cta).toHaveAttribute('href', repository.url);
    await expect(cta).toHaveAttribute('target', '_blank');
    await expect(cta).toHaveAttribute('rel', /noopener/);
    await expect(cta).toHaveAccessibleName(new RegExp(githubCtaLabel));
  });

  test('zeigt das Hintergrundlogo dekorativ und unscharf', async ({ page }) => {
    const backdrop = page.locator('#github .my-github__backdrop');
    const logo = page.locator('#github .my-github__backdrop-logo');

    await expect(backdrop).toHaveAttribute('aria-hidden', 'true');

    const styles = await logo.evaluate((element) => {
      const computed = getComputedStyle(element);

      return { filter: computed.filter, opacity: Number(computed.opacity) };
    });

    expect(styles.filter).toContain('blur');
    expect(styles.opacity).toBeGreaterThan(0);
    expect(styles.opacity).toBeLessThan(0.3);
  });

  test('ist über die Navigation erreichbar', async ({ page, isMobile }) => {
    if (isMobile) {
      // The scrollspy marks the first section only after hydration - before
      // that the click on the burger would go nowhere.
      await waitForHydration(page);
      await page.locator('.my-navi__burger').click();
      await expect(page.locator('.my-navi__nav')).toBeVisible();
    }

    const link = page.locator('.my-navi__link[href="/#github"]');

    await expect(link).toHaveText('GitHub');
    await link.click();

    await expect(page.locator('#github')).toBeInViewport();
  });
});
