# myWebsite

Persönliche Portfolio- und Lebenslauf-Website von Philipp Entzminger – alle
Inhalte auf einer einzelnen Seite, serverseitig gerendert und barrierefrei.
Die Datenschutzerklärung liegt als eigene Route daneben.

Live unter **[entzminger.dev](https://entzminger.dev/)**.

## Stack

- **Nuxt 4** / Vue 3, durchgehend `<script setup lang="ts">`
- **TypeScript** (`strict`)
- **SCSS** mit Design-Tokens
- **SSR** (Universal Rendering); ein statischer Export ist über `yarn generate`
  möglich
- **Playwright** für End-to-End- und Accessibility-Tests (WCAG 2.1 AA)

Voraussetzung ist **Node** `>=22.12` (Nuxt-4-Anforderung) und **yarn**.

## Setup

```bash
yarn install
```

## Befehle

| Befehl | Zweck |
| --- | --- |
| `yarn dev` | Dev-Server auf http://localhost:3000 |
| `yarn build` | Produktionsbuild (SSR) |
| `yarn preview` | Produktionsbuild lokal ansehen |
| `yarn generate` | Statischer Export |
| `yarn typecheck` | `vue-tsc` über App, Server, Config **und** Tests |
| `yarn test:e2e` | Playwright-Suite |
| `yarn test:e2e:ui` | dieselbe Suite im UI-Modus |

Vor dem Abschluss einer Änderung laufen `yarn typecheck` und `yarn build`, bei
UI-Änderungen zusätzlich `yarn test:e2e`.

## Struktur

```
app/
├── app.vue              # Rahmen jeder Route: Navi, <NuxtPage>, Footer
├── pages/
│   ├── index.vue        # Startseite mit allen Sektionen
│   └── privacy.vue      # /privacy, noindex
├── assets/
│   ├── img/
│   └── styles/          # _tokens.scss, _section.scss, base.scss
├── src/
│   ├── sections/<feature>/   # was eine `.my-section` rendert
│   └── parts/<feature>/      # Rahmen, Steuerelemente, geteilte Bausteine, Daten
└── types/<feature>.ts   # gemeinsame Datenmodelle
public/                  # unverarbeitete Assets (favicon, robots.txt, llms.txt,
                         # logo.svg, Vorschaubild)
tests/e2e/               # Playwright-Specs, ein File je Sektion bzw. Baustein
```

Jeder Feature-Ordner enthält dasselbe: Komponente, `_<feature>.scss` und
`<feature>.data.ts` (Inhalte als typisierte Konstanten, keine Texte im
Template). Ob ein Feature nach `sections/` oder `parts/` gehört, ist prüfbar:
Was eine `.my-section` rendert, ist eine Sektion.

## Konventionen im Überblick

- **Importe über den Alias `@`**, sobald ein Pfad den eigenen Ordner verlässt –
  nie `../`. `@` zeigt auf `app/` und gilt auch in SCSS
  (`@use '@/assets/styles/tokens' as tokens;`) und in den Playwright-Specs.
- **BEM mit Präfix `my-`**: `my-[component]__[element]--[modifier]`. Je
  Partial steht genau eine Top-Level-Regel – der Block –, alles Weitere
  verschachtelt darin als `&__element` / `&--modifier`.
- Farben nie direkt aus `_tokens.scss` in eine Komponente schreiben, sondern
  über die Custom Properties (`var(--my-color-primary)`) – nur so trägt der
  `theme-light`-Wechsel beim Drucken mit.

## Tests

Die Suite läuft lokal gegen `yarn dev`, in CI gegen den Produktionsbuild;
Playwright startet den Server selbst. Jeder Test läuft in zwei Viewports
(`desktop-chromium`, `mobile-chromium`), davor einmal das Projekt `warmup` –
ohne diesen einen Aufruf laufen die parallelen Worker in den kalten Dev-Server
und reihenweise in Timeouts.

Ist Port 3000 belegt, führt

```bash
PLAYWRIGHT_PORT=3100 yarn test:e2e
```

die Suite daran vorbei.

## Weiterführend

- [`AGENTS.md`](AGENTS.md) – Kurzanleitung für KI-Agenten und den schnellen
  Einstieg; `CLAUDE.md` zieht sie nur herein.
- `.claude/skills/developer/` – Coding-Konventionen mit Begründungen.
- `.claude/skills/architecture/` – Verzeichnislayout und strukturelle
  Entscheidungen.
