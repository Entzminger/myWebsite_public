/**
 * Data model for the presenter/hero section.
 */

import type { CtaColor } from './cta';

/**
 * The portrait above the synthesis card in the right column. The files live
 * under `app/assets/img/` and are imported in the component, so that Vite
 * serves them with a hash. There are two of them: the box is never wider than
 * 26rem, so one file for everything up to tablet and a second, denser one from
 * the two-column layout on is enough - the master at 2364 px was five times
 * the pixels the page ever showed.
 */
export interface PresenterPortrait {
  /** Describes the person shown, not the picture. */
  alt: string;
  /**
   * Intrinsic size of the file behind `<img src>`, so nothing jumps before it
   * has loaded. Both variants are square, so the reserved box fits either.
   */
  width: number;
  height: number;
  /**
   * Media query that switches to the wide file. It has to stay in step with
   * `tokens.$bp-lg` by hand: a `<source media>` is an HTML attribute and
   * cannot read the SCSS variable.
   */
  wideFrom: string;
}

/** A decorative glyph behind the portrait. */
export interface PresenterGlyph {
  id: string;
  /** The glyph itself - pure decoration, invisible to screen readers. */
  char: string;
}

/** A focus chip next to the copy. */
export interface PresenterFocus {
  id: string;
  label: string;
  /** Icon path (24×24, stroke-based). */
  iconPath: string;
  /** Lifts today's focus out with the brand colour. */
  accent?: boolean;
}

/** A call-to-action button below the copy. */
export interface PresenterAction {
  id: string;
  label: string;
  href: string;
  /**
   * The colour setting of the button: `primary` is the loud main path,
   * `neutral` the quiet second one beside it.
   */
  color: CtaColor;
  /** Icon path (24×24, stroke-based). */
  iconPath: string;
}
