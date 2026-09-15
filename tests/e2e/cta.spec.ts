import { expect, test, type Locator } from '@playwright/test';
import { actions } from '@/src/sections/presenter/presenter.data';
import { contactSubmitLabel } from '@/src/sections/contact/contact.data';

const groundOf = (cta: Locator) =>
  cta.evaluate((element) => getComputedStyle(element).backgroundImage);

test.describe('Call-to-Action', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('steht als Link und als Knopf', async ({ page }) => {
    await expect(page.locator('#profile a.my-cta')).toHaveCount(actions.length);
    await expect(page.locator('#voluntary a.my-cta')).toHaveCount(1);
    await expect(page.locator('#github a.my-cta')).toHaveCount(1);

    const submit = page.locator('#contact button.my-cta');

    await expect(submit).toHaveAttribute('type', 'submit');
    await expect(submit).toHaveText(contactSubmitLabel);
  });

  test('trägt die gewählte Farbstellung als Klasse', async ({ page }) => {
    await expect(page.locator('#profile .my-cta').first()).toHaveClass(
      /my-cta--primary/,
    );
    await expect(page.locator('#contact .my-cta')).toHaveClass(
      /my-cta--accent/,
    );
    // Foundation and GitHub link foreign brands and set their tones themselves.
    await expect(page.locator('#voluntary .my-cta')).toHaveClass(
      /my-cta--brand/,
    );
    await expect(page.locator('#github .my-cta')).toHaveClass(
      /my-cta--brand/,
    );
  });

  test('färbt jede Sektion eigenständig ein', async ({ page }) => {
    const grounds = await Promise.all(
      ['#profile', '#voluntary', '#github', '#contact'].map((section) =>
        groundOf(page.locator(`${section} .my-cta`).first()),
      ),
    );

    // Every section brings a gradient of its own, no two of them alike.
    for (const ground of grounds) {
      expect(ground).toContain('linear-gradient');
    }
    expect(new Set(grounds).size).toBe(grounds.length);
  });

  test('nimmt den Innenabstand von der Sektion entgegen', async ({ page }) => {
    const paddingOf = (cta: Locator) =>
      cta.evaluate((element) => getComputedStyle(element).padding);

    // The main path in the hero stands wider than the buttons in the cards.
    expect(await paddingOf(page.locator('#profile .my-cta').first())).toBe(
      '13px 22px',
    );
    expect(await paddingOf(page.locator('#github .my-cta'))).toBe('12px 20px');
  });

  test('hält die Bewegung bei reduzierter Bewegung an', async ({ page }) => {
    const cta = page.locator('#github .my-cta');

    await expect(cta).not.toHaveCSS('transition', 'none');

    await page.emulateMedia({ reducedMotion: 'reduce' });

    await expect(cta).toHaveCSS('transition', 'none');
  });
});
