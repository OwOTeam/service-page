<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { timeline } from '@/data/products'
import { useLocale } from '@/composables/useLocale'
import StatusBadge from '@/components/ui/StatusBadge.vue'

const { t } = useI18n()
const { tr } = useLocale()
</script>

<template>
  <section class="container-x py-16">
    <div class="max-w-2xl">
      <h2 class="h-section">{{ t('roadmap.title') }}</h2>
      <p class="mt-3 text-muted">{{ t('roadmap.subtitle') }}</p>
    </div>
    <ol class="relative mt-10 space-y-6 border-l border-line pl-6">
      <li v-for="p in timeline" :key="p.id" class="reveal relative">
        <span
          class="absolute -left-[1.95rem] top-1.5 h-3 w-3 rounded-full ring-4 ring-bg"
          :style="{ background: p.accent }"
          aria-hidden="true"
        />
        <time class="font-mono text-sm text-muted" :datetime="p.released">{{ p.released }}</time>
        <div class="mt-1 flex flex-wrap items-center gap-x-3 gap-y-2">
          <RouterLink :to="`/products/${p.id}`" class="font-semibold hover:text-brand">{{ p.name }}</RouterLink>
          <StatusBadge :product="p" />
        </div>
        <p class="mt-1 text-sm text-muted">{{ tr(p.tagline) }}</p>
      </li>
    </ol>
  </section>
</template>
