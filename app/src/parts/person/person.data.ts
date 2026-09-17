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
 * The mark in full size. Structured data points here: a consumer of it may
 * render the image at any size, so it gets the one that does not run out of
 * pixels.
 *
 * Both files live in `public/`, not in `assets/`: a URL that other services
 * cache has to stay the same across builds, and the hash Vite puts on a
 * processed asset does not.
 */
export const personImage: string = absoluteUrl('/logo.png');

export const personImageSize: PersonImageSize = { width: 1024, height: 1024 };

/**
 * The same mark, deliberately small, for the `og:image` of a shared link.
 *
 * The size is the whole point. Meta documents that WhatsApp draws the wide
 * banner - image above, title and text below - once the image is 300px or
 * wider, and falls back to the compact card - thumbnail on the left, title and
 * text beside it - below that. 256px buys the compact card, and stays well
 * clear of the 100px under which no preview shows at all.
 *
 * The trade is real and deliberate: this is also what LinkedIn and Xing get,
 * and they render it small in turn. The mark is a flat shape, so it survives
 * that better than a photograph would.
 */
export const personShareImage: string = absoluteUrl('/logo-256.png');

export const personShareImageSize: PersonImageSize = { width: 256, height: 256 };

/**
 * Describes the sharing image, not the person - the portrait has its own alt
 * text in the presenter. It still names the person, because that is what the
 * mark stands for.
 */
export const personImageAlt: string = `Logo von ${personName}: ein „E“ auf oranger Scheibe`;
