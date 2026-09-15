/**
 * Data model for the GitHub section.
 */

/** The linked repository with the metadata the card shows. */
export interface GithubRepository {
  /** Display name in the form `owner/name`. */
  fullName: string;
  /** Link to the repository. */
  url: string;
  description: string;
  /** Default branch, as it stands on GitHub. */
  branch: string;
  /** Technologies used - purely informative. */
  topics: string[];
}
