<template>
  <div>
    <Presenter></Presenter>
    <Resume></Resume>
    <Foundation></Foundation>
    <Github></Github>
    <Contact></Contact>
    <Imprint></Imprint>
    <BackToTop></BackToTop>
  </div>
</template>

<script setup lang="ts">
import Presenter from '@/src/sections/presenter/Presenter.vue';
import Resume from '@/src/sections/resume/Resume.vue';
import Foundation from '@/src/sections/foundation/Foundation.vue';
import Github from '@/src/sections/github/Github.vue';
import Contact from '@/src/sections/contact/Contact.vue';
import Imprint from '@/src/sections/imprint/Imprint.vue';
import BackToTop from '@/src/parts/backtotop/BackToTop.vue';

// The page itself: every section in document order. The imprint stays here as
// a section of it - it is short and carries name and address, which the page
// is better off keeping. Title, description and structured data come from the
// sections that own them (see `Presenter` and `Resume`).
</script>
