<template>
  <ul class="my-chips" :class="`my-chips--${size}`">
    <li
      v-for="chip in chips"
      :key="chip.text"
      class="my-chips__chip"
      :class="`my-chips__chip--${chip.color ?? 'neutral'}`"
    >
      <svg
        v-if="chip.iconPath"
        class="my-chips__icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.75"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
        focusable="false"
      >
        <path :d="chip.iconPath" />
      </svg>
      {{ chip.text }}
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { Chip, ChipSize } from '@/types/chips';

interface Props {
  /** The chips, in the order they are meant to stand in. */
  chips: Chip[];
  /**
   * `small` for keyword lists inside a card, `large` for the chips that stand
   * next to the copy on the section ground.
   */
  size?: ChipSize;
}

withDefaults(defineProps<Props>(), {
  size: 'small',
});
</script>

<style scoped lang="scss">
@use './chips';
</style>
