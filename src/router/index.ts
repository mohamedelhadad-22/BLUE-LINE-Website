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
  },
  {
    path: "/stakeholders-relations",
    name: "stakeholders-relations",
    component: () => import('@/views/footer/StakeholdersRelationsView.vue'),
  },
  {
    path: "/careers",
    name: "careers",
    component: () => import('@/views/footer/CareersView.vue'),
  },
  {
    path: "/contact",
    name: "contact",
    component: () => import('@/views/footer/ContactView.vue'),
  },
  {
    path: "/feeders-services",
    name: "feeders-services",
    component: () => import('@/views/footer/FeedersServicesView.vue'),
  },
  {
    path: "/regional-liner-services",
    name: "regional-liner-services",
    component: () => import('@/views/footer/RegionalLinerServicesView.vue'),
  },
  {
    path: "/routes-agents",
    name: "routes-agents",
    component: () => import('@/views/footer/RoutesAgentsView.vue'),
  },
  {
    path: "/faq-glossary",
    name: "faq-glossary",
    component: () => import('@/views/footer/FaqGlossaryView.vue'),
  },
  {
    path: "/fleet",
    name: "fleet",
    component: () => import('@/views/footer/FleetView.vue'),
  },
  {
    path: "/news-insights",
    name: "news-insights",
    component: () => import('@/views/footer/NewsInsightsView.vue'),
  },
  {
    path: "/downloads",
    name: "downloads",
    component: () => import('@/views/footer/DownloadsView.vue'),
  },
  {
    path: "/privacy-policy",
    name: "privacy-policy",
    component: () => import('@/views/footer/PrivacyPolicyView.vue'),
  },
  {
    path: "/terms-conditions",
    name: "terms-conditions",
    component: () => import('@/views/footer/TermsConditionsView.vue'),
  },
  {
    path: "/suggestions",
    name: "suggestions",
    component: () => import('@/views/footer/SuggestionsView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
