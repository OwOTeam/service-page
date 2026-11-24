<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Product } from '@/data/products'

const props = defineProps<{ product: Product }>()
const { t } = useI18n()

const label = computed(() =>
  props.product.openness === 'open'
    ? t('product.open')
    : props.product.openness === 'partial'
      ? t('product.partial')
      : t('product.closed'),
)
</script>

<template>
  <span class="chip">
    <svg viewBox="0 0 24 24" class="h-3.5 w-3.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <rect x="4" y="11" width="16" height="9" rx="2" />
      <path v-if="product.openness === 'closed'" d="M8 11V8a4 4 0 0 1 8 0v3" />
      <path v-else d="M8 11V8a4 4 0 0 1 7.5-2" />
    </svg>
    {{ label }}
  </span>
</template>
