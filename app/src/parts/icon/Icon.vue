<template>
  <!-- The wrapper around every icon of the page. It stood written out at
       thirteen use sites with the same eight attributes, which is thirteen
       copies of a decision - `aria-hidden` above all - that is the same
       everywhere.

       Size and colour are deliberately not props: they come from the class the
       use site passes in, which falls through onto this element. -->
  <svg
    class="my-icon"
    :viewBox="viewBox"
    v-bind="stances[variant]"
    aria-hidden="true"
    focusable="false"
  >
    <path :d="path" />
  </svg>
</template>

<script setup lang="ts">
import type { IconVariant } from '@/types/icon';

interface Props {
  /** The path itself, from `icon.data.ts` - never written out here. */
  path: string;
  /** `stroke` for a line icon, `fill` for a solid brand mark. */
  variant?: IconVariant;
  /** Only for a mark that is not drawn on the 24×24 grid. */
  viewBox?: string;
}

withDefaults(defineProps<Props>(), {
  variant: 'stroke',
  viewBox: '0 0 24 24',
});

/**
 * What the two variants draw with. These stay attributes rather than moving
 * into the stylesheet on purpose: they are what makes the drawing appear at
 * all, and a presentation attribute still holds where the stylesheet does not.
 * Only `stroke-width` is a custom property (see `_icon.scss`) - it is the one
 * value a use site changes.
 */
const stances: Record<IconVariant, Record<string, string>> = {
  fill: {
    fill: 'currentColor',
  },
  stroke: {
    'fill': 'none',
    'stroke': 'currentColor',
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
  },
};
</script>

<style scoped lang="scss">
@use './icon';
</style>
