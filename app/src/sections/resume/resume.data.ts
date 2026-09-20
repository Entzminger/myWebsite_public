import { iconPaths } from '@/src/parts/icon/icon.data';
import type {
  ResumeContact,
  ResumeSkillGroup,
  ResumeStation,
} from '@/types/resume';

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
    iconPath: iconPaths.pin,
  },
  {
    id: 'mail',
    label: 'E-Mail',
    value: personEmail,
    href: `mailto:${personEmail}`,
    iconPath: iconPaths.mail,
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
