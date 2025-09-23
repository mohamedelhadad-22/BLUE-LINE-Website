<script lang="ts">
import { defineComponent } from 'vue';

type MissionKey = 'mission' | 'vision' | 'purpose';

type ComposerLocale = {
    value: string;
};

type ComposerInstance = {
    locale: ComposerLocale;
};

export default defineComponent({
    name: 'OurMission',
    data() {
        return {
            cards: ['mission', 'vision', 'purpose'] as MissionKey[],
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
        sectionLanguage(): 'ar' | 'en' {
            return this.isArabic ? 'ar' : 'en';
        },
    },
});
</script>

<template>
    <section
        id="mission"
        class="mission-section"
        :dir="sectionDirection"
    >
        <div class="mission-shell">
            <!-- <header class="mission-header">
                <span class="mission-kicker">
                    {{ $t('missionSection.kicker') }}
                </span>
                <h2 class="mission-title">
                    {{ $t('missionSection.title') }}
                </h2>
                <p class="mission-subtitle">
                    {{ $t('missionSection.subtitle') }}
                </p>
            </header> -->

            <div class="mission-grid" :class="{ 'is-rtl': isArabic }">
                <article
                    v-for="card in cards"
                    :key="card"
                    class="mission-card"
                >
                    <div class="mission-icon">
                        <svg
                            v-if="card === 'mission'"
                            viewBox="0 0 48 48"
                            role="presentation"
                            aria-hidden="true"
                        >
                            <path d="M8 8h14L8 22V8zm0 18h14L8 40V26zm18-18h14L26 22V8zm0 18h14L26 40V26z" />
                        </svg>
                        <svg
                            v-else-if="card === 'vision'"
                            viewBox="0 0 48 48"
                            role="presentation"
                            aria-hidden="true"
                        >
                            <path d="M24 8l10 10-10 10-10-10 10-10zm0 12l10 10-10 10-10-10 10-10z" />
                        </svg>
                        <svg
                            v-else
                            viewBox="0 0 48 48"
                            role="presentation"
                            aria-hidden="true"
                        >
                            <path d="M12 12h8v8h-8zm16 0h8v8h-8zm-16 16h8v8h-8zm16 0h8v8h-8z" />
                        </svg>
                    </div>

                    <h3 class="mission-card__title">
                        {{ $t(`missionSection.items.${card}.title`) }}
                    </h3>
                    <p class="mission-card__body">
                        {{ $t(`missionSection.items.${card}.body`) }}
                    </p>
                </article>
            </div>
        </div>
    </section>
</template>

<style scoped>
.mission-section {
    position: relative;
    width: 100%;
    /* padding: clamp(3rem, 6vw, 6rem) clamp(1.5rem, 6vw, 5rem); */
    background: #ffffff;
    color: #172235;
    overflow: hidden;
}

.mission-shell {
    margin: 0 auto;
    max-width: 1180px;
}


.mission-kicker {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.35rem 1rem;
    border: 1px solid rgba(125, 84, 255, 0.2);
    border-radius: 999px;
    font-size: 0.85rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #7d54ff;
    background: rgba(125, 84, 255, 0.08);
}

.mission-title {
    margin: 1rem 0 0.75rem;
    font-size: clamp(1.9rem, 3vw, 2.75rem);
    font-weight: 700;
    color: #111c30;
}

.mission-subtitle {
    margin: 0;
    max-width: 720px;
    margin-inline: auto;
    font-size: 1rem;
    color: #53617a;
    line-height: 1.7;
}

.mission-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: clamp(1.5rem, 4vw, 2.5rem);
    border-top: 1px solid #ecf0f8;
}

.mission-grid.is-rtl {
    direction: rtl;
}

.mission-card {
    position: relative;
    padding: clamp(1.75rem, 3vw, 2.5rem) clamp(1.5rem, 3vw, 2.25rem);
    background: transparent;
    border-radius: 0;
    border-inline-start: 1px solid #ecf0f8;
    min-height: 240px;
}

.mission-grid .mission-card:first-child {
    border-inline-start: none;
}

.mission-icon {
    width: 56px;
    height: 56px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.5rem;
    background: linear-gradient(160deg, rgba(128, 82, 255, 0.9), rgba(82, 224, 255, 0.65));
    box-shadow: 0 14px 30px rgba(128, 82, 255, 0.45);
}

.mission-icon svg {
    width: 28px;
    height: 28px;
    fill: #ffffff;
}

.mission-card__title {
    margin: 0 0 0.75rem;
    font-size: 1.25rem;
    font-weight: 600;
    color: #101b2d;
}

.mission-card__body {
    margin: 0;
    font-size: 0.98rem;
    line-height: 1.7;
    color: #4f5e77;
}

@media (max-width: 1024px) {
    .mission-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
}

@media (max-width: 720px) {

    .mission-subtitle {
        margin-inline: 0;
    }

    .mission-grid {
        grid-template-columns: 1fr;
    }

    .mission-card {
        min-height: auto;
    }
}

.mission-grid.is-rtl .mission-card__title,
.mission-grid.is-rtl .mission-card__body {
    text-align: right;
}

.mission-grid:not(.is-rtl) .mission-card__title,
.mission-grid:not(.is-rtl) .mission-card__body {
    text-align: left;
}
</style>
