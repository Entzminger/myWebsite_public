<template>
  <div>
    <Navi></Navi>
    <main>
      <NuxtPage></NuxtPage>
    </main>
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
//
// Between them the `<main>` landmark, which is why it stands here and not in a
// page: every route needs exactly one, and there is only ever one `<NuxtPage>`
// to wrap. It carries no class and no styles - a landmark is all it is, and a
// bare `<main>` is already a block box. What goes on the printed sheet is
// decided by the sections inside it, as before.
</script>
