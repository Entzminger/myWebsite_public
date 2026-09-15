import { expect, test } from '@playwright/test';
import {
  contactFields,
  contactLead,
  contactMailTo,
  contactSubmitLabel,
  contactTitle,
  profiles,
} from '@/src/sections/contact/contact.data';
import { waitForHydration } from './hydration';

test.describe('Kontakt-Sektion', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Without hydration the submit button fires a real form submit that
    // reloads the page - instead of running `@submit.prevent`.
    await waitForHydration(page);
  });

  test('rendert Überschrift, Einleitung und alle Formularfelder', async ({
    page,
  }) => {
    const section = page.locator('#contact');

    await expect(section).toBeVisible();
    await expect(
      section.getByRole('heading', { name: contactTitle, level: 2 }),
    ).toBeVisible();
    await expect(section).toContainText(contactLead);

    for (const field of contactFields) {
      // Looked up through the label: that checks the `label for` → `id`
      // wiring along the way, not merely that the field exists.
      const input = section.getByLabel(field.label, { exact: true });

      await expect(input).toBeVisible();
      await expect(input).toHaveAttribute('required', '');
    }

    await expect(
      section.getByRole('button', { name: contactSubmitLabel }),
    ).toBeVisible();
  });

  test('rendert die Nachricht als mehrzeiliges Feld', async ({ page }) => {
    const message = page.locator('#contact textarea');

    await expect(message).toHaveCount(1);
    await expect(message).toHaveAttribute('id', 'my-contact-message');
  });

  test('verlangt alle Felder, bevor abgeschickt wird', async ({ page }) => {
    const section = page.locator('#contact');

    await section
      .getByRole('button', { name: contactSubmitLabel })
      .click();

    // The browser validation bites before the handler: the status message it
    // shows must not stand there yet after an empty submit.
    await expect(section.locator('.my-contact__status')).toBeEmpty();

    const name = section.getByLabel('Name', { exact: true });
    const isValid = await name.evaluate(
      (element: HTMLInputElement) => element.validity.valid,
    );

    expect(isValid).toBe(false);
  });

  test('baut aus den Eingaben eine mailto-Nachricht', async ({ page }) => {
    const section = page.locator('#contact');

    await section.getByLabel('Name', { exact: true }).fill('Erika Musterfrau');
    await section.getByLabel('E-Mail', { exact: true }).fill('erika@example.org');
    await section
      .getByLabel('Nachricht', { exact: true })
      .fill('Hallo Philipp, hätten Sie Zeit für ein Gespräch?');

    // The click sets `window.location` to the mailto URL. Without a mail
    // client nothing visible happens in the browser - so the check runs on the
    // fallback link, which carries the same URL and stands in the live region
    // afterwards.
    await section.getByRole('button', { name: contactSubmitLabel }).click();

    const fallback = section.locator('.my-contact__fallback');

    await expect(fallback).toBeVisible();

    const href = await fallback.getAttribute('href');

    expect(href).toContain(`mailto:${contactMailTo}`);
    expect(href).toContain(encodeURIComponent('Erika Musterfrau'));
    expect(href).toContain(encodeURIComponent('erika@example.org'));
    expect(href).toContain(
      encodeURIComponent('Hallo Philipp, hätten Sie Zeit für ein Gespräch?'),
    );
  });

  test('meldet den Versand in einer Live-Region', async ({ page }) => {
    const status = page.locator('#contact .my-contact__status');

    // The region is in the markup from the start - otherwise it would come
    // too late to be read out.
    await expect(status).toHaveAttribute('role', 'status');
    await expect(status).toBeEmpty();

    const section = page.locator('#contact');

    await section.getByLabel('Name', { exact: true }).fill('Erika');
    await section.getByLabel('E-Mail', { exact: true }).fill('erika@example.org');
    await section.getByLabel('Nachricht', { exact: true }).fill('Hallo');
    await section.getByRole('button', { name: contactSubmitLabel }).click();

    await expect(status).not.toBeEmpty();
  });

  test('verlinkt Xing und LinkedIn in einem neuen Tab', async ({ page }) => {
    const links = page.locator('#contact .my-contact__profile');

    await expect(links).toHaveCount(profiles.length);

    for (const profile of profiles) {
      const link = page.locator(`#contact a[href="${profile.url}"]`);

      await expect(link).toHaveAttribute('target', '_blank');

      // `rel` is a token list, so it is read once and checked per token.
      const rel = (await link.getAttribute('rel'))?.split(' ') ?? [];

      expect(rel).toContain('noopener');
      // `me` says the target is another profile of the same person.
      expect(rel).toContain('me');
      await expect(link).toHaveAccessibleName(new RegExp(profile.label));
    }
  });

  test('ist über die Navigation erreichbar', async ({ page, isMobile }) => {
    if (isMobile) {
      // The scrollspy marks the first section only after hydration - before
      // that the click on the burger would go nowhere.
      await waitForHydration(page);
      await page.locator('.my-navi__burger').click();
      await expect(page.locator('.my-navi__nav')).toBeVisible();
    }

    const link = page.locator('.my-navi__link[href="/#contact"]');

    await expect(link).toHaveText('Kontakt');
    await link.click();

    await expect(page.locator('#contact')).toBeInViewport();
  });

  test('steht in der Navigation hinter GitHub', async ({ page }) => {
    const labels = (await page.locator('.my-navi__link').allTextContents()).map(
      (label) => label.trim(),
    );

    expect(labels.indexOf('Kontakt')).toBe(labels.indexOf('GitHub') + 1);
  });

  test('hydriert ohne Server/Client-Mismatch', async ({ page }) => {
    const warnings: string[] = [];

    page.on('console', (message) => {
      if (message.type() === 'warning' || message.type() === 'error') {
        warnings.push(message.text());
      }
    });

    await page.reload();
    await expect(page.locator('#contact')).toBeVisible();

    expect(warnings.filter((entry) => /hydrat/i.test(entry))).toEqual([]);
  });
});
