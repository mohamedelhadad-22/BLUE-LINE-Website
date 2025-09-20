<script lang="ts">
import { defineComponent } from 'vue';
import BackgroundVideo from '@/components/Home/BackgroundVideo.vue';
import asideMenu from '@/components/Home/asideMenu.vue';

export default defineComponent({
    name: 'HomeView',
    components: {
        BackgroundVideo,
        asideMenu,
    },
    data() {
        return {
            activeSection: 'home',
            sectionIds: [
                'home',
                'about',
                'ceo',
                'services',
                'routes',
                'sustainability',
                'news',
                'career',
            ],
        };
    },
    methods: {
        scrollToSection(id: string) {
            const el = document.getElementById(id);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
                this.activeSection = id;
            }
        },
        handleScroll() {
            const scrollY = window.scrollY;

            let current = 'home'; // Default section

            this.sectionIds.forEach((id) => {
                const el = document.getElementById(id);
                if (el) {
                    const top = el.offsetTop;
                    if (scrollY >= top - 200) {
                        current = id;
                    }
                }
            });

            this.activeSection = current;
        },
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll);
        this.handleScroll(); // Initialize
    },
    beforeUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    },
});
</script>

<template>
    <div>
        <!-- Hero Section -->
        <div class="hero_section" id="home">
            <BackgroundVideo>
                <h1 class="hero-title">
                    Connecting you to
                    <span>your customers</span>
                </h1>
            </BackgroundVideo>

        </div>

        <!-- Aside Menu -->
        <asideMenu :activeSection="activeSection" @navigate="scrollToSection" />

        <!-- Sections -->
        <div class="about_section" id="home">
            {{ $t('Home') }}
        </div>
        <div class="about_section" id="about">
            {{ $t('About') }}
        </div>
        <div class="ceo_section" id="ceo">
            {{ $t('ceo') }}
        </div>
        <div class="services_section" id="services">
            {{ $t('services') }}
        </div>
        <div class="routes_section" id="routes">
            {{ $t('routes') }}
        </div>
        <div class="sustainability_section" id="sustainability">
            {{ $t('sustainability') }}
        </div>
        <div class="news_section" id="news">
            {{ $t('news') }}
        </div>
        <div class="career_section" id="career">
            {{ $t('career') }}
        </div>
    </div>
</template>

<style scoped>
.about_section,
.ceo_section,
.services_section,
.routes_section,
.sustainability_section,
.news_section,
.career_section {
    height: 100vh;
    padding: 2rem;
}

.hero-title {
    font-size: 3rem;
    font-weight: bold;
    color: white;
}

.hero-title span {
    color: #80fd66;
}
</style>
