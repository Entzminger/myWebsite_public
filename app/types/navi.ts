/**
 * Data model for the main navigation.
 */

/** A navigation item pointing at a section of the page or at a route. */
export interface NaviItem {
  /** Id of the target section - anchor and key of the active state alike. */
  id: string;
  label: string;
  /** Anchor on the start page, or the path of a route of its own. */
  href: string;
  /**
   * Set when the entry is a route rather than a section of the page: the
   * privacy notice is a document of its own. No scrollspy can see such an
   * entry, so the current path decides when it is the active one.
   */
  route?: boolean;
}
