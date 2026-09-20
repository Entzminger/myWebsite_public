<template>
  <a
    class="my-backtotop"
    :class="{ 'my-backtotop--visible': isVisible }"
    :href="`#${backToTopTarget}`"
    :aria-label="backToTopLabel"
    :title="backToTopLabel"
  >
    <Icon class="my-backtotop__icon" :path="iconPaths.arrowUp" />
  </a>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import Icon from '@/src/parts/icon/Icon.vue';
import { iconPaths } from '@/src/parts/icon/icon.data';
import { backToTopLabel, backToTopTarget } from './backtotop.data';

// Hidden on the server and on the first client render, so hydration matches;
// the observer decides right after mount.
const isVisible = ref(false);

let observer: IntersectionObserver | null = null;

onMounted(() => {
  const target = document.getElementById(backToTopTarget);

  if (target === null) {
    return;
  }

  // The button is the way back out of the page, so it only belongs on screen
  // once the first section has scrolled away entirely - from the second
  // section onwards.
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        isVisible.value = !entry.isIntersecting;
      }
    },
    { threshold: 0 },
  );

  observer.observe(target);
});

onBeforeUnmount(() => {
  observer?.disconnect();
  observer = null;
});
</script>

<style scoped lang="scss">
@use './backtotop';
</style>
