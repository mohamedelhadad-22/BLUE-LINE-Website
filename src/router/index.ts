// src/router/index.ts

import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/HomeView.vue"),
  },
  {
    path: "/about",
    name: "about-us",
    component: () => import("@/views/AboutView.vue"),
  },
  {
    path: "/stakeholders-relations",
    name: "stakeholders-relations",
    component: () => import("@/views/Pages/StakeholdersRelationsView.vue"),
  },
  {
    path: "/careers",
    name: "careers",
    component: () => import("@/views/Pages/CareersView.vue"),
  },
  {
    path: "/contact",
    name: "contact",
    component: () => import("@/views/Pages/ContactView.vue"),
  },
  {
    path: "/feeders-services",
    name: "feeders-services",
    component: () => import("@/views/Pages/FeedersServicesView.vue"),
  },
  {
    path: "/regional-liner-services",
    name: "regional-liner-services",
    component: () => import("@/views/Pages/RegionalLinerServicesView.vue"),
  },
  {
    path: "/routes-agents",
    name: "routes-agents",
    component: () => import("@/views/Pages/RoutesAgentsView.vue"),
  },
  {
    path: "/faq-glossary",
    name: "faq-glossary",
    component: () => import("@/views/Pages/FaqGlossaryView.vue"),
  },
  {
    path: "/fleet",
    name: "fleet",
    component: () => import("@/views/Pages/FleetView.vue"),
  },
  {
    path: "/news-insights",
    name: "news-insights",
    component: () => import("@/views/Pages/NewsInsightsView.vue"),
  },
  {
    path: "/downloads",
    name: "downloads",
    component: () => import("@/views/Pages/DownloadsView.vue"),
  },
  {
    path: "/privacy-policy",
    name: "privacy-policy",
    component: () => import("@/views/Pages/PrivacyPolicyView.vue"),
  },
  {
    path: "/terms-conditions",
    name: "terms-conditions",
    component: () => import("@/views/Pages/TermsConditionsView.vue"),
  },
  {
    path: "/suggestions",
    name: "suggestions",
    component: () => import("@/views/Pages/SuggestionsView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
