<template>
  <Privacy></Privacy>
</template>

<script setup lang="ts">
import { personName } from '@/src/parts/person/person.data';
import Privacy from '@/src/sections/privacy/Privacy.vue';
import { privacyTitle } from '@/src/sections/privacy/privacy.data';

// Not something anyone should find through a search.
// It has to be reachable, not indexed. `follow` stays on so the links
// back onto the page keep counting.
// Deliberately no canonical here - `noindex` and `rel=canonical` are
// contradictory signals, and the page that should be indexed says so itself.
useSeoMeta({
  title: `${privacyTitle} – ${personName}`,
  robots: 'noindex, follow',
});
</script>
