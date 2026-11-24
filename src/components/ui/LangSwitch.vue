<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useLocale } from '@/composables/useLocale'

const { t } = useI18n()
const { locale, setLocale } = useLocale()
</script>

<template>
  <div
    class="inline-flex h-10 items-center rounded-full border border-line bg-surface p-0.5 text-sm font-medium"
    role="group"
    :aria-label="t('nav.language')"
  >
    <button
      v-for="l in ['zh', 'en'] as const"
      :key="l"
      type="button"
      class="h-9 rounded-full px-3 transition"
      :class="locale === l ? 'bg-brand text-brand-ink' : 'text-muted hover:text-ink'"
      :aria-pressed="locale === l"
      @click="setLocale(l)"
    >
      {{ l === 'zh' ? '中' : 'EN' }}
    </button>
  </div>
</template>
