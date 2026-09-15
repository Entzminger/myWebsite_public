import type {
  FoundationFact,
  FoundationSite,
} from '@/types/foundation';
import type { Highlight } from '@/types/highlights';

/**
 * The mark of withalittlehelp.de.
 */
export const foundationFramePath =
  'M10 0h64a10 10 0 0 1 10 10v32a10 10 0 0 1-10 10H10A10 10 0 0 1 0 42V10A10 10 0 0 1 10 0z'
  + 'M10 2a8 8 0 0 0-8 8v32a8 8 0 0 0 8 8h64a8 8 0 0 0 8-8V10a8 8 0 0 0-8-8z';

/**
 * The staircase inside the frame: the polygon of the original, inset by the
 * border and rounded at its two upper corners with the original's radius 6.
 */
export const foundationStairsPath =
  'M2 44.24V8a6 6 0 0 1 6-6h68a6 6 0 0 1 5.6 3.84H68.4v7.68H55.6v7.68H42.8'
  + 'v7.68H30v7.68H17.2v7.68H4.4z';

export const foundationEyebrow = 'Ehrenamt';
export const foundationTitle = 'Eine Website für den guten Zweck';

export const foundationLead =
  'Neben dieser Seite betreue ich withalittlehelp.de – den Auftritt der '
  + 'Stiftung „With a little help from my friends“.';

export const foundationIntro =
  'Die Stiftung fördert Menschen in ihrer Region dabei, ihrer Arbeit für '
  + 'gemeinnützige Zwecke nachzugehen. Jedes Jahr gehen dafür 10.000 Euro an Vereine '
  + 'und Organisationen, die sich meist ehrenamtlich engagieren. Die Website ist '
  + 'das Schaufenster dieser Arbeit: Sie erklärt den Stiftungsgedanken, stellt '
  + 'die geförderten Projekte vor und macht Transparenz und Spendenweg ohne '
  + 'Umwege auffindbar.';

export const highlights: Highlight[] = [
  {
    id: 'operations',
    label: 'Umsetzung und Betrieb',
    detail: 'Von der Seite über das Deployment bis zur Domain läuft alles über mich.',
  },
  {
    id: 'handmade',
    label: 'Statisch und handgeschrieben',
    detail: 'HTML und CSS ohne Baukasten, ohne Tracker, ohne Cookie-Banner.',
  },
  {
    id: 'yearly',
    label: 'Jährlich fortgeschrieben',
    detail: 'Zum Jahresanfang kommen die neuen Spendenempfänger samt Bildern dazu.',
  },
];

export const facts: FoundationFact[] = [
  { id: 'amount', value: '10.000 €', label: 'Fördersumme pro Jahr' },
  { id: 'projects', value: '5', label: 'geförderte Projekte jährlich' },
];

export const site: FoundationSite = {
  name: 'With a little help from my friends',
  domain: 'withalittlehelp.de',
  url: 'https://withalittlehelp.de/',
  description:
    'Gemeinnützige Stiftung. Sie fördert Kultur, Sport, Bildung, Jugend- und Altenhilfe '
    + 'dort, wo bei der ehrenamtlichen Arbeit sonst das Geld knapp ist.',
  purposes: [
    'Kunst & Kultur',
    'Sport',
    'Jugendhilfe',
    'Altenhilfe',
    'Bildung',
    'Ehrenamt',
  ],
};

export const foundationCtaLabel = 'Website der Stiftung öffnen';
