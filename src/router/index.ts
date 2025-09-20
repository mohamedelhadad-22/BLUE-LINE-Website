// src/router/index.ts

import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from 'vue-router'


const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: "/about",
    name: "about-us",
    component: () => import('@/views/AboutView.vue'),
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
