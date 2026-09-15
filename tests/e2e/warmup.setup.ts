import { test as setup } from '@playwright/test';
import { waitForHydration } from './hydration';

/**
 * Warms up the dev server before the actual tests start.
 *
 * `yarn dev` compiles on demand: the page itself and every module the browser
 * pulls in afterwards go through Nitro and the Vite transform on first call.
 * If several parallel workers fall upon the cold server at once instead, each
 * of them waits on the same queue and the expectations run into their timeouts
 * one after another - failures that have nothing to do with the page.
 *
 * A single real page visit up front does that work once. It loads the page the
 * way a browser does (not just the SSR HTML) and waits for hydration, so that
 * the client modules are translated too.
 */
setup('wärmt den Server auf', async ({ page }) => {
  // The first call against a cold dev server takes considerably longer than
  // an ordinary test.
  setup.setTimeout(180_000);

  await page.goto('/');
  await waitForHydration(page);
});
