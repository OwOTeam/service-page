import { ref } from 'vue'

export type ThemeMode = 'light' | 'dark' | 'system'
const KEY = 'owo-theme'
const mode = ref<ThemeMode>('system')
let listening = false

function apply(m: ThemeMode) {
  const dark = m === 'dark' || (m === 'system' && matchMedia('(prefers-color-scheme: dark)').matches)
  document.documentElement.classList.toggle('dark', dark)
}

export function useTheme() {
  function init() {
    try {
      const v = localStorage.getItem(KEY)
      if (v === 'light' || v === 'dark' || v === 'system') mode.value = v
    } catch {
      /* ignore */
    }
    apply(mode.value)
    if (!listening) {
      listening = true
      matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        if (mode.value === 'system') apply('system')
      })
    }
  }

  function set(m: ThemeMode) {
    mode.value = m
    try {
      localStorage.setItem(KEY, m)
    } catch {
      /* ignore */
    }
    // 支持 View Transitions 时用淡入淡出切换
    const doc = document as Document & { startViewTransition?: (cb: () => void) => unknown }
    if (doc.startViewTransition && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
      doc.startViewTransition(() => apply(m))
    } else {
      apply(m)
    }
  }

  return { mode, init, set }
}
