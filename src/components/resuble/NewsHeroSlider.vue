<template>
  <section class="news-hero" :dir="rtl ? 'rtl' : 'ltr'">
    <div class="hero-inner" @mouseenter="pause" @mouseleave="resume">
      <!-- Image -->
      <figure class="hero-media">
        <img
          class="hero-img"
          :src="current.image"
          :alt="current.alt || current.title"
          decoding="async"
          fetchpriority="high"
        />
        <span v-if="current.isAd" class="badge-ad">إعلان</span>
      </figure>

      <!-- Text column -->
      <div class="hero-content">
        <header class="meta">
          <span class="meta-label">
            <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M12 2l2.39 4.84 5.34.78-3.86 3.76.91 5.32L12 14.77 6.22 16.7l.91-5.32L3.27 7.62l5.34-.78L12 2z"
                fill="currentColor"
              />
            </svg>
            أحدث الأخبار
          </span>
          <time class="meta-date" :datetime="current.date">{{
            formatDate(current.date)
          }}</time>
        </header>

        <h2 class="title" v-html="current.title"></h2>

        <p v-if="current.excerpt" class="excerpt" v-html="current.excerpt"></p>

        <a
          v-if="current.href"
          class="read-more"
          :href="current.href"
          @click="$emit('read-more', index)"
        >
          <svg
            class="arrow"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              d="M8.12 19.88L16 12 8.12 4.12 6.7 5.54 13.17 12l-6.47 6.46 1.42 1.42z"
              :transform="rtl ? 'scale(-1,1) translate(-24,0)' : ''"
              fill="currentColor"
            />
          </svg>
          اقرأ المزيد
        </a>

        <!-- Controls -->
        <div class="controls">
          <button class="nav-btn prev" @click="prev" aria-label="السابق">
            <svg width="22" height="22" viewBox="0 0 24 24">
              <path
                d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z"
                fill="currentColor"
              />
            </svg>
          </button>
          <div
            class="dots"
            role="tablist"
            :aria-label="rtl ? 'المؤشر' : 'pagination'"
          >
            <button
              v-for="(_, i) in slides"
              :key="i"
              class="dot"
              :class="{ active: i === index }"
              role="tab"
              :aria-selected="i === index"
              :aria-controls="'slide-' + i"
              @click="go(i)"
            />
          </div>
          <button class="nav-btn next" @click="next" aria-label="التالي">
            <svg width="22" height="22" viewBox="0 0 24 24">
              <path
                d="M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Hidden live region for screen readers -->
    <div class="sr-only" aria-live="polite">
      {{ index + 1 }} / {{ slides.length }}
    </div>
  </section>
</template>

<script lang="ts" setup>
import { computed, onMounted, onBeforeUnmount, ref, watch } from "vue";

type Slide = {
  image: string;
  title: string; // allow HTML (e.g., smart quotes)
  excerpt?: string; // allow HTML
  date: string; // ISO (YYYY-MM-DD) or display string
  href?: string;
  alt?: string;
  isAd?: boolean;
};

const EMPTY_SLIDE: Slide = Object.freeze({
  image: "",
  title: "",
  date: "",
});

const props = defineProps<{
  slides: Slide[];
  startAt?: number;
  autoplay?: boolean;
  intervalMs?: number;
  rtl?: boolean;
}>();

const emit = defineEmits<{
  (e: "update:index", value: number): void;
  (e: "read-more", index: number): void;
  (e: "changed", index: number): void;
}>();

const rtl = computed(() => props.rtl ?? true);

const index = ref(props.startAt ?? 0);
const timer = ref<number | null>(null);
const playing = ref(false);

const total = computed(() => props.slides.length);
const current = computed(() => props.slides[index.value] ?? EMPTY_SLIDE);

function clamp(i: number) {
  if (total.value === 0) return 0;
  return (i + total.value) % total.value;
}

function go(i: number) {
  index.value = clamp(i);
}

function next() {
  go(index.value + 1);
}

function prev() {
  go(index.value - 1);
}

function start() {
  if (!props.autoplay || playing.value || total.value <= 1) return;
  playing.value = true;
  timer.value = window.setInterval(() => next(), props.intervalMs ?? 6000);
}

function stop() {
  if (timer.value) window.clearInterval(timer.value);
  timer.value = null;
  playing.value = false;
}

function pause() {
  stop();
}
function resume() {
  start();
}

function formatDate(d: string) {
  // Accept ISO or already formatted string
  const maybe = new Date(d);
  if (!isNaN(maybe.getTime())) {
    return new Intl.DateTimeFormat("ar-SA", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(maybe);
  }
  return d;
}

// keyboard + swipe
let startX = 0,
  startY = 0,
  dragging = false;
function onKey(e: KeyboardEvent) {
  if (e.key === "ArrowLeft") rtl.value ? next() : prev();
  if (e.key === "ArrowRight") rtl.value ? prev() : next();
}
function onPointerDown(e: PointerEvent) {
  dragging = true;
  startX = e.clientX;
  startY = e.clientY;
}
function onPointerUp(e: PointerEvent) {
  if (!dragging) return;
  const dx = e.clientX - startX;
  const dy = Math.abs(e.clientY - startY);
  dragging = false;
  if (Math.abs(dx) > 40 && dy < 60) {
    if ((dx > 0) !== rtl.value) prev();
    else next();
  }
}

watch(index, (v) => {
  emit("update:index", v);
  emit("changed", v);
});

onMounted(() => {
  start();
  window.addEventListener("keydown", onKey);
  window.addEventListener("pointerdown", onPointerDown);
  window.addEventListener("pointerup", onPointerUp);
});
onBeforeUnmount(() => {
  stop();
  window.removeEventListener("keydown", onKey);
  window.removeEventListener("pointerdown", onPointerDown);
  window.removeEventListener("pointerup", onPointerUp);
});
</script>

<style scoped>
:root {
  --c-text: #0b1b17;
  --c-muted: #6b7280;
  --c-border: #e5e7eb;
  --c-accent: #16a34a; /* green */
  --c-dot: #d1d5db;
}

/* Layout */
.news-hero {
  width: 100%;
  display: block;
  padding: 24px 0;
}
.hero-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: center;
}
@media (max-width: 1024px) {
  .hero-inner {
    grid-template-columns: 1fr;
    gap: 24px;
  }
}

/* Media */
.hero-media {
  position: relative;
  overflow: hidden;
  border-radius: 8px;
}
.hero-img {
  width: 100%;
  height: clamp(240px, 46vw, 520px);
  object-fit: cover;
  display: block;
  border-radius: 8px;
}
.badge-ad {
  position: absolute;
  top: 12px;
  /* right for RTL, left for LTR handled by logical property */
  inset-inline-end: 12px;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 12px;
  letter-spacing: 0.3px;
}

/* Content */
.hero-content {
  color: var(--c-text);
}
.meta {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-block-end: 8px;
}
.meta-label {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--c-muted);
  font-weight: 600;
}
.meta-date {
  color: var(--c-muted);
  font-variant-numeric: tabular-nums;
}
.title {
  font-size: clamp(28px, 2.6vw, 48px);
  line-height: 1.25;
  margin: 12px 0 16px;
  font-weight: 800;
  letter-spacing: 0.2px;
}
.excerpt {
  color: var(--c-muted);
  font-size: clamp(14px, 1.1vw, 18px);
  line-height: 1.9;
  margin: 0 0 16px;
}
.read-more {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-weight: 700;
  text-decoration: none;
  color: var(--c-text);
  border-bottom: 2px solid transparent;
}
.read-more:hover {
  border-bottom-color: var(--c-text);
}
.read-more .arrow {
  inline-size: 20px;
  block-size: 20px;
}

/* Controls */
.controls {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 16px;
}
.nav-btn {
  inline-size: 36px;
  block-size: 36px;
  display: grid;
  place-items: center;
  border-radius: 999px;
  border: 1px solid var(--c-border);
  background: #fff;
  cursor: pointer;
}
.nav-btn:hover {
  background: #fafafa;
}

.dots {
  display: inline-flex;
  gap: 8px;
}
.dot {
  inline-size: 12px;
  block-size: 12px;
  border: 1px solid var(--c-dot);
  background: #fff;
  transform: rotate(45deg); /* diamond */
  border-radius: 2px;
  cursor: pointer;
}
.dot.active {
  background: var(--c-accent);
  border-color: var(--c-accent);
}

/* Accessibility utility */
.sr-only {
  position: absolute !important;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
