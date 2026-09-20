import { brandIconPaths } from '@/src/parts/icon/icon.data';
import { personProfiles } from '@/src/parts/person/person.data';
import type { ContactField, ContactProfile } from '@/types/contact';

export const contactEyebrow = 'Kontakt';
export const contactTitle = 'Schreib mir';

export const contactLead =
  'Ob konkrete Anfrage oder einfach eine fachliche Frage – '
  + 'ich freue mich über jede Nachricht.';

export const contactIntro =
  'Drei Felder genügen. Der Button übergibt die Nachricht an dein '
  + 'Mailprogramm, fertig ausgefüllt – von dort aus kannst du sie abschicken.';

export const contactMailTo = 'philipp@entzminger.dev';
export const contactMailSubject = 'Anfrage über die Website';
export const contactFormTitle = 'Deine Nachricht';

export const contactFields: ContactField[] = [
  {
    id: 'name',
    label: 'Name',
    type: 'text',
    placeholder: 'Wie heißt du?',
    autocomplete: 'name',
  },
  {
    id: 'email',
    label: 'E-Mail',
    type: 'email',
    placeholder: 'Wo erreiche ich dich?',
    autocomplete: 'email',
  },
  {
    id: 'message',
    label: 'Nachricht',
    type: 'textarea',
    placeholder: 'Worum geht es?',
    autocomplete: 'off',
  },
];

export const contactSubmitLabel = 'Nachricht senden';
export const contactHint =
  'Öffnet dein Mailprogramm mit fertiger Nachricht. Abgeschickt wird sie erst dort.';
/** Shown only after submitting, inside the live region. */
export const contactStatus = 'Dein Mailprogramm sollte sich jetzt öffnen. Passiert nichts?';
export const contactFallbackLabel = 'Nachricht direkt öffnen';

export const contactProfilesTitle = 'Ich bin auch hier zu finden:';
export const profiles: ContactProfile[] = [
  {
    id: 'linkedin',
    label: 'LinkedIn',
    url: personProfiles.linkedin,
    viewBox: '0 0 24 24',
    iconPath: brandIconPaths.linkedin,
  },
  {
    id: 'xing',
    label: 'Xing',
    url: personProfiles.xing,
    viewBox: '0 0 24 24',
    iconPath: brandIconPaths.xing,
  },
];
