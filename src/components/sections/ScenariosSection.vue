<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { products } from '@/data/products'
import { useLocale } from '@/composables/useLocale'
import ProductMark from '@/components/ui/ProductMark.vue'

const { t } = useI18n()
const { tr } = useLocale()
</script>

<template>
  <section class="container-x py-16">
    <div class="max-w-2xl">
      <h2 class="h-section">{{ t('scenarios.title') }}</h2>
      <p class="mt-3 text-muted">{{ t('scenarios.subtitle') }}</p>
    </div>
    <div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <RouterLink
        v-for="p in products"
        :key="p.id"
        :to="`/products/${p.id}`"
        class="card reveal flex items-center gap-4 p-4 transition hover:-translate-y-0.5 hover:border-brand"
      >
        <ProductMark :product="p" :size="44" />
        <span class="font-semibold">{{ tr(p.scenario) }}</span>
      </RouterLink>
    </div>
  </section>
</template>
