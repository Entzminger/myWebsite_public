<template>
  <header class="my-navi" @keydown.escape="closeAndRefocus">
    <a class="my-navi__skip" :href="skipHref">Zum Inhalt springen</a>

    <div class="my-navi__inner">
      <a class="my-navi__brand" :href="startPath" @click="isOpen = false">
        <Logo />
        <span class="my-navi__wordmark">
          {{ brandName }}<span class="my-navi__dot" aria-hidden="true">.</span>
        </span>
      </a>

      <button
        ref="burger"
        type="button"
        class="my-navi__burger"
        :class="{ 'my-navi__burger--open': isOpen }"
        :aria-label="isOpen ? 'Menü schließen' : 'Menü öffnen'"
        :aria-expanded="isOpen"
        aria-controls="my-navi-menu"
        @click="isOpen = !isOpen"
      >
        <span class="my-navi__bars" aria-hidden="true">
          <span class="my-navi__bar"></span>
          <span class="my-navi__bar"></span>
          <span class="my-navi__bar"></span>
        </span>
      </button>

      <nav
        id="my-navi-menu"
        class="my-navi__nav"
        :class="{ 'my-navi__nav--open': isOpen }"
        aria-label="Hauptnavigation"
      >
        <ul class="my-navi__list">
          <li v-for="item in naviItems" :key="item.id" class="my-navi__item">
            <a
              class="my-navi__link"
              :class="{ 'my-navi__link--active': item.id === activeId }"
              :href="item.href"
              :aria-current="item.id === activeId ? 'true' : undefined"
              @click="isOpen = false"
            >
              {{ item.label }}
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, useTemplateRef } from 'vue';
import Logo from '@/src/parts/logo/Logo.vue';
import { brandName, naviItems, startPath } from './navi.data';

const route = useRoute();

// Empty on the server and on the first client render, so hydration matches;
// the observer fills it in right after mount.
const observedId = ref('');

// An entry that is a route of its own is never scrolled into, so the scrollspy
// cannot report on it - the current path answers for those, and it answers the
// same on the server as in the browser. Everything else is a section, and
// there the observer decides.
const activeId = computed(
  () => naviItems.find((item) => item.route && item.href === route.path)?.id
    ?? observedId.value,
);

// On a route of its own the first section is on the start page, not here.
const skipHref = computed(
  () => (route.path === startPath ? '#profile' : `${startPath}#profile`),
);

// The burger menu only exists below the medium breakpoint; above it CSS shows
// the list regardless of this flag.
const isOpen = ref(false);
const burgerRef = useTemplateRef<HTMLButtonElement>('burger');

// Escape leaves the focus inside a panel that is about to disappear, so it
// goes back to the control that opened it. Following a link does the
// opposite: there the focus belongs to the anchor target.
const closeAndRefocus = () => {
  if (!isOpen.value) {
    return;
  }

  isOpen.value = false;
  burgerRef.value?.focus();
};

let observer: IntersectionObserver | null = null;

onMounted(() => {
  // On a route of its own none of these exist, and the list stays empty - the
  // scrollspy simply has nothing to do there.
  const sections = naviItems
    .filter((item) => !item.route)
    .map((item) => document.getElementById(item.id))
    .filter((section): section is HTMLElement => section !== null);

  if (sections.length === 0) {
    return;
  }

  // A section is active while it covers the band just below the sticky bar,
  // so the following section only takes over once it really is in view.
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          observedId.value = entry.target.id;
        }
      }
    },
    { rootMargin: '-20% 0px -70% 0px' },
  );

  for (const section of sections) {
    observer.observe(section);
  }
});

onBeforeUnmount(() => {
  observer?.disconnect();
  observer = null;
});
</script>

<style scoped lang="scss">
@use './navi';
</style>
