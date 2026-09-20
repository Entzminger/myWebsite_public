<template>
  <!-- A route of its own (`src/pages/privacy.vue`), so this is the whole
       document rather than one section of it: the title is the `h1` here,
       and the headings below follow one level up from the rest of the site. -->
  <Section
    id="privacy"
    class="my-privacy"
    aria-labelledby="my-privacy-title"
  >
    <div class="my-privacy__inner">
      <div class="my-privacy__intro">
        <p class="my-privacy__eyebrow">{{ privacyEyebrow }}</p>
        <h1 id="my-privacy-title" class="my-privacy__title">{{ privacyTitle }}</h1>
        <p class="my-privacy__lead">{{ privacyLead }}</p>
      </div>

      <div class="my-privacy__chapters">
        <Card
          v-for="chapter in privacyChapters"
          :key="chapter.id"
          as="section"
          class="my-privacy__chapter"
          :aria-labelledby="`my-privacy-${chapter.id}`"
        >
          <h2 :id="`my-privacy-${chapter.id}`" class="my-privacy__chapter-title">
            {{ chapter.title }}
          </h2>

          <div v-for="block in chapter.blocks" :key="block.id" class="my-privacy__block">
            <h3 class="my-privacy__block-title">{{ block.title }}</h3>

            <p
              v-for="(paragraph, index) in block.paragraphs"
              :key="index"
              class="my-privacy__text"
            >
              {{ paragraph }}
            </p>

            <address v-if="block.address" class="my-privacy__address">
              <span
                v-for="line in block.address.lines"
                :key="line"
                class="my-privacy__address-line"
              >
                {{ line }}
              </span>
              <a
                class="my-privacy__link"
                :href="`mailto:${block.address.mail}`"
              >{{ block.address.mail }}</a>
            </address>

            <ul v-if="block.items" class="my-privacy__list">
              <li v-for="item in block.items" :key="item" class="my-privacy__item">
                {{ item }}
              </li>
            </ul>
          </div>
        </Card>
      </div>

      <p class="my-privacy__source">
        {{ privacySource.label }}:
        <a
          class="my-privacy__link"
          :href="privacySource.href"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ privacySource.text }}
          <span class="my-privacy__sr-only">(öffnet in einem neuen Tab)</span>
        </a>
      </p>
    </div>

    <!-- Outside `__inner` on purpose: as a grid item the button could only
         stick inside its own row, which is as tall as the button itself. Here
         its containing block is the whole notice, so it stays in the corner
         for as long as there is text to read. -->
    <div class="my-privacy__back-bar">
      <Cta class="my-privacy__back" color="primary" :href="privacyBackHref">
        <Icon class="my-privacy__back-icon" :path="iconPaths.arrowLeft" />
        {{ privacyBackLabel }}
      </Cta>
    </div>
  </Section>
</template>

<script setup lang="ts">
import Section from '@/src/parts/section/Section.vue';
import Card from '@/src/parts/card/Card.vue';
import Cta from '@/src/parts/cta/Cta.vue';
import Icon from '@/src/parts/icon/Icon.vue';
import { iconPaths } from '@/src/parts/icon/icon.data';
import {
  privacyBackHref,
  privacyBackLabel,
  privacyChapters,
  privacyEyebrow,
  privacyLead,
  privacySource,
  privacyTitle,
} from './privacy.data';
</script>

<style scoped lang="scss">
@use './privacy';
</style>
