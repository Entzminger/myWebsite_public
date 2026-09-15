import type { PersonImageSize, PersonProfiles } from '@/types/person';

/**
 * The facts that identify the person and the site itself. More than one place
 * needs them: the hero writes them into the meta data, the resume into its
 * structured data, and the contact section links the same profiles. A search
 * engine ties this page to the profiles elsewhere only when every one of them
 * names the exact same URL, so they stand here once instead of three times.
 *
 * Like `chips`, `card` and `cta` this folder is a shared building block, not a
 * section - importing from here crosses no section boundary.
 */

/**
 * The name itself. The hero, the resume and the privacy notice all state it,
 * which is one place too many for a literal to be repeated in - the sections
 * derive theirs from here.
 */
export const personName: string = 'Philipp Entzminger';

/** Canonical origin, with the trailing slash the canonical URL carries. */
export const siteUrl: string = 'https://entzminger.dev/';

/** Meta data may not be relative, so every path becomes absolute here. */
export const absoluteUrl = (path: string): string => new URL(path, siteUrl).href;

export const personProfiles: PersonProfiles = {
  linkedin: 'https://www.linkedin.com/in/philipp-entzminger-188295352/',
  xing: 'https://www.xing.com/profile/Philipp_Entzminger',
  github: 'https://github.com/Entzminger',
};

/** The same profiles as a flat list - the form `sameAs` expects. */
export const personProfileUrls: string[] = Object.values(personProfiles);

/**
 * The sharing image lives in `public/`, not in `assets/`: a preview URL has to
 * stay the same across builds, and the hash Vite puts on a processed asset
 * does not. It is the portrait, so it is square - which is why the page asks
 * for the square `summary` card and not the wide one.
 */
export const personImage: string = absoluteUrl('/philipp-entzminger.png');

export const personImageSize: PersonImageSize = { width: 2364, height: 2364 };
