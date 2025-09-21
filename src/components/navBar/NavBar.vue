<template>
    <header :class="['header', { 'header--open': isOpen }]">
        <div class="container header__row">
            <a class="logo" href="#"><img src="@/assets/logo.png" alt="logo" /></a>

            <div class="actions">
                <button class="lang" @click="toggleLang">{{ $t?.('langSwitch') ?? 'AR/EN' }}</button>
                <button class="burger" :aria-expanded="isOpen" aria-controls="mega-menu" @click.stop="isOpen = !isOpen"
                    data-mega-toggle>
                    <span></span><span></span><span></span>
                </button>

            </div>
        </div>
        <MegaMenu id="mega-menu" v-model="isOpen" :groups="groups" :lang="currentLang" @navigate="onNavigate" />
    </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MegaMenu from './BurgerMenue.vue';

type LinkItem = { label: string; href?: string; external?: boolean; chevron?: boolean; };
type SocialItem = { href?: string; iconText?: string };
type Group = { title: string; items: LinkItem[]; extras?: LinkItem[]; social?: SocialItem[] };

export default defineComponent({
    name: 'NavBar',
    components: { MegaMenu },
    data() {
        return {
            isOpen: false as boolean,
            groups: [
                {
                    title: 'About Folk',
                    items: [
                        { label: 'About us', href: '#about' },
                        { label: 'Stakeholders Relations', href: '#stakeholders' },
                        { label: 'Career', href: '#career' },
                        { label: 'Contact us', href: '#contact' },
                    ],
                },
                {
                    title: 'Business Areas',
                    items: [
                        { label: 'Feeder services', href: '#feeder' },
                        { label: 'Regional Liner Services', href: '#liner' },
                        { label: 'Routes & Agents Contacts', href: '#routes' },
                        { label: 'Fleet', href: '#fleet' },
                        { label: 'FAQ & Glossary', href: '#faq' },
                    ],
                },
                {
                    title: 'Media center',
                    items: [
                        { label: 'News & Insights', href: '#news' },
                        { label: 'Downloads', href: '#downloads' },
                    ],
                    extras: [{ label: 'E-commerce', href: '#shop', chevron: true }],
                    social: [
                        { href: 'https://linkedin.com', iconText: 'in' },
                        { href: 'https://x.com', iconText: 'x' },
                        { href: 'https://instagram.com', iconText: '◎' },
                        { href: 'https://facebook.com', iconText: 'f' },
                    ],
                },
            ] as Group[]
        };
    },
    computed: {
        currentLang(): 'en' | 'ar' {
            const loc = (this as any).$i18n?.locale ?? 'en';
            return (loc === 'ar' ? 'ar' : 'en');
        }
    },
    methods: {
        toggleLang() {
            const i18n = (this as any).$i18n;
            if (!i18n) return;
            i18n.locale = i18n.locale === 'en' ? 'ar' : 'en';
            document.documentElement.dir = i18n.locale === 'ar' ? 'rtl' : 'ltr';
        },
        onNavigate() {
            // example: analytics, etc.
        }
    }
});
</script>

<style scoped>
.header {
    --header-height: 72px;
    position: absolute;
    inset-inline: 0;
    top: 0;
    z-index: 120;
    width: 100%;
    background: transparent;
    transition: background 0.2s ease, box-shadow 0.2s ease;
}


.header__row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 72px;
    max-width: 1476px;
    margin: 0 auto;
    padding: 0 16px;
}

.logo {
    height: 64px;
    width: 140px;
    display: flex;
    align-items: center;
}

.logo img {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.actions {
    display: flex;
    gap: 12px;
    align-items: center;
}

.lang {
    background: none;
    border: 0;
    color: #fff;
    padding: 8px 10px;
    cursor: pointer;
}

.burger {
    width: 40px;
    height: 40px;
    position: relative;
    border: 0;
    background: transparent;
    cursor: pointer;
}

.burger span {
    position: absolute;
    left: 6px;
    right: 6px;
    height: 2px;
    background: #fff;
    transition: .2s;
}

.burger span:nth-child(1) {
    top: 12px;
}

.burger span:nth-child(2) {
    top: 19px;
}

.burger span:nth-child(3) {
    top: 26px;
}

.burger[aria-expanded="true"] span:nth-child(1) {
    transform: translateY(7px) rotate(45deg);
}

.burger[aria-expanded="true"] span:nth-child(2) {
    opacity: 0;
}

.burger[aria-expanded="true"] span:nth-child(3) {
    transform: translateY(-7px) rotate(-45deg);
}

.header--open {
    position: fixed;
    inset-inline: 0;
    top: 0;
    background: #fff;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
    border-bottom: 1px solid #d9e7e2;
}

.header--open .header__row {
    color: #0d3a34;
}

.header--open .lang {
    color: #0d3a34;
}

.header--open .burger span {
    background: #0d3a34;
}
@media (prefers-color-scheme: light) {

    .lang,
    .burger span {
        color: #0d3a34;
        /* background: #0d3a34; */
    }
}
</style>





