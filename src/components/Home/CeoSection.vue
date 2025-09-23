<script lang="ts">
import { defineComponent } from 'vue';
import ceoImage from '@/assets/ceo-portrait.svg';

type BodyKey = 'first' | 'second' | 'third';

type ComposerLocale = {
    value: string;
};

type ComposerInstance = {
    locale: ComposerLocale;
};

export default defineComponent({
    name: 'CeoSection',
    data() {
        return {
            bodyKeys: ['first', 'second', 'third'] as BodyKey[],
            ceoImageSrc: ceoImage,
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
});
</script>

<template>
    <section id="ceo" class="ceo-section" :dir="sectionDirection">
        <div class="ceo-wrapper">
            <div class="ceo-card" :class="{ 'is-rtl': isArabic }">
                <div class="ceo-content">
                    <div class="ceo-label">
                        <span class="ceo-label__icon" aria-hidden="true">
                            <svg viewBox="0 0 24 24" role="presentation" focusable="false">
                                <path
                                    d="M4 4h16v16H4z"
                                />
                                <path
                                    d="M10.5 8.5h6v1.5h-6zm0 3h6v1.5h-6zm0 3h4v1.5h-4zM7 8.5h2v6H7z"
                                />
                            </svg>
                        </span>
                        <span class="ceo-label__text">
                            {{ $t('ceoSection.label') }}
                        </span>
                    </div>

                    <h2 class="ceo-headline">
                        {{ $t('ceoSection.headline') }}
                    </h2>

                    <div class="ceo-body">
                        <p
                            v-for="key in bodyKeys"
                            :key="key"
                            class="ceo-paragraph"
                        >
                            {{ $t(`ceoSection.body.${key}`) }}
                        </p>
                    </div>
                </div>

                <figure class="ceo-portrait">
                    <img
                        :src="ceoImageSrc"
                        class="ceo-portrait__image"
                        :alt="$t('ceoSection.photoAlt')"
                        loading="lazy"
                    />
                    <figcaption class="ceo-portrait__caption">
                        <span class="ceo-portrait__name">
                            {{ $t('ceoSection.name') }}
                        </span>
                        <span class="ceo-portrait__role">
                            {{ $t('ceoSection.role') }}
                        </span>
                    </figcaption>
                </figure>
            </div>
        </div>
    </section>
</template>

<style scoped>
.ceo-section {
    position: relative;
    padding: clamp(3rem, 8vw, 6rem) clamp(1.5rem, 6vw, 4rem);
    background: linear-gradient(135deg, #082c2d 0%, #0d4034 45%, #052523 100%);
    color: #ffffff;
}

.ceo-wrapper {
    margin: 0 auto;
    width: 100%;
    max-width: 1180px;
}

.ceo-card {
    display: flex;
    flex-direction: row;
    background: rgba(9, 40, 35, 0.92);
    border-radius: 18px;
    overflow: hidden;
    box-shadow: 0 24px 60px rgba(0, 0, 0, 0.28);
}

.ceo-card.is-rtl {
    flex-direction: row-reverse;
}

.ceo-content {
    flex: 1 1 50%;
    padding: clamp(2.5rem, 4vw, 3.5rem);
    display: flex;
    flex-direction: column;
    gap: clamp(1.5rem, 3vw, 2rem);
    background: linear-gradient(160deg, rgba(8, 59, 49, 0.95) 0%, rgba(13, 72, 55, 0.85) 100%);
}

.ceo-label {
    display: inline-flex;
    align-items: center;
    gap: 0.65rem;
    padding: 0.35rem 0.9rem;
    border-radius: 999px;
    background: rgba(128, 253, 102, 0.12);
    color: #80fd66;
    font-size: 0.875rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    width: fit-content;
}

.ceo-label__icon {
    display: flex;
    width: 1.75rem;
    height: 1.75rem;
    border-radius: 12px;
    background: linear-gradient(160deg, #8efd6f 0%, #40d68a 100%);
    align-items: center;
    justify-content: center;
    box-shadow: 0 8px 18px rgba(64, 214, 138, 0.35);
}

.ceo-label__icon svg {
    width: 1rem;
    height: 1rem;
    fill: #062821;
}

.ceo-label__text {
    font-weight: 600;
    white-space: nowrap;
}

.ceo-headline {
    margin: 0;
    font-size: clamp(1.8rem, 2.6vw, 2.6rem);
    line-height: 1.4;
    font-weight: 700;
    color: #ffffff;
}

.ceo-body {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
}

.ceo-paragraph {
    margin: 0;
    color: rgba(255, 255, 255, 0.88);
    line-height: 1.8;
    font-size: 1rem;
}

.ceo-portrait {
    position: relative;
    flex: 1 1 50%;
    display: flex;
    flex-direction: column;
    background: #f3f6fb;
    min-height: 100%;
}

.ceo-portrait__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    flex: 1 1 auto;
}

.ceo-portrait__caption {
    display: flex;
    flex-direction: column;
    padding: 1.75rem;
    background: #0b3d32;
    color: #ffffff;
    gap: 0.25rem;
}

.ceo-portrait__name {
    font-weight: 600;
    font-size: 1.1rem;
}

.ceo-portrait__role {
    font-size: 0.95rem;
    color: rgba(255, 255, 255, 0.75);
}

@media (max-width: 960px) {
    .ceo-card,
    .ceo-card.is-rtl {
        flex-direction: column;
    }

    .ceo-content {
        padding: clamp(2rem, 5vw, 2.75rem);
    }

    .ceo-portrait {
        min-height: 320px;
    }
}

@media (max-width: 640px) {
    .ceo-section {
        padding: clamp(2.5rem, 10vw, 3.5rem) clamp(1.25rem, 6vw, 2rem);
    }

    .ceo-label {
        font-size: 0.8rem;
    }

    .ceo-headline {
        font-size: clamp(1.5rem, 5vw, 2rem);
    }

    .ceo-paragraph {
        font-size: 0.95rem;
    }
}
</style>
