<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import SynergyDiagram from '@/components/diagram/SynergyDiagram.vue'

const { t } = useI18n()
</script>

<template>
  <section class="container-x py-16">
    <div class="card reveal grid items-center gap-8 p-6 sm:p-10 lg:grid-cols-[0.8fr_1.2fr]">
      <div>
        <h2 class="h-section">{{ t('synergy.title') }}</h2>
        <p class="mt-3 text-muted">{{ t('synergy.subtitle') }}</p>
        <p class="mt-4 text-sm text-muted">{{ t('synergy.note') }}</p>
      </div>
      <SynergyDiagram />
    </div>
  </section>
</template>
