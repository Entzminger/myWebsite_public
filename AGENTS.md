# AGENTS.md

Anleitung für KI-Agenten (Claude Code, Codex, Cursor, …), die in diesem Repository arbeiten.

## Projekt

Persönliche Portfolio-/Lebenslauf-Website für einen erfahrenen Softwareentwickler.
Modernes, frisches, künstlerisches Webdesign; die Startseite trägt alle Inhalte
auf einer einzelnen Seite (Single Page).

`app/app.vue` ist nur noch der Rahmen: Navigation (mit Logo), `<NuxtPage>` und
der Footer als letztes Element. Die Sektionen stehen in dieser Reihenfolge in
`app/pages/index.vue`: Presenter, Lebenslauf (Resume), Ehrenamt (Foundation),
GitHub, Kontakt und Impressum, dazu BackToTop als letztes.

Der Datenschutz ist keine dieser Sektionen, sondern eine eigene Route:
`app/pages/privacy.vue` unter `/privacy`. Sie trägt `noindex, follow` und **kein**
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

- `app/app.vue` – Rahmen um jede Route (Navi, `<NuxtPage>`, Footer), keine Logik
- `app/pages/` – `index.vue` (die Startseite mit allen Sektionen) und
  `privacy.vue` (die Erklärung unter `/privacy`, `noindex`)
- `app/src/` zerfällt in genau zwei Ordner. Die Regel dafür ist prüfbar: Was
  **Inhalt** in eine `.my-section` stellt, ist eine Sektion, alles andere
  nicht. Die `.my-section` selbst rendert `parts/section` – sie ist der leere
  Rahmen, kein Inhalt.
- `app/src/sections/<feature>/` – die Inhaltsblöcke: `presenter`, `resume`,
  `foundation`, `github`, `contact`, `imprint` und `privacy`. Letzteres steht
  allein auf seiner Route, ist aber nach demselben Bauplan gebaut.
- `app/src/parts/<feature>/` – alles, was keine Sektion ist:
  - der Rahmen: `navi` (mit `logo`) und `footer`
  - das schwebende Steuerelement `backtotop`
  - die geteilten Bausteine `section` (das `<section>`-Element samt der
    gemeinsamen `.my-section`, Inhalt als Default-Slot),
    `chips` (Chip-Listen), `highlights` (die Häkchen-Liste von Stiftung und
    GitHub), `card` (die Karte hinter
    Stiftung, GitHub, Kontaktformular und den Lebenslauf-Blöcken) und `cta`
    (der laute Knopf); `Card` und `Cta` nehmen ihren Inhalt als Default-Slot
  - `person` – Identitätsdaten ohne Komponente (Name, Domain, Profil-URLs,
    Vorschaubild). Presenter, Lebenslauf und Kontakt müssen dieselben URLs
    nennen, sonst zerfällt die Person für Suchmaschinen in mehrere.
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
- Der **führende Unterstrich** an einer `.scss` ist keine Schreibweise, sondern
  eine Ansage an Sass: eine `_datei.scss` ist ein *Partial* und wird nie für
  sich kompiliert, sondern nur per `@use` hineingezogen. `base.scss` ist
  deshalb die einzige Datei ohne ihn – sie ist der Einstieg, den
  `nuxt.config.ts` als einziges `css`-Entry nennt. Jede neue Style-Datei
  bekommt den Unterstrich.
- `public/` – statische, unverarbeitete Assets (favicon, robots.txt, llms.txt,
  `philipp-entzminger.png` als Vorschaubild für geteilte Links). Dazu
  `logo.svg`, die Marke als eigenständige Datei: im Projekt selbst **nicht
  benutzt**, sondern bewusst unter `entzminger.dev/logo.svg` erreichbar, damit
  anderswo darauf verwiesen werden kann – nicht als toten Ballast entfernen.
- `tests/e2e/` – Playwright-Specs, ein File pro Sektion bzw. Baustein
- `nuxt.config.ts` – Nuxt-Konfiguration
- `.github/workflows/` – CI (Typecheck, Build, E2E bei jedem Push) und Deploy
  (nur auf Auslösung, siehe „Deployment")

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
- Zugangsdaten liegen ausschließlich in den GitHub-Secrets `SSH_HOST`,
  `SSH_USER`, `SSH_PRIVATE_KEY`, `SSH_KNOWN_HOSTS` und `DEPLOY_PATH` – niemals
  im Repository, auch nicht in `.env`.
- Auslösen von der Kommandozeile: `gh workflow run deploy.yml --ref main`,
  verfolgen mit `gh run watch`.

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
