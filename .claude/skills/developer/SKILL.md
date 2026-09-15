---
name: developer
description: Coding-Konventionen und Entwicklungs-Workflow für dieses Nuxt-4/Vue-3-Projekt – Composition API, TypeScript, SCSS, SSR-sichere Patterns gegen Hydration-Mismatches, Barrierefreiheit, SEO und Playwright-Tests. Laden beim Schreiben, Ändern oder Reviewen von Code in diesem Repo.
---

# Developer Skill

Konkrete Coding-Konventionen für dieses Repo. Für Verzeichnislayout und
strukturelle Entscheidungen siehe Skill `architecture`.

## Coding guidelines

- Verwende abschließendes Semikolon – ausnahmslos, in allen `.ts`-Dateien,
  allen `<script setup>`-Blöcken und auch in den Playwright-Specs.
- if immer mit geschweiften Klammern außer beim ? Operator
- Kommentare auf englisch. Die älteren Sektionen haben deutsche Kommentare;
  auch hier dem umgebenden File folgen, statt es umzuschreiben.

## Komponenten

- Immer `<script setup lang="ts">`, nie Options API.
- Props und Emits typisiert deklarieren:

  ```vue
  <script setup lang="ts">
  interface Props {
    title: string
    subtitle?: string
  }
  const props = defineProps<Props>()
  const emit = defineEmits<{ close: [] }>()
  </script>
  ```

- Ein `.vue`-File pro Komponente, PascalCase-Dateiname (`Resume.vue`, nicht
  `resume.vue`). Bei neuen Komponenten diese Konvention einhalten; bestehende
  klein geschriebene Dateien (`presenter.vue`) bei Gelegenheit angleichen,
  aber nicht ungefragt umbenennen, wenn nur an anderer Stelle gearbeitet wird.
- Jede Feature-Komponente lebt in ihrem eigenen Ordner unter
  `app/src/sections/<feature>/` oder `app/src/parts/<feature>/` zusammen mit
  ihren Styles. Was eine `.my-section` rendert, gehört nach `sections/`, alles
  andere nach `parts/` (siehe Skill `architecture`).
- Keine Business-Logik in `app/app.vue` – dort werden nur Sektionen zusammengesetzt.

## Komponentenaufbau

Jede Sektion folgt demselben Aufbau, damit die Seite als ein Stück wirkt:

- **Dateien pro Feature** – `<Feature>.vue` (Markup + Setup), `_<feature>.scss`
  (Styles, per `@use './<feature>'` im `scoped`-Style eingebunden),
  `<feature>.data.ts` (Inhalte als typisierte Konstanten) und bei eigenem
  Datenmodell `app/types/<feature>.ts`. Keine Texte oder Listen fest im
  Template.
- **Wurzelelement** – `<Section>` aus `@/src/parts/section/Section.vue`, kein
  eigenes `<section>`-Tag. `id` (sprechender Anker, z. B. `github`),
  `aria-labelledby` (die ID der Überschrift) und `class="my-<feature>"` werden
  an der Komponente gesetzt und fallen durch; die Klasse mischt Vue selbst mit
  `my-section`. Die ID der Sektion ist zugleich der Navigationsanker in
  `navi.data.ts`.
- **Style-Wurzel** – Grund, Innenabstand, Typografie und `scroll-margin` kommen
  aus `.my-section`, der Block `.my-<feature>` stellt nur ein, was ihn von den
  anderen unterscheidet. Er bindet **kein** Theme ein – die Farbtokens stehen
  auf `:root` und erben herunter (siehe unten).
- **Kopfbereich in dieser Reihenfolge**:
  1. `__eyebrow` – kurzes Label in Versalien.
  2. `__title` – die `h2` der Sektion mit der ID aus `aria-labelledby`
     (die einzige `h1` gehört dem Presenter).
  3. optionaler Lead-/Fließtext, danach der eigentliche Inhalt.
- **Der Eyebrow trägt immer die beiden Schrägstriche davor.** Sie kommen aus
  dem Stylesheet, nie aus dem Text:

  ```scss
  .my-<feature>__eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    margin: 0 0 0.75rem;
    color: var(--my-color-primary-strong); // oder --my-color-accent-strong
    font-size: 0.8125rem;
    font-weight: 600;
    letter-spacing: 0.16em;
    text-transform: uppercase;

    &::before {
      content: '//';
      font-family: tokens.$font-mono;
      font-size: 1.15em;
      font-weight: 700;
      letter-spacing: -0.02em;
    }
  }
  ```

- **Druckausgabe** – der Block schließt mit einem `@media print`-Abschnitt.
  Für eine neue Sektion heißt der in aller Regel `display: none`: Das Drucken
  der Startseite ist der PDF-Export des Lebenslaufs, und es gibt keine zentrale
  Regel, die das für die Sektion übernimmt. Nur `_resume.scss` und
  `_privacy.scss` haben stattdessen Anpassungen fürs Papier.
- **Dekoration** – Glow, Raster oder Hintergrundlogos laufen über `::before`/
  `::after` oder ein `aria-hidden="true"`-Element, liegen hinter dem Inhalt
  und werden von der Sektion mit `overflow: hidden` beschnitten.
- **Icons** – als Inline-SVG mit `aria-hidden="true"` und `focusable="false"`,
  Pfade als Konstanten in der `.data.ts`, nicht doppelt im Template.
- **Animationen** – jede Bewegung bekommt ihren Gegenpart in
  `@include mixins.motion-reduce { … }`.

## Seitenaufbau

- Der Seitenfuß (`app/src/parts/footer/Footer.vue`, `<Footer>`) steht in
  `app/app.vue` **immer als letztes Element** – nach `<NuxtPage>`. Neue
  Sektionen werden in `app/pages/index.vue` eingehängt, nie hinter dem Footer.
- Der Footer gehört keiner Sektion. Seine Inhalte (Ort, Datum, Name) liegen in
  `app/src/parts/footer/footer.data.ts`, seine Klassen tragen den eigenen Block
  `my-footer__…` – nichts davon hängt am Lebenslauf oder einer anderen Sektion.
- Wird der Footer inhaltlich erweitert, bleibt er trotzdem am Seitenende: kein
  zweiter Footer, keine Footer-Inhalte innerhalb einer Sektion.

## TypeScript

- `strict` bleibt aktiviert (Nuxt-Default). Kein `any`, wenn ein konkreter Typ
  möglich ist.
- Gemeinsame Typen gehören nach `app/types/<feature>.ts`, ein File pro Feature.
  Sie werden **explizit** importiert, nicht auto-importiert – Nuxt zieht von
  sich aus nur `components/`, `composables/` und `utils/` ein:

  ```ts
  import type { ResumeStation } from '@/types/resume';
  ```

- Jede exportierte Konstante in einer `.data.ts` bekommt ihren Typ
  (`export const facts: string[] = […]`), damit ein Tippfehler im Inhalt beim
  Typecheck auffällt und nicht erst im Browser.
- Für Fetch-/Datenlogik `useAsyncData`/`useFetch` mit typisierten Rückgabewerten
  verwenden statt manueller `fetch`-Aufrufe im Setup.

### Importpfade

**Alles, was den eigenen Ordner verlässt, läuft über den Alias `@`** – nie
über `../` oder `../../`. `@` zeigt auf `app/` (Nuxts `srcDir`), also
`@/types/resume`, `@/src/parts/chips/Chips.vue`, `@/assets/img/portrait.png`:

```ts
import Chips from '@/src/parts/chips/Chips.vue';
import type { CtaColor } from '@/types/cta';
import type { ResumeStation } from '@/types/resume';
```

- Innerhalb des eigenen Ordners bleibt es relativ: `./resume.data`,
  `@use './resume'`. Der Alias ist für Wege nach draußen da, nicht für den
  Nachbarn im selben Verzeichnis.
- `~` ist in Nuxt derselbe Pfad, wird hier aber nicht benutzt – ein Alias im
  Projekt, damit Imports vergleichbar bleiben.
- Auch SCSS versteht ihn: `@use '@/assets/styles/tokens' as tokens;`. Vite
  löst den Alias im Sass-Importer mit auf.
- Die Playwright-Specs benutzen ihn ebenfalls
  (`import { repository } from '@/src/sections/github/github.data';`). Möglich ist das
  durch `paths` in `tsconfig.test.json`, das `playwright.config.ts` als
  `tsconfig` benennt – ohne diesen Eintrag läse Playwright die
  Wurzel-`tsconfig.json`, die nur References enthält.

## SCSS

- Jede Feature-Komponente bekommt eine eigene Partial-Datei
  (`_<feature>.scss`), eingebunden per `@use './<feature>'` im `scoped`-Style.
- Styles sind `scoped` in der Komponente oder werden per `@use`/`@import`
  gezielt eingebunden – keine globalen Selektoren, die andere Sektionen
  beeinflussen.
- Gemeinsame Design-Tokens (Farben, Spacing, Typografie, Breakpoints) zentral
  in `app/assets/styles/_tokens.scss` pflegen und per
  `@use '@/assets/styles/tokens' as tokens;` referenzieren, sobald mehr als
  eine Komponente denselben Wert braucht – keine Magic Numbers duplizieren.
- Mobile-first schreiben. Breakpoints **nie als rohe Query**, sondern über die
  Mixins aus `_mixins.scss`, die genauso heißen wie die Variablen:
  `@include mixins.bp-lg { … }` statt `@media (min-width: tokens.$bp-lg)`.
  Dazu `mixins.motion-reduce` (der Gegenpart jeder Animation) und
  `mixins.motion-ok` (Bewegung, die nur ohne Widerspruch dazukommt).
  `@media print` bleibt bewusst ausgeschrieben.
- **Zwei Style-Dateien, zwei Rollen**: `_tokens.scss` trägt nur Werte,
  `_mixins.scss` alles, was mit ihnen etwas tut. Ein Partial holt sich beide,
  wenn es beide braucht:
  `@use '@/assets/styles/tokens' as tokens;` und
  `@use '@/assets/styles/mixins' as mixins;`.
- BEM Syntax für Klassennamen mit Präfix
- CSS-Klassen Präfix: `my-` (z.B. `my-button`) folgende Struktur `my-[component]__[element]--[modifier]`

**Abstände nach unten, nicht nach oben.** Jedes Element erklärt als
`margin-bottom` den Abstand zu dem, was ihm folgt; das letzte im Block erklärt
`0`. Ein `margin-top` bringt denselben Abstand aus der Gegenrichtung und
kollidiert dann mit dem Nachbarn – und ein geteilter Baustein, der einen
mitbringt, zwingt ihn jeder Sektion auf, die ihn einsetzt. Deshalb steht der
Abstand über der Häkchen-Liste am Absatz davor, nicht an `.my-highlights`.

**Ein Partial, eine Top-Level-Regel.** Der Block steht einmal, alles Weitere
verschachtelt darin – Elemente als `&__element`, Modifier als `&--modifier`:

```scss
.my-navi {
  position: sticky;

  &__skip { … }

  &__link {
    &::after { … }
    &--active::after { … }
  }

  // Auch Media Queries gehören hinein; Sass hebt sie beim Kompilieren heraus.
  // `@content` wird an der Aufrufstelle ausgewertet, `&` meint hier also
  // weiterhin `.my-navi`.
  @include mixins.bp-md {
    &__list { flex-direction: row; }
  }
}
```

Kombinationen auf dieser Ebene funktionieren ebenfalls über `&`:
`&--small &__chip` wird zu `.my-chips--small .my-chips__chip`,
`&__skill-group + &__skill-group` zu genau dem Nachbarselektor.

**Die Falle: `&` meint immer den *umgebenden* Selektor, nicht den Block.**
Innerhalb eines verschachtelten Blocks zeigt `&` auf diesen, nicht mehr auf die
Wurzel:

```scss
.my-navi {
  &__burger--open {
    // `&__bar` ergäbe hier `.my-navi__burger--open__bar` – falsch.
    .my-navi__bar:nth-child(1) { … }
  }
}
```

Ein Nachfahre, der von einer verschachtelten Regel aus angesprochen wird, wird
deshalb ausgeschrieben. Das ist in `_navi.scss` die einzige Stelle im Projekt,
an der das nötig ist – sie trägt einen Kommentar.

Der Umbau auf diese Form hat das kompilierte CSS **byte-identisch** gelassen.
Wer hier etwas ändert, kann das genauso prüfen: `yarn generate` und die
Dateien unter `.output/public/_nuxt/*.css` vergleichen. Bleibt der Hash im
Dateinamen gleich, hat sich an der Ausgabe nichts geändert.

**Es gibt genau zwei globale Style-Layer**, beide über `base.scss` (in
`nuxt.config.ts` als einziges `css`-Entry):

- `:root` mit `@include mixins.theme-dark` – die Farbtokens für die ganze
  Seite, im `@media print`-Block gegen `mixins.theme-print` getauscht.
- `.my-section` aus `parts/section/_section.scss` – Grund, Innenabstand,
  Typografie und `scroll-margin` jeder Sektion. `Section.vue` bindet den
  Partial **ohne** `scoped` ein, und das ist Absicht: als einfache Klasse wiegt
  `.my-section` 0-1-0, die `scoped`-Regeln einer Sektion 0-2-0. Nur so gewinnt
  eine Sektion zuverlässig, wenn sie am selben Element etwas davon
  überschreibt – `.my-privacy` hebt das `overflow` auf, die beiden gedruckten
  Sektionen nehmen das Padding zurück. Mit `scoped` wären beide gleich schwer
  und die Bundle-Reihenfolge entschiede.

**Farben nie direkt aus `_tokens.scss` in eine Komponente schreiben.** Die
SCSS-Variablen (`$color-primary-500`) dienen dazu, die semantischen Tokens zu
bilden; Komponenten benutzen die Custom Properties (`var(--my-color-primary)`).
Nur dann trägt der `theme-print`-Wechsel beim Drucken auch die Komponente mit.
Ausnahmen sind Gradienten und Overlays, die einen Alphakanal brauchen – dort
`rgba(tokens.$color-…, …)` mit Kommentar.

**Alles außer Farben ist dagegen eine SCSS-Variable.** Radien, Schatten,
Schriftstacks und Breakpoints sind am Bildschirm und auf Papier dieselben, an
ihnen hat die Kaskade nichts zu entscheiden – also `border-radius:
tokens.$radius-pill;`, kein `var()`. Nur innerhalb einer
Custom-Property-Deklaration braucht es Interpolation, weil Sass deren Wert als
reinen Text liest: `--my-chips-shadow: #{tokens.$shadow-sm};`.

**Ein Theme-Mixin steht nur auf `:root`.** Bindet eine Komponente `theme-dark`
zusätzlich an ihrer eigenen Wurzel ein, schreibt sie die dunklen Farben auf
ihr Element – und die eigene Deklaration eines Elements schlägt den geerbten
Wert, unabhängig von der Spezifität. Der Print-Block tauscht `:root` aus und
käme an dieser Komponente nicht mehr vorbei: sie bliebe dunkel auf weißem
Papier.

## Geteilte Bausteine benutzen

`app/src/parts/chips/Chips.vue` zeichnet alle Chip-Listen des Projekts. Kein neues
`ul`/`li`-Paar dafür bauen:

```vue
<Chips class="my-resume__facts" :chips="factChips" size="large" />
<Chips class="my-resume__chips" :chips="toChips(group.items, 'primary')" />
```

- `size` ist `'small'` (Voreinstellung, in Karten) oder `'large'`
  (auf dem Sektionsgrund, mit Schatten).
- Das Modell ist `Chip[]` aus `app/types/chips.ts`: `text`, optional
  `iconPath` (24×24, stroke-basiert) und `color`
  (`'neutral' | 'primary' | 'accent'`).
- `toChips(texte, farbe?)` aus `app/src/parts/chips/chips.ts` hebt die vorhandenen
  `string[]`-Listen aufs Modell. Die Sektionen behalten ihre reinen Textlisten
  – der Lebenslauf braucht sie so für seine JSON-LD-Daten.

Abstand und Markenfarbe kommen von außen, nicht aus dem Modell:

```scss
.my-github__topics {
  --my-chips-border: #{rgba($github-purple, 0.6)};
  --my-chips-background: #{rgba($github-purple, 0.16)};
  --my-chips-ink: #{$github-purple-bright};
  --my-chips-margin: 1.5rem 0 0;
}
```

`app/src/parts/highlights/Highlights.vue` zeichnet die Häkchen-Liste, mit der
eine Sektion aufzählt, was die verlinkte Seite ausmacht:

```vue
<Highlights class="my-github__highlights" :highlights="highlights" />
```

- Das Modell ist `Highlight[]` aus `app/types/highlights.ts`: `id`, `label`
  und `detail`. Beide Sektionen typisieren ihre Liste darauf, statt sich ein
  eigenes `…Highlight`-Interface zu halten.
- Das Häkchen bringt der Baustein mit; sein Pfad steht in `highlights.data.ts`.
- Von außen kommt `--my-highlights-icon`, die Markenfarbe der Häkchen.

`app/src/parts/card/Card.vue` ist die Karte, auf der Stiftung, GitHub, das
Kontaktformular und die fünf Blöcke des Lebenslaufs stehen, und
`app/src/parts/cta/Cta.vue` der laute Knopf darunter. Beide nehmen ihren Inhalt als
**Default-Slot** entgegen – kein eigenes `article`/`form`/`a`/`button` mehr
dafür bauen:

```vue
<Card as="section" class="my-resume__block" aria-labelledby="my-resume-skills">…</Card>
<Cta class="my-github__cta" color="brand" :href="repository.url">…</Cta>
<Cta as="button" type="submit" color="accent">…</Cta>
```

- `as` wählt das Element (`article` ist die Voreinstellung der Karte, `a` die
  des Knopfes). Alles Weitere – `aria-labelledby`, `href`, `type`, `@submit` –
  wird an der Komponente gesetzt und fällt auf dieses Element durch; dafür
  braucht es keine eigenen Props.
- Der Slot-Inhalt wird im Scope der **Sektion** kompiliert und behält deren
  `scoped`-Styles. `.my-github__cta-icon` & Co. bleiben also dort, wo sie sind.
- Was von außen kommt, sind Custom Properties (`--my-card-*`, `--my-cta-*`);
  die Liste steht im Kopfkommentar der jeweiligen Partial-Datei.
- `color="brand"` bringt keine Farbe mit: Sektionen, die auf eine fremde
  Marke verlinken, setzen deren Töne selbst – genau wie bei den Chips.

## Geteilte Komponenten von außen gestalten

Wenn eine Sektion eine geteilte Komponente einfärbt oder positioniert, läuft
das über CSS Custom Properties – nicht über zusätzliche Props und nicht über
`:deep()`. Die Komponente definiert ihren Vertrag als `var(--x, fallback)`,
die Sektion setzt `--x` auf dem Element, dem sie die Klasse mitgibt.

**Der Grund ist eine Spezifitäts-Falle.** Vue hängt der Wurzel einer
Kind-Komponente *beide* Scope-Attribute an. `.my-chips[data-v-kind]` aus der
Komponente und `.my-resume__facts[data-v-sektion]` aus der Sektion haben
damit dieselbe Spezifität (0-2-0) – wer gewinnt, entscheidet allein die
Reihenfolge im Bundle. Eine Sektion, die so ein `margin` überschreiben will,
funktioniert dann heute und kippt beim nächsten Umbau lautlos.

Custom Properties umgehen das: die Komponente *deklariert* den Wert gar nicht,
sie liest ihn nur, und die Deklaration der Sektion ist die einzige im Feld.

```scss
// In der Komponente: nur lesen, mit Fallback.
.my-chips {
  margin: var(--my-chips-margin, 0);
}
```

Was von außen kommt, gehört in den Kopfkommentar der Partial-Datei, damit der
Vertrag auffindbar bleibt.

**Keine Custom Property lesen, die niemand setzt.** Ein
`var(--my-x, fallback)`, zu dem es projektweit keine einzige Deklaration gibt,
ist der Fallback mit Umweg: Er kostet einen Lookup, behauptet im
Kopfkommentar einen Vertrag, den keine Sektion erfüllt, und der nächste
Entwickler hält den Regler für erprobt, obwohl ihn nie jemand gedreht hat.
Der Wert wird dann einfach direkt geschrieben. Ein Regler kommt dazu, wenn
die erste Sektion ihn wirklich braucht – dieselbe Regel wie beim Teilen
selbst, nur eine Ebene tiefer.

Prüfbar ist das: Jede gelesene Property muss mindestens eine Deklaration
haben. Die Gegenrichtung zählt genauso – eine Property, die gesetzt, aber
nirgends gelesen wird, ist toter Code.

```bash
grep -rno 'var(--[a-z-]*' app --include=*.scss --include=*.vue   # gelesen
grep -rn  '^\s*--[a-z-]*:'  app --include=*.scss --include=*.vue   # gesetzt
```

## Hydration-Mismatches vermeiden

Das ist bei SSR die häufigste Fehlerquelle – folgende Regeln strikt einhalten:

- Kein direkter Zugriff auf `window`, `document`, `localStorage`,
  `navigator` etc. auf Modul- oder Setup-Ebene. Nur innerhalb von
  `onMounted()` oder hinter `if (import.meta.client)`.
- Kein `Math.random()`, `Date.now()` oder andere nicht-deterministische Werte
  direkt im Template oder in berechneten Werten, die beim ersten Render
  verwendet werden – sie erzeugen zwangsläufig Server/Client-Unterschiede.
- Rein clientseitige UI (z. B. Dinge, die Viewport-/Browser-APIs brauchen) in
  `<ClientOnly>` wrappen, mit sinnvollem `#fallback` für SSR.
- Bedingtes Rendering, das vom Client-Zustand abhängt (z. B. Scroll-Position,
  `localStorage`-Werte), erst nach `onMounted` aktivieren, nicht synchron im
  Setup.
- Keine unterschiedlichen IDs/Keys zwischen Server- und Client-Render
  erzeugen (z. B. `Math.random()` als `:key`).

## Barrierefreiheit (WCAG 2.1 AA)

- Semantisches HTML5 statt `div`-Suppe: `<nav>`, `<main>`, `<header>`,
  `<section>`, `<footer>` passend einsetzen.
- Genau ein `h1` pro Seite, danach logisch verschachtelte Überschriften ohne
  Sprünge.
- Interaktive Elemente über Tastatur erreichbar und mit sichtbarem Fokus
  (`:focus-visible` stylen, nie `outline: none` ohne Ersatz).
- Bilder brauchen sinnvolle `alt`-Texte (oder `alt=""` bei rein dekorativen
  Bildern).
- Ausreichender Farbkontrast (mind. 4.5:1 für Fließtext) – bei neuen Farben im
  Design-System prüfen.
- Navigation (`Navi`) mit `aria-current` für den aktiven Abschnitt versehen.

## SEO

- Pro Seite `useSeoMeta` für Title/Description/OpenGraph setzen, z. B. in
  `app/app.vue` oder auf Seitenebene, sobald `pages/` existiert.
- Strukturierte Daten (z. B. `Person`-Schema für den Lebenslauf) über
  `useSchemaOrg` oder ein eigenes JSON-LD-Snippet einbinden, wenn relevant.
- `public/robots.txt` und ggf. ein Sitemap-Modul (`@nuxtjs/sitemap`) pflegen,
  sobald zusätzliche Routen entstehen.

## Testing (Playwright)

Playwright ist eingerichtet, die Suite umfasst aktuell 143 Tests
(`yarn test:e2e`, UI-Modus `yarn test:e2e:ui`).

- E2E-Tests liegen unter `tests/e2e/*.spec.ts`, ein File pro Sektion.
- Drei Projekte: `warmup` läuft einmal vorweg, danach parallel
  `desktop-chromium` und `mobile-chromium`. Jeder neue Test läuft damit
  automatisch in beiden Viewports – Selektoren müssen in beiden greifen.
- **`warmup.setup.ts` nicht entfernen.** Lokal läuft die Suite gegen
  `yarn dev`, der erst auf Anfrage kompiliert; ohne den einen Aufruf vorweg
  laufen die parallelen Worker reihenweise in Timeouts, die wie echte Fehler
  aussehen.
- Für alles, was erst nach der Hydration funktioniert (Klicks, Formulare),
  `waitForHydration(page)` aus `tests/e2e/hydration.ts` benutzen. Vorher hängt
  am SSR-Markup noch kein Handler.
- Erwartungswerte aus den `.data.ts`-Dateien importieren statt Texte im Test
  zu wiederholen – so wandert eine Inhaltsänderung nicht durch zwei Stellen.
- Für jede neue Sektion mindestens einen Smoke-Test: Sektion ist sichtbar,
  wichtige Interaktionen funktionieren.
- `a11y.spec.ts` scannt jede Sektion mit `@axe-core/playwright` auf
  WCAG 2.1 AA. Eine neue Sektion dort in die `sections`-Liste eintragen.
- Tests laufen lokal gegen `yarn dev`, in CI gegen den Produktionsbuild
  (`webServer` in `playwright.config.ts`).

**Styles testen, wo sie eine Zusage sind.** Kontrastfarben, Abstände aus einem
Custom-Property-Vertrag und Ähnliches lassen sich mit `toHaveCSS` bzw.
`getComputedStyle` in `evaluate` festhalten – siehe `chips.spec.ts`. Das ist
der einzige Schutz davor, dass so etwas beim nächsten Refactoring lautlos
verschwindet.

## Vor dem Abschluss einer Aufgabe

- `yarn typecheck` – prüft `app/`, `server/`, `shared/`, die Nuxt-Config **und**
  die Tests (`vue-tsc -b --noEmit` über die References der `tsconfig.json`).
- `yarn build` – fängt zusätzlich SSR- und Bundling-Fehler.
- `yarn test:e2e` – bei UI-Änderungen; relevante Tests ergänzen.
- Neue/geänderte UI im Dev-Server visuell prüfen, insbesondere auf
  Hydration-Warnungen in der Browser-Konsole.

**`typescript` bleibt auf `^5.9.0` gepinnt.** `yarn add -D typescript` ohne
Range zieht inzwischen TypeScript 7 (den nativen Go-Port), und `vue-tsc` 3.x
läuft darauf nicht:

```
Error [ERR_PACKAGE_PATH_NOT_EXPORTED]: Package subpath './lib/tsc'
is not defined by "exports" in node_modules/typescript/package.json
```

Der Typecheck ist damit komplett tot, ohne dass Build oder Tests etwas
merken. Den Pin erst lösen, wenn `vue-tsc` TS 7 unterstützt.
