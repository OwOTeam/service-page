<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { useI18n } from 'vue-i18n'
import { useSeo } from '@/composables/useSeo'
import { SITE_URL } from '@/data/site'
import { products } from '@/data/products'
import HeroSection from '@/components/sections/HeroSection.vue'
import ProductMatrix from '@/components/sections/ProductMatrix.vue'
import PrinciplesSection from '@/components/sections/PrinciplesSection.vue'
import SynergySection from '@/components/sections/SynergySection.vue'
import ScenariosSection from '@/components/sections/ScenariosSection.vue'
import RoadmapSection from '@/components/sections/RoadmapSection.vue'

const { t } = useI18n()
useHead({ title: () => `OwO! — ${t('brand.tagline')}`, titleTemplate: '%s' })
useSeo({
  title: () => `OwO! — ${t('brand.tagline')}`,
  description: () => t('hero.subtitle'),
  path: '/',
  jsonLd: () => [
    {
      '@type': 'Organization',
      name: 'OwO Team',
      url: `${SITE_URL}/`,
      logo: `${SITE_URL}/favicon.svg`,
      email: 'support@owoblog.com',
      sameAs: ['https://hanskijay.dev'],
    },
    {
      '@type': 'WebSite',
      name: 'OwO!',
      url: `${SITE_URL}/`,
      inLanguage: ['zh-CN', 'en'],
    },
    {
      '@type': 'ItemList',
      name: 'OwO! Products',
      itemListElement: products.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: p.name,
        url: `${SITE_URL}/products/${p.id}`,
      })),
    },
  ],
})
</script>

<template>
  <HeroSection />
  <ProductMatrix />
  <PrinciplesSection />
  <SynergySection />
  <ScenariosSection />
  <RoadmapSection />
</template>
