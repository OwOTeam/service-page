<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { useI18n } from 'vue-i18n'
import { useSeo } from '@/composables/useSeo'
import { products } from '@/data/products'
import { useLocale } from '@/composables/useLocale'
import ProductMark from '@/components/ui/ProductMark.vue'
import StatusBadge from '@/components/ui/StatusBadge.vue'
import OpennessBadge from '@/components/ui/OpennessBadge.vue'

const { t } = useI18n()
const { tr } = useLocale()
useHead({ title: () => t('legal.title') })
useSeo({ title: () => t('legal.title'), description: () => t('legal.intro'), path: '/legal' })
</script>

<template>
  <section class="container-x max-w-3xl py-16">
    <h1 class="text-3xl font-bold tracking-tight sm:text-4xl">{{ t('legal.title') }}</h1>
    <p class="mt-5 text-muted">{{ t('legal.intro') }}</p>
    <div class="mt-10 space-y-5">
      <article v-for="p in products" :key="p.id" class="card p-6">
        <div class="flex flex-wrap items-center gap-3">
          <ProductMark :product="p" :size="36" />
          <h2 class="text-lg font-semibold">{{ p.name }}</h2>
          <StatusBadge :product="p" />
          <OpennessBadge :product="p" />
        </div>
        <p class="mt-3 text-sm text-muted">{{ tr(p.license) }}</p>
        <ul class="mt-3 list-disc space-y-1 pl-5 text-sm text-muted">
          <li v-for="n in p.notes" :key="n.en">{{ tr(n) }}</li>
        </ul>
      </article>
    </div>
    <p class="mt-8 text-xs text-muted">{{ t('legal.disclaimer') }}</p>
  </section>
</template>
