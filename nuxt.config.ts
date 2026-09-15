// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['@/assets/styles/base.scss'],
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
        // SVG first: modern browsers prefer it, the .ico stays the fallback.
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico', sizes: '48x48' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png', sizes: '180x180' },
      ],
    },
  },
});
