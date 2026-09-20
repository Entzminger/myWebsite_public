<template>
  <ul class="my-highlights">
    <li v-for="highlight in highlights" :key="highlight.id" class="my-highlights__item">
      <Icon class="my-highlights__icon" :path="iconPaths.check" />
      <span class="my-highlights__label">{{ highlight.label }}</span>
      <span class="my-highlights__detail">{{ highlight.detail }}</span>
    </li>
  </ul>
</template>

<script setup lang="ts">
import Icon from '@/src/parts/icon/Icon.vue';
import { iconPaths } from '@/src/parts/icon/icon.data';
import type { Highlight } from '@/types/highlights';

interface Props {
  /** The points to list, in the order they should appear. */
  highlights: Highlight[];
}

defineProps<Props>();
</script>

<style scoped lang="scss">
@use './highlights';
</style>
