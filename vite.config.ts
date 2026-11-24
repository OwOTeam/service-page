/// <reference types="vite-ssg" />
/// <reference types="vitest/config" />
import { copyFileSync, existsSync, writeFileSync } from 'node:fs'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { SITE_URL } from './src/data/site'

const PRODUCT_IDS = ['identity', 'travelai', 'recorder', 'deployer', 'flight']
const PAGES = ['/', ...PRODUCT_IDS.map((id) => `/products/${id}`), '/about', '/legal']

// 通过自定义域名 service.owoserver.com 部署在根路径（public/CNAME）
export default defineConfig({
  base: '/',
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
    // 动态路由需要显式展开；/404 用于生成 GitHub Pages 的 404.html
    includedRoutes: (paths) => [
      ...paths.filter((p) => !p.includes(':') && !p.includes('*')),
      ...PRODUCT_IDS.map((id) => `/products/${id}`),
      '/404',
    ],
    onFinished() {
      const from = 'dist/404/index.html'
      if (existsSync(from)) copyFileSync(from, 'dist/404.html')
      const day = new Date().toISOString().slice(0, 10)
      const urls = PAGES.map((p) => `  <url><loc>${SITE_URL}${p}</loc><lastmod>${day}</lastmod></url>`)
      const xml = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        ...urls,
        '</urlset>',
        '',
      ].join('\n')
      writeFileSync('dist/sitemap.xml', xml)
    },
  },
  test: {
    environment: 'jsdom',
    include: ['src/**/*.test.ts'],
  },
})
