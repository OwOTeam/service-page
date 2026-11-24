import type { RouteRecordRaw } from 'vue-router'
export const routes: RouteRecordRaw[] = [
  { path: '/', name: 'home', component: () => import('./pages/HomePage.vue') },
  {
    path: '/products/:id',
    name: 'product',
    component: () => import('./pages/ProductPage.vue'),
    props: true,
  },
  { path: '/about', name: 'about', component: () => import('./pages/AboutPage.vue') },
  { path: '/legal', name: 'legal', component: () => import('./pages/LegalPage.vue') },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('./pages/NotFoundPage.vue') },
]
