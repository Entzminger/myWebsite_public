import type {
  ResumeContact,
  ResumeSkillGroup,
  ResumeStation,
} from '@/types/resume';

/** Icon paths (24×24, stroke-based) for the personal details. */
const icons = {
  pin: 'M12 21s7-5.7 7-11a7 7 0 1 0-14 0c0 5.3 7 11 7 11Zm0-8.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z',
  phone:
    'M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25c1.15.38 2.4.58 3.6.58a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.58 3.6a1 1 0 0 1-.25 1l-2.23 2.2Z',
  mail: 'M5 5h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Zm-1.6 1.7 8.6 5.8 8.6-5.8',
  calendar:
    'M7 3v3m10-3v3M3.5 9.5h17M5 6h14a1.5 1.5 0 0 1 1.5 1.5v11A1.5 1.5 0 0 1 19 20H5a1.5 1.5 0 0 1-1.5-1.5v-11A1.5 1.5 0 0 1 5 6Z',
} as const;

// Re-exported rather than restated: the JSON-LD below and the hero have to
// name the same person, letter for letter.
export { personName } from '@/src/parts/person/person.data';

export const personRole = 'Senior Softwareentwickler';

/** Stands twice on the page: in the contact details and in the JSON-LD. */
export const personEmail: string = 'philipp@entzminger.dev';

export const facts: string[] = [
  'Diplom-Informatiker (FH)',
  '18 Jahre Berufserfahrung',
  'Frontend Spezialist',
  'Problemlöser',
];

export const contacts: ResumeContact[] = [
  {
    id: 'address',
    label: 'Location',
    value: '76870 Kandel',
    iconPath: icons.pin,
  },
  {
    id: 'mail',
    label: 'E-Mail',
    value: personEmail,
    href: `mailto:${personEmail}`,
    iconPath: icons.mail,
  },
];

export const experience: ResumeStation[] = [
  {
    id: 'adesso',
    period: { prefix: 'Seit', from: { iso: '2022-08', label: '08.2022' } },
    title: 'adesso SE',
    place: 'Karlsruhe',
    description:
      'Entwicklung einer Frontend Bibliothek zum Einsatz auf verschiedenen Webseiten. Mit Fokus auf Barrierefreiheit und Server-Side Rendering',
    tags: ['Vue', 'Nuxt', 'TypeScript', 'vite', 'SSR', 'SCSS', 'Playwright', 'Storybook', 'WCAG', 'SEO'],
  },
  {
    id: 'ionos',
    period: { from: { iso: '2017-10', label: '10.2017' }, to: { iso: '2022-07', label: '07.2022' } },
    title: '1&1 Ionos SE',
    place: 'Karlsruhe',
    description:
      'Weiterentwicklung des Ionos Shops „ionos.de“ und dessen internationale Ausprägungen. Entwicklung des internen CMS.',
    tags: ['AngularJS', 'React', 'Svelte', 'JavaScript', 'Tailwind', 'CSS', 'PHP', 'Node.js', 'WCAG', 'SEO'],
  },
  {
    id: 'sopra-steria',
    period: {
      from: { iso: '2017-07', label: '07.2017' },
      to: { iso: '2017-09', label: '09.2017' },
    },
    title: 'Sopra Steria Consulting',
    description:
      'Entwicklung einer Schnittstelle im Bereich .NET für den Kunden Hessische Zentrale für Datenverarbeitung.',
    tags: ['.NET'],
  },
  {
    id: 'finanzen-net',
    period: {
      from: { iso: '2012-11', label: '11.2012' },
      to: { iso: '2017-06', label: '06.2017' },
    },
    title: 'finanzen.net GmbH',
    place: 'Karlsruhe',
    description:
      'Entwicklung und Betrieb der Finanzportale wie finanzen.net, boerse-online.de und boerse-frankfurt.de.',
    tags: ['.NET', 'JavaScript', 'jQuery', 'SQL', 'MongoDB', 'ElasticSearch', 'Azure', 'SEO'],
  },
  {
    id: 'netpioneer',
    period: {
      from: { iso: '2008-07', label: '07.2008' },
      to: { iso: '2012-10', label: '10.2012' },
    },
    title: 'diva-e NEXT GmbH (früher Netpioneer GmbH)',
    place: 'Karlsruhe',
    description:
      'Umsetzung von verschiedensten Kundenprojekten für Kunden wie EnBW, dpa, Trost und Kazenmaier.',
    tags: ['.NET', 'SQL', 'VBA', 'JavaScript', 'HTML', 'CSS'],
  },
];

export const education: ResumeStation[] = [
  {
    id: 'fh-worms',
    period: {
      from: { iso: '2001-10', label: '10.2001' },
      to: { iso: '2008-06', label: '06.2008' },
    },
    title: 'Diplom-Informatiker (FH)',
    place: 'Fachhochschule Worms',
    description: 'Informatik-Studium im Fachbereich Informatik.',
  },
  {
    id: 'medardt-mbm',
    period: {
      from: { iso: '1999', label: '1999' },
      to: { iso: '2001', label: '2001' },
    },
    title: 'Ausbildung zum Industriekaufmann',
    place: 'Medardt-MBM GmbH, Offenbach/Queich',
    description: 'Zweijährige kaufmännische Berufsausbildung.',
  },
];

export const skillGroups: ResumeSkillGroup[] = [
  {
    id: 'programming',
    label: 'Programmierung',
    items: ['Vue', 'Nuxt', 'TypeScript', 'JavaScript', 'Node.js', 'C#'],
  },
  {
    id: 'tools',
    label: 'Tools',
    items: ['Visual Studio Code', 'IntelliJ / WebStorm', 'git'],
  },
  {
    id: 'databases',
    label: 'Datenbanken',
    items: ['SQL', 'MongoDB', 'ElasticSearch'],
  },
];

export const languages: string[] = ['Deutsch', 'Englisch'];
