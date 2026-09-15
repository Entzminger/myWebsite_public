<template>
  <Section id="profile" class="my-presenter" aria-labelledby="my-presenter-title">
    <div class="my-presenter__grid" aria-hidden="true"></div>

    <div class="my-presenter__inner">
      <div class="my-presenter__intro">
        <p class="my-presenter__eyebrow">Hi, ich bin</p>

        <h1 id="my-presenter-title" class="my-presenter__title">
          <span class="my-presenter__name">{{ presenterName }}</span>
          <span class="my-presenter__role">{{ presenterRole }}</span>
        </h1>

        <p
          v-for="(paragraph, index) in presenterIntro"
          :key="index"
          class="my-presenter__text"
          :class="{ 'my-presenter__text--lead': index === 0 }"
        >
          {{ paragraph }}
        </p>

        <Chips class="my-presenter__focus" :chips="focusChips" size="large" />

        <div class="my-presenter__actions">
          <Cta
            v-for="action in actions"
            :key="action.id"
            class="my-presenter__action"
            :color="action.color"
            :href="action.href"
          >
            <svg
              class="my-presenter__action-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
              focusable="false"
            >
              <path :d="action.iconPath" />
            </svg>
            {{ action.label }}
          </Cta>
        </div>
      </div>

      <!-- The portrait is the counterpart to the text; the two marks of the
           craft float behind it as the only decoration in this column. -->
      <div class="my-presenter__visual">
        <span
          v-for="glyph in presenterGlyphs"
          :key="glyph.id"
          class="my-presenter__glyph"
          :class="`my-presenter__glyph--${glyph.id}`"
          aria-hidden="true"
        >{{ glyph.char }}</span>

        <figure class="my-presenter__portrait">
          <img
            class="my-presenter__portrait-image"
            :src="portraitSrc"
            :alt="presenterPortrait.alt"
            :width="presenterPortrait.width"
            :height="presenterPortrait.height"
          />
        </figure>
      </div>
    </div>
  </Section>
</template>

<script setup lang="ts">
import Section from '@/src/parts/section/Section.vue';
import portraitSrc from '@/assets/img/philipp.png';
import Chips from '@/src/parts/chips/Chips.vue';
import Cta from '@/src/parts/cta/Cta.vue';
import { personImage, personImageSize, siteUrl } from '@/src/parts/person/person.data';
import type { Chip } from '@/types/chips';
import {
  actions,
  focusAreas,
  presenterDescription,
  presenterGlyphs,
  presenterIntro,
  presenterName,
  presenterOgDescription,
  presenterPortrait,
  presenterRole,
  presenterTitle,
} from './presenter.data';

// The frontend focus is the point of the whole paragraph, so it gets the brand
// colour while the other stations stay neutral.
const focusChips: Chip[] = focusAreas.map((area) => ({
  text: area.label,
  iconPath: area.iconPath,
  color: area.accent ? 'primary' : 'neutral',
}));

// The hero carries the page's h1 and is therefore the natural place for the
// document-level meta data.
useSeoMeta({
  title: presenterTitle,
  description: presenterDescription,
  author: presenterName,
  ogTitle: presenterTitle,
  ogDescription: presenterOgDescription,
  ogType: 'website',
  ogLocale: 'de_DE',
  ogUrl: siteUrl,
  ogSiteName: presenterName,
  ogImage: personImage,
  ogImageWidth: personImageSize.width,
  ogImageHeight: personImageSize.height,
  ogImageAlt: presenterPortrait.alt,
  // The one Twitter tag without an Open Graph counterpart: it names the shape
  // of the card. The preview image is the portrait and therefore square, so
  // the small square card is the honest choice - the wide one would crop the
  // face. Title, description and image are deliberately not repeated for
  // Twitter; that crawler falls back to the `og:` tags above.
  twitterCard: 'summary',
});

// Without this every variant the page can be reached under - www, http, a
// pasted `?utm_…`, the `#privacy` view - counts as a URL of its own and they
// compete with each other. The canonical names the one that stands.
useHead({
  link: [{ rel: 'canonical', href: siteUrl }],
});
</script>

<style scoped lang="scss">
@use './presenter';
</style>
