<template>
  <footer class="my-footer">
    <div class="my-footer__inner">
      <p class="my-footer__place">
        {{ footerPlace }},
        <time :datetime="footerDate.iso">{{ footerDate.label }}</time>
      </p>
      <!-- Non-breaking space: the sign never ends up alone at a line break. -->
      <p class="my-footer__name">{{ footerCopyright }}&nbsp;{{ footerName }}</p>
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
</script>

<style scoped lang="scss">
@use './footer';
</style>
