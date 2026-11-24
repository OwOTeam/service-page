<script setup lang="ts">
import { ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useWindowScroll } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import { products } from '@/data/products'
import { useLocale } from '@/composables/useLocale'
import ProductMark from '@/components/ui/ProductMark.vue'
import ThemeToggle from '@/components/ui/ThemeToggle.vue'
import LangSwitch from '@/components/ui/LangSwitch.vue'

const { t } = useI18n()
const { tr } = useLocale()
const route = useRoute()
const { y } = useWindowScroll()
const open = ref(false)
const logo = `${import.meta.env.BASE_URL}favicon.svg`

watch(() => route.fullPath, () => (open.value = false))
</script>

<template>
  <header
    class="sticky top-0 z-40 border-b transition-colors"
    :class="y > 8 ? 'border-line bg-bg/80 backdrop-blur-xl' : 'border-transparent bg-transparent'"
  >
    <div class="container-x flex h-16 items-center justify-between gap-4">
      <RouterLink to="/" class="flex items-center gap-2.5 font-bold tracking-tight" aria-label="OwO!">
        <img :src="logo" alt="" class="h-8 w-8 rounded-lg" />
        <span class="text-lg">OwO!</span>
      </RouterLink>

      <nav class="hidden items-center gap-1 md:flex" aria-label="Main">
        <div class="group relative">
          <button
            type="button"
            class="inline-flex h-10 items-center gap-1 rounded-full px-4 text-sm font-medium text-muted transition hover:text-ink"
            aria-haspopup="true"
          >
            {{ t('nav.products') }}
            <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6" /></svg>
          </button>
          <div
            class="invisible absolute left-0 top-full w-80 pt-2 opacity-0 transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100"
          >
            <div class="card p-2">
              <RouterLink
                v-for="p in products"
                :key="p.id"
                :to="`/products/${p.id}`"
                class="flex items-center gap-3 rounded-xl p-2.5 transition hover:bg-surface-2"
              >
                <ProductMark :product="p" :size="36" />
                <span class="min-w-0">
                  <span class="block text-sm font-semibold">{{ p.name }}</span>
                  <span class="block truncate text-xs text-muted">{{ tr(p.tagline) }}</span>
                </span>
              </RouterLink>
            </div>
          </div>
        </div>
        <RouterLink to="/about" class="inline-flex h-10 items-center rounded-full px-4 text-sm font-medium text-muted transition hover:text-ink">
          {{ t('nav.about') }}
        </RouterLink>
        <RouterLink to="/legal" class="inline-flex h-10 items-center rounded-full px-4 text-sm font-medium text-muted transition hover:text-ink">
          {{ t('nav.legal') }}
        </RouterLink>
      </nav>

      <div class="flex items-center gap-2">
        <LangSwitch class="hidden sm:inline-flex" />
        <ThemeToggle />
        <button
          type="button"
          class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface md:hidden"
          :aria-label="open ? t('nav.close') : t('nav.menu')"
          :aria-expanded="open"
          aria-controls="mobile-nav"
          @click="open = !open"
        >
          <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <path v-if="!open" d="M4 7h16M4 12h16M4 17h16" />
            <path v-else d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>
      </div>
    </div>

    <div v-if="open" id="mobile-nav" class="border-t border-line bg-bg md:hidden">
      <div class="container-x space-y-1 py-4">
        <RouterLink
          v-for="p in products"
          :key="p.id"
          :to="`/products/${p.id}`"
          class="flex items-center gap-3 rounded-xl p-2 hover:bg-surface-2"
        >
          <ProductMark :product="p" :size="32" />
          <span class="text-sm font-semibold">{{ p.name }}</span>
        </RouterLink>
        <div class="flex gap-2 pt-2">
          <RouterLink to="/about" class="btn flex-1">{{ t('nav.about') }}</RouterLink>
          <RouterLink to="/legal" class="btn flex-1">{{ t('nav.legal') }}</RouterLink>
        </div>
        <LangSwitch class="mt-2 sm:hidden" />
      </div>
    </div>
  </header>
</template>
