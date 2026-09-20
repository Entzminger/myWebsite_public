/**
 * Every icon of the page in one place. Like `person` this folder is a shared
 * building block without a component of its own - importing from here crosses
 * no section boundary.
 *
 * The reason it exists is that the same drawing was written out more than
 * once: the envelope stood letter for letter in `presenter.data.ts` and in
 * `resume.data.ts`, the arrow out of the box inline in both `Foundation.vue`
 * and `Github.vue`. Two copies of a path cannot be kept in step by hand - the
 * second one is simply forgotten.
 *
 * Naming follows what the drawing *depicts*, not what it is used for
 * (`arrowLeft`, not `arrowBack`): whoever needs a left-pointing arrow next
 * will not look for the role this one happens to play today.
 */

/**
 * The line icons. All of them sit on the 24×24 grid and are drawn with
 * `stroke`, never `fill` - the wrapper around them is always the same:
 *
 * ```vue
 * <svg
 *   viewBox="0 0 24 24"
 *   fill="none"
 *   stroke="currentColor"
 *   stroke-width="2"
 *   stroke-linecap="round"
 *   stroke-linejoin="round"
 *   aria-hidden="true"
 *   focusable="false"
 * >
 *   <path :d="iconPaths.mail" />
 * </svg>
 * ```
 *
 * One string per icon, even where the drawing needs several strokes: each
 * partial path starts with an absolute `M`, so they concatenate into a single
 * `d` without changing a pixel. That keeps the model of every consumer a
 * plain `iconPath: string`.
 */
export const iconPaths = {
  /** The standing figure with outstretched arms - the accessibility glyph. */
  accessibility:
    'M12 3.1a1.7 1.7 0 1 0 0 3.4 1.7 1.7 0 1 0 0-3.4ZM6.6 9.6h10.8M12 7.7v6.2M12 13.9 9.4 20.9M12 13.9l2.6 7',
  /** Arrow pointing left, on a line - the way back. */
  arrowLeft: 'M11 6l-6 6 6 6M5 12h14',
  /** Arrow pointing up. */
  arrowUp: 'M12 20V5m0 0-6 6m6-6 6 6',
  /** The check mark of the highlight lists. */
  check: 'm4 12 5.5 5.5L20 7',
  /** Stacked discs. */
  database:
    'M12 3c4.4 0 8 1.3 8 3s-3.6 3-8 3-8-1.3-8-3 3.6-3 8-3ZM4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3',
  /** Arrow leaving an open box - marks a link to another site. */
  externalLink: 'M7 17 17 7M8 7h9v9',
  /** A page divided into sidebar and content. */
  layout: 'M4 4h16v16H4V4Zm0 6h16M10 10v10',
  /** Envelope. */
  mail: 'M5 5h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Zm-1.6 1.7 8.6 5.8 8.6-5.8',
  /** Paper plane - sending. */
  paperPlane: 'M21.5 2.5 10.5 13.5M21.5 2.5l-7 19-4-8.5-8.5-4 19.5-6.5Z',
  /** Map pin. */
  pin: 'M12 21s7-5.7 7-11a7 7 0 1 0-14 0c0 5.3 7 11 7 11Zm0-8.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z',
  /** Printer with a sheet in front of it. */
  printer:
    'M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2M6 14h12v8H6z',
  /** Two stacked rack units with their status lights. */
  server: 'M4 4h16v6H4V4Zm0 10h16v6H4v-6Zm3.5-7h.01M7.5 17h.01',
  /** A large and two small four-pointed stars. */
  sparkles:
    'M12 3.5 13.6 8 18 9.6 13.6 11.2 12 15.7 10.4 11.2 6 9.6 10.4 8 12 3.5ZM18.5 15.5l.7 1.9 1.9.7-1.9.7-.7 1.9-.7-1.9-1.9-.7 1.9-.7.7-1.9ZM5.5 14l.6 1.6 1.6.6-1.6.6L5.5 19l-.6-1.6-1.6-.6 1.6-.6L5.5 14Z',
} as const;

/**
 * The brand marks. They sit on the same 24×24 box as the line icons above but
 * are solid shapes, so they are drawn with `fill="currentColor"` and without
 * any `stroke` - kept apart from `iconPaths` so that no consumer reaches for
 * one of them with the stroke wrapper.
 *
 * The marks of the two linked sites are deliberately not among them, for the
 * same reason the brand colours stay with their section: each is drawn on a
 * box of its own and its paths carry their own `fill-rule`/`fill`, so they are
 * not interchangeable with anything here. GitHub's Octocat sits on 98×96,
 * which it shares with the commit graph behind that section, and the mark of
 * the foundation on 84×52, split into frame and staircase so that one use site
 * can set them apart. Both stay in their section - as does the "E" of this
 * site's own wordmark in `logo/`, an outline lifted out of a font file rather
 * than an icon.
 */
export const brandIconPaths = {
  linkedin:
    'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  xing:
    'M18.188 0c-.517 0-.741.325-.927.66 0 0-7.455 13.224-7.702 13.657.015.024 4.919 9.023 4.919 9.023.17.308.436.66.967.66h3.454c.211 0 .375-.078.463-.22.089-.151.089-.346-.009-.536l-4.879-8.916a.023.023 0 0 1 0-.022L22.139.756c.095-.191.097-.387.008-.535C22.06.078 21.897 0 21.686 0h-3.498zM3.648 4.74c-.211 0-.385.074-.473.216-.09.149-.078.339.02.531l2.34 4.05c.004.01.004.016 0 .021L1.86 16.051c-.099.188-.093.381 0 .529.085.142.239.234.45.234h3.461c.518 0 .766-.348.945-.667l3.734-6.609-2.378-4.155c-.172-.315-.434-.659-.962-.659H3.648z',
} as const;
