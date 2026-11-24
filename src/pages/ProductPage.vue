<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useHead } from '@unhead/vue'
import { useI18n } from 'vue-i18n'
import { getProduct, products } from '@/data/products'
import { flows } from '@/data/flows'
import { SITE_URL } from '@/data/site'
import { useSeo } from '@/composables/useSeo'
import { useLocale } from '@/composables/useLocale'
import ProductMark from '@/components/ui/ProductMark.vue'
import StatusBadge from '@/components/ui/StatusBadge.vue'
import CodeBlock from '@/components/ui/CodeBlock.vue'
import FlowDiagram from '@/components/diagram/FlowDiagram.vue'
import NotFoundPage from './NotFoundPage.vue'

const props = defineProps<{ id: string }>()
const { t } = useI18n()
const { tr } = useLocale()

const product = computed(() => getProduct(props.id))
const flow = computed(() => (product.value ? flows[product.value.id] : undefined))
const others = computed(() => products.filter((p) => p.id !== props.id))

useHead({ title: () => product.value?.name ?? '404' })
const meta = {
  identity: { os: 'Linux (self-hosted)', cat: 'SecurityApplication', img: '/og.png' },
  recorder: { os: 'Web + Windows / Linux / macOS client', cat: 'EducationalApplication', img: '/og.png' },
  travelai: { os: 'Android 8.0+', cat: 'TravelApplication', img: '/img/travelai/social.png' },
  deployer: { os: 'Windows', cat: 'DeveloperApplication', img: '/og.png' },
  flight: { os: 'Windows', cat: 'UtilitiesApplication', img: '/og.png' },
} as const

useSeo({
  title: () => product.value?.name,
  description: () => (product.value ? `${tr(product.value.tagline)}。${tr(product.value.summary)}` : ''),
  path: `/products/${props.id}`,
  image: product.value ? meta[product.value.id].img : undefined,
  noindex: !product.value,
  jsonLd: () => {
    const p = product.value
    if (!p) return []
    const m = meta[p.id]
    return [
      {
        '@type': 'SoftwareApplication',
        name: p.name,
        description: tr(p.summary),
        ...(p.version ? { softwareVersion: p.version.replace(/^v/, '') } : {}),
        applicationCategory: m.cat,
        operatingSystem: m.os,
        url: `${SITE_URL}/products/${p.id}`,
        image: `${SITE_URL}${m.img}`,
        inLanguage: ['zh-CN', 'en'],
        author: { '@type': 'Organization', name: 'OwO Team', url: `${SITE_URL}/` },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'OwO!', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: p.name, item: `${SITE_URL}/products/${p.id}` },
        ],
      },
    ]
  },
})
</script>

<template>
  <NotFoundPage v-if="!product" />
  <template v-else>
    <!-- Hero -->
    <section class="relative overflow-hidden">
      <div
        class="pointer-events-none absolute inset-x-0 -top-24 h-96 opacity-60"
        :style="{ background: `radial-gradient(55% 60% at 50% 0%, color-mix(in srgb, ${product.accent} 30%, transparent), transparent 70%)` }"
        aria-hidden="true"
      />
      <div class="container-x relative pb-12 pt-10 sm:pt-14">
        <RouterLink to="/#products" class="inline-flex items-center gap-1 text-sm text-muted hover:text-ink">
          <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M11 6l-6 6 6 6" /></svg>
          {{ t('product.back') }}
        </RouterLink>
        <div class="mt-6 flex flex-col gap-6 sm:flex-row sm:items-center">
          <ProductMark :product="product" :size="84" />
          <div>
            <StatusBadge :product="product" />
            <h1 class="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">{{ product.name }}</h1>
          </div>
        </div>
        <p class="mt-5 max-w-2xl text-xl font-medium">{{ tr(product.tagline) }}</p>
        <p class="mt-2 max-w-2xl text-muted">{{ tr(product.summary) }}</p>
        <div class="mt-7 flex flex-wrap gap-3">
          <a
            v-for="l in product.links"
            :key="l.href"
            :href="l.href"
            target="_blank"
            rel="noopener"
            class="btn"
            :class="{ 'btn-primary': l.primary }"
          >
            {{ tr(l.label) }}
          </a>
        </div>
        <dl class="mt-10 grid gap-4 sm:grid-cols-3">
          <div v-for="s in product.stats" :key="s.value" class="card p-5">
            <dt class="font-mono text-2xl font-semibold" :style="{ color: product.accent }">{{ s.value }}</dt>
            <dd class="mt-1 text-sm text-muted">{{ tr(s.label) }}</dd>
          </div>
        </dl>
        <p class="mt-4 text-sm text-muted">
          <span class="font-medium text-ink">{{ t('product.platform') }}:</span> {{ tr(product.platform) }}
        </p>
      </div>
    </section>

    <!-- 核心能力 -->
    <section class="container-x py-12">
      <h2 class="h-section">{{ t('product.features') }}</h2>
      <div class="mt-8 grid gap-4 md:grid-cols-2">
        <article v-for="f in product.features" :key="f.title.en" class="card reveal p-6">
          <h3 class="font-semibold" :style="{ color: `color-mix(in srgb, ${product.accent} 70%, var(--ink))` }">{{ tr(f.title) }}</h3>
          <p class="mt-2 text-sm text-muted">{{ tr(f.desc) }}</p>
        </article>
      </div>
    </section>

    <!-- 示意图 -->
    <section v-if="flow" class="container-x py-8">
      <p class="mb-4 text-sm font-medium text-muted">{{ tr(flow.caption) }}</p>
      <FlowDiagram :nodes="flow.nodes" :accent="product.accent" />
    </section>

    <!-- 截图 -->
    <section v-if="product.gallery.length" class="container-x py-12">
      <h2 class="h-section">{{ t('product.gallery') }}</h2>
      <div
        class="mt-8 gap-4"
        :class="product.gallery[0]?.phone ? 'flex snap-x gap-4 overflow-x-auto pb-4' : 'grid md:grid-cols-2'"
      >
        <figure
          v-for="g in product.gallery"
          :key="g.src"
          class="card shrink-0 snap-start overflow-hidden"
          :class="g.phone ? 'w-56 sm:w-64' : ''"
        >
          <img :src="g.src" :alt="tr(g.alt)" loading="lazy" class="block w-full" />
          <figcaption class="border-t border-line px-4 py-2 text-xs text-muted">{{ tr(g.alt) }}</figcaption>
        </figure>
      </div>
    </section>

    <!-- 快速开始 -->
    <section v-if="product.quickstart" class="container-x py-12">
      <h2 class="h-section">{{ t('product.quickstart') }}</h2>
      <p class="mt-2 text-sm text-muted">{{ tr(product.quickstart.title) }}</p>
      <div class="mt-5 max-w-3xl">
        <CodeBlock :code="product.quickstart.code" :lang="product.quickstart.lang" />
      </div>
    </section>

    <!-- 技术栈 -->
    <section class="container-x py-8">
      <h2 class="h-section">{{ t('product.stack') }}</h2>
      <ul class="mt-5 flex flex-wrap gap-2">
        <li v-for="s in product.stack" :key="s" class="chip font-mono">{{ s }}</li>
      </ul>
    </section>

    <!-- 须知与许可 -->
    <section class="container-x grid gap-5 py-12 md:grid-cols-2">
      <div class="card p-6">
        <h2 class="text-lg font-semibold">{{ t('product.notes') }}</h2>
        <ul class="mt-3 list-disc space-y-2 pl-5 text-sm text-muted">
          <li v-for="n in product.notes" :key="n.en">{{ tr(n) }}</li>
        </ul>
      </div>
      <div class="card p-6">
        <h2 class="text-lg font-semibold">{{ t('product.license') }}</h2>
        <p class="mt-3 text-sm text-muted">{{ tr(product.license) }}</p>
        <RouterLink to="/legal" class="mt-3 inline-block text-sm font-semibold text-brand">{{ t('nav.legal') }} →</RouterLink>
      </div>
    </section>

    <!-- 其他产品 -->
    <section class="container-x py-12">
      <h2 class="h-section">{{ t('product.others') }}</h2>
      <div class="mt-6 grid gap-4 sm:grid-cols-2">
        <RouterLink
          v-for="p in others"
          :key="p.id"
          :to="`/products/${p.id}`"
          class="card flex items-center gap-3 p-4 transition hover:-translate-y-0.5 hover:border-brand"
        >
          <ProductMark :product="p" :size="40" />
          <span class="min-w-0">
            <span class="block font-semibold">{{ p.name }}</span>
            <span class="block truncate text-xs text-muted">{{ tr(p.tagline) }}</span>
          </span>
        </RouterLink>
      </div>
    </section>
  </template>
</template>
