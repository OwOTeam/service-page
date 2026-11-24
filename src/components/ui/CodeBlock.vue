<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps<{ code: string; lang?: string }>()
const { t } = useI18n()
const done = ref(false)

async function copy() {
  try {
    await navigator.clipboard.writeText(props.code)
    done.value = true
    setTimeout(() => (done.value = false), 1600)
  } catch {
    /* 剪贴板不可用时静默失败 */
  }
}
</script>

<template>
  <div class="overflow-hidden rounded-2xl border border-line bg-[#0b1220] text-[#d6e0f5]">
    <div class="flex items-center justify-between border-b border-white/10 px-4 py-2 text-xs text-[#8fa2c4]">
      <span class="font-mono">{{ lang ?? 'text' }}</span>
      <button
        type="button"
        class="rounded-md px-2 py-1 transition hover:bg-white/10 hover:text-white"
        @click="copy"
      >
        {{ done ? t('product.copied') : t('product.copy') }}
      </button>
    </div>
    <pre class="overflow-x-auto p-4 font-mono text-[0.82rem] leading-relaxed"><code>{{ code }}</code></pre>
  </div>
</template>
