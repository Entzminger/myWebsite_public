import { expect, test, type Locator } from '@playwright/test';
import { focusAreas } from '@/src/sections/presenter/presenter.data';
import { repository } from '@/src/sections/github/github.data';

const fontSizeOf = (chip: Locator) =>
  chip.evaluate((element) => parseFloat(getComputedStyle(element).fontSize));

test.describe('Chip-Listen', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('zeichnet beide Größen', async ({ page }) => {
    const large = page
      .locator('#profile .my-presenter__focus .my-chips__chip')
      .first();
    const small = page.locator('#cv .my-resume__chips .my-chips__chip').first();

    await expect(large).toBeVisible();
    await expect(small).toBeVisible();
    expect(await fontSizeOf(large)).toBeGreaterThan(await fontSizeOf(small));
  });

  test('färbt einzelne Chips über das Modell ein', async ({ page }) => {
    const chips = page.locator('#profile .my-presenter__focus .my-chips__chip');
    const accent = focusAreas.findIndex((area) => area.accent);

    expect(accent).toBeGreaterThanOrEqual(0);
    await expect(chips.nth(accent)).toHaveClass(/my-chips__chip--primary/);

    const neutral = focusAreas.findIndex((area) => !area.accent);
    await expect(chips.nth(neutral)).toHaveClass(/my-chips__chip--neutral/);
  });

  test('zeigt das Icon eines Chips rein dekorativ', async ({ page }) => {
    const icons = page.locator(
      '#profile .my-presenter__focus .my-chips__chip .my-chips__icon',
    );

    await expect(icons).toHaveCount(focusAreas.length);
    await expect(icons.first()).toHaveAttribute('aria-hidden', 'true');
  });

  test('nimmt den Abstand von der Sektion entgegen', async ({ page }) => {
    // The list itself sets the margin to 0; anything arriving here means the
    // section has successfully slipped its own underneath.
    const list = page.locator('#profile .my-presenter__focus');

    const marginTop = await list.evaluate((element) =>
      parseFloat(getComputedStyle(element).marginTop),
    );

    expect(marginTop).toBeGreaterThan(0);
  });

  test('übernimmt die Markenfarbe der Sektion', async ({ page }) => {
    const topics = page.locator('#github .my-github__topics .my-chips__chip');

    await expect(topics).toHaveCount(repository.topics.length);

    // `$github-purple-bright` from `_github.scss` - the proof that the section
    // really does slip its colour under the shared component.
    await expect(topics.first()).toHaveCSS('color', 'rgb(194, 151, 255)');
  });
});
