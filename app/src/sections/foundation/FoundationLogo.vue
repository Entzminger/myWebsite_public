<template>
  <!-- The mark of withalittlehelp.de, rebuilt from that site's CSS. It appears
       three times in the section, so it lives in its own component instead of
       being repeated in the template.

       By default the whole mark is one colour and the box stays empty, like on
       the site's own green header. The two custom properties let a single use
       site fill the box and set the stairs apart from the frame. -->
  <svg viewBox="0 0 84 52" fill="currentColor" aria-hidden="true" focusable="false">
    <rect
      x="2"
      y="2"
      width="80"
      height="48"
      rx="8"
      fill="var(--my-foundation-logo-plate, transparent)"
    />
    <path :d="foundationFramePath" fill-rule="evenodd" />
    <path :d="foundationStairsPath" fill="var(--my-foundation-logo-stairs, currentColor)" />
  </svg>
</template>

<script setup lang="ts">
import { foundationFramePath, foundationStairsPath } from './foundation.data';
</script>
