<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useTheme, type ThemeMode } from '@/composables/useTheme'

const { t } = useI18n()
const { mode, set } = useTheme()

const order: ThemeMode[] = ['light', 'dark', 'system']
const label = computed(
  () =>
    ({ light: t('nav.themeLight'), dark: t('nav.themeDark'), system: t('nav.themeSystem') })[
      mode.value
    ],
)
const next = () => set(order[(order.indexOf(mode.value) + 1) % order.length])
</script>

<template>
  <button
    type="button"
    class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface text-muted transition hover:text-ink"
    :aria-label="`${t('nav.theme')}: ${label}`"
    :title="`${t('nav.theme')}: ${label}`"
    @click="next"
  >
    <svg v-if="mode === 'light'" viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
    <svg v-else-if="mode === 'dark'" viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round">
      <path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5Z" />
    </svg>
    <svg v-else viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M8 20h8M12 16v4" />
    </svg>
  </button>
</template>
