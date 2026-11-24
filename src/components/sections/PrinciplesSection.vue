<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const icons = [
  'M12 3 4.5 6v5.5c0 4.4 3.1 8 7.5 9.5 4.4-1.5 7.5-5.1 7.5-9.5V6L12 3Z',
  'M4 7l8-4 8 4v10l-8 4-8-4V7Zm8 4v10M4 7l8 4 8-4',
  'M5 12l4.5 4.5L19 7',
]
</script>

<template>
  <section class="container-x py-16">
    <h2 class="h-section max-w-2xl">{{ t('principles.title') }}</h2>
    <div class="mt-10 grid gap-5 md:grid-cols-3">
      <div v-for="(item, i) in 3" :key="i" class="card reveal p-6">
        <span class="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-surface-2 text-brand">
          <svg viewBox="0 0 24 24" class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path :d="icons[i]" /></svg>
        </span>
        <h3 class="mt-4 text-lg font-semibold">{{ t(`principles.items[${i}].title`) }}</h3>
        <p class="mt-2 text-sm text-muted">{{ t(`principles.items[${i}].desc`) }}</p>
      </div>
    </div>
  </section>
</template>
