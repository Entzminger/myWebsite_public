<template>
  <footer class="my-footer">
    <div class="my-footer__inner">
      <p class="my-footer__place">
        {{ footerPlace }},
        <time :datetime="footerDate.iso">{{ footerDate.label }}</time>
      </p>
      <!-- Non-breaking space: the sign never ends up alone at a line break. -->
      <p class="my-footer__name">{{ footerCopyright }}&nbsp;{{ footerName }}</p>

      <p class="my-footer__version">{{ version }}</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import {
  footerCopyright,
  footerDate,
  footerName,
  footerPlace,
} from './footer.data';

// Set from `package.json` at build time in `nuxt.config.ts`, so this is a
// plain string on both sides of the hydration and needs no guard.
const { version } = useRuntimeConfig().public;
</script>

<style scoped lang="scss">
@use './footer';
</style>
