---
name: architecture
description: Architektur- und Strukturentscheidungen für dieses Nuxt-4-Projekt – Verzeichnislayout, Rendering-Strategie, Feature-Ordnerstruktur und wie neue Sektionen/Features eingeordnet werden. Laden bei strukturellen Änderungen, neuen Features oder Refactorings.
---

# Architecture Skill

Beschreibt, wie dieses Repo strukturiert ist und wie neue Teile sinnvoll
eingeordnet werden. Für konkrete Coding-Konventionen siehe Skill `developer`.

## Überblick

Nuxt 4 mit dem neuen `app/`-Verzeichnis als `srcDir`. Zwei Routen: die
Startseite trägt alle Sektionen, die Datenschutzerklärung steht für sich.

```
app/app.vue                   – Rahmen um jede Route
├── <Navi>                    – Navigation (enthält <Logo> als Wortmarke)
├── <NuxtPage>
│   ├── src/pages/index.vue   – /
│   │   ├── <Presenter>       – #profile, Hero mit Portrait und der einzigen h1
│   │   ├── <Resume>          – #cv, Lebenslauf
│   │   ├── <Foundation>      – #voluntary, Ehrenamt/Stiftung
│   │   ├── <Github>          – #github, verlinktes Repository
│   │   ├── <Contact>         – #contact, Kontaktformular
│   │   ├── <Imprint>         – #imprint, Impressum, letzte Sektion der Seite
│   │   └── <BackToTop>       – schwebender Sprung nach oben
│   └── src/pages/privacy.vue – /privacy, `noindex`, trägt <Privacy>
└── <Footer>                  – Seitenfuß, immer als letztes
```

Navi und Footer stehen außerhalb von `<NuxtPage>`: Impressum und Datenschutz
müssen von jeder Route aus erreichbar bleiben.

Die Anker-IDs stehen doppelt: am `<section id>` und in `navi.data.ts`. Kommt
eine Sektion dazu, müssen beide Stellen zusammenpassen. Die Anker tragen dabei
das führende `/` (`/#cv`), damit sie auch von `/privacy` aus greifen.

Ein Sonderfall: `<Logo>` ist keine Sektion, sondern die Wortmarke **innerhalb**
von `Navi`.

## Verzeichnislayout

```
app/
├── app.vue              # Komposition der Sektionen, keine Business-Logik
├── assets/
│   ├── img/             # Bilder und Logos
│   └── styles/
│       ├── _tokens.scss   # Design-Tokens, nur Werte
│       ├── _mixins.scss   # Theme-Paletten + Media-Query-Mixins
│       └── base.scss      # einziger globaler Style-Layer, via nuxt.config
├── src/
│   ├── pages/           # die Routen, per `dir.pages` hierher gelegt
│   │   ├── index.vue    # die Startseite mit allen Sektionen
│   │   └── privacy.vue  # /privacy, noindex, kein Canonical
│   ├── sections/        # was eine `.my-section` rendert
│   │   ├── contact/
│   │   ├── foundation/  # inkl. FoundationLogo.vue
│   │   ├── github/
│   │   ├── imprint/     # Impressum
│   │   ├── presenter/
│   │   ├── privacy/     # allein auf seiner Route, sonst wie die anderen
│   │   └── resume/
│   └── parts/           # alles andere
│       ├── backtotop/   # BackToTop.vue, _backtotop.scss, .data.ts
│       ├── card/        # geteilter Baustein
│       ├── chips/       # geteilter Baustein
│       ├── cta/         # geteilter Baustein
│       ├── footer/
│       ├── highlights/ # geteilter Baustein
│       ├── icon/        # Icon.vue + alle Icon-Pfade
│       ├── logo/
│       ├── navi/
│       ├── person/      # Identitätsdaten, ohne Komponente
│       └── section/     # <section class="my-section"> + _section.scss
└── types/               # gemeinsame Datenmodelle, ein File pro Feature
public/                  # Statische, unverarbeitete Assets
tests/e2e/               # Playwright-Specs (siehe Skill `developer`)
nuxt.config.ts
playwright.config.ts
tsconfig.json            # nur References
tsconfig.test.json       # Projekt für tests/** und playwright.config.ts
```

**Prinzip: Feature-Ordner statt Typ-Ordner.** Es gibt bewusst kein globales
`components/`-Verzeichnis nach Nuxt-Konvention – stattdessen bekommt jedes
Feature einen eigenen Ordner, der Komponente(n) und zugehörige Styles
zusammenhält. Neue Features folgen diesem Muster:

```
app/src/<sections|parts>/<feature>/
├── <Feature>.vue
└── _<feature>.scss   # bei Bedarf
```

`pages/` steht neben beiden und fällt unter keine der zwei Regeln: eine Route
ist kein Feature, sondern die Komposition dessen, was daneben liegt. Sie liegt
trotzdem unter `src/` und nicht auf dem Standardpfad `app/pages/` – der Baum
soll an einer Stelle zeigen, woraus die Seite besteht. `nuxt.config.ts` sagt
das Nuxt mit `dir: { pages: 'src/pages' }`; der Pfad ist relativ zu `srcDir`,
also zu `app/`. Der Ordner behält die Namenskonvention von Nuxt: sein
Dateiname *ist* die Route, ein Feature-Unterordner mit `_<feature>.scss`
wäre hier eine zusätzliche Route.

**Die Entscheidung zwischen `sections/` und `parts/` ist prüfbar**, nicht
Geschmackssache:
Füllt die Komponente eine `<Section>` nach dem Komponentenaufbau aus dem Skill
`developer` (Eyebrow, Titel, Lead), gehört sie nach `sections/`. Alles andere
nach `parts/` – der Rahmen (`navi`, `logo`, `footer`), Steuerelemente
(`backtotop`), die geteilten Bausteine (`section`, `card`, `chips`,
`highlights`, `icon`, `cta`) und reine Datenmodule (`person`).

`section/` ist dabei kein Widerspruch: Es rendert die `.my-section`, aber es
*ist* keine – es ist der leere Rahmen, den die sieben Sektionen füllen.

`parts/` heißt bewusst nicht `shared/`: Navi, Logo, Footer und BackToTop kommen
genau einmal vor, geteilt ist daran nichts.

`person/` ist der eine geteilte Ordner **ohne Komponente** – er besteht nur
aus seiner `.data.ts`. `icon/` war es bis zur Icon-Komponente ebenfalls und
zeigt, wie so etwas wächst: zuerst wanderten die Pfade zusammen, weil dasselbe
Icon an zwei Stellen wortgleich stand; erst danach der `<svg>`-Rahmen, der elf
Mal mit denselben acht Attributen dastand. Beides sind Kopien einer
Entscheidung, die niemand von Hand in Gleichschritt hält. Eine Zeichnung, die
zum Icon-Bestand gehört, wird dort aufgenommen – auch die, die heute nur an
einer Stelle steht, denn genau dort sucht die nächste Sektion danach. Wie
beides benutzt wird, steht im Skill `developer`.

Wird ein Feature komplex genug für mehrere Unterkomponenten, bekommen diese
denselben Ordner (`app/src/sections/resume/ResumeEntry.vue` etc.) statt eines
globalen Components-Verzeichnisses.

## Geteilte Bausteine

Sechs Ordner unter `app/src/parts/` sind echte geteilte Bausteine: `section/`
(der Rahmen jeder Sektion), `chips/` (Chip-Listen), `highlights/` (die
Häkchen-Liste, die Stiftung und GitHub gleichermaßen führen), `icon/` (der
`<svg>`-Rahmen um jedes Icon, dazu die Pfade selbst in `icon.data.ts`),
`card/` (die Karte, auf der Stiftung, GitHub, Kontaktformular und die Blöcke
des Lebenslaufs stehen) und `cta/` (der laute Knopf). Sie liegen
bewusst im selben `src/`-Baum statt in einem `components/`-Verzeichnis – die
Feature-Ordner-Regel gilt weiter.

Aufbau wie bei einer Sektion, plus optionale Helfer:

```
app/src/parts/chips/
├── Chips.vue       # Markup + Props
├── _chips.scss     # Styles
└── chips.ts        # Helfer (hier `toChips`), wenn die Komponente welche braucht
app/types/chips.ts  # das Modell, das die Komponente entgegennimmt
```

`Card` und `Cta` nehmen ihren Inhalt als **Default-Slot** entgegen: der Inhalt
wird im Scope der Sektion kompiliert und behält deren `scoped`-Styles. Die
Sektion gestaltet die Komponente von außen nur über Custom Properties – warum
das keine Klasse sein darf, steht im Skill `developer`.

**Wann wird etwas geteilt?** Erst beim zweiten Vorkommen, und nur wenn die
Varianten sich auf wenige Achsen reduzieren lassen. Bei den Chips waren es
zwei: Größe (`small`/`large`) und Farbe. Alles, was sich nicht so reduzieren
lässt, bleibt in der Sektion.

**Markenfarben bleiben bei der Sektion.** GitHub-Lila und Stiftungs-Grün sind
lokale SCSS-Variablen in `_github.scss`/`_foundation.scss` und ausdrücklich
keine Tokens – sie gehören der verlinkten Marke, nicht dem Design-System. Ein
geteilter Baustein nimmt sie deshalb über CSS Custom Properties entgegen,
statt sie als Werte durchs Datenmodell zu schleusen. Wie das konkret aussieht,
steht im Skill `developer`.

## Rendering-Strategie

- Standard ist **Universal Rendering (SSR)** über `nuxt build`/`nuxt dev`.
- `yarn generate` steht für einen vollstatischen Export zur Verfügung, falls
  Hosting ohne Node-Server gewünscht ist (z. B. reines Static Hosting für
  withalittlehelp.de). Diese Entscheidung ist noch offen – bei Bedarf hier
  ergänzen, sobald sie getroffen ist.
- Da die Seite überwiegend statischer Content ist (Portrait, Lebenslauf),
  eignet sich `generate` gut; erst bei dynamischen/serverseitigen Daten (z. B.
  einem Kontaktformular mit Server-API) ist echtes SSR zwingend nötig.

## Routing

Zwei Routen über `app/src/pages/` (der Pfad steht in `nuxt.config.ts`, siehe
„Verzeichnislayout"). Alle Inhaltssektionen liegen weiter auf der
Startseite und werden per Anchor-Link (`Navi`) angesprungen; das Impressum ist
bewusst eine Sektion davon, keine eigene Route – es ist kurz und trägt Name und
Anschrift, die der Startseite guttun.

Die Datenschutzerklärung ist die Ausnahme, und der Grund war messbar: als
zweite Ansicht desselben Dokuments (früher per `:target`) stellte der Rechtstext
**68 % des indexierbaren Textes** unter der Domain selbst. Als eigene Route mit
`noindex, follow` fällt das weg – die Startseite ging von 20.392 auf 6.729
Zeichen zurück, alle über die Person.

Was dabei zu beachten ist, wenn eine weitere Route dazukommt:

- Eine eigene Route ist ein eigenes Dokument und braucht ihr **eigenes `h1`**.
  Die Überschriften von `Privacy` liegen deshalb eine Ebene höher als in den
  Sektionen der Startseite.
- Die Navigationsanker tragen das führende `/` (`/#cv`), sonst zeigen sie von
  der zweiten Route aus auf diese selbst.
- Navigiert wird mit einfachen `<a>`-Elementen, nicht mit `NuxtLink`: der
  statische Export legt jede Route als eigene Datei ab, damit funktioniert der
  Wechsel ohne JavaScript. Wird das je auf `NuxtLink` umgestellt, braucht es
  `<NuxtRouteAnnouncer>` in `app.vue` – ohne clientseitige Routenwechsel hat der
  nichts anzukündigen.
- `noindex` und `rel=canonical` sind widersprüchliche Signale; eine nicht
  indexierte Route bekommt kein Canonical.
- In `robots.txt` nichts sperren, was `noindex` trägt: ein Crawler, der die
  Seite nicht holen darf, liest das Meta-Tag nie.

Weitere Routen nicht vorab anlegen, ohne dass sie gebraucht werden.

## State und Composables

Es gibt noch keinen globalen State. Richtwerte für später:

- Lokaler Komponentenstand: `ref`/`reactive` direkt in der Komponente.
- Geteilte, nicht-reaktive Daten (z. B. Lebenslauf-Inhalte als Datenstruktur):
  als typisierte Konstanten/Content-Dateien ablegen, z. B.
  `app/src/sections/resume/resume.data.ts`, statt hartcodiert im Template.
- Geteilte reaktive Logik über mehrere Komponenten: eigene Composables unter
  `app/composables/` (Nuxt-Auto-Import). Das Verzeichnis existiert noch nicht.
  Der konkrete Kandidat dafür liegt schon vor: `Navi.vue` und `BackToTop.vue`
  bauen beide in `onMounted` einen `IntersectionObserver` über dieselben
  Sektionen auf und räumen ihn in `onBeforeUnmount` wieder ab. Sobald ein
  dritter Beobachter dazukommt, gehört das in ein `useActiveSection.ts`.
- Kein Pinia/Vuex einführen, solange der State-Bedarf so gering ist wie
  aktuell – erst bei echtem Bedarf ergänzen.

## Nuxt-Config

`nuxt.config.ts` bleibt schlank. Module werden nur ergänzt, wenn sie einen
konkreten Zweck erfüllen (z. B. `@nuxtjs/sitemap` für SEO, `@nuxt/image` für
Bildoptimierung im Presenter/Portrait-Bereich). Kein Modul "auf Vorrat"
hinzufügen.

## TypeScript-Projekte

`tsconfig.json` im Wurzelverzeichnis enthält **keine** Optionen, nur
References. Vier davon erzeugt Nuxt selbst unter `.nuxt/` (`app`, `server`,
`shared`, `node`), die fünfte ist `tsconfig.test.json` für `tests/**` und
`playwright.config.ts`.

Diese fünfte ist nötig, weil Nuxts `app`-Projekt nur `tests/nuxt/**` abdeckt –
ohne sie liefen die Playwright-Specs ungeprüft mit. Wer die Struktur anfasst,
sollte wissen:

- `nuxt typecheck` ruft `vue-tsc -b --noEmit` auf; das `-b` kommt genau von
  den References.
- `nuxt prepare` (läuft als `postinstall`) überschreibt die Wurzel-
  `tsconfig.json` **nicht**. Eigene References bleiben also erhalten.
- Der Build-Cache jedes Projekts gehört nach `.nuxt/` – dort ist er schon
  ignoriert. `tsconfig.test.json` setzt dafür `tsBuildInfoFile` explizit,
  sonst landet ein `.tsbuildinfo` im Wurzelverzeichnis.
- `tsconfig.test.json` trägt zusätzlich `paths` für den `@`-Alias, und
  `playwright.config.ts` benennt es als `tsconfig`. Nur so lösen die Specs
  `@/src/...` auf – Playwright nähme sonst die Wurzel-`tsconfig.json`, die
  keine `paths` hat. Der Alias selbst steht im Skill `developer`.

Kommt ein weiterer Ordner mit eigenem TypeScript dazu (z. B. `server/` für
eine Nitro-API), fällt er in Nuxts `server`-Projekt und braucht nichts Eigenes.

## Leitprinzipien für Architekturentscheidungen

1. **Feature-Isolation**: Sektionen kennen sich nicht gegenseitig, kommunizieren
   nur über Props/Events oder gemeinsame Composables – keine versteckten
   Abhängigkeiten zwischen den Ordnern unter `app/src/sections/`. Was mehr als
   eine Sektion braucht, wandert nach `app/src/parts/` (so entstand `person/`).
2. **`app.vue` bleibt dünn**: nur Komposition, keine Logik.
3. **So wenig Infrastruktur wie nötig**: kein Routing, kein State-Management,
   keine Zusatzmodule einführen, bevor ein konkretes Feature es verlangt.
4. **SSR-Sicherheit hat Vorrang** vor Bequemlichkeit clientseitiger APIs –
   siehe Skill `developer` für konkrete Hydration-Regeln.
