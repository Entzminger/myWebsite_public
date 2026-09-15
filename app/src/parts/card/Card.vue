<template>
  <component :is="as" class="my-card">
    <slot />
  </component>
</template>

<script setup lang="ts">
import type { CardElement } from '@/types/card';

interface Props {
  /**
   * The element of the card. Everything else - `aria-labelledby`, and
   * `@submit` on a form - is set on the component and falls through onto
   * that element.
   */
  as?: CardElement;
}

withDefaults(defineProps<Props>(), {
  as: 'article',
});
</script>

<style scoped lang="scss">
@use './card';
</style>
