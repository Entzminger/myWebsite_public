/**
 * Data model for the highlights list.
 */

/** One point of the list: a short label and the sentence that explains it. */
export interface Highlight {
  id: string;
  label: string;
  detail: string;
}
