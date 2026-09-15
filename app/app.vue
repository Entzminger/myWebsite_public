<template>
  <div>
    <Navi></Navi>
    <NuxtPage></NuxtPage>
    <Footer></Footer>
  </div>
</template>

<script setup lang="ts">
import Navi from '@/src/parts/navi/Navi.vue';
import Footer from '@/src/parts/footer/Footer.vue';

// The frame around every route: the bar above, the signature line below. Both
// stand outside `<NuxtPage>` on purpose - the privacy notice is a route of its
// own now, and the imprint and the notice have to be reachable from each one
// of them.
</script>
