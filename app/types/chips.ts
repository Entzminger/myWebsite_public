/**
 * Data model for chip lists (`Chips` component).
 */

/** The two sizes the project knows. */
export type ChipSize = 'small' | 'large';

/**
 * The colour setting of a chip - one set of border, ground and type each,
 * taken from the central tokens.
 *
 * Sections with a brand colour of their own (GitHub, foundation) stay on
 * `neutral` and override `--my-chips-border`, `--my-chips-background` and
 * `--my-chips-ink` on the list instead: those colours belong to the linked
 * brand, not to the design system.
 */
export type ChipColor = 'neutral' | 'primary' | 'accent';

/** A single chip. */
export interface Chip {
  /** The visible label; at the same time the key of the list. */
  text: string;
  /** Optional icon path (24×24, stroke-based) before the label. */
  iconPath?: string;
  /** Optional colour setting, `neutral` by default. */
  color?: ChipColor;
}
