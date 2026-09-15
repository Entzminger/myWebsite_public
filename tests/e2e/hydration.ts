import type { Page } from '@playwright/test';

/**
 * Waits until Vue has hydrated.
 *
 * Before that no handler hangs on the server-rendered markup: a click on the
 * burger goes nowhere, and a click on the submit button fires a real form
 * submit instead of `@submit.prevent`, which reloads the page and throws away
 * every bit of state. In a test both look like a fault of the component, when
 * they are only a click that came too early.
 *
 * Vue hangs `__vue_app__` on the element it mounts into, and it does so in the
 * browser only. It is a property rather than an attribute, hence the
 * `waitForFunction` - the sibling `data-v-app` attribute is no use here,
 * because `createSSRApp` does not set it the way `createApp` does.
 *
 * It used to be `aria-current` from the scrollspy instead. That stopped being
 * proof once the privacy notice became a route of its own: there the active
 * entry follows from the path, so the mark is in the server HTML already and
 * says nothing about whether the app is running.
 */
export const waitForHydration = async (page: Page): Promise<void> => {
  await page.waitForFunction(
    () => '__vue_app__' in (document.getElementById('__nuxt') ?? {}),
  );
};
