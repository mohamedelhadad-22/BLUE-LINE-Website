<script lang="ts">
import { defineComponent } from 'vue';
import galleryContainers from '@/assets/career-containers.svg';
import galleryDetail from '@/assets/career-detail.svg';
import galleryVessel from '@/assets/career-vessel.svg';
import galleryTeam from '@/assets/career-team.svg';
import galleryMeeting from '@/assets/career-meeting.svg';

type GalleryKey = 'containers' | 'detail' | 'vessel' | 'team' | 'meeting';

type GalleryItem = {
    key: GalleryKey;
    image: string;
};

type ComposerLocale = {
    value: string;
};

type ComposerInstance = {
    locale: ComposerLocale;
};

export default defineComponent({
    name: 'CareersSection',
    data() {
        return {
            gallery: [
                { key: 'containers', image: galleryContainers },
                { key: 'detail', image: galleryDetail },
                { key: 'vessel', image: galleryVessel },
                { key: 'team', image: galleryTeam },
                { key: 'meeting', image: galleryMeeting },
            ] as GalleryItem[],
            isVisible: false,
            rootRef: null as HTMLElement | null,
            observer: null as IntersectionObserver | null,
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
    },
    methods: {
        setRootRef(el: Element | null) {
            this.rootRef = (el as HTMLElement) ?? null;
        },
        initObserver() {
            if (typeof window === 'undefined') {
                this.isVisible = true;
                return;
            }

            this.observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        this.isVisible = true;
                        if (this.observer && this.rootRef) {
                            this.observer.unobserve(this.rootRef);
                        }
                    }
                });
            }, { threshold: 0.35 });

            if (this.rootRef) {
                this.observer.observe(this.rootRef);
            }
        },
    },
    mounted() {
        this.$nextTick(() => {
            if (!this.rootRef) {
                this.rootRef = this.$el as HTMLElement;
            }
            this.initObserver();
        });
    },
    beforeUnmount() {
        if (this.observer) {
            this.observer.disconnect();
            this.observer = null;
        }
    },
});
</script>

<template>
    <section
        id="career"
        class="careers-section"
        :dir="sectionDirection"
        :class="{ 'is-visible': isVisible, 'is-rtl': isArabic }"
        :ref="setRootRef"
    >
        <div class="careers-shell">
            <div class="careers-gallery">
                <div
                    v-for="(item, index) in gallery"
                    :key="item.key"
                    class="gallery-tile"
                    :class="`gallery-tile--${index + 1}`"
                >
                    <img
                        :src="item.image"
                        :alt="$t(`careersSection.galleryAlt.${item.key}`)"
                        loading="lazy"
                    />
                </div>
            </div>

            <div class="careers-content">
                <span class="careers-label">
                    <span class="careers-label__icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24" focusable="false">
                            <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
                        </svg>
                    </span>
                    {{ $t('careersSection.label') }}
                </span>

                <h2 class="careers-title">
                    {{ $t('careersSection.title') }}
                </h2>

                <p class="careers-body">
                    {{ $t('careersSection.body') }}
                </p>

                <a
                    class="careers-cta"
                    href="/careers"
                    rel="noopener"
                    :aria-label="$t('careersSection.ctaAria')"
                >
                    {{ $t('careersSection.cta') }}
                </a>
            </div>
        </div>
    </section>
</template>

<style scoped>
.careers-section {
    position: relative;
    width: 100%;
    padding: clamp(3.5rem, 8vw, 6rem) clamp(1.5rem, 6vw, 4rem);
    background: #f8fbff;
    color: #10202f;
    overflow: hidden;
}

.careers-section::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at top right, rgba(128, 253, 102, 0.12), transparent 60%), radial-gradient(circle at bottom left, rgba(64, 168, 248, 0.12), transparent 55%);
    pointer-events: none;
    opacity: 0;
    transition: opacity 1s ease;
}

.careers-section.is-visible::after {
    opacity: 1;
}

.careers-shell {
    margin: 0 auto;
    width: 100%;
    max-width: 1180px;
    display: grid;
    grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
    gap: clamp(2.5rem, 5vw, 4rem);
    align-items: center;
}

.careers-section.is-rtl .careers-shell {
    direction: rtl;
}

.careers-gallery {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    grid-template-rows: repeat(2, minmax(0, 1fr));
    gap: 1rem;
    position: relative;
}

.careers-gallery::before,
.careers-gallery::after {
    content: '';
    position: absolute;
    width: 72px;
    height: 72px;
    background: linear-gradient(135deg, rgba(21, 66, 90, 0.18), rgba(64, 208, 171, 0.4));
    clip-path: polygon(0 0, 100% 0, 0 100%);
    opacity: 0.8;
}

.careers-gallery::before {
    top: -28px;
    left: -28px;
}

.careers-gallery::after {
    bottom: -32px;
    right: -32px;
    transform: scaleX(-1);
}

.careers-section.is-rtl .careers-gallery::before {
    left: auto;
    right: -28px;
    transform: scaleX(-1);
}

.careers-section.is-rtl .careers-gallery::after {
    right: auto;
    left: -32px;
    transform: scaleX(1);
}

.gallery-tile {
    position: relative;
    border-radius: 18px;
    overflow: hidden;
    background: linear-gradient(140deg, #214b5f, #0f2f45);
    transform: translateY(40px);
    opacity: 0;
    transition: transform 0.8s cubic-bezier(0.19, 0.6, 0.32, 1), opacity 0.6s ease;
}

.gallery-tile img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.gallery-tile--1 {
    grid-column: 1 / span 1;
    grid-row: 1 / span 1;
}

.gallery-tile--2 {
    grid-column: 2 / span 1;
    grid-row: 1 / span 1;
}

.gallery-tile--3 {
    grid-column: 3 / span 1;
    grid-row: 1 / span 2;
}

.gallery-tile--4 {
    grid-column: 1 / span 2;
    grid-row: 2 / span 1;
}

.gallery-tile--5 {
    grid-column: 3 / span 1;
    grid-row: 2 / span 1;
    align-self: end;
}

.careers-section.is-visible .gallery-tile {
    opacity: 1;
    transform: translateY(0);
}

.careers-section.is-visible .gallery-tile--1 {
    transition-delay: 0.05s;
}

.careers-section.is-visible .gallery-tile--2 {
    transition-delay: 0.15s;
}

.careers-section.is-visible .gallery-tile--3 {
    transition-delay: 0.25s;
}

.careers-section.is-visible .gallery-tile--4 {
    transition-delay: 0.3s;
}

.careers-section.is-visible .gallery-tile--5 {
    transition-delay: 0.4s;
}

.careers-content {
    display: flex;
    flex-direction: column;
    gap: clamp(1.15rem, 2vw, 1.75rem);
    transform: translateY(40px);
    opacity: 0;
    transition: transform 0.9s cubic-bezier(0.19, 0.6, 0.32, 1), opacity 0.65s ease;
}

.careers-section.is-visible .careers-content {
    opacity: 1;
    transform: translateY(0);
    transition-delay: 0.2s;
}

.careers-label {
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.4rem 1.1rem;
    border-radius: 999px;
    background: rgba(126, 98, 255, 0.18);
    color: #5e4ff9;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    width: fit-content;
}

.careers-label__icon {
    width: 1.75rem;
    height: 1.75rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
    background: linear-gradient(180deg, #7d5eff 0%, #9a72ff 100%);
    box-shadow: 0 10px 24px rgba(122, 97, 255, 0.28);
}

.careers-label__icon svg {
    width: 1rem;
    height: 1rem;
    fill: #ffffff;
}

.careers-title {
    margin: 0;
    font-size: clamp(2.2rem, 2.8vw, 3rem);
    font-weight: 700;
    color: #0c1828;
    line-height: 1.25;
}

.careers-section.is-rtl .careers-title,
.careers-section.is-rtl .careers-body {
    text-align: right;
}

.careers-body {
    margin: 0;
    font-size: 1rem;
    line-height: 1.9;
    color: #2e4051;
}

.careers-cta {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.85rem 2.5rem;
    border-radius: 10px;
    background: linear-gradient(135deg, #7eff5d, #42d882);
    color: #042114;
    font-weight: 600;
    font-size: 1rem;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    text-decoration: none;
    width: fit-content;
}

.careers-cta:hover,
.careers-cta:focus-visible {
    transform: translateY(-2px);
    box-shadow: 0 16px 32px rgba(60, 220, 140, 0.3);
}

.careers-cta:focus-visible {
    outline: 2px solid #1f8c5c;
    outline-offset: 4px;
}

@media (max-width: 1024px) {
    .careers-shell {
        grid-template-columns: 1fr;
    }

    .careers-content {
        order: -1;
    }

    .careers-gallery {
        max-width: 720px;
        justify-self: center;
    }
}

@media (max-width: 640px) {
    .careers-section {
        padding: clamp(3rem, 10vw, 4rem) clamp(1.25rem, 6vw, 2rem);
    }

    .careers-gallery {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        grid-template-rows: repeat(3, minmax(0, 1fr));
    }

    .gallery-tile--3 {
        grid-column: 1 / span 2;
        grid-row: 3 / span 1;
    }

    .gallery-tile--4 {
        grid-column: 1 / span 2;
        grid-row: 2 / span 1;
    }

    .gallery-tile--5 {
        display: none;
    }
}
</style>
