<template>
  <ul class="my-highlights">
    <li v-for="highlight in highlights" :key="highlight.id" class="my-highlights__item">
      <svg
        class="my-highlights__icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
        focusable="false"
      >
        <path :d="highlightIconPath" />
      </svg>
      <span class="my-highlights__label">{{ highlight.label }}</span>
      <span class="my-highlights__detail">{{ highlight.detail }}</span>
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { Highlight } from '@/types/highlights';
import { highlightIconPath } from './highlights.data';

interface Props {
  /** The points to list, in the order they should appear. */
  highlights: Highlight[];
}

defineProps<Props>();
</script>

<style scoped lang="scss">
@use './highlights';
</style>
