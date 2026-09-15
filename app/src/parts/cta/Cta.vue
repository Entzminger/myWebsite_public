<template>
  <component :is="as" class="my-cta" :class="`my-cta--${color}`">
    <slot />
  </component>
</template>

<script setup lang="ts">
import type { CtaColor, CtaElement } from '@/types/cta';

interface Props {
  /**
   * The element of the button. Everything else - `href` on a link, `type` on
   * a button - is set on the component and falls through onto it.
   */
  as?: CtaElement;
  /** The colour setting; `brand` leaves the tones to the section. */
  color?: CtaColor;
}

withDefaults(defineProps<Props>(), {
  as: 'a',
  color: 'primary',
});
</script>

<style scoped lang="scss">
@use './cta';
</style>
