import type { PrivacyChapter } from '@/types/privacy';

/**
 * The privacy notice. It follows the structure of the e-recht24 template the
 * foundation's site uses as well, but every passage describes what this page
 * really does: no cookies, no analytics, no external resources, and a contact
 * form that never sends anything to a server of mine.
 *
 * Like the imprint the text speaks in the first person - it is one person who
 * runs this page, and a plural would only pretend otherwise.
 */
export const privacyEyebrow: string = 'Rechtliches';
export const privacyTitle: string = 'Datenschutz';
export const privacyLead: string =
  'Informationen nach Art. 13 und 14 DSGVO zur Verarbeitung Ihrer Daten auf '
  + 'dieser Website.';

export const privacyChapters: PrivacyChapter[] = [
  {
    id: 'overview',
    title: '1. Datenschutz auf einen Blick',
    blocks: [
      {
        id: 'general',
        title: 'Allgemeine Hinweise',
        paragraphs: [
          'Die folgenden Hinweise geben einen einfachen Überblick darüber, '
            + 'was mit Ihren personenbezogenen Daten passiert, wenn Sie diese '
            + 'Website besuchen. Personenbezogene Daten sind alle Daten, mit '
            + 'denen Sie persönlich identifiziert werden können. Ausführliche '
            + 'Informationen entnehmen Sie den folgenden Abschnitten.',
        ],
      },
      {
        id: 'responsible',
        title: 'Wer ist für die Datenerfassung auf dieser Website verantwortlich?',
        paragraphs: [
          'Die Datenverarbeitung auf dieser Website erfolgt durch mich als '
            + 'Betreiber der Website. Meine Kontaktdaten finden Sie im '
            + 'Abschnitt „Hinweis zur verantwortlichen Stelle“ weiter unten '
            + 'sowie im Impressum.',
        ],
      },
      {
        id: 'collection',
        title: 'Wie erfasse ich Ihre Daten?',
        paragraphs: [
          'Ihre Daten erhalte ich zum einen dadurch, dass Sie sie mir '
            + 'mitteilen – etwa, wenn Sie mir über das Kontaktformular oder '
            + 'direkt eine E-Mail schreiben.',
          'Andere Daten erfasst mein Hoster automatisch beim Aufruf der '
            + 'Website. Das sind vor allem technische Daten wie Browser, '
            + 'Betriebssystem, IP-Adresse oder die Uhrzeit des Seitenaufrufs.',
        ],
      },
      {
        id: 'purpose',
        title: 'Wofür nutze ich Ihre Daten?',
        paragraphs: [
          'Die technischen Daten dienen allein dem fehlerfreien Betrieb der '
            + 'Website und ihrer Sicherheit. Ihre Nachrichten nutze ich '
            + 'ausschließlich, um Ihr Anliegen zu beantworten.',
          'Eine Analyse Ihres Nutzerverhaltens findet nicht statt: Diese '
            + 'Website setzt keine Cookies, bindet keine externen Dienste ein '
            + 'und zählt keine Zugriffe.',
        ],
      },
      {
        id: 'rights',
        title: 'Welche Rechte haben Sie bezüglich Ihrer Daten?',
        paragraphs: [
          'Sie haben jederzeit das Recht, unentgeltlich Auskunft über '
            + 'Herkunft, Empfänger und Zweck Ihrer gespeicherten '
            + 'personenbezogenen Daten zu erhalten. Sie haben außerdem ein '
            + 'Recht, die Berichtigung oder Löschung dieser Daten zu '
            + 'verlangen. Haben Sie eine Einwilligung zur Datenverarbeitung '
            + 'erteilt, können Sie diese jederzeit für die Zukunft '
            + 'widerrufen. Unter bestimmten Umständen können Sie die '
            + 'Einschränkung der Verarbeitung verlangen. Des Weiteren steht '
            + 'Ihnen ein Beschwerderecht bei der zuständigen '
            + 'Aufsichtsbehörde zu.',
          'Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie '
            + 'sich jederzeit an mich wenden.',
        ],
      },
    ],
  },
  {
    id: 'hosting',
    title: '2. Hosting',
    blocks: [
      {
        id: 'strato',
        title: 'Strato',
        paragraphs: [
          'Ich hoste die Inhalte dieser Website bei der Strato AG, '
            + 'Otto-Ostrowski-Straße 7, 10249 Berlin (nachfolgend „Strato“). '
            + 'Wenn Sie diese Website besuchen, erfasst Strato verschiedene '
            + 'Logfiles inklusive Ihrer IP-Adresse.',
          'Weitere Informationen entnehmen Sie der Datenschutzerklärung von '
            + 'Strato: https://www.strato.de/datenschutz/.',
          'Die Verwendung von Strato erfolgt auf Grundlage von Art. 6 Abs. 1 '
            + 'lit. f DSGVO. Ich habe ein berechtigtes Interesse an einer '
            + 'möglichst zuverlässigen Darstellung dieser Website.',
        ],
      },
      {
        id: 'processing',
        title: 'Auftragsverarbeitung',
        paragraphs: [
          'Für die Nutzung des oben genannten Dienstes besteht ein Vertrag '
            + 'über Auftragsverarbeitung (AVV). Dabei handelt es sich um '
            + 'einen datenschutzrechtlich vorgeschriebenen Vertrag, der '
            + 'gewährleistet, dass der Anbieter die personenbezogenen Daten '
            + 'der Besucher dieser Website nur nach meinen Weisungen und '
            + 'unter Einhaltung der DSGVO verarbeitet.',
        ],
      },
      {
        id: 'logfiles',
        title: 'Server-Logfiles',
        paragraphs: [
          'Der Hoster erhebt und speichert automatisch Informationen in '
            + 'sogenannten Server-Logfiles, die Ihr Browser automatisch '
            + 'übermittelt: Browsertyp und -version, verwendetes '
            + 'Betriebssystem, Referrer-URL, Hostname des zugreifenden '
            + 'Rechners, Uhrzeit der Serveranfrage und IP-Adresse.',
          'Eine Zusammenführung dieser Daten mit anderen Datenquellen findet '
            + 'nicht statt. Die Erfassung erfolgt auf Grundlage von Art. 6 '
            + 'Abs. 1 lit. f DSGVO: Ich habe ein berechtigtes Interesse an '
            + 'der technisch fehlerfreien Darstellung und der Sicherheit '
            + 'dieser Website.',
        ],
      },
    ],
  },
  {
    id: 'obligations',
    title: '3. Allgemeine Hinweise und Pflichtinformationen',
    blocks: [
      {
        id: 'privacy',
        title: 'Datenschutz',
        paragraphs: [
          'Ich nehme den Schutz Ihrer persönlichen Daten sehr ernst und '
            + 'behandle Ihre personenbezogenen Daten vertraulich sowie '
            + 'entsprechend den gesetzlichen Datenschutzvorschriften und '
            + 'dieser Datenschutzerklärung.',
          'Ich weise darauf hin, dass die Datenübertragung im Internet – '
            + 'etwa bei der Kommunikation per E-Mail – Sicherheitslücken '
            + 'aufweisen kann. Ein lückenloser Schutz der Daten vor dem '
            + 'Zugriff durch Dritte ist nicht möglich.',
        ],
      },
      {
        id: 'controller',
        title: 'Hinweis zur verantwortlichen Stelle',
        paragraphs: [
          'Die verantwortliche Stelle für die Datenverarbeitung auf dieser '
            + 'Website ist:',
        ],
        address: {
          lines: ['Philipp Entzminger', 'Schumanstr. 4', '76870 Kandel', 'Deutschland'],
          mail: 'philipp@entzminger.dev',
        },
      },
      {
        id: 'controller-note',
        title: 'Was das bedeutet',
        paragraphs: [
          'Verantwortliche Stelle ist die natürliche oder juristische Person, '
            + 'die allein oder gemeinsam mit anderen über die Zwecke und '
            + 'Mittel der Verarbeitung von personenbezogenen Daten (z. B. '
            + 'Namen oder E-Mail-Adressen) entscheidet.',
        ],
      },
      {
        id: 'duration',
        title: 'Speicherdauer',
        paragraphs: [
          'Soweit innerhalb dieser Datenschutzerklärung keine speziellere '
            + 'Speicherdauer genannt wurde, verbleiben Ihre personenbezogenen '
            + 'Daten bei mir, bis der Zweck für die Datenverarbeitung '
            + 'entfällt. Wenn Sie ein berechtigtes Löschersuchen geltend '
            + 'machen oder eine Einwilligung widerrufen, werden Ihre Daten '
            + 'gelöscht, sofern keine anderen rechtlich zulässigen Gründe für '
            + 'die Speicherung bestehen – etwa steuer- oder handelsrechtliche '
            + 'Aufbewahrungsfristen. Im letztgenannten Fall erfolgt die '
            + 'Löschung nach Fortfall dieser Gründe.',
        ],
      },
      {
        id: 'legal-bases',
        title: 'Rechtsgrundlagen der Datenverarbeitung',
        paragraphs: [
          'Sofern Sie in die Datenverarbeitung eingewilligt haben, verarbeite '
            + 'ich Ihre personenbezogenen Daten auf Grundlage von Art. 6 '
            + 'Abs. 1 lit. a DSGVO. Die Einwilligung ist jederzeit '
            + 'widerrufbar. Sind Ihre Daten zur Vertragserfüllung oder zur '
            + 'Durchführung vorvertraglicher Maßnahmen erforderlich, '
            + 'verarbeite ich sie auf Grundlage von Art. 6 Abs. 1 lit. b '
            + 'DSGVO. Sind sie zur Erfüllung einer rechtlichen Verpflichtung '
            + 'erforderlich, geschieht dies auf Grundlage von Art. 6 Abs. 1 '
            + 'lit. c DSGVO. Darüber hinaus kann die Verarbeitung auf '
            + 'Grundlage meines berechtigten Interesses nach Art. 6 Abs. 1 '
            + 'lit. f DSGVO erfolgen. Über die jeweils einschlägige '
            + 'Rechtsgrundlage informieren die folgenden Absätze.',
        ],
      },
      {
        id: 'recipients',
        title: 'Empfänger von personenbezogenen Daten',
        paragraphs: [
          'Personenbezogene Daten gebe ich nur dann an externe Stellen '
            + 'weiter, wenn dies zur Vertragserfüllung erforderlich ist, wenn '
            + 'ich gesetzlich dazu verpflichtet bin, wenn ich ein '
            + 'berechtigtes Interesse nach Art. 6 Abs. 1 lit. f DSGVO an der '
            + 'Weitergabe habe oder wenn eine sonstige Rechtsgrundlage sie '
            + 'erlaubt. Einziger regelmäßiger Empfänger ist der oben genannte '
            + 'Hoster, mit dem ein Vertrag über Auftragsverarbeitung besteht.',
        ],
      },
      {
        id: 'revocation',
        title: 'Widerruf Ihrer Einwilligung zur Datenverarbeitung',
        paragraphs: [
          'Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen '
            + 'Einwilligung möglich. Eine bereits erteilte Einwilligung '
            + 'können Sie jederzeit widerrufen. Die Rechtmäßigkeit der bis '
            + 'zum Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf '
            + 'unberührt.',
        ],
      },
      {
        id: 'objection',
        title:
          'Widerspruchsrecht gegen die Datenerhebung in besonderen Fällen '
          + 'sowie gegen Direktwerbung (Art. 21 DSGVO)',
        paragraphs: [
          'Wenn die Datenverarbeitung auf Grundlage von Art. 6 Abs. 1 lit. e '
            + 'oder f DSGVO erfolgt, haben Sie jederzeit das Recht, aus '
            + 'Gründen, die sich aus Ihrer besonderen Situation ergeben, '
            + 'gegen die Verarbeitung Ihrer personenbezogenen Daten '
            + 'Widerspruch einzulegen; dies gilt auch für ein auf diese '
            + 'Bestimmungen gestütztes Profiling. Die jeweilige '
            + 'Rechtsgrundlage entnehmen Sie dieser Datenschutzerklärung. '
            + 'Wenn Sie Widerspruch einlegen, werde ich Ihre betroffenen '
            + 'personenbezogenen Daten nicht mehr verarbeiten, es sei denn, '
            + 'ich kann zwingende schutzwürdige Gründe für die Verarbeitung '
            + 'nachweisen, die Ihre Interessen, Rechte und Freiheiten '
            + 'überwiegen, oder die Verarbeitung dient der Geltendmachung, '
            + 'Ausübung oder Verteidigung von Rechtsansprüchen (Widerspruch '
            + 'nach Art. 21 Abs. 1 DSGVO).',
          'Werden Ihre personenbezogenen Daten verarbeitet, um Direktwerbung '
            + 'zu betreiben, so haben Sie das Recht, jederzeit Widerspruch '
            + 'gegen die Verarbeitung Sie betreffender personenbezogener '
            + 'Daten zum Zwecke derartiger Werbung einzulegen; dies gilt auch '
            + 'für das Profiling, soweit es mit solcher Direktwerbung in '
            + 'Verbindung steht. Wenn Sie widersprechen, werden Ihre '
            + 'personenbezogenen Daten anschließend nicht mehr zum Zwecke der '
            + 'Direktwerbung verwendet (Widerspruch nach Art. 21 Abs. 2 '
            + 'DSGVO).',
        ],
      },
      {
        id: 'complaint',
        title: 'Beschwerderecht bei der zuständigen Aufsichtsbehörde',
        paragraphs: [
          'Im Falle von Verstößen gegen die DSGVO steht den Betroffenen ein '
            + 'Beschwerderecht bei einer Aufsichtsbehörde zu, insbesondere in '
            + 'dem Mitgliedstaat ihres gewöhnlichen Aufenthalts, ihres '
            + 'Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes. Für '
            + 'meinen Sitz ist das der Landesbeauftragte für den Datenschutz '
            + 'und die Informationsfreiheit Rheinland-Pfalz. Das '
            + 'Beschwerderecht besteht unbeschadet anderweitiger '
            + 'verwaltungsrechtlicher oder gerichtlicher Rechtsbehelfe.',
        ],
      },
      {
        id: 'portability',
        title: 'Recht auf Datenübertragbarkeit',
        paragraphs: [
          'Sie haben das Recht, Daten, die ich auf Grundlage Ihrer '
            + 'Einwilligung oder in Erfüllung eines Vertrags automatisiert '
            + 'verarbeite, an sich oder an einen Dritten in einem gängigen, '
            + 'maschinenlesbaren Format aushändigen zu lassen. Sofern Sie die '
            + 'direkte Übertragung der Daten an einen anderen Verantwortlichen '
            + 'verlangen, erfolgt dies nur, soweit es technisch machbar ist.',
        ],
      },
      {
        id: 'access',
        title: 'Auskunft, Berichtigung und Löschung',
        paragraphs: [
          'Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen '
            + 'jederzeit das Recht auf unentgeltliche Auskunft über Ihre '
            + 'gespeicherten personenbezogenen Daten, deren Herkunft und '
            + 'Empfänger und den Zweck der Datenverarbeitung und '
            + 'gegebenenfalls ein Recht auf Berichtigung oder Löschung dieser '
            + 'Daten. Hierzu sowie zu weiteren Fragen können Sie sich '
            + 'jederzeit an mich wenden.',
        ],
      },
      {
        id: 'restriction',
        title: 'Recht auf Einschränkung der Verarbeitung',
        paragraphs: [
          'Sie haben das Recht, die Einschränkung der Verarbeitung Ihrer '
            + 'personenbezogenen Daten zu verlangen. Hierzu können Sie sich '
            + 'jederzeit an mich wenden. Das Recht auf Einschränkung der '
            + 'Verarbeitung besteht in folgenden Fällen:',
        ],
        items: [
          'Wenn Sie die Richtigkeit Ihrer bei mir gespeicherten '
            + 'personenbezogenen Daten bestreiten, benötige ich in der Regel '
            + 'Zeit, um dies zu überprüfen. Für die Dauer der Prüfung haben '
            + 'Sie das Recht, die Einschränkung der Verarbeitung zu verlangen.',
          'Wenn die Verarbeitung Ihrer personenbezogenen Daten unrechtmäßig '
            + 'geschah oder geschieht, können Sie statt der Löschung die '
            + 'Einschränkung der Datenverarbeitung verlangen.',
          'Wenn ich Ihre personenbezogenen Daten nicht mehr benötige, Sie sie '
            + 'jedoch zur Ausübung, Verteidigung oder Geltendmachung von '
            + 'Rechtsansprüchen brauchen, haben Sie das Recht, statt der '
            + 'Löschung die Einschränkung der Verarbeitung zu verlangen.',
          'Wenn Sie einen Widerspruch nach Art. 21 Abs. 1 DSGVO eingelegt '
            + 'haben, muss eine Abwägung zwischen Ihren und meinen Interessen '
            + 'vorgenommen werden. Solange noch nicht feststeht, wessen '
            + 'Interessen überwiegen, haben Sie das Recht, die Einschränkung '
            + 'der Verarbeitung zu verlangen.',
        ],
      },
      {
        id: 'restriction-effect',
        title: 'Folgen einer Einschränkung',
        paragraphs: [
          'Wenn Sie die Verarbeitung Ihrer personenbezogenen Daten '
            + 'eingeschränkt haben, dürfen diese Daten – von ihrer Speicherung '
            + 'abgesehen – nur mit Ihrer Einwilligung oder zur Geltendmachung, '
            + 'Ausübung oder Verteidigung von Rechtsansprüchen oder zum Schutz '
            + 'der Rechte einer anderen natürlichen oder juristischen Person '
            + 'oder aus Gründen eines wichtigen öffentlichen Interesses der '
            + 'Europäischen Union oder eines Mitgliedstaats verarbeitet werden.',
        ],
      },
      {
        id: 'tls',
        title: 'SSL- bzw. TLS-Verschlüsselung',
        paragraphs: [
          'Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der '
            + 'Übertragung vertraulicher Inhalte eine SSL- bzw. '
            + 'TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen '
            + 'Sie daran, dass die Adresszeile des Browsers von „http://“ auf '
            + '„https://“ wechselt und am Schloss-Symbol in Ihrer '
            + 'Browserzeile.',
          'Wenn die SSL- bzw. TLS-Verschlüsselung aktiviert ist, können die '
            + 'Daten, die Sie an mich übermitteln, nicht von Dritten '
            + 'mitgelesen werden.',
        ],
      },
    ],
  },
  {
    id: 'collection',
    title: '4. Datenerfassung auf dieser Website',
    blocks: [
      {
        id: 'cookies',
        title: 'Keine Cookies, kein Tracking, keine externen Dienste',
        paragraphs: [
          'Diese Website setzt keine Cookies und speichert nichts in Ihrem '
            + 'Browser. Es gibt keine Analyse- oder Reichweitenmessung, keine '
            + 'Werbenetzwerke und keine Social-Media-Plugins. Ein '
            + 'Cookie-Banner braucht es deshalb nicht.',
          'Auch Schriften, Bilder und Skripte liegen vollständig auf dem '
            + 'Server dieser Website. Beim Aufruf werden also keine Daten an '
            + 'Dritte wie Google Fonts oder ein Content Delivery Network '
            + 'übertragen. Verlinkungen auf GitHub, LinkedIn, Xing oder '
            + 'withalittlehelp.de führen erst nach Ihrem Klick auf die '
            + 'jeweilige Seite, für deren Datenverarbeitung deren Betreiber '
            + 'verantwortlich sind.',
        ],
      },
      {
        id: 'contact-form',
        title: 'Kontaktformular',
        paragraphs: [
          'Das Kontaktformular dieser Website sendet nichts an einen Server. '
            + 'Ihre Eingaben bleiben in Ihrem Browser: Beim Absenden setzt die '
            + 'Seite daraus eine vorbereitete E-Mail zusammen und öffnet sie '
            + 'in Ihrem eigenen E-Mail-Programm. Ob Sie diese Nachricht dann '
            + 'wirklich abschicken, entscheiden Sie.',
          'Erst mit dem Absenden in Ihrem E-Mail-Programm erreichen mich Ihre '
            + 'Angaben – auf demselben Weg wie jede andere E-Mail und unter '
            + 'den Bedingungen Ihres eigenen Anbieters. Solange Sie nicht '
            + 'absenden, entstehen mir keine Daten.',
        ],
      },
      {
        id: 'mail',
        title: 'Anfrage per E-Mail',
        paragraphs: [
          'Wenn Sie mir eine E-Mail schreiben, werden Ihre Angaben inklusive '
            + 'der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung '
            + 'Ihres Anliegens und für den Fall von Anschlussfragen bei mir '
            + 'gespeichert. Diese Daten gebe ich nicht ohne Ihre Einwilligung '
            + 'weiter.',
          'Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 '
            + 'Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung '
            + 'eines Vertrags zusammenhängt oder zur Durchführung '
            + 'vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen '
            + 'Fällen beruht die Verarbeitung auf meinem berechtigten '
            + 'Interesse an der effektiven Bearbeitung der an mich '
            + 'gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO) oder auf '
            + 'Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO), sofern diese '
            + 'abgefragt wurde.',
          'Ihre Nachricht verbleibt bei mir, bis Sie mich zur Löschung '
            + 'auffordern, Ihre Einwilligung widerrufen oder der Zweck für '
            + 'die Speicherung entfällt – etwa nach abgeschlossener '
            + 'Bearbeitung Ihres Anliegens. Zwingende gesetzliche '
            + 'Bestimmungen, insbesondere Aufbewahrungsfristen, bleiben '
            + 'unberührt.',
        ],
      },
    ],
  },
];

/** Where the wording comes from - e-recht24 asks for this note. */
export const privacySource = {
  label: 'Grundlage der Formulierungen',
  href: 'https://www.e-recht24.de',
  text: 'e-recht24.de',
} as const;

/** The way back onto the page, below the last paragraph. */
export const privacyBackLabel: string = 'Zurück zur Startseite';

/** The start page itself - its own route, so a path rather than an anchor. */
export const privacyBackHref: string = '/';

/** Arrow pointing back (24×24, stroke-based), for the button below the text. */
export const arrowBackPath = 'M11 6l-6 6 6 6M5 12h14';
