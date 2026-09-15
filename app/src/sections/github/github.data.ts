import type { GithubRepository } from '@/types/github';
import type { Highlight } from '@/types/highlights';

/**
 * The GitHub mark (Octocat) as a path, viewbox 98×96. It carries both the
 * large logo in the background and the icons inside the card.
 */
export const githubLogoPath =
  'M41.4395 69.3848C28.8066 67.8535 19.9062 58.7617 19.9062 46.9902C19.9062 42.2051 21.6289 37.0371 24.5 33.5918C23.2559 30.4336 23.4473 23.7344 24.8828 20.959C28.7109 20.4805 33.8789 22.4902 36.9414 25.2656C40.5781 24.1172 44.4062 23.543 49.0957 23.543C53.7852 23.543 57.6133 24.1172 61.0586 25.1699C64.0254 22.4902 69.2891 20.4805 73.1172 20.959C74.457 23.543 74.6484 30.2422 73.4043 33.4961C76.4668 37.1328 78.0937 42.0137 78.0937 46.9902C78.0937 58.7617 69.1934 67.6621 56.3691 69.2891C59.623 71.3945 61.8242 75.9883 61.8242 81.252L61.8242 91.2051C61.8242 94.0762 64.2168 95.7031 67.0879 94.5547C84.4102 87.9512 98 70.6289 98 49.1914C98 22.1074 75.9883 0 48.9043 0C21.8203 0 0 22.1074 0 49.1914C0 70.4375 13.4941 88.0469 31.6777 94.6504C34.2617 95.6074 36.75 93.8848 36.75 91.3008L36.75 83.6445C35.4102 84.2188 33.6875 84.6016 32.1562 84.6016C25.8398 84.6016 22.1074 81.1563 19.4277 74.7441C18.375 72.1602 17.2266 70.6289 15.0254 70.3418C13.877 70.2461 13.4941 69.7676 13.4941 69.1934C13.4941 68.0449 15.4082 67.1836 17.3223 67.1836C20.0977 67.1836 22.4902 68.9063 24.9785 72.4473C26.8926 75.2227 28.9023 76.4668 31.2949 76.4668C33.6875 76.4668 35.2187 75.6055 37.4199 73.4043C39.0469 71.7773 40.291 70.3418 41.4395 69.3848Z';

/**
 * A general sign for version control: a trunk with a branch coming off it.
 * Viewbox 96×96, meant as strokes (`stroke`, width 9, round caps) - it sits
 * behind the section as pure decoration, which is why it is a neutral motif
 * on purpose rather than a second brand mark.
 */
export const versionControlPaths = [
  // The trunk between the two commits of the main branch.
  'M19 30.5v35',
  // The branch: a quarter circle from the upper commit back onto the trunk.
  'M77 30.5A46.5 46.5 0 0 1 30.5 77',
  // The three commits as rings (circles drawn as paths, so that everything
  // stays one list and a single loop does in the template).
  'M19 7.5a11.5 11.5 0 1 0 0 23a11.5 11.5 0 1 0 0-23',
  'M19 65.5a11.5 11.5 0 1 0 0 23a11.5 11.5 0 1 0 0-23',
  'M77 7.5a11.5 11.5 0 1 0 0 23a11.5 11.5 0 1 0 0-23',
];

export const githubEyebrow = 'Open Source';
export const githubTitle = 'Code auf GitHub';

/** Lead-in to the link. */
export const githubLead =
  'Sieh Dir den Code meiner Website auf GitHub an.';

export const githubIntro =
  'Diese Seite ist kein Baukasten-Template: Sie wurde von mir erstellt und ihr '
  + 'Quellcode ist öffentlich. Wer sehen möchte, wie ich Komponenten schneide, '
  + 'Styles organisiere und teste, findet dort alles.';

export const highlights: Highlight[] = [
  {
    id: 'nuxt',
    label: 'Nuxt 4 mit Server-Side Rendering',
    detail: 'Universal Rendering, Anker-Navigation und SEO-Daten pro Sektion.',
  },
  {
    id: 'vue',
    label: 'Vue 3 mit Composition API',
    detail: 'Inhalte liegen getrennt vom Template als typisierte Datenmodelle in extra Dateien.',
  },
  {
    id: 'typing',
    label: 'TypeScript im Strict-Modus',
    detail: 'Alle Typen liegen gebündelt unter app/types, ein File pro Feature.',
  },
  {
    id: 'styles',
    label: 'SCSS mit Design-Tokens',
    detail: 'Zentrale Farben, Radien und Breakpoints, BEM als Namensschema.',
  },
  {
    id: 'quality',
    label: 'Playwright und axe',
    detail: 'E2E-Smoke-Tests und automatisierte WCAG-2.1-AA-Prüfung.',
  },
];

/** The repository of this website, the one this section links to. */
export const repository: GithubRepository = {
  fullName: 'Entzminger/myWebsite',
  url: 'https://github.com/Entzminger/myWebsite_public',
  description:
    'Persönliche Website als Nuxt-4-Single-Page: Vue mit Composition API – serverseitig gerendert und barrierefrei.',
  branch: 'main',
  topics: ['Nuxt 4', 'Vue 3', 'TypeScript', 'SCSS', 'SSR', 'Playwright'],
};

export const githubCtaLabel = 'Repository auf GitHub öffnen';
