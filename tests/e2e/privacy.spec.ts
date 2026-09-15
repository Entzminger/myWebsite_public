import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';
import { naviItems, privacyPath } from '@/src/parts/navi/navi.data';
import {
  privacyBackHref,
  privacyBackLabel,
  privacyChapters,
  privacyLead,
  privacyTitle,
} from '@/src/sections/privacy/privacy.data';
import { waitForHydration } from './hydration';

const controller = privacyChapters
  .flatMap((chapter) => chapter.blocks)
  .find((block) => block.address);

const blockCount = privacyChapters.reduce(
  (total, chapter) => total + chapter.blocks.length,
  0,
);

/**
 * Below the medium breakpoint the entries sit behind the burger, and no
 * handler hangs on it before the app is running.
 */
const openMenu = async (page: Page, isMobile: boolean | undefined) => {
  if (!isMobile) {
    return;
  }

  await waitForHydration(page);
  await page.locator('.my-navi__burger').click();
  await expect(page.locator('.my-navi__nav')).toBeVisible();
};

/** What the recorder in the browser collects about one view transition. */
interface ViewTransitionProbe {
  ran: boolean;
  names: string[];
}

declare global {
  interface Window {
    __viewTransition?: ViewTransitionProbe;
  }
}

/**
 * Records which keyframes the browser picks for the arriving view transition.
 * Has to be registered before the navigation - it runs in every new document
 * ahead of that document's own scripts.
 */
const recordViewTransitions = (page: Page) =>
  page.addInitScript(() => {
    const probe: ViewTransitionProbe = { ran: false, names: [] };

    window.__viewTransition = probe;

    window.addEventListener('pagereveal', (event) => {
      const { viewTransition } = event as Event & {
        viewTransition?: { ready: Promise<void> };
      };

      if (!viewTransition) {
        return;
      }

      probe.ran = true;
      void viewTransition.ready.then(() => {
        probe.names = document
          .getAnimations()
          .filter(
            (animation): animation is CSSAnimation => 'animationName' in animation,
          )
          .map((animation) => animation.animationName)
          .filter((name) => name.startsWith('my-view'));
      });
    });
  });

const transitionNames = (page: Page): Promise<string[]> =>
  page.evaluate(() => window.__viewTransition?.names ?? []);

test.describe('Datenschutz-Ansicht', () => {
  test('steht als eigener Punkt am Ende der Navigation', async ({ page }) => {
    await page.goto('/');

    const item = naviItems[naviItems.length - 1];
    const link = page.locator('.my-navi__link').last();

    expect(item?.id).toBe('privacy');
    expect(item?.route).toBe(true);
    await expect(link).toHaveAttribute('href', privacyPath);
    await expect(link).toHaveText(item?.label ?? '');
  });

  test('steht nicht mehr auf der Startseite', async ({ page }) => {
    await page.goto('/');

    // The point of the whole move: the legal text is no longer part of the
    // document a search engine reads under the domain itself.
    await expect(page.locator('#profile')).toBeVisible();
    await expect(page.locator('#privacy')).toHaveCount(0);
  });

  test('ersetzt beim Klick die ganze Seite', async ({ page, isMobile }) => {
    await page.goto('/');
    await openMenu(page, isMobile);
    await page.locator(`.my-navi__link[href="${privacyPath}"]`).click();

    await expect(page).toHaveURL(new RegExp(`${privacyPath}$`));
    await expect(page.locator('#privacy')).toBeVisible();
    // A document of its own: no section of the page comes along.
    await expect(page.locator('#profile')).toHaveCount(0);
    await expect(page.locator('#imprint')).toHaveCount(0);
    // Bar and signature line frame every route.
    await expect(page.locator('.my-navi')).toBeVisible();
    await expect(page.locator('.my-footer')).toBeVisible();
  });

  test('bleibt für Suchmaschinen ungelistet', async ({ page }) => {
    await page.goto(privacyPath);

    // Reachable it has to be, found through a search it does not - and the
    // robots.txt must keep allowing the route, or the crawler never gets to
    // read this tag.
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      'content',
      /noindex/,
    );
    // `noindex` plus a canonical would be two contradictory signals.
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
  });

  test('führt über die Navigation wieder zur Seite zurück', async ({
    page,
    isMobile,
  }) => {
    await page.goto(privacyPath);
    await expect(page.locator('#privacy')).toBeVisible();

    await openMenu(page, isMobile);
    await page.locator('.my-navi__link[href="/#cv"]').click();

    await expect(page.locator('#cv')).toBeVisible();
    await expect(page.locator('#privacy')).toHaveCount(0);
  });

  test('führt über den Knopf zurück zur Seite', async ({ page }) => {
    await page.goto(privacyPath);

    const back = page.locator('.my-privacy__back');

    await expect(back).toHaveText(new RegExp(privacyBackLabel));
    await expect(back).toHaveAttribute('href', privacyBackHref);
    await expect(back).toHaveClass(/my-cta--primary/);

    await back.click();

    await expect(page.locator('#profile')).toBeVisible();
    await expect(page.locator('#privacy')).toHaveCount(0);
  });

  test('hält den Knopf beim Lesen in der unteren Ecke', async ({ page }) => {
    await page.goto(privacyPath);

    const bar = page.locator('.my-privacy__back-bar');
    const back = page.locator('.my-privacy__back');

    expect(
      await bar.evaluate((element) => getComputedStyle(element).position),
    ).toBe('sticky');

    // Deep in the text, nowhere near the end: the button is on screen anyway.
    await page.evaluate(() => window.scrollTo(0, 1200));
    await expect(back).toBeInViewport();

    const box = await back.boundingBox();
    const viewport = page.viewportSize();

    // Measured by its own right and lower edge, not by where it starts: on a
    // phone the button is wide enough to reach past the middle of the screen.
    const right = (box?.x ?? 0) + (box?.width ?? 0);
    const bottom = (box?.y ?? 0) + (box?.height ?? 0);

    expect(right).toBeGreaterThan((viewport?.width ?? 0) * 0.75);
    expect(bottom).toBeGreaterThan((viewport?.height ?? 0) * 0.75);
  });

  test('schiebt die Ansichten richtungsabhängig übereinander', async ({
    page,
    isMobile,
  }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await recordViewTransitions(page);

    await page.goto('/');
    await openMenu(page, isMobile);
    await page.locator(`.my-navi__link[href="${privacyPath}"]`).click();
    await expect(page.locator('#privacy')).toBeVisible();

    // The notice lies to the right of the page: it comes in from that side
    // while the page leaves to the left. Which of the two rules applies is
    // decided by the document that arrives - it styles the pseudo-elements -
    // so this also proves both documents opted in.
    await expect
      .poll(() => transitionNames(page))
      .toEqual(expect.arrayContaining(['my-view-in-right', 'my-view-out-left']));

    await page.locator('.my-privacy__back').click();
    await expect(page.locator('#profile')).toBeVisible();

    // Back again, and the movement mirrors.
    await expect
      .poll(() => transitionNames(page))
      .toEqual(expect.arrayContaining(['my-view-in-left', 'my-view-out-right']));
  });

  test('verzichtet bei reduzierter Bewegung auf die Überblendung', async ({
    page,
    isMobile,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await recordViewTransitions(page);

    await page.goto('/');
    await openMenu(page, isMobile);
    await page.locator(`.my-navi__link[href="${privacyPath}"]`).click();
    await expect(page.locator('#privacy')).toBeVisible();

    // The opt-in sits inside the `no-preference` query, so nothing animates -
    // the step over is instant, and the notice is there all the same.
    expect(await page.evaluate(() => window.__viewTransition?.ran ?? false)).toBe(
      false,
    );
  });

  test('ist direkt verlinkbar', async ({ page }) => {
    // A route of its own, prerendered as a file of its own: a call from
    // outside lands in the notice without the start page being involved.
    await page.goto(privacyPath);

    await expect(page.locator('#privacy')).toBeVisible();
    await expect(page.locator('#profile')).toHaveCount(0);
  });

  test('markiert den eigenen Navigationspunkt', async ({ page }) => {
    await page.goto(privacyPath);

    const link = page.locator(`.my-navi__link[href="${privacyPath}"]`);

    // No scrollspy can see a route - the path decides, and it does so on the
    // server already, so the mark stands before any script has run.
    await expect(link).toHaveAttribute('aria-current', 'true');
    await expect(link).toHaveClass(/my-navi__link--active/);
  });

  test('rendert Überschrift, Einleitung und alle Kapitel', async ({ page }) => {
    await page.goto(privacyPath);

    const view = page.locator('#privacy');

    // Its own document, so its own h1 - and exactly one of them.
    await expect(
      view.getByRole('heading', { name: privacyTitle, level: 1 }),
    ).toBeVisible();
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(view).toContainText(privacyLead);

    for (const chapter of privacyChapters) {
      await expect(
        view.getByRole('heading', { name: chapter.title, level: 2 }),
      ).toBeVisible();
    }

    await expect(view.locator('.my-privacy__block')).toHaveCount(blockCount);
  });

  test('nennt die verantwortliche Stelle mit Anschrift und E-Mail', async ({
    page,
  }) => {
    await page.goto(privacyPath);

    const address = page.locator('#privacy address');

    for (const line of controller?.address?.lines ?? []) {
      await expect(address).toContainText(line);
    }

    await expect(
      address.locator(`a[href="mailto:${controller?.address?.mail}"]`),
    ).toBeVisible();
  });

  test('kommt beim Druck allein aufs Blatt', async ({ page }) => {
    await page.goto(privacyPath);
    await page.emulateMedia({ media: 'print' });

    // The notice is the whole document here, so it prints as it stands - the
    // print rules of the start page must not reach into it.
    await expect(page.locator('#privacy')).toBeVisible();
    await expect(page.locator('.my-navi')).toBeHidden();
    // The back button is a control and does not belong on paper.
    await expect(page.locator('.my-privacy__back')).toBeHidden();
  });

  test('hat keine WCAG-2.1-AA-Verstöße', async ({ page }) => {
    await page.goto(privacyPath);
    await expect(page.locator('#privacy')).toBeVisible();

    const results = await new AxeBuilder({ page })
      .include('#privacy')
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    expect(
      results.violations.map((violation) => ({
        id: violation.id,
        nodes: violation.nodes.map((node) => node.html),
      })),
    ).toEqual([]);
  });

  test('hydriert ohne Server/Client-Mismatch', async ({ page }) => {
    const problems: string[] = [];

    page.on('console', (message) => {
      if (message.type() !== 'error' && message.type() !== 'warning') return;
      if (/hydrat|mismatch/i.test(message.text())) problems.push(message.text());
    });
    page.on('pageerror', (error) => problems.push(error.message));

    await page.goto(privacyPath);
    await expect(page.locator('#privacy')).toBeVisible();
    // Vue reports hydration problems only after the client mount.
    await page.waitForLoadState('networkidle');

    expect(problems).toEqual([]);
  });
});
