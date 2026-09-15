/**
 * Data model for the shared identity facts.
 */

/** The profiles that answer for the same person elsewhere. */
export interface PersonProfiles {
  linkedin: string;
  xing: string;
  github: string;
}

/** Intrinsic size of the sharing image, as the preview meta data states it. */
export interface PersonImageSize {
  width: number;
  height: number;
}
