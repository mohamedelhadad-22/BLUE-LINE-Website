<script lang="ts">
import { defineComponent } from 'vue';
import Rellax from 'rellax';
import BackgroundVideo from '@/components/Home/BackgroundVideo.vue';
import OurMission from '@/components/Home/OurMission.vue';
import CeoSection from '@/components/Home/CeoSection.vue';
import ServicesSection from '@/components/Home/ServicesSection.vue';
import CareersSection from '@/components/Home/CareersSection.vue';
import AboutSection from '@/components/Home/About.vue';
import asideMenu from '@/components/Home/asideMenu.vue';

type ParallaxInstance = { destroy: () => void } | null;

export default defineComponent({
    name: 'HomeView',
    components: {
        BackgroundVideo,
        OurMission,
        CeoSection,
        ServicesSection,
        CareersSection,
        AboutSection,
        asideMenu,
    },
    data() {
        return {
            activeSection: 'home',
            sectionIds: [
                'home',
                'mission',
                'about',
                'ceo',
                'services',
                'routes',
                'sustainability',
                'news',
                'career',
            ],
            parallaxInstance: null as ParallaxInstance,
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

            let current = 'home';

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
        initParallax() {
            if (this.parallaxInstance) {
                this.parallaxInstance.destroy();
                this.parallaxInstance = null;
            }

            this.$nextTick(() => {
                if (typeof window === 'undefined') {
                    return;
                }

                const parallaxTargets = document.querySelectorAll('.js-parallax');
                if (!parallaxTargets.length) {
                    return;
                }

                const RellaxConstructor = Rellax as unknown as new (
                    selector: string,
                    options?: Record<string, unknown>
                ) => { destroy: () => void };

                this.parallaxInstance = new RellaxConstructor('.js-parallax', {
                    center: true,
                    round: true,
                });
            });
        },
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll);
        this.handleScroll();
        this.initParallax();
    },
    beforeUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
        if (this.parallaxInstance) {
            this.parallaxInstance.destroy();
            this.parallaxInstance = null;
        }
    },
});
</script>

<template>
    <div class="homeView">
        <div class="hero_section" id="home">
            <BackgroundVideo>
                <div class="hero-content">
                    <h1 class="hero-title">
                        <span class="hero-line js-parallax" data-rellax-speed="-2">
                            Connecting you to
                        </span>
                        <span class="hero-line hero-line--accent js-parallax" data-rellax-speed="-4">
                            your customers
                        </span>
                    </h1>
                    <p class="hero-subtitle js-parallax" data-rellax-speed="-1">
                        Seamless experiences from booking to delivery.
                    </p>
                    <div class="hero-ornaments">
                        <span class="hero-ornament hero-ornament--primary js-parallax" data-rellax-speed="3"></span>
                        <span class="hero-ornament hero-ornament--secondary js-parallax" data-rellax-speed="5"></span>
                    </div>
                </div>
            </BackgroundVideo>
        </div>

        <asideMenu :activeSection="activeSection" @navigate="scrollToSection" />

        <OurMission />

        <AboutSection />
        <CeoSection />
        <ServicesSection />
        <div class="routes_section" id="routes">
            {{ $t('routes') }}
        </div>
        <div class="sustainability_section" id="sustainability">
            {{ $t('sustainability') }}
        </div>
        <div class="news_section" id="news">
            {{ $t('news') }}
        </div>
        <CareersSection />
    </div>
</template>

<style scoped>
.routes_section,
.sustainability_section,
.news_section {
    height: 100vh;
}

.homeView {
    position: relative;
    width: 100%;
    overflow: hidden;
    max-width: 100%;
}

.hero_section {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.hero-content {
    position: relative;
    z-index: 2;
    text-align: center;
    color: #fff;
    padding: 3rem 1.5rem;
}

.hero-title {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    font-size: clamp(2.5rem, 4vw + 1rem, 4.5rem);
    font-weight: 700;
    margin: 0;
}

.hero-line {
    display: inline-block;
    line-height: 1.1;
}

.hero-line--accent {
    color: #80fd66;
}

.hero-subtitle {
    margin-top: 1.5rem;
    font-size: clamp(1rem, 1vw + 0.8rem, 1.5rem);
    color: rgba(255, 255, 255, 0.85);
}

.hero-ornaments {
    position: absolute;
    inset: 0;
    pointer-events: none;
}

.hero-ornament {
    position: absolute;
    border-radius: 9999px;
    background: radial-gradient(circle at 30% 30%, rgba(128, 253, 102, 0.8), rgba(128, 253, 102, 0));
    filter: blur(0.5px);
    transform: translate(-50%, -50%);
}

.hero-ornament--primary {
    width: 18rem;
    height: 18rem;
    top: 25%;
    left: 20%;
}

.hero-ornament--secondary {
    width: 12rem;
    height: 12rem;
    bottom: 10%;
    right: 15%;
    background: radial-gradient(circle at 30% 30%, rgba(64, 168, 248, 0.7), rgba(64, 168, 248, 0));
}
</style>
