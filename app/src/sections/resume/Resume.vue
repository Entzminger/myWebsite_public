<template>
  <Section id="cv" class="my-resume" aria-labelledby="my-resume-title">
    <div class="my-resume__inner">
      <header class="my-resume__header">
        <div class="my-resume__header-text">
          <p class="my-resume__eyebrow">Curriculum Vitae</p>
          <h2 id="my-resume-title" class="my-resume__title">Berufslaufbahn</h2>
          <p class="my-resume__role">{{ personName }} &middot; {{ personRole }}</p>
          <Chips class="my-resume__facts" :chips="factChips" size="large" />
        </div>

        <!-- The button shows nothing but the printer; its name lives in the
             `aria-label`, which keeps it for screen readers and the tooltip. -->
        <button
          type="button"
          class="my-resume__export"
          :aria-label="exportLabel"
          :title="exportLabel"
          @click="exportAsPdf"
        >
          <svg
            class="my-resume__export-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
            focusable="false"
          >
            <path d="M6 9V2h12v7" />
            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
            <path d="M6 14h12v8H6z" />
          </svg>
        </button>
      </header>

      <div class="my-resume__layout">
        <aside class="my-resume__aside">
          <Card
            as="section"
            class="my-resume__block"
            aria-labelledby="my-resume-contact"
          >
            <h3 id="my-resume-contact" class="my-resume__block-title">
              Persönliche Daten
            </h3>
            <dl class="my-resume__contacts">
              <div
                v-for="contact in contacts"
                :key="contact.id"
                class="my-resume__contact"
              >
                <dt class="my-resume__contact-label">
                  <span class="my-resume__contact-icon">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.75"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <path :d="contact.iconPath" />
                    </svg>
                  </span>
                  {{ contact.label }}
                </dt>
                <dd class="my-resume__contact-value">
                  <a v-if="contact.href" class="my-resume__link" :href="contact.href">
                    {{ contact.value }}
                  </a>
                  <template v-else>{{ contact.value }}</template>
                </dd>
              </div>
            </dl>
          </Card>

          <Card
            as="section"
            class="my-resume__block"
            aria-labelledby="my-resume-skills"
          >
            <h3 id="my-resume-skills" class="my-resume__block-title">
              Kernkompetenzen
            </h3>
            <div
              v-for="group in skillGroups"
              :key="group.id"
              class="my-resume__skill-group"
            >
              <p class="my-resume__skill-label">{{ group.label }}</p>
              <Chips class="my-resume__chips" :chips="toChips(group.items, 'primary')" />
            </div>
          </Card>

          <Card
            as="section"
            class="my-resume__block"
            aria-labelledby="my-resume-languages"
          >
            <h3 id="my-resume-languages" class="my-resume__block-title">
              Sprachkenntnisse
            </h3>
            <Chips class="my-resume__chips" :chips="languageChips" />
          </Card>
        </aside>

        <div class="my-resume__main">
          <Card
            as="section"
            class="my-resume__block"
            aria-labelledby="my-resume-experience"
          >
            <h3 id="my-resume-experience" class="my-resume__block-title">
              Berufserfahrung
            </h3>
            <ol class="my-resume__timeline">
              <li
                v-for="station in experience"
                :key="station.id"
                class="my-resume__station"
                :class="{ 'my-resume__station--current': !station.period.to }"
              >
                <p class="my-resume__period">
                  <span v-if="station.period.prefix">{{ station.period.prefix }}</span>
                  <time :datetime="station.period.from.iso">
                    {{ station.period.from.label }}
                  </time>
                  <template v-if="station.period.to">
                    <span aria-hidden="true">&ndash;</span>
                    <span class="my-resume__sr-only">bis</span>
                    <time :datetime="station.period.to.iso">
                      {{ station.period.to.label }}
                    </time>
                  </template>
                </p>
                <h4 class="my-resume__station-title">{{ station.title }}</h4>
                <p v-if="station.place" class="my-resume__station-place">
                  {{ station.place }}
                </p>
                <p class="my-resume__station-text">{{ station.description }}</p>
                <Chips
                  v-if="station.tags"
                  class="my-resume__chips"
                  :chips="toChips(station.tags, 'primary')"
                />
              </li>
            </ol>
          </Card>

          <Card
            as="section"
            class="my-resume__block"
            aria-labelledby="my-resume-education"
          >
            <h3 id="my-resume-education" class="my-resume__block-title">
              Studium &amp; Ausbildung
            </h3>
            <ol class="my-resume__timeline">
              <li
                v-for="station in education"
                :key="station.id"
                class="my-resume__station"
              >
                <p class="my-resume__period">
                  <time :datetime="station.period.from.iso">
                    {{ station.period.from.label }}
                  </time>
                  <template v-if="station.period.to">
                    <span aria-hidden="true">&ndash;</span>
                    <span class="my-resume__sr-only">bis</span>
                    <time :datetime="station.period.to.iso">
                      {{ station.period.to.label }}
                    </time>
                  </template>
                </p>
                <h4 class="my-resume__station-title">{{ station.title }}</h4>
                <p v-if="station.place" class="my-resume__station-place">
                  {{ station.place }}
                </p>
                <p class="my-resume__station-text">{{ station.description }}</p>
              </li>
            </ol>
          </Card>
        </div>
      </div>
    </div>
  </Section>
</template>

<script setup lang="ts">
import Section from '@/src/parts/section/Section.vue';
import Card from '@/src/parts/card/Card.vue';
import Chips from '@/src/parts/chips/Chips.vue';
import { toChips } from '@/src/parts/chips/chips';
import {
  personImage,
  personProfileUrls,
  siteUrl,
} from '@/src/parts/person/person.data';
import {
  contacts,
  education,
  experience,
  facts,
  languages,
  personEmail,
  personName,
  personRole,
  skillGroups,
} from './resume.data';

const factChips = toChips(facts);
const languageChips = toChips(languages);

// The button carries an icon only, so its accessible name stands here.
const exportLabel = 'Lebenslauf als PDF';

// The browser print dialog is the export: it renders the print stylesheet and
// offers "Save as PDF" on every current desktop browser. No extra dependency,
// and the sheet always matches what is on the page.
const exportAsPdf = () => {
  const previousTitle = document.title;

  // Browsers derive the suggested file name from the document title.
  document.title = `Lebenslauf ${personName}`;

  const restoreTitle = () => {
    document.title = previousTitle;
    window.removeEventListener('afterprint', restoreTitle);
  };

  window.addEventListener('afterprint', restoreTitle);
  window.print();
};

// The station without an end date is the current one.
const currentEmployer = experience.find((entry) => !entry.period.to)?.title;

// Structured data for search engines - deliberately without phone number and
// date of birth, and without the street: the address stays at town and postal
// code.
//
// `ProfilePage` around the person says what kind of document this is; the
// person inside is what a search engine files away. `sameAs` is the part that
// earns its keep: it names the profiles that answer for the same person
// elsewhere, and only through it does this page get read as one entity with
// them instead of competing against them.
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'ProfilePage',
        url: siteUrl,
        inLanguage: 'de-DE',
        mainEntity: {
          '@type': 'Person',
          name: personName,
          jobTitle: personRole,
          email: personEmail,
          url: siteUrl,
          image: personImage,
          sameAs: personProfileUrls,
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Kandel',
            postalCode: '76870',
            addressCountry: 'DE',
          },
          worksFor: currentEmployer
            ? { '@type': 'Organization', name: currentEmployer }
            : undefined,
          alumniOf: {
            '@type': 'CollegeOrUniversity',
            name: 'Fachhochschule Worms',
          },
          knowsLanguage: languages,
          knowsAbout: skillGroups.flatMap((group) => group.items),
        },
      }),
    },
  ],
});
</script>

<style scoped lang="scss">
@use './resume';
</style>
