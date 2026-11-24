import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { L, Locale } from '@/data/products'

const KEY = 'owo-locale'

export function readStoredLocale(): Locale | null {
  try {
    const v = localStorage.getItem(KEY)
    if (v === 'zh' || v === 'en') return v
  } catch {
    /* 存储不可用时忽略 */
  }
  return null
}

export function detectLocale(): Locale {
  return readStoredLocale() ?? (navigator.language?.toLowerCase().startsWith('zh') ? 'zh' : 'en')
}

/** 取当前语言的内容字符串，并提供语言切换。 */
export function useLocale() {
  const { locale } = useI18n()
  const current = computed(() => locale.value as Locale)

  const tr = (l: L) => l[current.value]

  function setLocale(next: Locale) {
    locale.value = next
    try {
      localStorage.setItem(KEY, next)
    } catch {
      /* ignore */
    }
    document.documentElement.lang = next === 'zh' ? 'zh-CN' : 'en'
  }

  return { locale: current, tr, setLocale }
}
