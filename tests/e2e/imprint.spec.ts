import { expect, test } from '@playwright/test';
import {
  imprintEntries,
  imprintLead,
  imprintNotes,
  imprintProviderTitle,
  imprintTitle,
} from '@/src/sections/imprint/imprint.data';
import { waitForHydration } from './hydration';

// By index rather than by text: `Anschrift wie oben` appears a second time in
// the entry about the responsible person.
const addressIndex = imprintEntries.findIndex((entry) => entry.id === 'address');
const address = imprintEntries[addressIndex];
const mail = imprintEntries.find((entry) => entry.id === 'mail');

test.describe('Impressum-Sektion', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('rendert Überschrift, Anbieterangaben und Hinweise', async ({ page }) => {
    const section = page.locator('#imprint');

    await expect(section).toBeVisible();
    await expect(
      section.getByRole('heading', { name: imprintTitle, level: 2 }),
    ).toBeVisible();
    await expect(section).toContainText(imprintLead);
    await expect(
      section.getByRole('heading', { name: imprintProviderTitle, level: 3 }),
    ).toBeVisible();

    await expect(section.locator('.my-imprint__entry')).toHaveCount(
      imprintEntries.length,
    );
    await expect(section.locator('.my-imprint__note')).toHaveCount(
      imprintNotes.length,
    );

    for (const note of imprintNotes) {
      await expect(
        section.getByRole('heading', { name: note.title, level: 3 }),
      ).toBeVisible();
    }
  });

  test('nennt die Anschrift vollständig', async ({ page }) => {
    const entry = page.locator('#imprint .my-imprint__entry').nth(addressIndex);

    await expect(entry).toContainText(address?.label ?? '');

    for (const line of address?.lines ?? []) {
      await expect(entry).toContainText(line);
    }
  });

  test('verlinkt die E-Mail-Adresse als mailto', async ({ page }) => {
    const link = page.locator(`#imprint a[href="${mail?.href}"]`);

    await expect(link).toBeVisible();
    await expect(link).toHaveText(mail?.lines[0] ?? '');
  });

  test('steht als letzte Sektion vor dem Footer', async ({ page }) => {
    // The order in the DOM is the promise: last section, and after it nothing
    // but BackToTop and the footer.
    const order = await page.evaluate(() => {
      const imprint = document.querySelector('#imprint');
      const footer = document.querySelector('.my-footer');

      return imprint && footer
        ? imprint.compareDocumentPosition(footer) & Node.DOCUMENT_POSITION_FOLLOWING
        : 0;
    });

    expect(order).toBeGreaterThan(0);
  });

  test('ist über die Navigation erreichbar', async ({ page, isMobile }) => {
    if (isMobile) {
      // The scrollspy marks the first section only after hydration - before
      // that the click on the burger would go nowhere.
      await waitForHydration(page);
      await page.locator('.my-navi__burger').click();
      await expect(page.locator('.my-navi__nav')).toBeVisible();
    }

    const link = page.locator('.my-navi__link[href="/#imprint"]');

    await expect(link).toHaveText('Impressum');
    await link.click();

    await expect(page.locator('#imprint')).toBeInViewport();
  });
});
