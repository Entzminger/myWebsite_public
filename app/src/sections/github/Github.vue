<template>
  <Section id="github" class="my-github" aria-labelledby="my-github-title">
    <!-- Oversized version control mark as the ground of the block: blurred and
         barely there, so it reads as texture and never as a second logo. -->
    <div class="my-github__backdrop" aria-hidden="true">
      <svg
        class="my-github__backdrop-logo"
        viewBox="0 0 96 96"
        fill="none"
        stroke="currentColor"
        stroke-width="9"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path v-for="(path, index) in versionControlPaths" :key="index" :d="path" />
      </svg>
    </div>

    <div class="my-github__inner">
      <div class="my-github__intro">
        <p class="my-github__eyebrow">{{ githubEyebrow }}</p>
        <h2 id="my-github-title" class="my-github__title">{{ githubTitle }}</h2>
        <p class="my-github__lead">{{ githubLead }}</p>
        <p class="my-github__text">{{ githubIntro }}</p>

        <Highlights class="my-github__highlights" :highlights="highlights" />
      </div>

      <Card aria-labelledby="my-github-repo">
        <header class="my-github__card-header">
          <Icon
            class="my-github__card-icon"
            variant="fill"
            view-box="0 0 98 96"
            :path="githubLogoPath"
          />
          <h3 id="my-github-repo" class="my-github__repo">
            <span class="my-github__repo-owner">{{ repositoryOwner }}/</span>
            <span class="my-github__repo-name">{{ repositoryName }}</span>
          </h3>
          <p class="my-github__branch">
            <span class="my-github__branch-dot" aria-hidden="true"></span>
            {{ repository.branch }}
          </p>
        </header>

        <p class="my-github__card-text">{{ repository.description }}</p>

        <Chips class="my-github__topics" :chips="topicChips" />

        <Cta
          class="my-github__cta"
          color="brand"
          :href="repository.url"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon
            class="my-github__cta-icon"
            variant="fill"
            view-box="0 0 98 96"
            :path="githubLogoPath"
          />
          {{ githubCtaLabel }}
          <span class="my-github__sr-only">(öffnet in einem neuen Tab)</span>
          <Icon class="my-github__cta-arrow" :path="iconPaths.externalLink" />
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
import Icon from '@/src/parts/icon/Icon.vue';
import { iconPaths } from '@/src/parts/icon/icon.data';
import {
  githubCtaLabel,
  githubEyebrow,
  githubIntro,
  githubLead,
  githubLogoPath,
  githubTitle,
  highlights,
  repository,
  versionControlPaths,
} from './github.data';

// `owner/name` is split once here so the template can weight both halves
// differently, the way GitHub itself does.
const [repositoryOwner = '', repositoryName = ''] = repository.fullName.split('/');

// The purple of the chips belongs to GitHub, not to the site's palette; it is
// set on the list in `_github.scss` instead of travelling through the model.
const topicChips = toChips(repository.topics);
</script>

<style scoped lang="scss">
@use './github';
</style>
