/**
 * Data model for the imprint.
 */

/** One line of the provider details. */
export interface ImprintEntry {
  id: string;
  /** The label on the left, e.g. `Anschrift`. */
  label: string;
  /** The value, one line per entry - the address brings several. */
  lines: string[];
  /** Optional target, e.g. `mailto:` for the email address. */
  href?: string;
}

/** A legal note below the provider details. */
export interface ImprintNote {
  id: string;
  title: string;
  paragraphs: string[];
}
