<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { products } from '@/data/products'
import { useLocale } from '@/composables/useLocale'
import ProductMark from '@/components/ui/ProductMark.vue'
import StatusBadge from '@/components/ui/StatusBadge.vue'
import OpennessBadge from '@/components/ui/OpennessBadge.vue'

const { t } = useI18n()
const { tr } = useLocale()
</script>

<template>
  <section id="products" class="container-x scroll-mt-20 py-16">
    <div class="max-w-2xl">
      <h2 class="h-section">{{ t('matrix.title') }}</h2>
      <p class="mt-3 text-muted">{{ t('matrix.subtitle') }}</p>
    </div>
    <div class="mt-10 grid gap-5 lg:grid-cols-6">
      <RouterLink
        v-for="p in products"
        :key="p.id"
        :to="`/products/${p.id}`"
        class="card reveal group lg:col-span-3 lg:last:odd:col-span-6 relative flex flex-col overflow-hidden p-6 transition hover:-translate-y-1"
        :style="{ '--accent': p.accent }"
      >
        <div
          class="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-25 blur-3xl transition group-hover:opacity-50"
          :style="{ background: p.accent }"
          aria-hidden="true"
        />
        <div class="relative flex flex-wrap items-start justify-between gap-3">
          <ProductMark :product="p" :size="52" />
          <div class="flex flex-wrap justify-end gap-2">
            <StatusBadge :product="p" />
            <OpennessBadge :product="p" />
          </div>
        </div>
        <h3 class="relative mt-5 text-xl font-bold tracking-tight">{{ p.name }}</h3>
        <p class="relative mt-1 font-medium">{{ tr(p.tagline) }}</p>
        <p class="relative mt-2 text-sm text-muted">{{ tr(p.summary) }}</p>
        <dl class="relative mt-6 grid grid-cols-3 gap-3 border-t border-line pt-4">
          <div v-for="s in p.stats" :key="s.value">
            <dt class="font-mono text-base font-semibold" :style="{ color: `color-mix(in srgb, ${p.accent} 60%, var(--ink))` }">{{ s.value }}</dt>
            <dd class="text-xs text-muted">{{ tr(s.label) }}</dd>
          </div>
        </dl>
        <span class="relative mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand">
          {{ t('matrix.learnMore') }}
          <svg viewBox="0 0 24 24" class="h-4 w-4 transition group-hover:translate-x-1" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </span>
      </RouterLink>
    </div>
  </section>
</template>
