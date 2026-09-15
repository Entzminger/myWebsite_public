<template>
  <Section
    id="voluntary"
    class="my-foundation"
    aria-labelledby="my-foundation-title"
  >
    <div class="my-foundation__inner">
      <div class="my-foundation__intro">
        <p class="my-foundation__eyebrow">{{ foundationEyebrow }}</p>
        <h2 id="my-foundation-title" class="my-foundation__title">{{ foundationTitle }}</h2>
        <p class="my-foundation__lead">{{ foundationLead }}</p>
        <p class="my-foundation__text">{{ foundationIntro }}</p>

        <Highlights class="my-foundation__highlights" :highlights="highlights" />
      </div>

      <Card aria-labelledby="my-foundation-site">
        <header class="my-foundation__card-header">
          <FoundationLogo class="my-foundation__card-icon" />
          <h3 id="my-foundation-site" class="my-foundation__name">{{ site.name }}</h3>
          <p class="my-foundation__domain">{{ site.domain }}</p>
        </header>

        <dl class="my-foundation__facts">
          <div v-for="fact in facts" :key="fact.id" class="my-foundation__fact">
            <dt class="my-foundation__fact-label">{{ fact.label }}</dt>
            <dd class="my-foundation__fact-value">{{ fact.value }}</dd>
          </div>
        </dl>

        <p class="my-foundation__card-text">{{ site.description }}</p>

        <Chips class="my-foundation__purposes" :chips="purposeChips" />

        <Cta
          class="my-foundation__cta"
          color="brand"
          :href="site.url"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FoundationLogo class="my-foundation__cta-icon" />
          {{ foundationCtaLabel }}
          <span class="my-foundation__sr-only">(öffnet in einem neuen Tab)</span>
          <svg
            class="my-foundation__cta-arrow"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
            focusable="false"
          >
            <path d="M7 17 17 7" />
            <path d="M8 7h9v9" />
          </svg>
        </Cta>
      </Card>
    </div>
  </Section>
</template>

<script setup lang="ts">
import Section from '@/src/parts/section/Section.vue';
import Card from '@/src/parts/card/Card.vue';
import Highlights from '@/src/parts/highlights/Highlights.vue';
import Chips from '@/src/parts/chips/Chips.vue';
import { toChips } from '@/src/parts/chips/chips';
import Cta from '@/src/parts/cta/Cta.vue';
import FoundationLogo from './FoundationLogo.vue';
import {
  facts,
  foundationCtaLabel,
  foundationEyebrow,
  foundationIntro,
  foundationLead,
  foundationTitle,
  highlights,
  site,
} from './foundation.data';

// The green of the chips belongs to the foundation, not to the site's palette;
// it is set on the list in `_foundation.scss` instead of travelling through
// the model.
const purposeChips = toChips(site.purposes);
</script>

<style scoped lang="scss">
@use './foundation';
</style>
