<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { Product } from '@/data/products'

defineProps<{ product: Product }>()
const { t } = useI18n()
</script>

<template>
  <span class="chip">
    <svg viewBox="0 0 24 24" class="h-3.5 w-3.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <template v-if="product.openness === 'open'">
        <rect x="4" y="11" width="16" height="9" rx="2" />
        <path d="M8 11V8a4 4 0 0 1 7.5-2" />
      </template>
      <template v-else>
        <rect x="4" y="11" width="16" height="9" rx="2" />
        <path d="M8 11V8a4 4 0 0 1 8 0v3" />
      </template>
    </svg>
    {{ product.openness === 'open' ? t('product.open') : t('product.closed') }}
  </span>
</template>
