<script lang="ts">
import { defineComponent } from 'vue';

type HighlightEntry = {
    key: string;
    title: string;
    body: string;
};

type CtaEntry = {
    label?: string;
    description?: string;
    link?: string;
};

type PageMessage = {
    headline?: string;
    body?: string;
    highlights?: Record<string, { title?: string; body?: string }>;
    cta?: CtaEntry;
};

export default defineComponent({
    name: 'FooterPageLayout',
    props: {
        pageKey: {
            type: String,
            required: true,
        },
    },
    emits: ['open-feedback'],
    computed: {
        composerLocale(): string {
            return this.$i18n.locale;
        },
        isArabic(): boolean {
            return this.composerLocale.startsWith('ar');
        },
        direction(): 'rtl' | 'ltr' {
            return this.isArabic ? 'rtl' : 'ltr';
        },
        localeMessages(): Record<string, any> {
            const messages = (this.$i18n as unknown as { messages?: Record<string, any> }).messages;
            return messages?.[this.composerLocale] ?? {};
        },
        pageData(): PageMessage {
            const page = this.localeMessages?.pages?.[this.pageKey] ?? {};
            return page as PageMessage;
        },
        highlightEntries(): HighlightEntry[] {
            const highlights = this.pageData.highlights ?? {};
            return Object.keys(highlights).map((key) => {
                const entry = highlights[key] ?? {};
                return {
                    key,
                    title: entry.title ?? '',
                    body: entry.body ?? '',
                };
            });
        },
        cta(): CtaEntry | null {
            if (!this.pageData.cta) {
                return null;
            }
            return this.pageData.cta;
        },
        hasCta(): boolean {
            const entry = this.cta;
            return !!(entry && entry.label);
        },
        ctaLink(): string | undefined {
            return this.ctaHref(this.cta);
        },
    },
    methods: {
        ctaHref(entry: CtaEntry | null): string | undefined {
            if (!entry) {
                return undefined;
            }
            const link = entry.link?.trim();
            if (!link || link === '#') {
                return undefined;
            }
            if (link === '#footer-feedback') {
                return link;
            }
            return link;
        },
        isRouterLink(link?: string): boolean {
            if (!link) {
                return false;
            }
            return link.startsWith('/');
        },
        isExternalLink(link?: string): boolean {
            if (!link) {
                return false;
            }
            return link.startsWith('http') || link.startsWith('mailto:');
        },
        handleButtonClick(link?: string) {
            if (!link || link === '#footer-feedback') {
                this.$emit('open-feedback');
                if (link === '#footer-feedback') {
                    const target = document.querySelector('footer');
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth' });
                    }
                }
                return;
            }
            if (this.isExternalLink(link)) {
                window.open(link, link.startsWith('mailto:') ? '_self' : '_blank');
                return;
            }
            if (this.isRouterLink(link)) {
                this.$router.push(link);
            }
        },
    },
});
</script>

<template>
    <section class="footer-page" :dir="direction">
        <div class="footer-page__shell">
            <header class="footer-page__hero">
                <span class="footer-page__tag">
                    {{ $t('footer.pifLabel') }}
                </span>
                <h1 class="footer-page__title">
                    {{ pageData.headline }}
                </h1>
                <p class="footer-page__subtitle">
                    {{ pageData.body }}
                </p>
                <div v-if="hasCta" class="footer-page__cta">
                    <a
                        v-if="isExternalLink(ctaLink)"
                        class="footer-page__ctaButton"
                        :href="ctaLink"
                        :target="ctaLink?.startsWith('http') ? '_blank' : undefined"
                        :rel="ctaLink?.startsWith('http') ? 'noopener' : undefined"
                    >
                        {{ cta?.label }}
                    </a>
                    <RouterLink
                        v-else-if="isRouterLink(ctaLink)"
                        class="footer-page__ctaButton"
                        :to="ctaLink"
                    >
                        {{ cta?.label }}
                    </RouterLink>
                    <button
                        v-else
                        type="button"
                        class="footer-page__ctaButton"
                        @click="handleButtonClick(ctaLink)"
                    >
                        {{ cta?.label }}
                    </button>
                    <p v-if="cta?.description" class="footer-page__ctaDescription">
                        {{ cta?.description }}
                    </p>
                </div>
            </header>

            <div class="footer-page__content" v-if="highlightEntries.length">
                <article
                    v-for="highlight in highlightEntries"
                    :key="highlight.key"
                    class="footer-page__card"
                >
                    <h3 class="footer-page__cardTitle">
                        {{ highlight.title }}
                    </h3>
                    <p class="footer-page__cardBody">
                        {{ highlight.body }}
                    </p>
                </article>
            </div>
        </div>
    </section>
</template>

<style scoped>
.footer-page {
    padding: clamp(4rem, 8vw, 6rem) clamp(1.5rem, 6vw, 3.5rem);
    background: linear-gradient(140deg, rgba(6, 44, 45, 0.04), rgba(64, 168, 248, 0.08));
    display: flex;
    justify-content: center;
    color: #0b1f2f;
}

.footer-page__shell {
    width: 100%;
    max-width: 1100px;
    display: flex;
    flex-direction: column;
    gap: clamp(2rem, 4vw, 3rem);
}

.footer-page__hero {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.footer-page__tag {
    align-self: flex-start;
    padding: 0.35rem 1rem;
    border-radius: 999px;
    background: rgba(64, 168, 248, 0.12);
    color: #1b6aa2;
    font-size: 0.78rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    font-weight: 600;
}

.footer-page__title {
    margin: 0;
    font-size: clamp(2.2rem, 3.5vw, 3rem);
    font-weight: 700;
    color: #041827;
}

.footer-page__subtitle {
    margin: 0;
    font-size: 1.05rem;
    line-height: 1.9;
    color: #33475b;
    max-width: 760px;
}

.footer-page__cta {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-top: 1rem;
}

.footer-page__ctaButton {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.85rem 2.5rem;
    border-radius: 12px;
    background: linear-gradient(135deg, #7eff5d, #42d882);
    color: #05291c;
    font-weight: 600;
    font-size: 1rem;
    border: none;
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    text-decoration: none;
    align-self: flex-start;
}

.footer-page__ctaButton:hover,
.footer-page__ctaButton:focus-visible {
    transform: translateY(-2px);
    box-shadow: 0 18px 36px rgba(66, 216, 130, 0.28);
}

.footer-page__ctaButton:focus-visible {
    outline: 2px solid rgba(66, 216, 130, 0.6);
    outline-offset: 3px;
}

.footer-page__ctaDescription {
    margin: 0;
    font-size: 0.95rem;
    color: #2e4152;
}

.footer-page__content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: clamp(1.25rem, 3vw, 2rem);
}

.footer-page__card {
    padding: clamp(1.5rem, 3vw, 2rem);
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.75);
    box-shadow: 0 12px 34px rgba(9, 33, 46, 0.08);
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.footer-page__cardTitle {
    margin: 0;
    font-size: 1.1rem;
    font-weight: 600;
    color: #0b2b3c;
}

.footer-page__cardBody {
    margin: 0;
    font-size: 0.98rem;
    line-height: 1.8;
    color: #3a4d5f;
}

@media (max-width: 640px) {
    .footer-page {
        padding: clamp(3rem, 10vw, 4rem) clamp(1.25rem, 6vw, 2rem);
    }

    .footer-page__ctaButton {
        width: 100%;
    }
}
</style>
