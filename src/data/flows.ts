import type { L, Product } from './products'

export interface FlowNode {
  title: string
  sub: L
}

// 暂无营销截图的产品，用简化的数据流示意代替（不伪造界面截图）
export const flows: Partial<Record<Product['id'], { caption: L; nodes: FlowNode[] }>> = {
  identity: {
    caption: { zh: '请求路径：浏览器不持有令牌', en: 'Request path: no tokens in the browser' },
    nodes: [
      { title: 'Browser', sub: { zh: '用户门户 / 管理台', en: 'Portal / admin console' } },
      { title: 'BFF', sub: { zh: 'Express · 会话与限流', en: 'Express · sessions, rate limits' } },
      { title: 'Identity API', sub: { zh: 'Gin · 租户 / JWT / RBAC', en: 'Gin · tenant / JWT / RBAC' } },
      { title: 'PostgreSQL + Redis', sub: { zh: '数据与会话', en: 'Data and sessions' } },
    ],
  },
  flight: {
    caption: { zh: '数据流：从模拟器到你的应用', en: 'Data flow: simulator to your app' },
    nodes: [
      { title: 'MSFS / X-Plane', sub: { zh: 'SimConnect · UDP DataRef', en: 'SimConnect · UDP DataRef' } },
      { title: 'Middleware', sub: { zh: 'Go 单文件 EXE', en: 'Single Go EXE' } },
      { title: 'REST :18080 · WS :18081', sub: { zh: '遥测 / 导航 / METAR', en: 'Telemetry / nav / METAR' } },
      { title: 'Web EFB / 你的应用', sub: { zh: '内置 React 前端', en: 'Embedded React frontend' } },
    ],
  },
}
