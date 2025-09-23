<script lang="ts">
import { defineComponent } from 'vue';
import serviceLogistics from '@/assets/service-logistics.svg';
import serviceRoutes from '@/assets/service-routes.svg';
import serviceTechnology from '@/assets/service-technology.svg';

type ServiceKey = 'logistics' | 'routes' | 'technology';

type ServiceItem = {
    key: ServiceKey;
    image: string;
};

type CardState = {
    visible: boolean;
    imageShift: number;
    contentShift: number;
};

type ComposerLocale = {
    value: string;
};

type ComposerInstance = {
    locale: ComposerLocale;
};

export default defineComponent({
    name: 'ServicesSection',
    data() {
        return {
            services: [
                { key: 'logistics', image: serviceLogistics },
                { key: 'routes', image: serviceRoutes },
                { key: 'technology', image: serviceTechnology },
            ] as ServiceItem[],
            cardStates: [] as CardState[],
            cardRefs: [] as (HTMLElement | null)[],
            stackRef: null as HTMLElement | null,
            observer: null as IntersectionObserver | null,
            rafId: null as number | null,
            listenersAttached: false,
        };
    },
    computed: {
        composerLocale(): string {
            const composer = (this.$i18n as unknown as ComposerInstance | undefined)?.locale;
            return composer?.value ?? 'en';
        },
        isArabic(): boolean {
            return this.composerLocale.startsWith('ar');
        },
        sectionDirection(): 'rtl' | 'ltr' {
            return this.isArabic ? 'rtl' : 'ltr';
        },
        cardStyles(): Record<string, string>[] {
            return this.cardStates.map((state) => ({
                '--image-shift': `${state.imageShift}px`,
                '--content-shift': `${state.contentShift}px`,
            }));
        },
    },
    methods: {
        setStackRef(el: Element | null) {
            this.stackRef = (el as HTMLElement) ?? null;

            if (this.stackRef && !this.listenersAttached) {
                this.$nextTick(() => {
                    this.initServicesInteractions();
                });
            }
        },
        setCardRef(el: Element | null, index: number) {
            this.cardRefs[index] = (el as HTMLElement) ?? null;
        },
        layoutClass(index: number): string | null {
            const shouldSwap = this.isArabic ? index % 2 === 0 : index % 2 !== 0;
            return shouldSwap ? 'service-card--swap' : null;
        },
        attachScrollListeners() {
            if (typeof window === 'undefined' || this.listenersAttached) {
                return;
            }

            window.addEventListener('scroll', this.scheduleParallax, { passive: true });
            window.addEventListener('resize', this.scheduleParallax);
            this.stackRef?.addEventListener('scroll', this.scheduleParallax, { passive: true });
            this.listenersAttached = true;
        },
        detachScrollListeners() {
            if (typeof window === 'undefined' || !this.listenersAttached) {
                return;
            }

            window.removeEventListener('scroll', this.scheduleParallax);
            window.removeEventListener('resize', this.scheduleParallax);
            this.stackRef?.removeEventListener('scroll', this.scheduleParallax);
            this.listenersAttached = false;
        },
        initServicesInteractions() {
            if (!this.stackRef) {
                return;
            }

            this.initObserver();
            this.attachScrollListeners();
            this.scheduleParallax();
        },
        initObserver() {
            this.cardStates = this.services.map((_, idx) => ({
                visible: this.cardStates[idx]?.visible ?? false,
                imageShift: 0,
                contentShift: 0,
            }));

            if (this.observer) {
                this.observer.disconnect();
                this.observer = null;
            }

            if (!this.stackRef || typeof IntersectionObserver === 'undefined') {
                this.cardStates = this.cardStates.map(() => ({
                    visible: true,
                    imageShift: 0,
                    contentShift: 0,
                }));
                return;
            }

            this.observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        const index = this.cardRefs.findIndex((ref) => ref === entry.target);
                        if (index === -1 || !this.cardStates[index]) {
                            return;
                        }

                        if (entry.isIntersecting) {
                            this.cardStates[index].visible = true;
                            this.observer?.unobserve(entry.target);
                        }
                    });
                },
                {
                    root: this.stackRef,
                    threshold: 0.55,
                }
            );

            this.$nextTick(() => {
                this.cardRefs.forEach((el) => {
                    if (el) {
                        this.observer?.observe(el);
                    }
                });
            });
        },
        scheduleParallax() {
            if (typeof window === 'undefined') {
                return;
            }

            if (this.rafId !== null) {
                return;
            }

            this.rafId = window.requestAnimationFrame(this.updateParallax);
        },
        updateParallax() {
            const container = this.stackRef;
            const fallbackHeight = window.innerHeight || document.documentElement.clientHeight || 0;
            const viewHeight = container?.clientHeight ?? fallbackHeight;
            const containerRect = container?.getBoundingClientRect();
            const containerCenter = containerRect ? containerRect.top + viewHeight / 2 : viewHeight / 2;

            this.cardRefs.forEach((el, index) => {
                const state = this.cardStates[index];
                if (!el || !state) {
                    return;
                }

                const rect = el.getBoundingClientRect();
                const cardCenter = rect.top + rect.height / 2;
                const distance = containerCenter - cardCenter;
                const normalized = viewHeight
                    ? Math.max(-1, Math.min(1, distance / (viewHeight / 1.2)))
                    : 0;

                state.imageShift = normalized * 50;
                state.contentShift = normalized * 28;
            });

            this.rafId = null;
        },
    },
    mounted() {
        this.$nextTick(() => {
            if (this.stackRef) {
                this.initServicesInteractions();
            }
        });
    },
    beforeUnmount() {
        this.detachScrollListeners();
        if (this.observer) {
            this.observer.disconnect();
            this.observer = null;
        }
        if (this.rafId !== null && typeof window !== 'undefined') {
            window.cancelAnimationFrame(this.rafId);
            this.rafId = null;
        }
    },
});
</script>

<template>
    <section id="services" class="services-section" :dir="sectionDirection">
        <div class="services-shell">
            <div
                class="services-stack"
                :ref="setStackRef"
            >
                <article
                    v-for="(service, index) in services"
                    :key="service.key"
                    class="service-card"
                    :class="[
                        layoutClass(index),
                        {
                            'is-rtl': isArabic,
                            'is-visible': cardStates[index]?.visible,
                        },
                    ]"
                    :style="cardStyles[index]"
                    :ref="(el) => setCardRef(el as Element | null, index)"
                >
                    <figure class="service-visual">
                        <div class="service-visual__inner">
                            <img
                                :src="service.image"
                                class="service-visual__image"
                                :alt="$t(`servicesSection.items.${service.key}.figureAlt`)"
                                loading="lazy"
                            />
                        </div>
                    </figure>

                    <div class="service-content">
                        <span class="services-label">
                            <span class="services-label__icon" aria-hidden="true">
                                <svg viewBox="0 0 24 24" focusable="false">
                                    <path d="M4 4h16v16H4z" />
                                    <path d="M8 8h8v2H8zm0 4h6v2H8zm0 4h4v2H8z" />
                                </svg>
                            </span>
                            {{ $t('servicesSection.label') }}
                        </span>

                        <p
                            v-if="index === 0"
                            class="service-intro"
                        >
                            {{ $t('servicesSection.subtitle') }}
                        </p>

                        <h3 class="service-title">
                            {{ $t(`servicesSection.items.${service.key}.title`) }}
                        </h3>
                        <p class="service-body">
                            {{ $t(`servicesSection.items.${service.key}.body`) }}
                        </p>
                    </div>
                </article>
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

.services-shell {
    margin: 0 auto;
    width: 100%;
    max-width: 1180px;
    min-height: 100vh;
    min-height: 100dvh;
    display: flex;
}

.services-stack {
    flex: 1 1 auto;
    height: 100%;
    overflow-y: auto;
    scroll-snap-type: y mandatory;
    display: flex;
    flex-direction: column;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: thin;
    scrollbar-color: rgba(19, 64, 51, 0.35) transparent;
}

.services-stack::-webkit-scrollbar {
    width: 8px;
}

.services-stack::-webkit-scrollbar-thumb {
    background: rgba(19, 64, 51, 0.35);
    border-radius: 999px;
}

.service-card {
    position: relative;
    min-height: 100%;
    padding: clamp(3rem, 6vw, 5rem) 0;
    display: grid;
    align-items: center;
    grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
    grid-template-areas: 'visual content';
    gap: clamp(2rem, 4vw, 3.5rem);
    scroll-snap-align: start;
    scroll-snap-stop: always;
    direction: ltr;
}

.service-card--swap {
    grid-template-areas: 'content visual';
}

.service-card.is-rtl .service-content {
    align-items: flex-end;
    text-align: right;
}

.service-card.is-rtl .services-label {
    align-self: flex-end;
}

.service-card.is-rtl .service-title {
    text-align: right;
}

.service-card.is-rtl .service-intro,
.service-card.is-rtl .service-body {
    text-align: right;
}

.service-visual {
    grid-area: visual;
    position: relative;
    width: 100%;
    overflow: hidden;
    border-radius: 24px;
    background: linear-gradient(135deg, #1a4456, #0d2a3a);
    transform: translateY(calc(80px - var(--image-shift, 0px)));
    opacity: 0;
    transition: transform 0.9s cubic-bezier(0.17, 0.55, 0.32, 1), opacity 0.6s ease;
}

.service-visual__inner {
    position: relative;
    width: 100%;
    padding-top: 68%;
}

.service-visual__image {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.service-content {
    grid-area: content;
    display: flex;
    flex-direction: column;
    gap: clamp(1.25rem, 2vw, 1.75rem);
    transform: translateY(calc(60px - var(--content-shift, 0px)));
    opacity: 0;
    transition: transform 0.8s cubic-bezier(0.17, 0.55, 0.32, 1), opacity 0.6s ease;
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
}

.service-title {
    margin: 0;
    font-size: clamp(2rem, 2.5vw, 2.6rem);
    font-weight: 700;
    color: #0f1f2d;
}

.service-body {
    margin: 0;
    font-size: 1.05rem;
    line-height: 1.9;
    color: #2b3e4f;
}

.service-card.is-visible .service-visual {
    opacity: 1;
    transform: translateY(calc(0px - var(--image-shift, 0px)));
}

.service-card.is-visible .service-content {
    opacity: 1;
    transform: translateY(calc(0px - var(--content-shift, 0px)));
}

@media (max-width: 920px) {
    .service-card {
        grid-template-columns: 1fr;
        grid-template-areas:
            'visual'
            'content';
        padding: clamp(2.5rem, 7vw, 4rem) 0;
    }

    .service-content {
        transform: translateY(calc(50px - var(--content-shift, 0px)));
    }

    .service-card.is-rtl .service-content {
        align-items: flex-start;
        text-align: inherit;
    }
}

@media (max-width: 640px) {
    .services-section {
        padding-inline: clamp(1.25rem, 6vw, 2rem);
    }

    .services-shell {
        min-height: 100dvh;
    }

    .service-title {
        font-size: clamp(1.75rem, 6vw, 2.2rem);
    }

    .service-body {
        font-size: 0.98rem;
        line-height: 1.8;
    }
}
</style>
