/**
 * Data model for the foundation section.
 */

/** One figure of the foundation for the card. */
export interface FoundationFact {
  id: string;
  /** The number itself, already formatted. */
  value: string;
  label: string;
}

/** The linked website with the metadata the card shows. */
export interface FoundationSite {
  /** Name of the foundation as it calls itself. */
  name: string;
  /** Domain without the scheme - the card shows it as a mark. */
  domain: string;
  /** Link to the website. */
  url: string;
  description: string;
  /** The foundation's purposes in short form - purely informative. */
  purposes: string[];
}
