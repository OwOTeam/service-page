# OwO! 产品矩阵门户（service-page）

OwO Team 的产品门户站，集中展示四个产品：

| 产品 | 说明 |
|---|---|
| OwO! Identity | 自托管多租户企业身份提供商（OIDC / OAuth 2.0 / SAML 2.0） |
| OwO! TravelAI | 离线优先的智能旅行助手（Android） |
| OwO! Win Deployer | 一条命令复刻 Windows 开发环境 |
| OwO! FlightAssistant | MSFS / X-Plane 飞行数据中间件 |

站点支持中文 / 英文、浅色 / 深色 / 跟随系统，每个路由在构建时预渲染为静态 HTML。

## 技术栈

Vue 3.5 · TypeScript · Vite 7 · Tailwind CSS v4 · vue-router · vue-i18n · @unhead/vue · vite-ssg · Vitest

## 开发

```bash
npm install
npm run dev        # 本地开发，访问 http://localhost:5173/
npm run lint       # ESLint
npm test           # 数据与 i18n 一致性测试
npm run build      # 类型检查 + 预渲染构建，产物在 dist/
npm run preview    # 预览构建结果
```

要求 Node `^20.19` 或 `>=22.12`。

## 内容维护

产品内容只有一个数据源：[`src/data/products.ts`](src/data/products.ts)。首页卡片、详情页、许可页和版本时间线都由它生成，每条文案都带 `zh` / `en` 两种语言，测试会检查两者均不为空。

界面文案在 [`src/i18n/`](src/i18n)，`en.ts` 的结构必须与 `zh.ts` 完全一致（同样由测试检查）。

更新某个产品时：

1. 修改 `products.ts` 中对应条目的 `version`、`released`、`status` 和功能描述。
2. 授权相关内容只写已确认的事实；没有 LICENSE 文件的项目不要声明开源或闭源。
3. 没有真实截图的产品用 [`src/data/flows.ts`](src/data/flows.ts) 的示意图，不要伪造界面截图。

## 目录结构

```
src/
  data/         products.ts（内容）、flows.ts（示意图数据）
  i18n/         zh.ts、en.ts
  pages/        Home、Product、About、Legal、NotFound
  layouts/      SiteHeader、SiteFooter
  components/   ui/、sections/、diagram/
  composables/  useTheme、useLocale
  styles/       main.css（Tailwind 主题令牌与全局样式）
public/img/     各产品截图与图标
```

## 部署

推送到 `main` 后，[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) 会执行 lint、测试与构建，并通过 GitHub Pages 官方 Action 发布。首次使用需在仓库 Settings → Pages 中把 Source 设为 **GitHub Actions**。

站点通过自定义域名 **https://service.owoserver.com** 部署在根路径：`vite.config.ts` 的 `base` 为 `/`，`public/CNAME` 会随构建产物发布。需要在 DNS 中把 `service` 以 CNAME 指向 `<GitHub 用户名>.github.io`，并在仓库 Settings → Pages 中填入该自定义域名并启用 HTTPS。

> 如果改回 `github.io/service-page/` 子路径访问，需要把 `base` 改回 `/service-page/`，否则资源与路由会 404。

构建会额外生成 `404.html`（GitHub Pages 的未匹配路由页）和 `sitemap.xml`。

## SEO

- 规范域名在 [`src/data/site.ts`](src/data/site.ts)，改域名时只改这一处，并同步 `public/CNAME` 与 `public/robots.txt`。
- [`src/composables/useSeo.ts`](src/composables/useSeo.ts) 为每个页面统一输出 canonical、Open Graph、Twitter Card 与 JSON-LD（首页：Organization / WebSite / ItemList；产品页：SoftwareApplication / BreadcrumbList）。
- 分享图为 `public/og.png`（1200×630），TravelAI 使用自己的 `social.png`。
- 目前语言不体现在 URL 中，预渲染 HTML 为中文，因此暂不输出 hreflang。
