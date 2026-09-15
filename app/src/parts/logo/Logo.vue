<template>
  <div class="my-logo">
    <!-- Decorative: the wordmark next to it already says the name, so a
         screen reader would only hear it twice. -->
    <svg
      class="my-logo__glyph"
      :viewBox="logoViewBox"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path :d="logoGlyphPath" />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { logoGlyphPath, logoViewBox } from './logo.data';
</script>

<style scoped lang="scss">
@use './logo';
</style>
