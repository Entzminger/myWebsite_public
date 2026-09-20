import { iconPaths } from '@/src/parts/icon/icon.data';
import { personName } from '@/src/parts/person/person.data';
import type {
  PresenterAction,
  PresenterFocus,
  PresenterGlyph,
  PresenterPortrait,
} from '@/types/presenter';

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
  { id: 'frontend', label: 'Frontend', iconPath: iconPaths.layout, accent: true },
  { id: 'backend', label: 'Backend', iconPath: iconPaths.server },
  { id: 'database', label: 'Datenbank', iconPath: iconPaths.database },
  { id: 'ai', label: 'KI', iconPath: iconPaths.sparkles },
  { id: 'wcag', label: 'WCAG', iconPath: iconPaths.accessibility },
];

export const actions: PresenterAction[] = [
  {
    id: 'contact',
    label: 'Kontakt aufnehmen',
    href: '#contact',
    color: 'primary',
    iconPath: iconPaths.mail,
  },
];
