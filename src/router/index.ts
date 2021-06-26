import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('/@/pages/Index.vue'),
  },
  {
    path: '/blog',
    component: () => import('/@/pages/Blog.vue'),
  },
  {
    path: '/about',
    component: () => import('/@/pages/About.vue'),
  },
];

export const Router = createRouter({
  scrollBehavior: () => ({ left: 0, top: 0 }),
  history: createWebHistory(),
  routes,
});
