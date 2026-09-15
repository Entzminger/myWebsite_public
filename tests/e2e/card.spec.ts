import { expect, test, type Locator } from '@playwright/test';
import { site } from '@/src/sections/foundation/foundation.data';
import { repository } from '@/src/sections/github/github.data';
import { contactFormTitle } from '@/src/sections/contact/contact.data';

const groundOf = (card: Locator) =>
  card.evaluate((element) => {
    const styles = getComputedStyle(element);

    return [styles.backgroundColor, styles.borderRadius, styles.padding].join(' ');
  });

const rowGapOf = (card: Locator) =>
  card.evaluate((element) => getComputedStyle(element).rowGap);

test.describe('Karte', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('steht in den Sektionen als <article>', async ({ page }) => {
    const foundation = page.locator('#voluntary article.my-card');
    const github = page.locator('#github article.my-card');

    await expect(foundation).toBeVisible();
    await expect(github).toBeVisible();
    await expect(foundation).toContainText(site.description);
    await expect(github).toContainText(repository.description);
  });

  test('trägt die Blöcke des Lebenslaufs als <section>', async ({ page }) => {
    const blocks = page.locator('#cv section.my-card');

    await expect(blocks).toHaveCount(5);
    // The CV stands on a light ground and sets `--my-card-background` for it.
    expect(await groundOf(blocks.first())).not.toBe(
      await groundOf(page.locator('#github article.my-card')),
    );
  });

  test('trägt das Kontaktformular als <form>', async ({ page }) => {
    const form = page.locator('#contact form.my-card');

    await expect(form).toBeVisible();
    await expect(form).toContainText(contactFormTitle);
  });

  test('nimmt die Beschriftung der Sektion entgegen', async ({ page }) => {
    // `aria-labelledby` is set on the component and falls through onto the
    // element; every section thus points at its own heading.
    await expect(page.getByRole('article', { name: site.name })).toBeVisible();
    await expect(
      page.getByRole('article', { name: repository.fullName }),
    ).toBeVisible();
    await expect(
      page.locator('#contact form.my-card'),
    ).toHaveAccessibleName(contactFormTitle);
  });

  test('zeichnet alle Karten auf demselben Grund', async ({ page }) => {
    const foundation = page.locator('#voluntary article.my-card');
    const github = page.locator('#github article.my-card');
    const form = page.locator('#contact form.my-card');

    expect(await groundOf(foundation)).toBe(await groundOf(github));
    expect(await groundOf(form)).toBe(await groundOf(github));
  });

  test('nimmt den Zeilenabstand von der Sektion entgegen', async ({ page }) => {
    // The form sets `--my-card-gap`, the other two cards stay on the
    // component's default.
    const form = page.locator('#contact form.my-card');
    const github = page.locator('#github article.my-card');

    expect(await rowGapOf(form)).toBe('16px');
    expect(await rowGapOf(github)).toBe('20px');
    // The blocks of the CV bring their own spacing.
    expect(await rowGapOf(page.locator('#cv section.my-card').first())).toBe(
      '0px',
    );
  });

  test('gibt den Grund des Lebenslaufs auf Papier frei', async ({ page }) => {
    const block = page.locator('#cv section.my-card').first();

    await page.emulateMedia({ media: 'print' });

    // On paper the CV overrides the contract a second time: no ground and no
    // shadow, so that nothing but the frame remains.
    await expect(block).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
    await expect(block).toHaveCSS('box-shadow', 'none');
  });
});
