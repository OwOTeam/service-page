<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { products, siteLinks } from '@/data/products'

const { t } = useI18n()
const year = new Date().getFullYear()
const logo = `${import.meta.env.BASE_URL}favicon.svg`
</script>

<template>
  <footer class="mt-24 border-t border-line bg-surface-2/50">
    <div class="container-x grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
      <div class="lg:col-span-2">
        <div class="flex items-center gap-2.5 font-bold">
          <img :src="logo" alt="" class="h-8 w-8 rounded-lg" />
          <span class="text-lg">OwO!</span>
        </div>
        <p class="mt-3 max-w-sm text-sm text-muted">{{ t('brand.tagline') }}</p>
      </div>
      <div>
        <h2 class="text-sm font-semibold">{{ t('footer.products') }}</h2>
        <ul class="mt-3 space-y-2 text-sm text-muted">
          <li v-for="p in products" :key="p.id">
            <RouterLink :to="`/products/${p.id}`" class="hover:text-ink">{{ p.name }}</RouterLink>
          </li>
        </ul>
      </div>
      <div>
        <h2 class="text-sm font-semibold">{{ t('footer.resources') }}</h2>
        <ul class="mt-3 space-y-2 text-sm text-muted">
          <li><a :href="siteLinks.blog" target="_blank" rel="noopener" class="hover:text-ink">{{ t('about.blog') }}</a></li>
          <li><RouterLink to="/about" class="hover:text-ink">{{ t('nav.about') }}</RouterLink></li>
          <li><RouterLink to="/legal" class="hover:text-ink">{{ t('nav.legal') }}</RouterLink></li>
        </ul>
      </div>
    </div>
    <div class="border-t border-line">
      <div class="container-x flex flex-col gap-1 py-5 text-xs text-muted sm:flex-row sm:justify-between">
        <span>{{ t('footer.rights', { year }) }}</span>
        <span>{{ t('footer.built') }}</span>
      </div>
    </div>
  </footer>
</template>
