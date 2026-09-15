/**
 * Data model for the contact section.
 */

/** Decides whether a field is rendered as an `input` or as a `textarea`. */
export type ContactFieldType = 'text' | 'email' | 'textarea';

/** The fields of the form - at the same time the keys of the form state. */
export type ContactFieldId = 'name' | 'email' | 'message';

/** An input field of the contact form. */
export interface ContactField {
  id: ContactFieldId;
  label: string;
  type: ContactFieldType;
  placeholder: string;
  /** Value for `autocomplete`, so the browser can prefill what it knows. */
  autocomplete: string;
}

/** A profile on an external platform, shown as an icon link. */
export interface ContactProfile {
  id: string;
  /** Name of the platform, visible next to the icon. */
  label: string;
  url: string;
  /**
   * Its own `viewBox` per brand - the logos come from different grids and are
   * not converted onto a common one.
   */
  viewBox: string;
  iconPath: string;
}
