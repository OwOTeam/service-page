import { ViteSSG } from 'vite-ssg'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import { routes } from './routes'
import zh from './i18n/zh'
import en from './i18n/en'
import './styles/main.css'

export const createApp = ViteSSG(
  App,
  {
    routes,
    base: import.meta.env.BASE_URL,
    scrollBehavior(to, _from, saved) {
      if (saved) return saved
      if (to.hash) return { el: to.hash, top: 80, behavior: 'smooth' }
      return { top: 0 }
    },
  },
  ({ app }) => {
    // 预渲染固定为中文；客户端挂载后再按偏好切换，避免水合不一致
    app.use(
      createI18n({
        legacy: false,
        locale: 'zh',
        fallbackLocale: 'zh',
        messages: { zh, en },
      }),
    )
  },
)
