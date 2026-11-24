<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { products, siteLinks } from '@/data/products'
import ProductMark from '@/components/ui/ProductMark.vue'

const { t } = useI18n()
const positions = [
  'left-0 top-4',
  'right-0 top-0',
  'left-1/2 top-24 -translate-x-1/2',
  'left-2 bottom-0',
  'right-2 bottom-2',
]
</script>

<template>
  <section class="relative overflow-hidden">
    <div
      class="pointer-events-none absolute inset-x-0 -top-24 h-[34rem]"
      style="background: radial-gradient(60% 60% at 50% 0%, var(--glow), transparent 70%)"
      aria-hidden="true"
    />
    <div class="container-x relative grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-[1.15fr_0.85fr]">
      <div>
        <p class="eyebrow">{{ t('hero.eyebrow') }}</p>
        <h1 class="mt-4 text-4xl font-bold leading-[1.12] tracking-tight sm:text-5xl lg:text-[3.4rem]">
          {{ t('hero.title') }}
        </h1>
        <p class="mt-5 max-w-xl text-lg text-muted">{{ t('hero.subtitle') }}</p>
        <div class="mt-8 flex flex-wrap gap-3">
          <a href="#products" class="btn btn-primary">{{ t('hero.ctaProducts') }}</a>
          <a :href="siteLinks.blog" target="_blank" rel="noopener" class="btn">{{ t('hero.ctaBlog') }}</a>
        </div>
      </div>

      <!-- 产品标志的漂浮网格 -->
      <div class="relative mx-auto hidden h-72 w-full max-w-sm lg:block" aria-hidden="true">
        <RouterLink
          v-for="(p, i) in products"
          :key="p.id"
          :to="`/products/${p.id}`"
          tabindex="-1"
          class="card float absolute flex h-28 w-28 items-center justify-center rounded-3xl"
          :class="positions[i]"
          :style="{ animationDelay: i * -1.4 + 's' }"
        >
          <ProductMark :product="p" :size="64" />
        </RouterLink>
      </div>
    </div>
  </section>
</template>
