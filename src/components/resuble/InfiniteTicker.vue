<script lang="ts">
import {
  defineComponent,
  onMounted,
  ref,
  watch,
  nextTick,
  onBeforeUnmount,
} from "vue";

export default defineComponent({
  name: "InfiniteTicker",
  props: {
    // Your slides (you can also switch to <slot> if you want custom markup)
    items: { type: Array as () => Array<string>, required: true },
    // Pixels per second (lower = slower)
    speed: { type: Number, default: 80 },
    // Gap between slides in px
    gap: { type: Number, default: 24 },
    // "ltr" or "rtl"
    direction: { type: String as () => "ltr" | "rtl", default: "ltr" },
    // Pause animation when hovering
    pauseOnHover: { type: Boolean, default: true },
  },
  setup(props) {
    const wrapper = ref<HTMLElement | null>(null);
    const track = ref<HTMLElement | null>(null);
    const duration = ref(0); // seconds
    let resizeObs: ResizeObserver | null = null;

    const measure = async () => {
      await nextTick();
      if (!wrapper.value || !track.value) return;

      // trackHalf = width of one group (we render it twice for seamless loop)
      const group = track.value.querySelector<HTMLElement>("[data-group='1']");
      if (!group) return;

      const groupWidth = group.scrollWidth;
      // Distance we animate across is exactly one group's width
      // duration = distance / speed
      const seconds = groupWidth / Math.max(props.speed, 1);
      duration.value = seconds || 1;
      // Set CSS vars
      track.value.style.setProperty("--gap", `${props.gap}px`);
      track.value.style.setProperty("--duration", `${duration.value}s`);
    };

    onMounted(() => {
      measure();
      // Recompute on resize/content changes
      if (typeof ResizeObserver !== "undefined" && track.value) {
        resizeObs = new ResizeObserver(() => measure());
        resizeObs.observe(track.value);
      }
      window.addEventListener("load", measure);
    });

    onBeforeUnmount(() => {
      resizeObs?.disconnect();
      window.removeEventListener("load", measure);
    });

    watch(
      () => [props.items, props.speed, props.gap, props.direction],
      () => measure(),
      { deep: true }
    );

    return { wrapper, track, duration };
  },
});
</script>

<template>
  <div
    ref="wrapper"
    class="ticker"
    :class="[{ 'pause-on-hover': pauseOnHover, rtl: direction === 'rtl' }]"
  >
    <div ref="track" class="ticker__track" aria-hidden="true">
      <!-- We render TWO identical groups for a seamless loop -->
      <div class="ticker__group" data-group="1">
        <div v-for="(item, i) in items" :key="'g1-' + i" class="ticker__slide">
          {{ item }}
        </div>
      </div>
      <div class="ticker__group" data-group="2">
        <div v-for="(item, i) in items" :key="'g2-' + i" class="ticker__slide">
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ticker {
  width: 100%;
  overflow: hidden;
  position: relative;
}

.ticker__track {
  display: flex;
  align-items: center;
  gap: var(--gap, 24px);
  /* Key: translateX on a single long row that repeats */
  will-change: transform;
  animation: marquee var(--duration, 20s) linear infinite;
}

/* RTL flips the animation direction */
.ticker.rtl .ticker__track {
  animation-name: marquee-rtl;
}

.ticker__group {
  display: inline-flex;
  align-items: center;
  gap: var(--gap, 24px);
  white-space: nowrap;
}

.ticker__slide {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  padding: 0.5rem 1rem;
  border-radius: 999px;
  font-weight: 500;
  font-size: 5rem;
  padding-inline: clamp(64px, 9.2903225806vw, 144px);
  color: var(--color-accent);
}

/* Hover pause (optional) */
.ticker.pause-on-hover:hover .ticker__track {
  animation-play-state: paused;
}

/* Respect users who prefer reduced motion */
@media (prefers-reduced-motion: reduce) {
  .ticker__track {
    animation: none;
    transform: translate3d(0, 0, 0);
  }
}

@keyframes marquee {
  from {
    transform: translate3d(0, 0, 0);
  }
  to {
    transform: translate3d(-50%, 0, 0);
  }
}

@keyframes marquee-rtl {
  from {
    transform: translate3d(-50%, 0, 0);
  }
  to {
    transform: translate3d(0, 0, 0);
  }
}
</style>
