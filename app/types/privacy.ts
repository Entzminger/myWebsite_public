/**
 * Data model for the privacy notice.
 */

/** The postal details of the controller, as § 5 DDG and Art. 13 GDPR ask. */
export interface PrivacyAddress {
  lines: string[];
  mail: string;
}

/** One numbered block below a chapter heading. */
export interface PrivacyBlock {
  id: string;
  title: string;
  paragraphs: string[];
  /** Optional bullet list below the paragraphs. */
  items?: string[];
  /** Optional address block, e.g. the controller. */
  address?: PrivacyAddress;
}

/** A numbered chapter of the notice. */
export interface PrivacyChapter {
  id: string;
  title: string;
  blocks: PrivacyBlock[];
}
