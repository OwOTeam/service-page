<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useHead } from '@unhead/vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
useHead({ title: () => t('notfound.title'), meta: [{ name: 'robots', content: 'noindex' }] })
</script>

<template>
  <section class="container-x py-28 text-center">
    <p class="font-mono text-6xl font-bold text-brand">404</p>
    <h1 class="mt-4 text-2xl font-bold">{{ t('notfound.title') }}</h1>
    <p class="mt-2 text-muted">{{ t('notfound.desc') }}</p>
    <RouterLink to="/" class="btn btn-primary mt-8">{{ t('notfound.home') }}</RouterLink>
  </section>
</template>
