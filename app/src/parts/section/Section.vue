<template>
  <section class="my-section">
    <slot />
  </section>
</template>

<script setup lang="ts">
// The frame every content section of the page stands in: the `<section>`
// element and the one stylesheet that gives it ground, rhythm and type. The
// section itself brings only what makes it different.
//
// It takes no props. What varies from section to section - `id`,
// `aria-labelledby` and the section's own block class - is set on the
// component and falls through onto the element, and Vue merges that class with
// `my-section` by itself:
//
//   <Section id="cv" class="my-resume" aria-labelledby="my-resume-title">
//
// renders `<section id="cv" class="my-section my-resume" …>`. A prop per
// attribute would only rename what HTML already calls by that name, the way
// `Card` and `Cta` leave `href`, `type` and `@submit` to fall through.
</script>

<style lang="scss">
// Deliberately not `scoped`: `.my-section` has to stay a single-class selector
// so the `scoped` rules of a section outweigh it on the shared root element.
// The reason in full is at the top of the partial.
@use './section';
</style>
