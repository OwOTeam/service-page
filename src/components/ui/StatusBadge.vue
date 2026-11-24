<script setup lang="ts">
import type { Product } from '@/data/products'
import { useLocale } from '@/composables/useLocale'

defineProps<{ product: Product }>()
const { tr } = useLocale()

const dot = { stable: '#16a34a', beta: '#f59e0b', early: '#6366f1' } as const
</script>

<template>
  <span class="chip">
    <span class="h-1.5 w-1.5 rounded-full" :style="{ background: dot[product.status.tone] }" />
    <span class="font-mono">{{ product.version }}</span>
    <span class="text-muted/60">·</span>
    <span>{{ tr(product.status.label) }}</span>
  </span>
</template>
