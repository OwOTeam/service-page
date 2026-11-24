<script setup lang="ts">
import type { Product } from '@/data/products'

defineProps<{ product: Product; size?: number }>()
</script>

<template>
  <span
    class="inline-flex shrink-0 items-center justify-center overflow-hidden"
    :style="{
      width: (size ?? 44) + 'px',
      height: (size ?? 44) + 'px',
      borderRadius: (size ?? 44) * 0.26 + 'px',
      background: product.logo ? 'transparent' : product.accent,
    }"
    aria-hidden="true"
  >
    <img v-if="product.logo" :src="product.logo" alt="" class="h-full w-full object-cover" />
    <!-- 暂无独立 Logo 的产品（Recorder）使用图形标识 -->
    <svg v-else-if="product.id === 'recorder'" viewBox="0 0 24 24" class="h-[58%] w-[58%] text-white" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21M9 21h6" />
    </svg>
    <svg v-else viewBox="0 0 24 24" class="h-[58%] w-[58%] text-white" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 3 4.5 6v5.5c0 4.4 3.1 8 7.5 9.5 4.4-1.5 7.5-5.1 7.5-9.5V6L12 3Z" />
      <circle cx="12" cy="10.5" r="2" />
      <path d="M12 12.5V16" />
    </svg>
  </span>
</template>
