<template>
  <Section
    id="imprint"
    class="my-imprint"
    aria-labelledby="my-imprint-title"
  >
    <div class="my-imprint__inner">
      <div class="my-imprint__intro">
        <p class="my-imprint__eyebrow">{{ imprintEyebrow }}</p>
        <h2 id="my-imprint-title" class="my-imprint__title">{{ imprintTitle }}</h2>
        <p class="my-imprint__lead">{{ imprintLead }}</p>
      </div>

      <div class="my-imprint__body">
        <Card class="my-imprint__card" aria-labelledby="my-imprint-provider">
          <h3 id="my-imprint-provider" class="my-imprint__card-title">
            {{ imprintProviderTitle }}
          </h3>

          <dl class="my-imprint__entries">
            <div
              v-for="entry in imprintEntries"
              :key="entry.id"
              class="my-imprint__entry"
            >
              <dt class="my-imprint__entry-label">{{ entry.label }}</dt>
              <dd class="my-imprint__entry-value">
                <span
                  v-for="line in entry.lines"
                  :key="line"
                  class="my-imprint__entry-line"
                >
                  <a v-if="entry.href" class="my-imprint__link" :href="entry.href">
                    {{ line }}
                  </a>
                  <template v-else>{{ line }}</template>
                </span>
              </dd>
            </div>
          </dl>
        </Card>

        <div class="my-imprint__notes">
          <div v-for="note in imprintNotes" :key="note.id" class="my-imprint__note">
            <h3 class="my-imprint__note-title">{{ note.title }}</h3>
            <p
              v-for="(paragraph, index) in note.paragraphs"
              :key="index"
              class="my-imprint__note-text"
            >
              {{ paragraph }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </Section>
</template>

<script setup lang="ts">
import Section from '@/src/parts/section/Section.vue';
import Card from '@/src/parts/card/Card.vue';
import {
  imprintEntries,
  imprintEyebrow,
  imprintLead,
  imprintNotes,
  imprintProviderTitle,
  imprintTitle,
} from './imprint.data';
</script>

<style scoped lang="scss">
@use './imprint';
</style>
