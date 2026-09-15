/**
 * Data model for the presenter/hero section.
 */

import type { CtaColor } from './cta';

/**
 * The portrait above the synthesis card in the right column. The file itself
 * lives under `app/assets/img/` and is imported in the component, so that Vite
 * serves it with a hash.
 */
export interface PresenterPortrait {
  /** Describes the person shown, not the picture. */
  alt: string;
  /** Intrinsic size of the file, so nothing jumps before it has loaded. */
  width: number;
  height: number;
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
