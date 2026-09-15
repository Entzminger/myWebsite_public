import { personProfiles } from '@/src/parts/person/person.data';
import type { ContactField, ContactProfile } from '@/types/contact';

/**
 * The brand marks of LinkedIn and Xing. Unlike the line icons of the other
 * sections these are solid logos, drawn with `fill`.
 */
const logos = {
  linkedin:
    'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  xing:
    'M18.188 0c-.517 0-.741.325-.927.66 0 0-7.455 13.224-7.702 13.657.015.024 4.919 9.023 4.919 9.023.17.308.436.66.967.66h3.454c.211 0 .375-.078.463-.22.089-.151.089-.346-.009-.536l-4.879-8.916a.023.023 0 0 1 0-.022L22.139.756c.095-.191.097-.387.008-.535C22.06.078 21.897 0 21.686 0h-3.498zM3.648 4.74c-.211 0-.385.074-.473.216-.09.149-.078.339.02.531l2.34 4.05c.004.01.004.016 0 .021L1.86 16.051c-.099.188-.093.381 0 .529.085.142.239.234.45.234h3.461c.518 0 .766-.348.945-.667l3.734-6.609-2.378-4.155c-.172-.315-.434-.659-.962-.659H3.648z',
} as const;

/** Paper plane for the submit button - a line icon on the 24×24 grid. */
export const contactSendIconPath = 'M21.5 2.5 10.5 13.5M21.5 2.5l-7 19-4-8.5-8.5-4 19.5-6.5Z';

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
    iconPath: logos.linkedin,
  },
  {
    id: 'xing',
    label: 'Xing',
    url: personProfiles.xing,
    viewBox: '0 0 24 24',
    iconPath: logos.xing,
  },
];
