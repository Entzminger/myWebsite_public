import type { NaviItem } from '@/types/navi';

/** Wordmark to the left of the logo. The dot is coloured separately. */
export const brandName = 'Entzminger';

/** The start page, as the anchors of the other entries prefix it. */
export const startPath = '/';

/**
 * The route of the privacy notice. It is spelled out here because the
 * navigation owns its link targets - the route itself comes from the file name
 * `app/src/pages/privacy.vue`, the same way a section id and its entry below
 * have always had to be kept in step by hand.
 */
export const privacyPath = '/privacy';

// The sections of the start page, in document order. The ids match the `id`
// attributes of the corresponding sections. The anchors carry the leading `/`
// so they still point at the start page when the notice is what is open.
export const naviItems: NaviItem[] = [
  { id: 'profile', label: 'Über mich', href: `${startPath}#profile` },
  { id: 'cv', label: 'Berufslaufbahn', href: `${startPath}#cv` },
  { id: 'voluntary', label: 'Ehrenamt', href: `${startPath}#voluntary` },
  { id: 'github', label: 'GitHub', href: `${startPath}#github` },
  { id: 'contact', label: 'Kontakt', href: `${startPath}#contact` },
  { id: 'imprint', label: 'Impressum', href: `${startPath}#imprint` },
  { id: 'privacy', label: 'Datenschutz', href: privacyPath, route: true },
];
