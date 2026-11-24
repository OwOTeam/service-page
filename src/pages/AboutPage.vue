<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { useI18n } from 'vue-i18n'
import { useSeo } from '@/composables/useSeo'
import { siteLinks } from '@/data/products'

const { t } = useI18n()
const qr = `${import.meta.env.BASE_URL}wechat-qr-code.jpg`
useHead({ title: () => t('about.title') })
useSeo({ title: () => t('about.title'), description: () => t('about.intro'), path: '/about' })
</script>

<template>
  <section class="container-x max-w-3xl py-16">
    <h1 class="text-3xl font-bold tracking-tight sm:text-4xl">{{ t('about.title') }}</h1>
    <p class="mt-5 text-lg text-muted">{{ t('about.intro') }}</p>

    <div class="card mt-10 p-6 sm:p-8">
      <h2 class="text-xl font-semibold">{{ t('about.contactTitle') }}</h2>
      <dl class="mt-5 space-y-3 text-sm">
        <div class="flex flex-wrap gap-x-3">
          <dt class="w-16 shrink-0 text-muted">{{ t('about.blog') }}</dt>
          <dd><a :href="siteLinks.blog" target="_blank" rel="noopener" class="font-medium text-brand hover:underline">owoblog.com</a></dd>
        </div>
        <div class="flex flex-wrap gap-x-3">
          <dt class="w-16 shrink-0 text-muted">{{ t('about.email') }}</dt>
          <dd><a :href="`mailto:${siteLinks.email}`" class="font-medium text-brand hover:underline">{{ siteLinks.email }}</a></dd>
        </div>
      </dl>

      <div class="mt-8 flex flex-col items-start gap-4 border-t border-line pt-6 sm:flex-row sm:items-center">
        <img :src="qr" :alt="t('about.wechatHint')" width="132" height="132" class="h-33 w-33 rounded-xl border border-line object-cover" loading="lazy" />
        <div>
          <h3 class="font-semibold">{{ t('about.wechat') }}</h3>
          <p class="mt-1 text-sm text-muted">{{ t('about.wechatHint') }}</p>
        </div>
      </div>
    </div>

    <div class="card mt-5 p-6 sm:p-8">
      <h2 class="text-xl font-semibold">{{ t('about.commercial') }}</h2>
      <p class="mt-2 text-sm text-muted">{{ t('about.commercialDesc') }}</p>
      <a :href="`${siteLinks.blog}/service`" target="_blank" rel="noopener" class="btn btn-primary mt-5">owoblog.com/service</a>
    </div>
  </section>
</template>
