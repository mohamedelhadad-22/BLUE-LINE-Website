<template>
  <section
    class="esg-rail"
    @keydown="onKey"
    tabindex="0"
    :aria-label="ariaLabel"
  >
    <div
      class="rail"
      ref="rail"
      @wheel.passive="onWheel"
      @scroll.passive="onScroll"
    >
      <article
        v-for="(s, i) in slides"
        :key="i"
        :id="`esg-${i}`"
        class="panel"
        ref="panels"
        :aria-label="`Slide ${i + 1} of ${slides.length}`"
      >
        <div class="slider_container">
          <div class="panel-inner">
            <div class="text">
              <p class="eyebrow">
                <span class="glyph">✕</span>
                {{ eyebrow }}
              </p>
              <h2 class="heading" v-html="s.heading"></h2>
              <p class="desc" v-if="s.copy" v-html="s.copy"></p>
            </div>

            <div class="media">
              <img
                class="image"
                :src="s.image"
                :alt="
                  s.alt ||
                  (typeof s.heading === 'string' ? s.heading : `Slide ${i + 1}`)
                "
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
          <!-- Dots / diamonds -->
          <ul class="dots" role="tablist" aria-label="Slide navigation">
            <li v-for="(s, i) in slides" :key="'dot-' + i" role="presentation">
              <button
                class="dot"
                role="tab"
                :aria-selected="i === activeIndex"
                :aria-controls="`esg-${i}`"
                :class="{ active: i === activeIndex }"
                @click="snapTo(i)"
              ></button>
            </li>
          </ul>
        </div>
      </article>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

type Slide = {
  heading: string;
  copy?: string;
  image: string;
  alt?: string;
};

export default defineComponent({
  name: "EsgVerticalSlider",
  props: {
    slides: { type: Array as () => Slide[], required: true },
    eyebrow: { type: String, default: "ESG INITIATIVES" },
    ariaLabel: { type: String, default: "ESG vertical slider" },
    snapMs: { type: Number, default: 650 },
    snapEasing: { type: String, default: "ease-out" },
  },
  data() {
    return {
      activeIndex: 0 as number,
      isSnapping: false as boolean,
      io: null as IntersectionObserver | null,
    };
  },
  mounted() {
    this.io = new IntersectionObserver(
      (entries) => {
        const visible = [...entries]
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          const idx = (this.$refs.panels as HTMLElement[]).indexOf(
            visible.target as HTMLElement
          );
          if (idx !== -1) this.activeIndex = idx;
        }
      },
      { root: this.$refs.rail as Element, threshold: buildThresholds() }
    );
    (this.$refs.panels as HTMLElement[]).forEach((p) => this.io!.observe(p));
  },
  beforeUnmount() {
    this.io?.disconnect();
  },
  methods: {
    snapTo(index: number) {
      const rail = this.$refs.rail as HTMLElement;
      const panel = (this.$refs.panels as HTMLElement[])[index];
      if (!rail || !panel) return;

      this.isSnapping = true;
      rail.scrollTo({ top: panel.offsetTop, behavior: "smooth" });
      window.setTimeout(() => {
        this.isSnapping = false;
      }, this.snapMs + 80);
    },
    next() {
      if (this.activeIndex < this.slides.length - 1)
        this.snapTo(this.activeIndex + 1);
    },
    prev() {
      if (this.activeIndex > 0) this.snapTo(this.activeIndex - 1);
    },
    onWheel(e: WheelEvent) {
      if (this.isSnapping) return;

      const rail = this.$refs.rail as HTMLElement;
      const atTop = rail.scrollTop <= 0;
      const atBottom =
        Math.ceil(rail.scrollTop + rail.clientHeight) >= rail.scrollHeight;

      const dy = e.deltaY;
      if (Math.abs(dy) < 20) return;
      e.preventDefault();
      if (dy > 0 && !atBottom) this.next();
      else if (dy < 0 && !atTop) this.prev();
    },
    onScroll() {},
    onKey(e: KeyboardEvent) {
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        this.next();
      }
      if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        this.prev();
      }
      if (e.key === "Home") {
        e.preventDefault();
        this.snapTo(0);
      }
      if (e.key === "End") {
        e.preventDefault();
        this.snapTo(this.slides.length - 1);
      }
    },
  },
});

function buildThresholds() {
  const t: number[] = [];
  for (let i = 0; i <= 1.0; i += 0.05) t.push(parseFloat(i.toFixed(2)));
  return t;
}
</script>

<style scoped>
.esg-rail {
  position: relative;
  background: #e9f1ee;
  outline: none;
}

.rail {
  height: 100dvh;
  overflow-y: auto;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
  scrollbar-width: none;
}
.rail::-webkit-scrollbar {
  width: 0;
  height: 0;
}

.panel {
  min-height: 100dvh;
  scroll-snap-align: start;
  display: grid;
  place-items: center stretch;
  position: relative;
}
.slider_container {
  max-width: 1576px;
  margin: 0 auto;
  position: relative;
}
.panel-inner {
  width: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: clamp(24px, 4vw, 56px);
  align-items: center;
  padding: clamp(48px, 8vh, 120px) 0;
}

.text {
  align-self: center;
}
.eyebrow {
  letter-spacing: 0.08em;
  font-weight: 700;
  font-size: 13px;
  text-transform: uppercase;
  color: #1b3c35;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 12px;
}
.glyph {
  color: #7c3aed;
}

.heading {
  font-size: clamp(32px, 4.3vw, 56px);
  line-height: 1.08;
  font-weight: 700;
  color: #0f1f1b;
  margin: 6px 0 16px;
}
.desc {
  color: #204a42;
  font-size: clamp(16px, 1.2vw, 18px);
  line-height: 1.6;
  max-width: 52ch;
}

.media {
  width: 100%;
}
.image {
  width: 100%;
  height: auto;
  border-radius: 8px;
  display: block;
  object-fit: cover;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
}

.dots {
  position: absolute;
  right: -30px;
  top: 50%;
  transform: translateY(-50%);
  display: grid;
  gap: 14px;
  list-style: none;
  margin: 0;
  padding: 0;
}
.arabic .dots {
  right: unset;
  left: -30px;
}
.dot {
  width: 12px;
  height: 12px;
  transform: rotate(45deg);
  border: 2px solid #204a42;
  background: transparent;
  border-radius: 2px;
  cursor: pointer;
  transition:
    transform 0.25s ease,
    background-color 0.25s ease,
    border-color 0.25s ease;
}
.dot:hover {
  transform: rotate(45deg) scale(1.1);
}
.dot.active {
  background: #22c55e;
  border-color: #22c55e;
}
.dot.active:nth-child(odd) {
  background: #7c3aed;
  border-color: #7c3aed;
}

@media (max-width: 960px) {
  .panel-inner {
    grid-template-columns: 1fr;
  }
  .media {
    order: -1;
  }
  .dots {
    right: 12px;
  }
}
</style>
