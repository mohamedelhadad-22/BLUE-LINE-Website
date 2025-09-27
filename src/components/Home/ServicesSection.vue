<script lang="ts">
import { defineComponent } from "vue";
import serviceLogistics from "@/assets/srvice-1.jpg";
import serviceRoutes from "@/assets/service-2.jpg";
import serviceTechnology from "@/assets/service-3.jpg";

type ServiceKey = "logistics" | "routes" | "technology";
type ServiceItem = { key: ServiceKey; image: string };
type CardState = {
  visible: boolean;
  imageShift: number;
  contentShift: number;
  progress: number; // 0-1 for smooth animations
  isActive: boolean;
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
      lastScrollTime: 0,
      scrollVelocity: 0,
      prevScrollTop: 0,
      momentumRaf: null as number | null,
      ro: null as ResizeObserver | null,
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
      }));
    },
  },
  methods: {
    setStackRef(el: Element | null) {
      this.stackRef = (el as HTMLElement) ?? null;
      if (this.stackRef && !this.listenersAttached) {
        this.$nextTick(() => this.initServicesInteractions());
      }
    },
    setContentRef(el: Element | null) {
      this.contentRef = (el as HTMLElement) ?? null;
    },
    setCardRef(el: Element | null, index: number) {
      this.cardRefs[index] = (el as HTMLElement) ?? null;
    },

    attachScrollListeners() {
      if (typeof window === "undefined" || this.listenersAttached) return;

      const opt: AddEventListenerOptions = { passive: false }; // Changed to false for preventDefault
      window.addEventListener("scroll", this.handleMainScroll, {
        passive: true,
      });
      window.addEventListener("resize", this.scheduleParallax);
      this.contentRef?.addEventListener("scroll", this.handleInnerScroll, opt);
      this.listenersAttached = true;
    },

    detachScrollListeners() {
      if (typeof window === "undefined" || !this.listenersAttached) return;

      window.removeEventListener("scroll", this.handleMainScroll);
      window.removeEventListener("resize", this.scheduleParallax);
      this.contentRef?.removeEventListener("scroll", this.handleInnerScroll);
      this.listenersAttached = false;
    },

    handleMainScroll() {
      this.scheduleParallax();
    },

    handleInnerScroll(e: Event) {
      const now = performance.now();
      const dt = now - this.lastScrollTime;

      const currentScrollTop = (e.target as HTMLElement).scrollTop;

      if (dt > 0) {
        const delta = currentScrollTop - this.prevScrollTop; // use prev
        this.scrollVelocity = delta / dt;
      }

      this.prevScrollTop = currentScrollTop; // update prev
      this.lastScrollTime = now;

      this.scheduleParallax();
      this.handleMomentumScroll();
    },

    getLastScrollTop(): number {
      return this.contentRef?.scrollTop ?? 0;
    },

    handleMomentumScroll() {
      if (this.momentumRaf) {
        cancelAnimationFrame(this.momentumRaf);
      }

      this.momentumRaf = requestAnimationFrame(() => {
        if (Math.abs(this.scrollVelocity) < 0.1) {
          this.snapToNearestCard();
        }
        this.scrollVelocity *= 0.95; // Decay velocity

        if (Math.abs(this.scrollVelocity) > 0.01) {
          this.handleMomentumScroll();
        }
      });
    },

    snapToNearestCard() {
      if (!this.contentRef || this.transitionInProgress) return;

      const container = this.contentRef;
      const containerCenter = container.scrollTop + container.clientHeight / 2;

      let nearestIndex = 0;
      let nearestDistance = Infinity;

      this.cardRefs.forEach((el, index) => {
        if (!el) return;

        const cardTop = el.offsetTop;
        const cardHeight = el.offsetHeight;
        const cardCenter = cardTop + cardHeight / 2;
        const distance = Math.abs(cardCenter - containerCenter);

        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearestIndex = index;
        }
      });

      if (nearestIndex !== this.activeIndex) {
        this.smoothScrollToCard(nearestIndex);
      }
    },

    smoothScrollToCard(index: number) {
      if (
        !this.contentRef ||
        !this.cardRefs[index] ||
        this.transitionInProgress
      )
        return;

      this.transitionInProgress = true;
      const container = this.contentRef;
      const targetCard = this.cardRefs[index]!;

      const targetTop =
        targetCard.offsetTop -
        (container.clientHeight - targetCard.offsetHeight) / 2;

      this.smoothScrollTo(container, targetTop, 600, () => {
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

      const easeInOutCubic = (t: number): number => {
        return t < 0.5
          ? 4 * t * t * t
          : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
      };

      const scroll = (currentTime: number) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);

        element.scrollTop = start + distance * easeInOutCubic(progress);

        if (progress < 1) {
          requestAnimationFrame(scroll);
        } else {
          callback?.();
        }
      };

      requestAnimationFrame(scroll);
    },

    initServicesInteractions() {
      this.initObserver();
      this.attachScrollListeners();
      this.scheduleParallax();
    },

    initObserver() {
      this.cardStates = this.services.map((_, idx) => ({
        visible: this.cardStates[idx]?.visible ?? false,
        imageShift: 0,
        contentShift: 0,
        progress: 0,
        isActive: idx === 0,
      }));

      if (this.observer) {
        this.observer.disconnect();
        this.observer = null;
      }

      if (!this.contentRef || typeof IntersectionObserver === "undefined") {
        this.cardStates = this.cardStates.map((_, idx) => ({
          visible: true,
          imageShift: 0,
          contentShift: 0,
          progress: idx === 0 ? 1 : 0,
          isActive: idx === 0,
        }));
        return;
      }

      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const index = this.cardRefs.findIndex(
              (ref) => ref === entry.target
            );
            if (index === -1 || !this.cardStates[index]) return;

            if (entry.isIntersecting) {
              this.cardStates[index].visible = true;
            }

            // Enhanced intersection ratio for smoother transitions
            this.cardStates[index].progress = Math.max(
              0,
              Math.min(1, entry.intersectionRatio * 1.5)
            );
          });
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

        // Enhanced parallax with easing
        const normalizedDistance = viewHeight
          ? Math.max(-1, Math.min(1, distance / (viewHeight / 1.5)))
          : 0;

        // Smoother parallax curves
        const easedDistance =
          this.easeInOutQuart(Math.abs(normalizedDistance)) *
          Math.sign(normalizedDistance);

        state.imageShift = easedDistance * 60;
        state.contentShift = easedDistance * 35;

        // Update progress based on center proximity
        const progressRange = viewHeight * 0.4;
        state.progress = Math.max(
          0,
          Math.min(1, 1 - absDistance / progressRange)
        );

        state.isActive = absDistance < progressRange * 0.5;

        if (absDistance < closestDistance) {
          closestDistance = absDistance;
          closestIdx = index;
        }
      });

      // Smooth active index transition
      if (closestIdx !== this.activeIndex && !this.transitionInProgress) {
        this.activeIndex = closestIdx;
      }

      this.rafId = null;
    },

    easeInOutQuart(t: number): number {
      return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
    },

    // Keyboard navigation enhancement
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
  },

  mounted() {
    this.$nextTick(() => {
      this.initServicesInteractions();

      // Add keyboard navigation
      if (this.contentRef) {
        this.prevScrollTop = this.contentRef.scrollTop; // NEW
        this.contentRef.addEventListener("keydown", this.handleKeyNavigation);
        this.contentRef.setAttribute("tabindex", "0");
        if ("ResizeObserver" in window) {
          this.ro = new ResizeObserver(() => this.scheduleParallax());
          this.ro.observe(this.contentRef);
        }
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
    if (this.momentumRaf !== null && typeof window !== "undefined") {
      window.cancelAnimationFrame(this.momentumRaf);
      this.momentumRaf = null;
    }
    if (this.contentRef) {
      this.contentRef.removeEventListener("keydown", this.handleKeyNavigation);
    }
    if (this.ro) {
      this.ro.disconnect();
      this.ro = null;
    }
  },
});
</script>

<template>
  <section id="services" class="services-section" :dir="sectionDirection">
    <div class="services_container">
      <div class="accordionSlider__inner">
        <!-- LEFT: sticky image stack -->
        <div class="accordionSlider__wrapper" :ref="setStackRef">
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
              }"
              :style="cardStyles[index]"
              aria-hidden="true"
            >
              <div class="image-container">
                <img
                  :src="service.image"
                  class="accordionSlider__img"
                  :alt="$t(`servicesSection.items.${service.key}.figureAlt`)"
                  loading="lazy"
                  decoding="async"
                />
                <div class="image-overlay"></div>
              </div>
            </li>
          </ul>
        </div>

        <!-- RIGHT: scrolling content -->
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
          </div>
          <div class="scroll-spacer" aria-hidden="true"></div>
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
}

.accordionSlider__item {
  position: absolute;
  inset: 0;
  z-index: 0;
  opacity: 0;
  transition: all 800ms cubic-bezier(0.23, 1, 0.32, 1);
  transform: translateY(calc(-30px - var(--image-shift, 0px)))
    scale(var(--scale, 0.95));
  will-change: opacity, transform;
  filter: blur(var(--blur, 2px));
}

.accordionSlider__item.is-active {
  z-index: 2;
  opacity: 1;
  transform: translateY(calc(0px - var(--image-shift, 0px)))
    scale(var(--scale, 1));
  filter: blur(0px);
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
}

.accordionSlider__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 1200ms cubic-bezier(0.23, 1, 0.32, 1);
}

.accordionSlider__item.is-active .accordionSlider__img {
  transform: scale(1.05);
}

.image-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(128, 253, 102, 0.1) 0%,
    rgba(26, 224, 152, 0.1) 50%,
    rgba(13, 32, 45, 0.2) 100%
  );
  opacity: 0;
  transition: opacity 600ms ease;
}

.accordionSlider__item.is-active .image-overlay {
  opacity: 1;
}

/* RIGHT scroll column */
.accordionSlider__content {
  display: flex;
  flex-direction: column;
  gap: clamp(6rem, 10vh, 14.8rem);
  flex: 0 0 51.062%;
  margin-block: 20vh;
  padding-inline-start: 8.51%;
  max-height: 60vh;
  overflow-y: auto;
  scroll-behavior: smooth;
  scroll-snap-type: y proximity;
  outline: none;
  /* Enhanced momentum scrolling */
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;
  scroll-padding-block: 20vh;
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
  transition: all 800ms cubic-bezier(0.23, 1, 0.32, 1);
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

.accordionSlider__contentBox.is-active .service-content {
  transform: translateY(calc(0px - var(--content-shift, 0px))) translateX(0px)
    scale(1);
  opacity: 1;
}

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
  transition: all 800ms cubic-bezier(0.23, 1, 0.32, 1);
  transition-delay: calc(var(--progress, 0) * 300ms);
}

.accordionSlider__contentBox.is-visible .service-title {
  transform: translateY(0);
  opacity: 1;
}

.accordionSlider__contentBox.is-active .service-title {
  color: #26e098;
  text-shadow: 0 2px 10px rgba(38, 224, 152, 0.1);
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



/* Hide scrollbar cross-browser */
.hide-scrollbar {
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.hide-scrollbar::-webkit-scrollbar {
  width: 0;
  height: 0;
}

.scroll-spacer {
  height: 20vh;
  flex: 0 0 auto;
}

/* Enhanced responsive design */
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

  .accordionSlider__contentBox {
    padding: 1.5rem 0;
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
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .accordionSlider__item,
  .service-content,
  .services-label,
  .service-intro,
  .service-title,
  .service-body,
  .accordionSlider__img,
  .services-label__icon,
  .progress-bar {
    transition: none !important;
    transform: none !important;
    animation: none !important;
  }

  .accordionSlider__content {
    scroll-behavior: auto;
  }
}
/* Add to ServicesSection styles */
.accordionSlider__content {
  /* Enhanced scroll performance */
  scrollbar-width: thin;
  scrollbar-color: rgba(128, 253, 102, 0.3) transparent;

  /* Better momentum scrolling on iOS */
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;

  /* Prevent layout shifts */
  contain: layout style paint;
}

.accordionSlider__content::-webkit-scrollbar {
  width: 4px;
}

.accordionSlider__content::-webkit-scrollbar-track {
  background: transparent;
}

.accordionSlider__content::-webkit-scrollbar-thumb {
  background: rgba(128, 253, 102, 0.3);
  border-radius: 2px;
}

.accordionSlider__content::-webkit-scrollbar-thumb:hover {
  background: rgba(128, 253, 102, 0.5);
}

/* Enhanced focus styles for accessibility */
.accordionSlider__content:focus-visible {
  outline: 2px solid rgba(128, 253, 102, 0.8);
  outline-offset: 2px;
  border-radius: 8px;
}

/* Smooth state transitions */
.accordionSlider__contentBox {
  transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

/* Performance optimizations */
.accordionSlider__item {
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000px;
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .accordionSlider__contentBox,
  .accordionSlider__item,
  .service-content {
    transition-duration: 0.1ms !important;
    animation-duration: 0.1ms !important;
  }

  .accordionSlider__content {
    scroll-behavior: auto;
  }
}
/* High contrast mode support */
@media (prefers-contrast: high) {
  .services-label {
    background: rgba(128, 253, 102, 0.3);
    border: 2px solid #104235;
  }

  .services-label__icon {
    background: #26e098;
    box-shadow: none;
  }

  .progress-bar {
    background: #26e098;
    box-shadow: none;
  }

  .accordionSlider__content:focus {
    outline: 3px solid #26e098;
  }
}

/* Dark mode support */
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
