import { readFileSync } from 'node:fs';

// The version the footer shows. It is read here rather than imported into a
// component: an `import` of `package.json` would drag the whole file - scripts,
// every dependency and its range - into the client bundle for the sake of one
// string. This keeps `package.json` the single place the number is maintained.
const { version } = JSON.parse(
  readFileSync(new URL('./package.json', import.meta.url), 'utf8'),
) as { version: string };

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['@/assets/styles/base.scss'],
  // Baked in at build time - the static export has no server to read it at
  // runtime, which is exactly what is wanted: server and client render the
  // same string, so hydration has nothing to disagree about.
  runtimeConfig: { public: { version } },
  // The crawler finds the notice through the navigation link anyway; naming it
  // means a broken link in the bar would fail the build instead of silently
  // dropping the route from the export.
  nitro: { prerender: { routes: ['/privacy'] } },
  app: {
    head: {
      // Without this the document says nothing about its language - a search
      // engine has to guess it from the text, and WCAG 2.1 fails on 3.1.1
      // (Language of Page, Level A).
      htmlAttrs: { lang: 'de' },
      meta: [
        // The dark ground of the page, so browser chrome on mobile matches it.
        { name: 'theme-color', content: '#020617' },
      ],
      link: [
        // The .ico stands first, and that order is for Google rather than for a
        // browser. Its list of favicon formats is BMP, GIF, ICO, PNG, JPEG, PPM
        // and TIFF - SVG is not on it, and Google takes exactly one icon per
        // host. With the SVG in front, the one it looks at first is one it
        // cannot read, and the search result falls back to the grey
        // placeholder. The .ico carries a 48x48 frame, which is the size the
        // documentation asks for.
        //
        // Browsers are unaffected: they weigh `type` and `sizes` rather than
        // document order and still take the SVG, which is why it stays.
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico', sizes: '48x48' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png', sizes: '180x180' },
      ],
    },
  },
});
