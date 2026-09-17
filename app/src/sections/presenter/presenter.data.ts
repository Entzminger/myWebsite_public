import { personName } from '@/src/parts/person/person.data';
import type {
  PresenterAction,
  PresenterFocus,
  PresenterGlyph,
  PresenterPortrait,
} from '@/types/presenter';

/** Icon paths (24×24, stroke-based) for the focus areas and the actions. */
const icons = {
  database:
    'M12 3c4.4 0 8 1.3 8 3s-3.6 3-8 3-8-1.3-8-3 3.6-3 8-3ZM4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3',
  server:
    'M4 4h16v6H4V4Zm0 10h16v6H4v-6Zm3.5-7h.01M7.5 17h.01',
  layout: 'M4 4h16v16H4V4Zm0 6h16M10 10v10',
  sparkles:
    'M12 3.5 13.6 8 18 9.6 13.6 11.2 12 15.7 10.4 11.2 6 9.6 10.4 8 12 3.5ZM18.5 15.5l.7 1.9 1.9.7-1.9.7-.7 1.9-.7-1.9-1.9-.7 1.9-.7.7-1.9ZM5.5 14l.6 1.6 1.6.6-1.6.6L5.5 19l-.6-1.6-1.6-.6 1.6-.6L5.5 14Z',
  accessibility:
    'M12 3.1a1.7 1.7 0 1 0 0 3.4 1.7 1.7 0 1 0 0-3.4ZM6.6 9.6h10.8M12 7.7v6.2M12 13.9 9.4 20.9M12 13.9l2.6 7',
  arrowDown: 'M12 4v13m0 0 5-5m-5 5-5-5M4 21h16',
  mail: 'M5 5h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Zm-1.6 1.7 8.6 5.8 8.6-5.8',
} as const;

// The section still knows no other section (feature isolation) - the name now
// comes from the shared `person` module instead, which is no section either.
// The role stays here: only this section states it in that wording.
export const presenterName: string = personName;
export const presenterRole = 'Senior Softwareentwickler mit Frontend-Fokus';

export const presenterIntro: string[] = [
  'In meiner 18 jährigen Praxiserfahrung war ich in allen Softwarebereichen tätig (Fullstack: Frontend, Backend, Datenbank).',
  'Mein klarer Schwerpunkt liegt heute in der Frontend-Entwicklung, wo ich die perfekte Synthese aus präziser Programmierung und visuellem Design erstelle. Die Codequalität ist mir dabei stets ein großes Anliegen.',
  'Ich liebe es, intuitive digitale Erlebnisse zu erschaffen, die Nutzer begeistern und die Barrierefreiheit nicht vergessen. Die dynamischen Entwicklungen im Bereich der KI nutze ich dabei aktiv als Chance für innovative Lösungen.',
];

export const presenterPortrait: PresenterPortrait = {
  alt: `${presenterName}, ${presenterRole}`,
  // The narrow file is the one in `<img src>`; 640 px covers the box up to
  // tablet, where it is at most 26rem = 416 px wide, with room for a dense
  // display.
  width: 640,
  height: 640,
  // 64rem is `tokens.$bp-lg` - from there on the hero stands in two columns
  // and the portrait keeps its full 416 px, which the wide file serves at
  // twice the density.
  wideFrom: '(min-width: 64rem)',
};

/**
 * Title and descriptions of the document. They stand here rather than in the
 * component because they are content like everything else in this file - and
 * because the test reads them from here instead of repeating the wording.
 *
 * Both descriptions open with the name on purpose: they are what a search
 * engine shows as the snippet, and the search that has to find this page is
 * the one for the person.
 */
export const presenterTitle: string = `${presenterName} – ${presenterRole}`;

// Kept at 160 characters: beyond that a search engine cuts the snippet off
// mid-sentence.
export const presenterDescription: string =
  `${presenterName}, Senior Softwareentwickler aus Kandel. 18 Jahre `
  + 'Fullstack-Erfahrung, heute Schwerpunkt Frontend: präzise Programmierung '
  + 'und visuelles Design.';

export const presenterOgDescription: string =
  `${presenterName} – 18 Jahre Fullstack-Erfahrung, heute mit klarem `
  + 'Schwerpunkt auf Frontend-Entwicklung, Barrierefreiheit und intuitiven '
  + 'digitalen Erlebnissen.';

export const presenterGlyphs: PresenterGlyph[] = [
  { id: 'code', char: '</>' },
  { id: 'braces', char: '{ }' },
];

export const focusAreas: PresenterFocus[] = [
  { id: 'frontend', label: 'Frontend', iconPath: icons.layout, accent: true },
  { id: 'backend', label: 'Backend', iconPath: icons.server },
  { id: 'database', label: 'Datenbank', iconPath: icons.database },
  { id: 'ai', label: 'KI', iconPath: icons.sparkles },
  { id: 'wcag', label: 'WCAG', iconPath: icons.accessibility },
];

export const actions: PresenterAction[] = [
  {
    id: 'contact',
    label: 'Kontakt aufnehmen',
    href: '#contact',
    color: 'primary',
    iconPath: icons.mail,
  },
];
