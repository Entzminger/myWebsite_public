import { expect, test, type Locator } from '@playwright/test';
import { iconPaths } from '@/src/parts/icon/icon.data';

/**
 * The parsed `viewBox`, not the attribute. Vue serialises a bound attribute in
 * lower case (`viewbox`), which the HTML parser maps back onto the real
 * `viewBox` - reading it off `baseVal` is the only way to see whether it
 * really arrived.
 */
const viewBoxWidthOf = (icon: Locator) =>
  icon.evaluate((element) => (element as unknown as SVGSVGElement).viewBox.baseVal.width);

const strokeWidthOf = (icon: Locator) =>
  icon.evaluate((element) => parseFloat(getComputedStyle(element).strokeWidth));

test.describe('Icon-Baustein', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('zeichnet jedes Icon rein dekorativ', async ({ page }) => {
    const icons = page.locator('.my-icon');

    // Nothing on the page draws an icon that is not decoration; a single one
    // without these two would be read out as a graphic without a name.
    const count = await icons.count();
    expect(count).toBeGreaterThan(0);

    for (let index = 0; index < count; index += 1) {
      await expect(icons.nth(index)).toHaveAttribute('aria-hidden', 'true');
      await expect(icons.nth(index)).toHaveAttribute('focusable', 'false');
    }
  });

  test('behält den 24×24-Rahmen der Strich-Icons', async ({ page }) => {
    const icon = page.locator('#cv .my-resume__export-icon');

    expect(await viewBoxWidthOf(icon)).toBe(24);
    await expect(icon).toHaveAttribute('fill', 'none');
    await expect(icon).toHaveAttribute('stroke', 'currentColor');
  });

  test('gibt einer Marke ihren eigenen Rahmen und eine Fläche', async ({ page }) => {
    const mark = page.locator('#github .my-github__card-icon');

    // The Octocat is drawn on 98×96, not on the 24×24 grid.
    expect(await viewBoxWidthOf(mark)).toBe(98);
    await expect(mark).toHaveAttribute('fill', 'currentColor');
    // A solid shape must not carry a stroke - it would grow an outline.
    await expect(mark).not.toHaveAttribute('stroke', /.*/);
  });

  test('zeichnet mit 2 und lässt die Stärke von außen feiner stellen', async ({ page }) => {
    // The default, straight out of `_icon.scss`.
    expect(await strokeWidthOf(page.locator('#cv .my-resume__export-icon'))).toBe(2);

    // `--my-icon-stroke-width` on the icon itself ...
    expect(
      await strokeWidthOf(page.locator('#profile .my-presenter__focus .my-chips__icon').first()),
    ).toBe(1.75);

    // ... and inherited from the plate above it, which is how the resume
    // reaches an icon it gives no class of its own.
    expect(
      await strokeWidthOf(page.locator('#cv .my-resume__contact-icon .my-icon').first()),
    ).toBe(1.75);
  });

  test('nimmt den Pfad aus dem gemeinsamen Bestand', async ({ page }) => {
    // The envelope stood in two data files before; this is the proof that both
    // places now draw the same one.
    await expect(
      page.locator(`#profile .my-presenter__action-icon path[d="${iconPaths.mail}"]`),
    ).toHaveCount(1);
    await expect(
      page.locator(`#cv .my-resume__contact-icon path[d="${iconPaths.mail}"]`),
    ).toHaveCount(1);
  });
});
