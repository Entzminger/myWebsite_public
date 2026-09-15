import { defineConfig, devices } from '@playwright/test';

const port = Number(process.env.PLAYWRIGHT_PORT ?? 3000);
const baseURL = `http://localhost:${port}`;

export default defineConfig({
  testDir: './tests/e2e',
  // Without this Playwright would read the root `tsconfig.json`, which holds
  // nothing but references - the `@` alias of the specs would stay unresolved.
  tsconfig: './tsconfig.test.json',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : 'list',

  use: {
    baseURL,
    locale: 'de-DE',
    trace: 'on-first-retry',
  },

  projects: [
    // Runs once before all tests, as soon as the server is up: one real page
    // visit, so the workers do not hit the cold dev server all at once.
    {
      name: 'warmup',
      testMatch: /warmup\.setup\.ts$/,
    },
    {
      name: 'desktop-chromium',
      use: { ...devices['Desktop Chrome'] },
      dependencies: ['warmup'],
    },
    {
      name: 'mobile-chromium',
      use: { ...devices['Pixel 5'] },
      dependencies: ['warmup'],
    },
  ],

  // Locally against the dev server, in CI against the production build (SSR).
  // `--port` has to be passed along, otherwise the server stubbornly binds
  // 3000 while Playwright waits on `PLAYWRIGHT_PORT` and runs into its
  // timeout. Only with it does `PLAYWRIGHT_PORT=3100 yarn test:e2e` steer the
  // suite around a port that is already taken.
  webServer: {
    command: process.env.CI
      ? `yarn build && yarn preview --port ${port}`
      : `yarn dev --port ${port}`,
    url: baseURL,
    reuseExistingServer: false,
    timeout: 180_000,
  },
});
