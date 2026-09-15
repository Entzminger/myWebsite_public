import { expect, test } from '@playwright/test';
import {
  personImage,
  personProfileUrls,
  siteUrl,
} from '@/src/parts/person/person.data';
import {
  contacts,
  education,
  experience,
  languages,
  personName,
  personRole,
  skillGroups,
} from '@/src/sections/resume/resume.data';

test.describe('Lebenslauf-Sektion', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('rendert Kopfbereich mit Name und Rolle', async ({ page }) => {
    const resume = page.locator('#cv');

    await expect(resume).toBeVisible();
    await expect(
      resume.getByRole('heading', { name: 'Berufslaufbahn', level: 2 }),
    ).toBeVisible();
    await expect(resume).toContainText(personName);
    await expect(resume).toContainText(personRole);
  });

  test('zeigt alle Berufsstationen mit Zeitraum und Technologien', async ({
    page,
  }) => {
    const section = page.locator('section[aria-labelledby="my-resume-experience"]');
    const stations = section.locator('.my-resume__station');

    await expect(stations).toHaveCount(experience.length);

    for (const [index, entry] of experience.entries()) {
      const station = stations.nth(index);

      await expect(
        station.getByRole('heading', { name: entry.title, level: 4 }),
      ).toBeVisible();
      await expect(station).toContainText(entry.description);
      await expect(
        station.locator(`time[datetime="${entry.period.from.iso}"]`),
      ).toBeVisible();

      for (const tag of entry.tags ?? []) {
        await expect(station.getByText(tag, { exact: true })).toBeVisible();
      }
    }
  });

  test('markiert die laufende Station und schließt abgeschlossene ab', async ({
    page,
  }) => {
    const current = page.locator('.my-resume__station--current');
    const running = experience.filter((entry) => !entry.period.to);

    await expect(current).toHaveCount(running.length);

    // The employer comes from the data, so the test survives a change of
    // job.
    for (const [index, entry] of running.entries()) {
      await expect(current.nth(index)).toContainText(entry.title);
    }
  });

  test('pulsiert am Punkt der laufenden Station', async ({ page }) => {
    const dotAnimation = (selector: string) =>
      page
        .locator(selector)
        .first()
        .evaluate((element) => getComputedStyle(element, '::after').animationName);

    // Scoped styles append a hash to the keyframes name.
    expect(await dotAnimation('.my-resume__station--current')).toMatch(
      /^my-resume-pulse/,
    );
    expect(
      await dotAnimation(
        '.my-resume__station:not(.my-resume__station--current)',
      ),
    ).toBe('none');

    // Reduced motion must switch the decoration off.
    await page.emulateMedia({ reducedMotion: 'reduce' });
    expect(await dotAnimation('.my-resume__station--current')).toBe('none');
  });

  test('zeigt Studium und Ausbildung', async ({ page }) => {
    const section = page.locator('section[aria-labelledby="my-resume-education"]');

    await expect(section.locator('.my-resume__station')).toHaveCount(
      education.length,
    );

    for (const entry of education) {
      await expect(
        section.getByRole('heading', { name: entry.title, level: 4 }),
      ).toBeVisible();
    }
  });

  test('verlinkt jeden Kontaktweg mit href korrekt', async ({ page }) => {
    for (const contact of contacts.filter((entry) => entry.href)) {
      const link = page.locator(`#cv a[href="${contact.href}"]`);

      await expect(link).toBeVisible();
      await expect(link).toHaveText(contact.value);
    }
  });

  test('listet Kernkompetenzen und Sprachen', async ({ page }) => {
    const resume = page.locator('#cv');

    for (const group of skillGroups) {
      await expect(resume.getByText(group.label, { exact: true })).toBeVisible();

      for (const item of group.items) {
        await expect(resume.getByText(item, { exact: true }).first()).toBeVisible();
      }
    }

    for (const language of languages) {
      await expect(resume.getByText(language, { exact: true })).toBeVisible();
    }
  });

  test('liefert strukturierte Person-Daten als JSON-LD', async ({ page }) => {
    const raw = await page
      .locator('script[type="application/ld+json"]')
      .first()
      .textContent();

    expect(raw).toBeTruthy();

    const data = JSON.parse(raw ?? '{}');

    expect(data['@type']).toBe('ProfilePage');
    expect(data.url).toBe(siteUrl);

    const person = data.mainEntity;

    expect(person['@type']).toBe('Person');
    expect(person.name).toBe(personName);
    expect(person.jobTitle).toBe(personRole);
    expect(person.url).toBe(siteUrl);
    expect(person.image).toBe(personImage);
    // The link to the profiles elsewhere - without it the page competes with
    // them instead of being read as the same person.
    expect(person.sameAs).toEqual(personProfileUrls);
    // Phone number and date of birth stand nowhere on the page and must not
    // come back through the search engine data either.
    expect(person.telephone).toBeUndefined();
    expect(person.birthDate).toBeUndefined();
  });

  test('bietet oben rechts einen PDF-Export an', async ({ page }) => {
    const button = page.getByRole('button', { name: 'Lebenslauf als PDF' });
    const originalTitle = await page.title();

    await expect(button).toBeVisible();
    // The click handler only hangs on the button after hydration.
    await page.waitForLoadState('networkidle');

    // The real print dialog cannot be driven, so window.print() is replaced
    // and behaves like the browser does (afterprint included).
    await page.evaluate(() => {
      const probe = window as unknown as { __printedTitle?: string; };

      window.print = () => {
        probe.__printedTitle = document.title;
        window.dispatchEvent(new Event('afterprint'));
      };
    });

    await button.click();

    // The document title decides the file name suggested when saving as PDF.
    const printedTitle = await page.evaluate(
      () => (window as unknown as { __printedTitle?: string; }).__printedTitle,
    );

    expect(printedTitle).toBe(`Lebenslauf ${personName}`);
    // Afterwards the original page title stands in the tab again.
    expect(await page.title()).toBe(originalTitle);
  });

  test('druckt nur den Lebenslauf, ohne den Export-Button', async ({ page }) => {
    await page.emulateMedia({ media: 'print' });

    await expect(page.locator('#cv')).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Lebenslauf als PDF' }),
    ).toBeHidden();
    await expect(page.locator('#profile')).toBeHidden();
    await expect(page.getByText('Navi', { exact: true })).toBeHidden();
  });

  test('hydriert ohne Server/Client-Mismatch', async ({ page }) => {
    const problems: string[] = [];

    page.on('console', (message) => {
      if (message.type() !== 'error' && message.type() !== 'warning') return;
      if (/hydrat|mismatch/i.test(message.text())) problems.push(message.text());
    });
    page.on('pageerror', (error) => problems.push(error.message));

    await page.goto('/');
    await expect(page.locator('#cv')).toBeVisible();
    // Vue reports hydration problems only after the client mount.
    await page.waitForLoadState('networkidle');

    expect(problems).toEqual([]);
  });
});
