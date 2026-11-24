<script setup lang="ts">
import type { FlowNode } from '@/data/flows'
import { useLocale } from '@/composables/useLocale'

defineProps<{ nodes: FlowNode[]; accent: string }>()
const { tr } = useLocale()
</script>

<template>
  <ol class="grid gap-3 lg:grid-flow-col lg:auto-cols-fr lg:items-stretch">
    <li v-for="(n, i) in nodes" :key="n.title" class="relative flex">
      <div class="card flex-1 p-4" :style="{ borderColor: `color-mix(in srgb, ${accent} 45%, var(--line))` }">
        <p class="font-mono text-sm font-semibold" :style="{ color: accent }">{{ n.title }}</p>
        <p class="mt-1 text-xs text-muted">{{ tr(n.sub) }}</p>
      </div>
      <span
        v-if="i < nodes.length - 1"
        class="absolute -bottom-3 left-1/2 z-10 -translate-x-1/2 text-muted lg:-right-3 lg:bottom-auto lg:left-auto lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-0"
        aria-hidden="true"
      >
        <svg viewBox="0 0 24 24" class="h-5 w-5 rotate-90 lg:rotate-0" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
      </span>
    </li>
  </ol>
</template>
