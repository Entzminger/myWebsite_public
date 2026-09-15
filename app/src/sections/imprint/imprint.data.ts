import type { ImprintEntry, ImprintNote } from '@/types/imprint';

export const imprintEyebrow: string = 'Rechtliches';
export const imprintTitle: string = 'Impressum';
export const imprintLead: string =
  'Angaben gemäß § 5 DDG sowie § 18 Abs. 2 MStV.';

export const imprintProviderTitle: string = 'Anbieter';

/**
 * The mandatory details. `Verantwortlich für den Inhalt` stands as an entry of
 * its own on purpose, because § 18 (2) MStV asks for a separate mention - even
 * though it is the same person at the same address.
 */
export const imprintEntries: ImprintEntry[] = [
  {
    id: 'name',
    label: 'Name',
    lines: ['Philipp Entzminger'],
  },
  {
    id: 'address',
    label: 'Anschrift',
    lines: ['Schumanstr. 4', '76870 Kandel', 'Deutschland'],
  },
  {
    id: 'mail',
    label: 'E-Mail',
    lines: ['philipp@entzminger.dev'],
    href: 'mailto:philipp@entzminger.dev',
  },
  {
    id: 'responsible',
    label: 'Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV',
    lines: ['Philipp Entzminger', 'Anschrift wie oben'],
  },
];

export const imprintNotes: ImprintNote[] = [
  {
    id: 'content',
    title: 'Haftung für Inhalte',
    paragraphs: [
      'Die Inhalte dieser Seite habe ich mit Sorgfalt erstellt. Für ihre '
        + 'Richtigkeit, Vollständigkeit und Aktualität kann ich jedoch keine '
        + 'Gewähr übernehmen.',
      'Als Diensteanbieter bin ich nach § 7 Abs. 1 DDG für eigene Inhalte auf '
        + 'diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach '
        + '§§ 8 bis 10 DDG bin ich als Diensteanbieter aber nicht verpflichtet, '
        + 'übermittelte oder gespeicherte fremde Informationen zu überwachen.',
    ],
  },
  {
    id: 'links',
    title: 'Haftung für Links',
    paragraphs: [
      'Diese Seite verlinkt auf externe Websites, auf deren Inhalte ich keinen '
        + 'Einfluss habe. Für diese fremden Inhalte ist stets der jeweilige '
        + 'Anbieter verantwortlich.',
      'Zum Zeitpunkt der Verlinkung waren dort keine Rechtsverstöße erkennbar. '
        + 'Werde ich auf eine Rechtsverletzung aufmerksam, entferne ich den Link '
        + 'umgehend.',
    ],
  },
  {
    id: 'copyright',
    title: 'Urheberrecht',
    paragraphs: [
      'Die von mir erstellten Inhalte und Werke auf dieser Seite unterliegen '
        + 'dem deutschen Urheberrecht. Vervielfältigung, Bearbeitung und '
        + 'Verbreitung außerhalb der Grenzen des Urheberrechts bedürfen meiner '
        + 'schriftlichen Zustimmung.',
    ],
  },
];
