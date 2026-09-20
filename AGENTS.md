# AGENTS.md

Anleitung für KI-Agenten (Claude Code, Codex, Cursor, …), die in diesem Repository arbeiten.

## Projekt

Persönliche Portfolio-/Lebenslauf-Website für einen erfahrenen Softwareentwickler.
Modernes, frisches, künstlerisches Webdesign; die Startseite trägt alle Inhalte
auf einer einzelnen Seite (Single Page).

`app/app.vue` ist nur noch der Rahmen: Navigation (mit Logo), `<NuxtPage>` in
der `<main>`-Landmark und der Footer als letztes Element. Das `<main>` steht
dort und nicht in einer Seite: jede Route braucht genau eine, und es gibt nur
ein `<NuxtPage>` zum Umschließen. Es trägt keine Klasse und keine Styles – es
ist nichts als die Landmark. Die Sektionen stehen in dieser Reihenfolge in
`app/src/pages/index.vue`: Presenter, Lebenslauf (Resume), Ehrenamt (Foundation),
GitHub, Kontakt und Impressum, dazu BackToTop als letztes.

Der Datenschutz ist keine dieser Sektionen, sondern eine eigene Route:
`app/src/pages/privacy.vue` unter `/privacy`. Sie trägt `noindex, follow` und **kein**
Canonical –
erreichbar muss sie sein, gefunden werden nicht. Der Grund für die Trennung ist
messbar: als zweite Ansicht desselben Dokuments stellte der Rechtstext 68 % des
indexierbaren Textes unter der Domain selbst. Die Erklärung ist damit ein
eigenes Dokument mit eigenem `h1`; ihre Überschriften liegen deshalb eine Ebene
höher als in den Sektionen der Startseite.

Die Anker der Navigation tragen das führende `/` (`/#cv`), damit sie auch von
der Datenschutz-Route aus auf die Startseite zeigen. Beides sind einfache
`<a>`-Elemente, kein `NuxtLink`: der statische Export legt jede Route als eigene
Datei ab, damit funktioniert der Wechsel weiterhin ohne JavaScript.

Live-Domain: entzminger.dev

## Tech-Stack

- **Nuxt 4** (Vue 3, Composition API, `<script setup lang="ts">`)
- **TypeScript**
- **SCSS (Sass)** für Styles
- **Server-Side Rendering (SSR)** über Nuxt Universal Rendering
- Semantisches, aktuelles **HTML5**
- **WCAG 2.1 AA** Barrierefreiheit
- **SEO-Optimierung** (`useSeoMeta`, `useHead`, strukturierte Überschriften)
- **Playwright** für End-to-End- und Accessibility-Tests (`tests/e2e/`)
- Package-Manager: **yarn** (`yarn.lock` ist die Quelle der Wahrheit, kein `package-lock.json`/`pnpm-lock.yaml` anlegen)
- `typescript` bleibt auf `^5.9.0` gepinnt – TypeScript 7 (der native Go-Port) bricht `vue-tsc`

## Struktur (Kurzfassung)

Details und Begründungen siehe Skill **`architecture`**.

- `app/app.vue` – Rahmen um jede Route (Navi, `<main>` um `<NuxtPage>`, Footer), keine Logik
- `app/src/` trägt alles, was diese Seite ausmacht, in drei Ordnern:
  `pages/` sind die Routen, darunter teilen sich `sections/` und `parts/` den
  Rest. Die Regel dafür ist prüfbar: Was **Inhalt** in eine `.my-section`
  stellt, ist eine Sektion, alles andere nicht. Die `.my-section` selbst
  rendert `parts/section` – sie ist der leere Rahmen, kein Inhalt.
- `app/src/pages/` – `index.vue` (die Startseite mit allen Sektionen) und
  `privacy.vue` (die Erklärung unter `/privacy`, `noindex`). Der Ordner liegt
  nicht auf dem Standardpfad `app/pages/`, sondern wird in `nuxt.config.ts`
  über `dir: { pages: 'src/pages' }` hierher gelegt – eine Route ist nichts
  als die Komposition dessen, was daneben liegt, und braucht dafür keinen
  eigenen Ast neben `src/`.
- `app/src/sections/<feature>/` – die Inhaltsblöcke: `presenter`, `resume`,
  `foundation`, `github`, `contact`, `imprint` und `privacy`. Letzteres steht
  allein auf seiner Route, ist aber nach demselben Bauplan gebaut.
- `app/src/parts/<feature>/` – alles, was keine Sektion ist:
  - der Rahmen: `navi` (mit `logo`) und `footer`
  - das schwebende Steuerelement `backtotop`
  - die geteilten Bausteine `section` (das `<section>`-Element samt der
    gemeinsamen `.my-section`, Inhalt als Default-Slot),
    `chips` (Chip-Listen), `highlights` (die Häkchen-Liste von Stiftung und
    GitHub), `icon` (der `<svg>`-Rahmen um jedes Icon), `card` (die Karte hinter
    Stiftung, GitHub, Kontaktformular und den Lebenslauf-Blöcken) und `cta`
    (der laute Knopf); `Card` und `Cta` nehmen ihren Inhalt als Default-Slot
  - `person` – Identitätsdaten ohne Komponente (Name, Domain, Profil-URLs,
    Vorschaubild). Presenter, Lebenslauf und Kontakt müssen dieselben URLs
    nennen, sonst zerfällt die Person für Suchmaschinen in mehrere.
  - `icon` – der Ordner trägt beides: `Icon.vue`, den `<svg>`-Rahmen, und
    `icon.data.ts`, **jeden Icon-Pfad** der Seite. Kein Pfad steht mehr in einer
    Sektion oder inline in einem Template: der Briefumschlag stand Zeichen für
    Zeichen in `presenter.data.ts` *und* in `resume.data.ts`, der Pfeil aus dem
    Kasten inline in `Foundation.vue` *und* in `Github.vue`. Zwei Kopien eines
    Pfades bleiben von Hand nicht gleich. Benannt wird nach dem, was die
    Zeichnung **zeigt** (`arrowLeft`, nicht `arrowBack`).
    Ebenso stand der Rahmen an dreizehn Stellen mit denselben acht Attributen
    da – dreizehn Kopien einer Entscheidung, die überall dieselbe ist,
    `aria-hidden` voran.
    Er kennt zwei Haltungen: `stroke` (Strich, Vorgabe) und `fill` (Fläche).
  - **Zwei Ausnahmen, und sie betreffen Verschiedenes.** Nicht im Bestand
    liegen die Pfade der beiden Fremdmarken – aus demselben Grund, aus dem auch
    die Markenfarben bei ihrer Sektion bleiben: die GitHub-Marke liegt auf einer
    98×96-Box, die sie mit dem Commit-Graphen derselben Sektion teilt, die
    Stiftungsmarke auf 84×52 und in zwei Pfade geteilt, damit eine Stelle Rahmen
    und Treppe verschieden füllen kann. Den *Rahmen* dagegen behalten nur drei
    Stellen selbst, weil `Icon` genau einen Pfad zeichnet: `FoundationLogo`
    (Rechteck plus zwei Pfade mit eigenem `fill`), `Logo` (das „E“ der eigenen
    Wortmarke – ein Buchstabenumriss aus einer Schriftdatei ist kein Icon) und
    der Commit-Graph hinter der GitHub-Sektion (fünf getrennte Striche). Die
    GitHub-Marke selbst geht durch `Icon`, mit `variant="fill"` und eigener
    `view-box`.
- Jeder Feature-Ordner enthält dasselbe: Komponente, `_<feature>.scss` und
  `<feature>.data.ts` (Inhalte als typisierte Konstanten, keine Texte fest im
  Template). `parts/` heißt bewusst nicht `shared/`: Navi, Logo, Footer und
  BackToTop kommen genau einmal vor.
- `app/types/<feature>.ts` – gemeinsame Datenmodelle, ein File pro Feature
- `app/assets/` – Bilder und die Styles (`styles/_tokens.scss` ist die einzige
  Quelle für Farben, Spacing und Breakpoints – `styles/_mixins.scss` für
  alles, was mit ihnen etwas tut: die Theme-Paletten und die Media Queries). **Keine Schriftdateien**: die
  Seite setzt ausschließlich Systemschriften, und das „E“ der Wortmarke ist ein
  SVG-Pfad in `app/src/parts/logo/logo.data.ts`. Das ersetzt eine 802-KB-Datei,
  die für genau diesen einen Buchstaben geladen wurde.
- Das Porträt liegt in drei Fassungen unter `app/assets/img/`:
  `philipp.png` (2364 px) ist der **Master** – nicht importiert, nicht
  ausgeliefert, nur die Quelle. Ausgeliefert werden `philipp-640.png` und
  `philipp-832.png`, die der Presenter über ein `<picture>` nach Breakpoint
  auswählt. Sie sind aus dem Master **gerendert**, nicht von Hand gepflegt: die
  Farben per Nearest Neighbour (die Vorlage ist posterisiert, ein glättender
  Filter erfindet dort nur Zwischentöne und bläht die Datei auf), der
  Alphakanal per echtem Resample, damit die Silhouette weich bleibt. Der Master
  war 369 KB für eine Box, die nie breiter als 416 px ist.
- Der **führende Unterstrich** an einer `.scss` ist keine Schreibweise, sondern
  eine Ansage an Sass: eine `_datei.scss` ist ein *Partial* und wird nie für
  sich kompiliert, sondern nur per `@use` hineingezogen. `base.scss` ist
  deshalb die einzige Datei ohne ihn – sie ist der Einstieg, den
  `nuxt.config.ts` als einziges `css`-Entry nennt. Jede neue Style-Datei
  bekommt den Unterstrich.
- `public/` – statische, unverarbeitete Assets (favicon, robots.txt, llms.txt).
  Dazu `logo.svg`, `logo.png` und `logo.jpg`, die Marke als eigenständige
  Datei, bewusst unter `entzminger.dev/logo.svg` (bzw. `.png`, `.jpg`)
  erreichbar, damit anderswo darauf verwiesen werden kann – nicht als toten
  Ballast entfernen. Dazu `logo-256.png`, dieselbe Marke in klein und aus
  `logo.svg` gerendert. Beide PNGs dienen dem Teilen (siehe `parts/person`):
  ein geteilter Link trägt die Marke, nicht das Porträt. `logo.png` steht in
  den strukturierten Daten, `logo-256.png` ist das `og:image` – und seine
  Größe ist der Zweck: Meta dokumentiert, dass WhatsApp ab 300 px Breite die
  breite Banner-Vorschau zeichnet und darunter die kompakte Karte mit dem
  Bild links. 256 px kauft die kompakte Karte. **Nicht vergrößern**, sonst
  kippt das Layout zurück. Beide liegen in `public/` und nicht in `assets/` –
  eine URL, die andere Dienste zwischenspeichern, muss über Builds hinweg
  dieselbe bleiben, der Hash eines verarbeiteten Assets tut das nicht. PNG und
  JPG sind die Fassungen für Stellen, die kein SVG annehmen, beide 1024 × 1024
  und aus `logo.svg` gerendert, nicht von Hand gepflegt. Der Unterschied liegt
  nur in den Ecken neben der Scheibe: das PNG lässt sie transparent, das JPG
  muss sie weiß füllen, weil JPEG keine Transparenz kennt.
- `tests/e2e/` – Playwright-Specs, ein File pro Sektion bzw. Baustein
- `nuxt.config.ts` – Nuxt-Konfiguration
- `.github/workflows/` – vier Workflows: CI (Typecheck, Build, E2E bei jedem
  Push), Deploy (nur auf Auslösung) sowie Preview und dessen Aufräumen
  (die Vorschau je Pull Request, siehe „Deployment")

## Befehle

- `yarn dev` – Dev-Server starten
- `yarn build` – Produktionsbuild (SSR)
- `yarn generate` – statischer Export
- `yarn preview` – Produktionsbuild lokal ansehen
- `yarn test:e2e` – Playwright-E2E- und Accessibility-Tests ausführen (`tests/e2e/`)
- `yarn test:e2e:ui` – dieselben Tests im Playwright-UI-Modus

## Deployment

Die Seite läuft als statischer Export (`yarn generate`, Ausgabe `.output/public`)
auf einem SFTP-Webspace – zur Laufzeit braucht sie keinen Node-Server.

- `.github/workflows/ci.yml` prüft jeden Push und Pull Request auf `main`
  (Typecheck, Produktionsbuild, Playwright-Suite). Es wird nichts veröffentlicht.
- `.github/workflows/deploy.yml` veröffentlicht – **nur per `workflow_dispatch`**,
  nie automatisch bei einem Push. Er wiederholt alle Prüfungen, erzeugt den
  Export und spiegelt ihn per `lftp` über SFTP auf den Server.
- `.github/workflows/preview.yml` stellt **jeden Pull Request** auf
  `preview.entzminger.dev` und schreibt den Link als Kommentar an den Pull
  Request. Der Grund ist der Arbeitsplatz, nicht der Komfort: vom Handy aus
  gibt es kein `yarn dev`, und ohne einen Blick auf das Ergebnis ist eine
  Änderung von unterwegs nicht zu verantworten.
- Es gibt genau **einen** Vorschau-Platz (`PREVIEW_PATH`). Ein zweiter Pull
  Request überschreibt den ersten – deshalb trägt jede Seite unten links eine
  Kennzeichnung mit PR-Nummer und Commit.
- Dieser Platz ist ein **eigenes Root-Verzeichnis neben der Seite**, kein
  Unterordner von `DEPLOY_PATH`. Das ist der Grund, warum `deploy.yml` die
  Vorschau nicht ausnehmen muss: sein `mirror --delete` kommt dort nicht hin,
  und `entzminger.dev/preview/` gibt es nicht. Wird das je zu einem
  Unterordner, braucht der Live-Mirror ein `--exclude-glob` dafür – sonst
  löscht jeder Deploy die Vorschau samt Document-Root der Subdomain.
- Die Vorschau ist dieselbe Seite unter einem zweiten Host, also eine Kopie
  jeder URL. Der Workflow setzt deshalb in **jede** exportierte HTML-Datei ein
  `noindex` und legt eine `.htaccess` mit demselben Satz als `X-Robots-Tag`
  dazu. Die `robots.txt` der Subdomain lässt das Krabbeln **absichtlich** zu:
  wer die Seite nicht holen darf, liest das `noindex` nie – dieselbe
  Begründung wie in `public/robots.txt` für `/privacy`.
- `.github/workflows/preview-cleanup.yml` leert den Platz wieder, nur per
  `workflow_dispatch`. Es löscht das Verzeichnis nicht, sondern spiegelt eine
  kurze Notiz hinein: das Document-Root der Subdomain muss bestehen bleiben.
- Zugangsdaten liegen ausschließlich in den GitHub-Secrets `SSH_HOST`,
  `SSH_USER`, `SSH_PRIVATE_KEY`, `SSH_KNOWN_HOSTS`, `DEPLOY_PATH` und
  `PREVIEW_PATH` – niemals im Repository, auch nicht in `.env`.
- **Kein Workflow darf `PREVIEW_PATH` blind benutzen.** Preview und Aufräumen
  spiegeln beide mit `--delete`; ein leerer, zu weit gefasster oder mit
  `DEPLOY_PATH` identischer Wert löscht die Live-Seite. Beide prüfen das,
  bevor überhaupt eine Verbindung aufgemacht wird – eine neue Stelle, die dort
  hinschreibt, braucht dieselbe Prüfung.
- Auslösen von der Kommandozeile: `gh workflow run deploy.yml --ref main`
  bzw. `gh workflow run preview-cleanup.yml --ref main`, verfolgen mit
  `gh run watch`. Achtung: `gh run watch --exit-status` meldet auch bei einem
  fehlgeschlagenen Lauf `0` – die Wahrheit steht in `gh run view`.
- Beide lassen sich auch aus der GitHub-App auf dem Handy starten. Das ist
  der Grund, warum es **keinen** Push-Trigger auf `main` gibt und nicht
  braucht: `main` ist der Stand, das Veröffentlichen eine zweite, bewusste
  Handlung – und die kostet unterwegs trotzdem nur ein paar Tipper.

## Leitplanken

- Composition API mit `<script setup lang="ts">` – kein Options API in neuem Code.
- **Keine Hydration-Mismatches**: kein direkter Zugriff auf `window`, `document`,
  `localStorage` o. Ä. während des Renderns; stattdessen `onMounted`,
  `import.meta.client` oder `<ClientOnly>` verwenden.
- Barrierefreiheit ist Pflicht, kein Nachgedanke: semantisches HTML, Landmark-Rollen,
  sinnvolle Fokus-Reihenfolge, ausreichende Kontraste, `alt`-Texte.
- SEO: jede Sektion/Seite bekommt `useSeoMeta`/`useHead`; genau ein `h1` pro Seite.
- **Eine Top-Level-Regel pro Partial**: der Block, alles Weitere darin als
  `&__element` / `&--modifier`. Keine flachen `.my-block__element`-Regeln mehr.
  Details und die eine Falle dabei im Skill `developer`.
- Styles ausschließlich in SCSS, BEM Syntax, keine globalen
  Style-Leaks außer bewusst definierten Design-Tokens.
- **Media Queries über die Mixins in `_mixins.scss`**, nicht ausgeschrieben:
  `@include mixins.bp-lg { … }` (die Mixins heißen wie die Breakpoint-
  Variablen), `@include mixins.motion-reduce { … }` für den Gegenpart jeder
  Animation und `@include mixins.motion-ok { … }` für Bewegung, die nur
  dazukommt, wenn niemand widersprochen hat. So steht ein Breakpoint an genau
  einer Stelle statt als `min-width` in fünfzehn Partials. `@media print`
  bleibt bewusst ausgeschrieben.
- Neue Features bekommen einen eigenen Ordner unter `app/src/<feature>/` –
  keine losen Komponenten direkt in `app/`.
- **Importe über den Alias `@`**, sobald ein Pfad den eigenen Ordner verlässt –
  nie `../` oder `../../`. `@` zeigt auf `app/`, gilt auch in SCSS
  (`@use '@/assets/styles/tokens' as tokens;`) und in den Playwright-Specs.
  Innerhalb des eigenen Ordners bleibt es relativ (`./resume.data`).
- **CSS Custom Property oder SCSS-Variable?** Entscheidend ist, ob der Wert
  sich zur Laufzeit ändert. Was das Theme austauscht – also die Farben, die
  `theme-print` beim Drucken anders setzt – ist eine Custom Property und wird
  als `var(--my-color-…)` benutzt. Alles andere (Radien, Schatten,
  Schriftstacks, Breakpoints) ist auf Papier wie am Bildschirm gleich und
  bleibt eine SCSS-Variable: `tokens.$radius-pill`. In einer
  Custom-Property-Deklaration liest Sass den Wert als reinen Text, dort also
  `#{tokens.$shadow-sm}`.
- Die Themes stehen **nur einmal auf `:root`** (`theme-dark` in `base.scss`,
  `theme-print` im `@media print`-Block). Nie zusätzlich auf einer
  Komponenten-Wurzel: die eigene Deklaration eines Elements schlägt den
  geerbten Wert, die Komponente bliebe beim Drucken dunkel auf weißem Papier.
- **Jeder Block sagt selbst, ob er aufs Druckblatt gehört.** Es gibt keine
  zentrale Regel mehr, die das entscheidet: Der Druck der Startseite ist der
  PDF-Export des Lebenslaufs, also trägt jede andere Sektion in ihrem eigenen
  Partial `@media print { display: none; }`. Eine **neue Sektion braucht diesen
  Block**, sonst landet sie mit auf dem Lebenslauf.
- Eine Sektion gestaltet eine geteilte Komponente **nur über CSS Custom
  Properties** (`--my-card-*`, `--my-chips-*`, `--my-cta-*`), nie über eine
  eigene Klasse an deren Wurzel – die hätte dieselbe Spezifität und gewänne nur
  über die Reihenfolge im Bundle. Warum, steht im Skill `developer`.
- Markenfarben verlinkter Seiten (GitHub-Lila, Stiftungs-Grün) bleiben lokale
  SCSS-Variablen der Sektion und werden keine Tokens.
- Zeilenenden sind LF – festgelegt in `.gitattributes`, nicht pro Maschine.
- Vor dem Abschluss einer Aufgabe: `yarn typecheck`, `yarn build` und bei
  UI-Änderungen `yarn test:e2e`.

## Skills

- **`developer`** – Coding-Konventionen und Entwicklungs-Workflow (Komponenten,
  TypeScript, SCSS, Hydration-Sicherheit, A11y, SEO, Playwright-Tests).
- **`architecture`** – Strukturelle/architektonische Entscheidungen (Verzeichnislayout,
  Rendering-Strategie, wie neue Features eingeordnet werden).

Bei Aufgaben, die Code schreiben oder ändern, den Skill `developer` laden. Bei
strukturellen Entscheidungen oder neuen Features den Skill `architecture` laden.
