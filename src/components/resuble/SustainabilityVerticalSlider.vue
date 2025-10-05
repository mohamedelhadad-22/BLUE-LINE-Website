<template>
  <section
    class="fm-vert-slider"
    :dir="isRTL ? 'rtl' : 'ltr'"
    aria-label="Sustainability Vertical Slider"
  >
    <!-- Side dots -->
    <nav class="fm-dots" role="tablist" aria-label="Slide navigation">
      <button
        v-for="(_, i) in slides"
        :key="i"
        class="dot"
        :class="{ active: i === activeIndex }"
        role="tab"
        :aria-selected="i === activeIndex"
        :aria-controls="'fm-slide-' + i"
        @click="scrollToIndex(i)"
      >
        <span class="dot-label">{{ i + 1 }}</span>
      </button>
    </nav>

    <!-- Scroll container -->
    <div
      ref="scroller"
      class="fm-scroller"
      @keydown="onKeydown"
      tabindex="0"
      aria-live="polite"
    >
      <article
        v-for="(s, i) in slides"
        :key="i"
        class="fm-slide"
        :id="'fm-slide-' + i"
        :aria-label="resolveTitle(s)"
      >
        <div class="slide-inner">
          <div class="slide-text">
            <h2 class="slide-title">{{ resolveTitle(s) }}</h2>
            <p v-if="resolveDesc(s)" class="slide-desc">{{ resolveDesc(s) }}</p>
          </div>
          <div class="slide-media">
            <img
              :src="s.image"
              :alt="s.imageAlt || resolveTitle(s)"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import type { PropType } from "vue";
type Slide = {
  title?: string;
  desc?: string;
  titleKey?: string;
  descKey?: string;

  image: string;
  imageAlt?: string;
};

export default defineComponent({
  name: "SustainabilityVerticalSlider",
  props: {
    slides: {
      type: Array as PropType<Slide[]>,
      required: true,
      validator: (arr: Slide[]) =>
        Array.isArray(arr) &&
        arr.length > 0 &&
        arr.every(
          (s) =>
            !!s.image &&
            // لازم يبقى فيه عنوان مباشر أو مفتاح i18n
            (!!s.title || !!s.titleKey)
        ),
    },
    snapDurationMs: { type: Number, default: 500 },
  },
  data() {
    return {
      activeIndex: 0 as number,
      observer: null as IntersectionObserver | null,
    };
  },
  computed: {
    isRTL(): boolean {
      // يعتمد على i18n.locale أو dir للوثيقة
      const loc = (this as any).$i18n?.locale || document.documentElement.dir;
      return typeof loc === "string"
        ? loc.toLowerCase().startsWith("ar")
        : document.documentElement.dir === "rtl";
    },
  },
  setup() {
    const scroller = ref<HTMLDivElement | null>(null);
    return { scroller };
  },
  mounted() {
    const options: IntersectionObserverInit = {
      root: this.scroller!,
      threshold: 0.6,
    };
    this.observer = new IntersectionObserver(this.handleIntersections, options);
    const nodes = this.scroller?.querySelectorAll(".fm-slide") || [];
    nodes.forEach((n) => this.observer?.observe(n));

    this.scroller?.addEventListener("wheel", this.onWheel, { passive: false });
    this.scroller?.focus();
  },
  beforeUnmount() {
    this.observer?.disconnect();
    this.scroller?.removeEventListener("wheel", this.onWheel as any);
  },
  methods: {
    // دعم i18n أو نص مباشرة
    resolveTitle(s: Slide): string {
      // @ts-ignore
      return s.titleKey && this.$t
        ? (this.$t(s.titleKey) as string)
        : s.title || "";
    },
    resolveDesc(s: Slide): string | undefined {
      // @ts-ignore
      return s.descKey && this.$t ? (this.$t(s.descKey) as string) : s.desc;
    },

    handleIntersections(entries: IntersectionObserverEntry[]) {
      const mostVisible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!mostVisible) return;
      const id = mostVisible.target.id;
      const idx = Number(id.split("-").pop());
      if (!Number.isNaN(idx)) this.activeIndex = idx;
    },
    scrollToIndex(i: number) {
      const target =
        this.scroller?.querySelectorAll<HTMLElement>(".fm-slide")[i];
      if (!target) return;
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    },
    onKeydown(e: KeyboardEvent) {
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        this.scrollToIndex(
          Math.min(this.activeIndex + 1, this.slides.length - 1)
        );
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        this.scrollToIndex(Math.max(this.activeIndex - 1, 0));
      } else if (e.key === "Home") {
        e.preventDefault();
        this.scrollToIndex(0);
      } else if (e.key === "End") {
        e.preventDefault();
        this.scrollToIndex(this.slides.length - 1);
      }
    },
    onWheel(e: WheelEvent) {
      const strongDelta = Math.abs(e.deltaY) > 40;
      if (!strongDelta) return;
      e.preventDefault();
      if (e.deltaY > 0 && this.activeIndex < this.slides.length - 1) {
        this.scrollToIndex(this.activeIndex + 1);
      } else if (e.deltaY < 0 && this.activeIndex > 0) {
        this.scrollToIndex(this.activeIndex - 1);
      }
    },
  },
});
</script>

<style scoped>
/* === THEME (يرتكز على CSS variables لديك) === */
.fm-vert-slider {
  position: relative;
  width: 100%;
  background: var(--color-primary);
  color: #fff;
  overflow: hidden;
}

/* نقاط/مؤشر جانبي — باستخدام logical properties لدعم RTL/LTR */
.fm-dots {
  position: absolute;
  inset-block-start: 50%;
  transform: translateY(-50%);
  display: grid;
  gap: 12px;
  z-index: 5;

  /* بدل right/left استخدم inset-inline-end ليتعاكس تلقائياً مع RTL */
  inset-inline-end: 20px;
}
.fm-dots .dot {
  inline-size: 12px;
  block-size: 12px;
  border-radius: 9999px;
  border: 1px solid #fff;
  background: transparent;
  cursor: pointer;
  position: relative;
  outline: none;
  transition: transform 180ms ease;
}
.fm-dots .dot:hover {
  transform: scale(1.12);
}
.fm-dots .dot.active {
  background: var(--color-accent);
  border-color: var(--color-accent);
}
.fm-dots .dot .dot-label {
  position: absolute;
  inset-inline-end: 150%;
  inset-block-start: 50%;
  transform: translateY(-50%);
  font-size: 10px;
  opacity: 0.75;
  pointer-events: none;
}

/* Scroll area */
.fm-scroller {
  block-size: 100vh;
  overflow-y: auto;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.fm-scroller::-webkit-scrollbar {
  display: none;
}

/* Slide */
.fm-slide {
  min-block-size: 100vh;
  scroll-snap-align: start;
  display: grid;
  place-items: center;
  padding: 48px 24px;
}

/* محتوى الشريحة */
.slide-inner {
  inline-size: min(1150px, 92vw);
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 32px;
  align-items: center;
}
.slide-title {
  font-size: clamp(28px, 3.4vw, 46px);
  line-height: 1.1;
  margin: 0 0 16px;
  letter-spacing: 0.2px;
}
.slide-desc {
  font-size: clamp(14px, 1.4vw, 18px);
  opacity: 0.9;
  margin: 0;
}
.slide-media img {
  inline-size: 100%;
  block-size: 60vh;
  max-block-size: 560px;
  object-fit: cover;
  border-radius: 18px;
  display: block;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
}

/* Accent stripe */
.slide-title::after {
  content: "";
  display: block;
  inline-size: 78px;
  block-size: 4px;
  margin-block-start: 14px;
  background: var(--color-accent);
  border-radius: 2px;
}

/* Responsive */
@media (max-width: 1024px) {
  .slide-inner {
    grid-template-columns: 1fr;
  }
  .slide-media img {
    block-size: 44vh;
  }
  .fm-dots {
    inset-inline-end: 12px;
  }
}
</style>
