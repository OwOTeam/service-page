import { useHead, useSeoMeta } from '@unhead/vue'
import { useLocale } from './useLocale'
import { SITE_URL } from '@/data/site'

export interface SeoOptions {
  /** 页面标题（响应式）；不传则使用站点默认标题 */
  title?: () => string | undefined
  description: () => string
  /** 站内路径，如 /products/identity */
  path: string
  /** og:image 的站内路径，默认 /og.png */
  image?: string
  /** 结构化数据（JSON-LD），可传多个 */
  jsonLd?: () => Record<string, unknown>[]
  noindex?: boolean
}

export const absoluteUrl = (path: string) => `${SITE_URL}${path === '/' ? '/' : path}`

/** 统一设置 canonical、Open Graph、Twitter Card 与 JSON-LD。 */
export function useSeo(opts: SeoOptions) {
  const { locale } = useLocale()
  const url = absoluteUrl(opts.path)
  const image = `${SITE_URL}${opts.image ?? '/og.png'}`

  useSeoMeta({
    description: opts.description,
    ogTitle: () => opts.title?.() ?? 'OwO!',
    ogDescription: opts.description,
    ogUrl: url,
    ogImage: image,
    ogLocale: () => (locale.value === 'zh' ? 'zh_CN' : 'en_US'),
    twitterCard: 'summary_large_image',
    twitterTitle: () => opts.title?.() ?? 'OwO!',
    twitterDescription: opts.description,
    twitterImage: image,
    robots: opts.noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large',
  })

  useHead({
    link: [{ rel: 'canonical', href: url }],
    script: () =>
      (opts.jsonLd?.() ?? []).map((data) => ({
        type: 'application/ld+json',
        innerHTML: JSON.stringify({ '@context': 'https://schema.org', ...data }),
      })),
  })
}
