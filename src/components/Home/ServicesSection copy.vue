<script lang="ts">
import { defineComponent } from "vue";
import type { ComponentPublicInstance } from "vue";
import serviceLogistics from "@/assets/srvice-1.jpg";
import serviceRoutes from "@/assets/service-2.jpg";
import serviceTechnology from "@/assets/service-3.jpg";

type ServiceKey = "logistics" | "routes" | "technology";
type ServiceItem = { key: ServiceKey; image: string };
type CardState = {
  visible: boolean;
  imageShift: number;
  contentShift: number;
  progress: number;
  isActive: boolean;
  hasEntered: boolean;
  entranceDelay: number;
};
type ComposerLocale = { value: string };
type ComposerInstance = { locale: ComposerLocale };

export default defineComponent({
  name: "ServicesSection",
  data() {
    return {
      services: [
        { key: "logistics", image: serviceLogistics },
        { key: "routes", image: serviceRoutes },
        { key: "technology", image: serviceTechnology },
      ] as ServiceItem[],
      cardStates: [] as CardState[],
      cardRefs: [] as (HTMLElement | null)[],
      stackRef: null as HTMLElement | null,
      contentRef: null as HTMLElement | null,
      observer: null as IntersectionObserver | null,
      rafId: null as number | null,
      listenersAttached: false,
      activeIndex: 0,
      transitionInProgress: false,
      ro: null as ResizeObserver | null,
      scrollVelocity: 0,
      lastScrollTop: 0,
      lastScrollTime: 0,
      velocityRafId: null as number | null,
      magneticSnapTimeout: null as number | null,
    };
  },
  computed: {
    composerLocale(): string {
      const composer = (this.$i18n as unknown as ComposerInstance | undefined)
        ?.locale;
      return composer?.value ?? "en";
    },
    isArabic(): boolean {
      return this.composerLocale.startsWith("ar");
    },
    sectionDirection(): "rtl" | "ltr" {
      return this.isArabic ? "rtl" : "ltr";
    },
    cardStyles(): Record<string, string>[] {
      return this.cardStates.map((state) => ({
        "--image-shift": `${state.imageShift}px`,
        "--content-shift": `${state.contentShift}px`,
        "--progress": state.progress.toString(),
        "--scale": (0.95 + state.progress * 0.05).toString(),
        "--blur": `${(1 - state.progress) * 2}px`,
        "--entrance-delay": `${state.entranceDelay}ms`,
        "--velocity-factor": Math.min(Math.abs(this.scrollVelocity) / 10, 1).toString(),
      }));
    },
  },
  methods: {
    resolveElement(el: Element | ComponentPublicInstance | null): HTMLElement | null {
      if (!el) return null;
      if (typeof (el as ComponentPublicInstance).$el !== "undefined") {
        return ((el as ComponentPublicInstance).$el as HTMLElement) ?? null;
      }
      return (el as HTMLElement) ?? null;
    },
    setStackRef(el: Element | ComponentPublicInstance | null) {
      this.stackRef = this.resolveElement(el);
      if (this.stackRef && !this.listenersAttached) {
        this.$nextTick(() => this.initServicesInteractions());
      }
    },
    setContentRef(el: Element | ComponentPublicInstance | null) {
      this.contentRef = this.resolveElement(el);
    },
    setCardRef(el: Element | ComponentPublicInstance | null, index: number) {
      this.cardRefs[index] = this.resolveElement(el);
    },

    attachScrollListeners() {
      if (typeof window === "undefined" || this.listenersAttached) return;
      window.addEventListener("resize", this.scheduleParallax);
      this.contentRef?.addEventListener("scroll", this.onContentScroll, {
        passive: true,
      });
      this.listenersAttached = true;
    },

    detachScrollListeners() {
      if (typeof window === "undefined" || !this.listenersAttached) return;
      window.removeEventListener("resize", this.scheduleParallax);
      this.contentRef?.removeEventListener("scroll", this.onContentScroll);
      this.listenersAttached = false;
    },

    onContentScroll() {
      this.calculateScrollVelocity();
      this.scheduleParallax();
      this.scheduleMagneticSnap();
    },

    calculateScrollVelocity() {
      if (!this.contentRef) return;

      const now = performance.now();
      const currentScrollTop = this.contentRef.scrollTop;

      if (this.lastScrollTime !== 0) {
        const timeDelta = now - this.lastScrollTime;
        const scrollDelta = currentScrollTop - this.lastScrollTop;

        if (timeDelta > 0) {
          // Calculate velocity in pixels per millisecond, then convert to px/s
          const rawVelocity = (scrollDelta / timeDelta) * 1000;
          // Apply smoothing with exponential moving average
          this.scrollVelocity = this.scrollVelocity * 0.7 + rawVelocity * 0.3;
        }
      }

      this.lastScrollTop = currentScrollTop;
      this.lastScrollTime = now;

      // Decay velocity when scroll stops
      this.decayVelocity();
    },

    decayVelocity() {
      if (this.velocityRafId !== null) return;

      const decay = () => {
        this.scrollVelocity *= 0.92; // Smooth decay

        if (Math.abs(this.scrollVelocity) > 0.1) {
          this.velocityRafId = requestAnimationFrame(decay);
        } else {
          this.scrollVelocity = 0;
          this.velocityRafId = null;
        }
      };

      this.velocityRafId = requestAnimationFrame(decay);
    },

    scheduleMagneticSnap() {
      if (this.magneticSnapTimeout !== null) {
        clearTimeout(this.magneticSnapTimeout);
      }

      // Wait for scroll to settle before applying magnetic snap
      this.magneticSnapTimeout = window.setTimeout(() => {
        this.applyMagneticSnap();
      }, 150);
    },

    applyMagneticSnap() {
      if (!this.contentRef || this.transitionInProgress) return;

      const container = this.contentRef;
      const viewHeight = container.clientHeight;
      const rect = container.getBoundingClientRect();
      const containerCenter = rect.top + viewHeight / 2;

      let closestIdx = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      this.cardRefs.forEach((el, index) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const cardCenter = r.top + r.height / 2;
        const distance = Math.abs(containerCenter - cardCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIdx = index;
        }
      });

      // If closest card is within snap threshold and not centered, snap to it
      const snapThreshold = viewHeight * 0.15;
      if (closestDistance > 20 && closestDistance < snapThreshold) {
        this.smoothScrollToCard(closestIdx);
      }
    },

    initServicesInteractions() {
      this.initObserver();
      this.attachScrollListeners();
      this.scheduleParallax();

      if (this.contentRef && "ResizeObserver" in window) {
        this.ro = new ResizeObserver(() => this.scheduleParallax());
        this.ro.observe(this.contentRef);
      }
    },

    initObserver() {
      this.cardStates = this.services.map((_, idx) => ({
        visible: true,
        imageShift: 0,
        contentShift: 0,
        progress: idx === 0 ? 1 : 0,
        isActive: idx === 0,
        hasEntered: false,
        entranceDelay: idx * 150,
      }));

      if (this.observer) {
        this.observer.disconnect();
        this.observer = null;
      }

      if (!this.contentRef || typeof IntersectionObserver === "undefined")
        return;

      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const index = this.cardRefs.findIndex(
              (ref) => ref === entry.target
            );
            if (index === -1 || !this.cardStates[index]) return;

            const ratio = Math.max(
              0,
              Math.min(1, entry.intersectionRatio * 1.5)
            );
            this.cardStates[index].progress = ratio;
            this.cardStates[index].visible = true;
          });
          this.scheduleParallax();
        },
        {
          root: this.contentRef,
          threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
          rootMargin: "10% 0% 10% 0%",
        }
      );

      this.$nextTick(() => {
        this.cardRefs.forEach((el) => el && this.observer?.observe(el));
      });
    },

    scheduleParallax() {
      if (typeof window === "undefined") return;
      if (this.rafId !== null) return;
      this.rafId = window.requestAnimationFrame(this.updateParallax);
    },

    updateParallax() {
      const container = this.contentRef ?? this.stackRef ?? undefined;
      const fallbackHeight =
        window.innerHeight || document.documentElement.clientHeight || 0;
      const viewHeight = container?.clientHeight ?? fallbackHeight;
      const rect = container?.getBoundingClientRect();
      const containerCenter = rect ? rect.top + viewHeight / 2 : viewHeight / 2;

      let closestIdx = this.activeIndex;
      let closestDistance = Number.POSITIVE_INFINITY;

      this.cardRefs.forEach((el, index) => {
        const state = this.cardStates[index];
        if (!el || !state) return;

        const r = el.getBoundingClientRect();
        const cardCenter = r.top + r.height / 2;
        const distance = containerCenter - cardCenter;
        const absDistance = Math.abs(distance);

        const normalized = viewHeight
          ? Math.max(-1, Math.min(1, distance / (viewHeight / 1.5)))
          : 0;

        // Enhanced easing with velocity influence
        const velocityFactor = Math.min(Math.abs(this.scrollVelocity) / 1000, 0.3);
        const baseEased = this.easeInOutQuart(Math.abs(normalized)) * Math.sign(normalized);
        const eased = baseEased * (1 + velocityFactor);

        // Dynamic parallax based on scroll velocity
        const parallaxMultiplier = 1 + velocityFactor * 0.5;
        state.imageShift = eased * 60 * parallaxMultiplier;
        state.contentShift = eased * 35 * parallaxMultiplier;

        const progressRange = viewHeight * 0.4;
        const rawProgress = Math.max(
          0,
          Math.min(1, 1 - absDistance / progressRange)
        );

        // Smooth progress with easing
        state.progress = this.easeOutCubic(rawProgress);
        state.isActive = absDistance < progressRange * 0.5;

        // Mark as entered when it becomes visible
        if (state.progress > 0.1 && !state.hasEntered) {
          state.hasEntered = true;
        }

        if (absDistance < closestDistance) {
          closestDistance = absDistance;
          closestIdx = index;
        }
      });

      if (closestIdx !== this.activeIndex && !this.transitionInProgress) {
        this.activeIndex = closestIdx;
      }

      this.rafId = null;
    },

    easeInOutQuart(t: number): number {
      return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
    },

    easeOutCubic(t: number): number {
      return 1 - Math.pow(1 - t, 3);
    },

    easeOutQuart(t: number): number {
      return 1 - Math.pow(1 - t, 4);
    },

    handleKeyNavigation(event: KeyboardEvent) {
      if (!this.contentRef) return;

      const { key } = event;
      let targetIndex = this.activeIndex;

      switch (key) {
        case "ArrowDown":
        case "ArrowRight":
          targetIndex = Math.min(
            this.services.length - 1,
            this.activeIndex + 1
          );
          break;
        case "ArrowUp":
        case "ArrowLeft":
          targetIndex = Math.max(0, this.activeIndex - 1);
          break;
        case "Home":
          targetIndex = 0;
          break;
        case "End":
          targetIndex = this.services.length - 1;
          break;
        default:
          return;
      }

      if (targetIndex !== this.activeIndex) {
        event.preventDefault();
        this.smoothScrollToCard(targetIndex);
      }
    },

    smoothScrollToCard(index: number) {
      if (!this.contentRef || !this.cardRefs[index]) return;

      this.transitionInProgress = true;
      const container = this.contentRef;
      const targetCard = this.cardRefs[index]!;

      const targetTop =
        targetCard.offsetTop -
        (container.clientHeight - targetCard.offsetHeight) / 2;

      this.smoothScrollTo(container, targetTop, 500, () => {
        this.activeIndex = index;
        this.transitionInProgress = false;
      });
    },

    smoothScrollTo(
      element: HTMLElement,
      target: number,
      duration: number,
      callback?: () => void
    ) {
      const start = element.scrollTop;
      const distance = target - start;
      let startTime: number | null = null;

      const easeInOutCubic = (t: number): number =>
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

      const tick = (now: number) => {
        if (startTime === null) startTime = now;
        const elapsed = now - startTime;
        const p = Math.min(elapsed / duration, 1);
        element.scrollTop = start + distance * easeInOutCubic(p);
        if (p < 1) requestAnimationFrame(tick);
        else callback?.();
      };

      requestAnimationFrame(tick);
    },
  },

  mounted() {
    this.$nextTick(() => {
      this.initServicesInteractions();

      if (this.contentRef) {
        this.contentRef.addEventListener("keydown", this.handleKeyNavigation);
        this.contentRef.setAttribute("tabindex", "0");
      }
    });
  },

  beforeUnmount() {
    this.detachScrollListeners();
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
    if (this.rafId !== null && typeof window !== "undefined") {
      window.cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    if (this.velocityRafId !== null && typeof window !== "undefined") {
      window.cancelAnimationFrame(this.velocityRafId);
      this.velocityRafId = null;
    }
    if (this.magneticSnapTimeout !== null) {
      clearTimeout(this.magneticSnapTimeout);
      this.magneticSnapTimeout = null;
    }
    if (this.ro) {
      this.ro.disconnect();
      this.ro = null;
    }
    if (this.contentRef) {
      this.contentRef.removeEventListener("keydown", this.handleKeyNavigation);
    }
  },
});
</script>

<template>
  <section
    id="services"
    class="services-section hide-scrollbar"
    :dir="sectionDirection"
  >
    <div class="services_container">
      <div class="accordionSlider__inner">
        <!-- LEFT: sticky image stack -->
        <div
          class="accordionSlider__wrapper"
          :ref="setStackRef"
          aria-hidden="true"
        >
          <div
            class="accordionSlider__offset"
            data-accordion-slider-offset=""
          ></div>
          <ul class="accordionSlider__items">
            <li
              v-for="(service, index) in services"
              :key="service.key"
              class="accordionSlider__item"
              :class="{
                'is-active': index === activeIndex,
                'is-visible': cardStates[index]?.visible,
                'has-entered': cardStates[index]?.hasEntered,
              }"
              :style="cardStyles[index]"
            >
              <div class="image-container">
                <div class="image-clip-wrapper">
                  <img
                    :src="service.image"
                    class="accordionSlider__img"
                    :alt="$t(`servicesSection.items.${service.key}.figureAlt`)"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div class="image-overlay"></div>
                <div class="image-glow"></div>
              </div>
            </li>
          </ul>
        </div>

        <div
          class="accordionSlider__content hide-scrollbar"
          :ref="setContentRef"
          role="region"
          aria-roledescription="carousel"
          :aria-label="$t('servicesSection.label')"
        >
          <div
            class="accordionSlider__contentBox"
            v-for="(service, index) in services"
            :key="service.key"
            :ref="(el) => setCardRef(el, index)"
            :style="cardStyles[index]"
            :class="{
              'is-visible': cardStates[index]?.visible,
              'is-active': cardStates[index]?.isActive,
              'is-center': index === activeIndex,
              'has-entered': cardStates[index]?.hasEntered,
            }"
          >
            <h3 class="services-label">
              <span class="services-label__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" focusable="false">
                  <path d="M4 4h16v16H4z" />
                  <path d="M8 8h8v2H8zm0 4h6v2H8zm0 4h4v2H8z" />
                </svg>
              </span>
              {{ $t("servicesSection.label") }}
            </h3>

            <h1 v-if="index === 0" class="service-intro">
              {{ $t("servicesSection.subtitle") }}
            </h1>

            <div class="service-content">
              <p class="service-title">
                {{ $t(`servicesSection.items.${service.key}.title`) }}
              </p>
              <p class="service-body">
                {{ $t(`servicesSection.items.${service.key}.body`) }}
              </p>
            </div>

            <div class="card-progress" aria-hidden="true">
              <div
                class="progress-bar"
                :style="{
                  width: `${(cardStates[index]?.progress ?? 0) * 100}%`,
                }"
              ></div>
            </div>
          </div>

          <div class="scroll-spacer" aria-hidden="true"></div>
        </div>

        <!-- Navigation Dots -->
        <div class="scroll-navigation" aria-label="Service navigation">
          <button
            v-for="(service, index) in services"
            :key="`nav-${service.key}`"
            class="nav-dot"
            :class="{ 'is-active': index === activeIndex }"
            :aria-label="$t(`servicesSection.items.${service.key}.title`)"
            :aria-current="index === activeIndex ? 'true' : 'false'"
            @click="smoothScrollToCard(index)"
          >
            <span class="nav-dot-inner"></span>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.services-section {
  position: relative;
  width: 100%;
  margin-block: clamp(4rem, 8vw, 6rem) 0;
  padding-inline: clamp(1.5rem, 6vw, 4rem);
  background: #ffffff;
  color: #13202d;
  /* نخلي أي سكرول داخل السكشن ما يرجّع Bounce للصفحة */
  overscroll-behavior: contain;
}

.services_container {
  margin-right: auto;
  margin-left: auto;
  width: 100%;
  max-width: 1476px;
}

.accordionSlider__inner {
  display: flex;
  position: relative;
  padding-inline: 5.42%;
  gap: 4%;
}

/* LEFT sticky images */
.accordionSlider__wrapper {
  position: sticky;
  top: 20vh;
  flex: 0 0 48.936%;
  height: 60vh;
}

.accordionSlider__offset {
  position: absolute;
  inset: 0;
  visibility: hidden;
}

.accordionSlider__items {
  position: relative;
  height: 100%;
  overflow: hidden;
  list-style: none;
  margin: 0;
  padding: 0;
  border-radius: 24px;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.15);
}

.accordionSlider__item {
  position: absolute;
  inset: 0;
  z-index: 0;
  opacity: 0;
  transition: all calc(800ms - var(--velocity-factor, 0) * 200ms) cubic-bezier(0.23, 1, 0.32, 1);
  transform: translateY(calc(-30px - var(--image-shift, 0px)))
    scale(var(--scale, 0.95)) rotateX(5deg);
  will-change: opacity, transform, filter;
  filter: blur(var(--blur, 2px)) brightness(0.8);
  contain: layout style paint;
}

.accordionSlider__item.is-active {
  z-index: 2;
  opacity: 1;
  transform: translateY(calc(0px - var(--image-shift, 0px)))
    scale(var(--scale, 1)) rotateX(0deg);
  filter: blur(0px) brightness(1);
}

.accordionSlider__item.has-entered {
  animation: cardEnter 1s cubic-bezier(0.23, 1, 0.32, 1) forwards;
  animation-delay: var(--entrance-delay, 0ms);
}

@keyframes cardEnter {
  from {
    opacity: 0;
    transform: translateY(-50px) scale(0.9) rotateX(10deg);
  }
  to {
    opacity: 1;
  }
}

.accordionSlider__item.is-visible {
  transition-delay: calc(var(--progress, 0) * 200ms);
}

.image-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: inherit;
  perspective: 1000px;
}

.image-clip-wrapper {
  width: 100%;
  height: 100%;
  clip-path: inset(0 0 0 0);
  transition: clip-path 1.2s cubic-bezier(0.23, 1, 0.32, 1);
}

.accordionSlider__item:not(.has-entered) .image-clip-wrapper {
  clip-path: inset(0 100% 0 0);
}

.accordionSlider__item.is-active .image-clip-wrapper {
  clip-path: inset(0 0 0 0);
}

.accordionSlider__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 1200ms cubic-bezier(0.23, 1, 0.32, 1),
              filter 800ms ease;
  will-change: transform;
}

.accordionSlider__item.is-active .accordionSlider__img {
  transform: scale(1.08) rotate(0.5deg);
}

.accordionSlider__item:not(.has-entered) .accordionSlider__img {
  transform: scale(1.3);
}

.image-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(128, 253, 102, 0.15) 0%,
    rgba(26, 224, 152, 0.15) 50%,
    rgba(13, 32, 45, 0.25) 100%
  );
  opacity: 0;
  transition: opacity 600ms ease;
  mix-blend-mode: multiply;
}

.accordionSlider__item.is-active .image-overlay {
  opacity: 1;
}

.image-glow {
  position: absolute;
  inset: -20%;
  background: radial-gradient(
    circle at 50% 50%,
    rgba(38, 224, 152, 0.4) 0%,
    rgba(128, 253, 102, 0.2) 30%,
    transparent 70%
  );
  opacity: 0;
  transition: opacity 800ms ease, transform 1000ms ease;
  transform: scale(0.8);
  pointer-events: none;
  filter: blur(40px);
}

.accordionSlider__item.is-active .image-glow {
  opacity: 1;
  transform: scale(1);
  animation: glowPulse 3s ease-in-out infinite;
}

@keyframes glowPulse {
  0%, 100% {
    opacity: 0.6;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.1);
  }
}

/* RIGHT scroll column */
.accordionSlider__content {
  display: flex;
  flex-direction: column;
  gap: clamp(6rem, 10vh, 14.8rem);
  flex: 0 0 51.062%;
  margin-block: 20vh;
  padding-inline-start: 8.51%;
  max-height: 60vh; /* نحافظ على عمود داخلي */
  overflow-y: auto;
  /* مهم: نخلّي السناب طبيعي بدون مومينتم يدوي */
  scroll-behavior: auto; /* نمنع تضارب مع سموث JS والسناب */
  scroll-snap-type: y proximity; /* سناب ناعم فقط */
  scroll-padding-block: 20vh; /* تحسين التمركز */
  outline: none;
  -webkit-overflow-scrolling: touch;
}

.accordionSlider__content:focus {
  outline: 2px solid rgba(128, 253, 102, 0.5);
  outline-offset: 4px;
  border-radius: 8px;
}

.accordionSlider__contentBox {
  display: flex;
  flex-direction: column;
  scroll-snap-align: center;
  scroll-snap-stop: always;
  position: relative;
  padding: 2rem 0;
  transition: all calc(800ms - var(--velocity-factor, 0) * 200ms) cubic-bezier(0.23, 1, 0.32, 1);
  contain: layout style;
}

.accordionSlider__contentBox.has-entered {
  animation: contentEnter 1s cubic-bezier(0.23, 1, 0.32, 1) forwards;
  animation-delay: var(--entrance-delay, 0ms);
}

@keyframes contentEnter {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.service-content {
  display: flex;
  flex-direction: column;
  gap: clamp(1.25rem, 2vw, 1.75rem);
  transform: translateY(calc(60px - var(--content-shift, 0px)))
    translateX(calc(var(--progress, 0) * -20px + 20px))
    scale(calc(0.95 + var(--progress, 0) * 0.05));
  opacity: var(--progress, 0);
  transition: all 800ms cubic-bezier(0.23, 1, 0.32, 1);
  will-change: transform, opacity;
}

.accordionSlider__contentBox.is-visible .service-content {
  transition-delay: 200ms;
}
.accordionSlider__contentBox.is-active .service-content,
.accordionSlider__contentBox.is-center .service-content {
  transform: translateY(calc(0px - var(--content-shift, 0px))) translateX(0px)
    scale(1);
  opacity: 1;
}

.services-label {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.4rem 1.1rem;
  border-radius: 999px;
  background: rgba(128, 253, 102, 0.18);
  color: #104235;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  transform: translateY(20px);
  opacity: 0;
  transition: all 600ms cubic-bezier(0.23, 1, 0.32, 1);
  transition-delay: calc(var(--progress, 0) * 400ms);
}
.accordionSlider__contentBox.is-visible .services-label {
  transform: translateY(0);
  opacity: 1;
}

.services-label__icon {
  width: 1.75rem;
  height: 1.75rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: linear-gradient(180deg, #8efd6f 0%, #26e098 100%);
  box-shadow: 0 10px 24px rgba(38, 224, 152, 0.3);
  transition: all 400ms ease;
}
.accordionSlider__contentBox.is-active .services-label__icon {
  transform: scale(1.1) rotate(5deg);
  box-shadow: 0 15px 35px rgba(38, 224, 152, 0.4);
}

.services-label__icon svg {
  width: 1rem;
  height: 1rem;
  fill: #0a2c22;
}

.service-intro {
  margin: 1rem 0 0;
  font-size: 1rem;
  line-height: 1.7;
  color: #476071;
  transform: translateY(30px);
  opacity: 0;
  transition: all 700ms cubic-bezier(0.23, 1, 0.32, 1);
  transition-delay: calc(var(--progress, 0) * 200ms);
}
.accordionSlider__contentBox.is-visible .service-intro {
  transform: translateY(0);
  opacity: 1;
}

.service-title {
  margin: 0;
  font-size: clamp(2rem, 2.5vw, 2.6rem);
  font-weight: 700;
  color: #0f1f2d;
  line-height: 1.2;
  transform: translateY(40px);
  opacity: 0;
  transition: all 800ms cubic-bezier(0.23, 1, 0.32, 1),
              color 400ms ease;
  transition-delay: calc(var(--progress, 0) * 300ms);
  position: relative;
}
.accordionSlider__contentBox.is-visible .service-title {
  transform: translateY(0);
  opacity: 1;
}
.accordionSlider__contentBox.is-active .service-title {
  color: #26e098;
  text-shadow: 0 2px 10px rgba(38, 224, 152, 0.2),
               0 0 40px rgba(38, 224, 152, 0.1);
  animation: titleGlow 2s ease-in-out infinite;
}

@keyframes titleGlow {
  0%, 100% {
    text-shadow: 0 2px 10px rgba(38, 224, 152, 0.2),
                 0 0 40px rgba(38, 224, 152, 0.1);
  }
  50% {
    text-shadow: 0 2px 15px rgba(38, 224, 152, 0.3),
                 0 0 50px rgba(38, 224, 152, 0.15);
  }
}

.service-body {
  margin: 0;
  font-size: 1.05rem;
  line-height: 1.9;
  color: #2b3e4f;
  transform: translateY(50px);
  opacity: 0;
  transition: all 900ms cubic-bezier(0.23, 1, 0.32, 1);
  transition-delay: calc(var(--progress, 0) * 400ms);
}
.accordionSlider__contentBox.is-visible .service-body {
  transform: translateY(0);
  opacity: 1;
}

/* Progress indicator */
.card-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: rgba(128, 253, 102, 0.1);
  border-radius: 1.5px;
  overflow: hidden;
}
.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #8efd6f, #26e098, #8efd6f);
  background-size: 200% 100%;
  border-radius: inherit;
  transition: width 300ms cubic-bezier(0.23, 1, 0.32, 1);
  box-shadow: 0 0 10px rgba(38, 224, 152, 0.3);
  position: relative;
}

.accordionSlider__contentBox.is-active .progress-bar {
  animation: progressGradient 2s ease infinite, progressPulse 1.5s ease-in-out infinite;
  box-shadow: 0 0 20px rgba(38, 224, 152, 0.5),
              0 0 40px rgba(38, 224, 152, 0.2);
}

@keyframes progressGradient {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

@keyframes progressPulse {
  0%, 100% {
    transform: scaleY(1);
  }
  50% {
    transform: scaleY(1.3);
  }
}

/* إخفاء الاسكرول بار (السكشن والعمود الداخلي) */
.hide-scrollbar {
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.hide-scrollbar::-webkit-scrollbar {
  width: 0;
  height: 0;
}

/* Spacers لتنعيم السناب */
.scroll-spacer {
  height: 20vh;
  flex: 0 0 auto;
}

/* Navigation Dots */
.scroll-navigation {
  position: absolute;
  right: 2rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  z-index: 10;
}

.nav-dot {
  position: relative;
  width: 12px;
  height: 12px;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  transition: transform 300ms cubic-bezier(0.23, 1, 0.32, 1);
  outline: none;
}

.nav-dot:hover {
  transform: scale(1.2);
}

.nav-dot:focus-visible {
  outline: 2px solid rgba(38, 224, 152, 0.5);
  outline-offset: 4px;
  border-radius: 50%;
}

.nav-dot-inner {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: rgba(128, 253, 102, 0.3);
  border: 2px solid rgba(128, 253, 102, 0.5);
  transition: all 400ms cubic-bezier(0.23, 1, 0.32, 1);
}

.nav-dot:hover .nav-dot-inner {
  background: rgba(128, 253, 102, 0.5);
  border-color: rgba(128, 253, 102, 0.8);
  box-shadow: 0 0 10px rgba(38, 224, 152, 0.3);
}

.nav-dot.is-active .nav-dot-inner {
  background: linear-gradient(135deg, #8efd6f, #26e098);
  border-color: #26e098;
  box-shadow: 0 0 15px rgba(38, 224, 152, 0.5),
              0 0 30px rgba(38, 224, 152, 0.2);
  animation: dotPulse 2s ease-in-out infinite;
}

@keyframes dotPulse {
  0%, 100% {
    transform: scale(1);
    box-shadow: 0 0 15px rgba(38, 224, 152, 0.5),
                0 0 30px rgba(38, 224, 152, 0.2);
  }
  50% {
    transform: scale(1.3);
    box-shadow: 0 0 20px rgba(38, 224, 152, 0.7),
                0 0 40px rgba(38, 224, 152, 0.3);
  }
}

/* Responsive */
@media (max-width: 1024px) {
  .accordionSlider__inner {
    flex-direction: column;
    gap: 2rem;
  }

  .accordionSlider__wrapper {
    position: relative;
    top: 0;
    height: 40vh;
    flex: none;
  }

  .accordionSlider__content {
    max-height: none;
    overflow: visible;
    padding-inline-start: 0;
    margin-block: 10vh 0;
    gap: clamp(4rem, 8vh, 8rem);
  }
  /* على الشاشات الصغيرة نخلي سلوك الصفحة هو المسيطر */
  .accordionSlider__content {
    scroll-snap-type: y proximity;
  }

  .scroll-navigation {
    right: 1rem;
    gap: 0.8rem;
  }

  .nav-dot {
    width: 10px;
    height: 10px;
  }
}

@media (max-width: 640px) {
  .services-section {
    padding-inline: clamp(1.25rem, 6vw, 2rem);
  }
  .service-title {
    font-size: clamp(1.75rem, 6vw, 2.2rem);
  }
  .service-body {
    font-size: 0.98rem;
    line-height: 1.8;
  }
  .accordionSlider__items {
    border-radius: 16px;
  }
  .services-label {
    padding: 0.3rem 0.8rem;
    gap: 0.4rem;
  }
  .services-label__icon {
    width: 1.5rem;
    height: 1.5rem;
  }

  .scroll-navigation {
    right: 0.5rem;
    gap: 0.6rem;
  }

  .nav-dot {
    width: 8px;
    height: 8px;
  }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .accordionSlider__item,
  .service-content,
  .services-label,
  .service-intro,
  .service-title,
  .service-body,
  .accordionSlider__img,
  .services-label__icon,
  .progress-bar,
  .image-glow,
  .image-overlay,
  .image-clip-wrapper,
  .nav-dot,
  .nav-dot-inner {
    transition: none !important;
    transform: none !important;
    animation: none !important;
  }
  .accordionSlider__content {
    scroll-behavior: auto;
  }
  .image-clip-wrapper {
    clip-path: inset(0 0 0 0) !important;
  }
}

/* High contrast */
@media (prefers-contrast: high) {
  .services-label {
    background: rgba(128, 253, 102, 0.3);
    border: 2px solid #104235;
  }
  .services-label__icon {
    background: #26e098;
    box-shadow: none;
  }
  .card-progress {
    background: rgba(0, 0, 0, 0.2);
  }
  .progress-bar {
    background: #26e098;
    box-shadow: none;
  }
  .accordionSlider__content:focus {
    outline: 3px solid #26e098;
  }
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  .services-section {
    background: #0a1116;
    color: #e8f0f5;
  }
  .service-title {
    color: #ffffff;
  }
  .service-body {
    color: #b8c8d4;
  }
  .service-intro {
    color: #8fa0ac;
  }
  .accordionSlider__items {
    box-shadow: 0 25px 60px rgba(0, 0, 0, 0.4);
  }
  .image-overlay {
    background: linear-gradient(
      135deg,
      rgba(128, 253, 102, 0.05) 0%,
      rgba(26, 224, 152, 0.05) 50%,
      rgba(0, 0, 0, 0.3) 100%
    );
  }
}
</style>
