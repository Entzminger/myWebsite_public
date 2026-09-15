<template>
  <Section id="contact" class="my-contact" aria-labelledby="my-contact-title">
    <div class="my-contact__inner">
      <div class="my-contact__intro">
        <p class="my-contact__eyebrow">{{ contactEyebrow }}</p>
        <h2 id="my-contact-title" class="my-contact__title">{{ contactTitle }}</h2>
        <p class="my-contact__lead">{{ contactLead }}</p>
        <p class="my-contact__text">{{ contactIntro }}</p>

        <h3 id="my-contact-profiles" class="my-contact__profiles-title">
          {{ contactProfilesTitle }}
        </h3>
        <ul class="my-contact__profiles" aria-labelledby="my-contact-profiles">
          <li
            v-for="profile in profiles"
            :key="profile.id"
            class="my-contact__profile-item"
          >
            <!-- `me` marks the target as another profile of the same person -
                 the readable counterpart to `sameAs` in the structured data. -->
            <a
              class="my-contact__profile"
              :href="profile.url"
              target="_blank"
              rel="me noopener noreferrer"
            >
              <svg
                class="my-contact__profile-icon"
                :viewBox="profile.viewBox"
                fill="currentColor"
                aria-hidden="true"
                focusable="false"
              >
                <path :d="profile.iconPath" />
              </svg>
              {{ profile.label }}
              <span class="my-contact__sr-only">(öffnet in einem neuen Tab)</span>
            </a>
          </li>
        </ul>
      </div>

      <Card
        as="form"
        class="my-contact__form"
        aria-labelledby="my-contact-form-title"
        @submit.prevent="openMailClient"
      >
        <h3 id="my-contact-form-title" class="my-contact__form-title">
          {{ contactFormTitle }}
        </h3>

        <div
          v-for="field in contactFields"
          :key="field.id"
          class="my-contact__field"
        >
          <label class="my-contact__label" :for="`my-contact-${field.id}`">
            {{ field.label }}
          </label>

          <!-- The message is the only multi-line field; everything else about
               the two variants is identical, down to the class. -->
          <textarea
            v-if="field.type === 'textarea'"
            :id="`my-contact-${field.id}`"
            v-model="form[field.id]"
            class="my-contact__input my-contact__input--area"
            :placeholder="field.placeholder"
            :autocomplete="field.autocomplete"
            rows="5"
            required
          ></textarea>
          <input
            v-else
            :id="`my-contact-${field.id}`"
            v-model="form[field.id]"
            class="my-contact__input"
            :type="field.type"
            :placeholder="field.placeholder"
            :autocomplete="field.autocomplete"
            required
          />
        </div>

        <Cta
          as="button"
          type="submit"
          class="my-contact__submit"
          color="accent"
        >
          <svg
            class="my-contact__submit-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
            focusable="false"
          >
            <path :d="contactSendIconPath" />
          </svg>
          {{ contactSubmitLabel }}
        </Cta>

        <p class="my-contact__hint">{{ contactHint }}</p>

        <!-- The live region is in the markup from the first render on, empty
             until it has something to say - a region added on submit would
             come too late to be announced. -->
        <p
          class="my-contact__status"
          :class="{ 'my-contact__status--active': hasSubmitted }"
          role="status"
        >
          <template v-if="hasSubmitted">
            {{ contactStatus }}
            <a class="my-contact__fallback" :href="mailtoHref">
              {{ contactFallbackLabel }}
            </a>
          </template>
        </p>
      </Card>
    </div>
  </Section>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import Section from '@/src/parts/section/Section.vue';
import Card from '@/src/parts/card/Card.vue';
import Cta from '@/src/parts/cta/Cta.vue';
import type { ContactFieldId } from '@/types/contact';
import {
  contactEyebrow,
  contactFallbackLabel,
  contactFields,
  contactFormTitle,
  contactHint,
  contactIntro,
  contactLead,
  contactMailSubject,
  contactMailTo,
  contactProfilesTitle,
  contactSendIconPath,
  contactStatus,
  contactSubmitLabel,
  contactTitle,
  profiles,
} from './contact.data';

const form = reactive<Record<ContactFieldId, string>>({
  name: '',
  email: '',
  message: '',
});

// Empty on the server and on the first client render, so hydration matches.
const hasSubmitted = ref(false);

// The whole message is prepared as a `mailto:` URL and handed to the visitor's
// own mail client. That keeps the site backend-free and static-exportable, and
// the message arrives from the sender's real address instead of a relay.
const mailtoHref = computed(() => {
  const subject = form.name
    ? `${contactMailSubject} – ${form.name}`
    : contactMailSubject;
  const body = `${form.message}\n\n--\n${form.name}\n${form.email}`;

  return `mailto:${contactMailTo}`
    + `?subject=${encodeURIComponent(subject)}`
    + `&body=${encodeURIComponent(body)}`;
});

// `required` on the fields means the browser validates first: this only runs
// on a complete form. `window` is safe here, a submit is always client-side.
const openMailClient = () => {
  hasSubmitted.value = true;
  window.location.href = mailtoHref.value;
};
</script>

<style scoped lang="scss">
@use './contact';
</style>
