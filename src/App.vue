<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import { useHead } from '@unhead/vue'
import { useI18n } from 'vue-i18n'
import SiteHeader from '@/layouts/SiteHeader.vue'
import SiteFooter from '@/layouts/SiteFooter.vue'
import { useTheme } from '@/composables/useTheme'
import { detectLocale, useLocale } from '@/composables/useLocale'

const { t } = useI18n()
const { locale, setLocale } = useLocale()
const route = useRoute()
const theme = useTheme()

useHead({
  htmlAttrs: { lang: () => (locale.value === 'zh' ? 'zh-CN' : 'en') },
  titleTemplate: (title?: string) => (title ? (title.includes('OwO') ? title : `${title} · OwO!`) : 'OwO! — ' + t('brand.tagline')),
  meta: [
    { property: 'og:site_name', content: 'OwO!' },
    { property: 'og:type', content: 'website' },
  ],
})

onMounted(() => {
  theme.init()
  const wanted = detectLocale()
  if (wanted !== locale.value) setLocale(wanted)
})
</script>

<template>
  <a
    href="#main"
    class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-brand focus:px-4 focus:py-2 focus:text-brand-ink"
  >
    {{ t('nav.skip') }}
  </a>
  <SiteHeader />
  <main id="main" tabindex="-1">
    <RouterView v-slot="{ Component }">
      <Transition name="page" mode="out-in">
        <component :is="Component" :key="route.path" />
      </Transition>
    </RouterView>
  </main>
  <SiteFooter />
</template>
