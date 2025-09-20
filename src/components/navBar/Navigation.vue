<template>
    <nav :class="['sidebar', { open: sidebarOpen }]">
        <h2>FOLK Maritime</h2>
        <ul class="nav-list">
            <li v-for="(item, index) in navItems" :key="index" class="nav-item">
                <a :href="'#' + item.id" :class="['nav-link', { active: activeSection === item.id }]"
                    @click="scrollToSection(item.id, $event)">
                    {{ item.title }}
                </a>
            </li>
        </ul>
    </nav>
    <button class="menu-toggle" @click="toggleSidebar">☰</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Navigation',
    data() {
        return {
            sidebarOpen: false,
            activeSection: 'home',
            heroVisible: false,
            sectionVisibility: {
                about: false,
                ceo: false,
                services: false,
                routes: false,
                sustainability: false,
                news: false,
                career: false,
                contact: false
            },
            navItems: [
                { id: 'home', title: 'HOME' },
                { id: 'about', title: 'ABOUT' },
                { id: 'ceo', title: 'CEO' },
                { id: 'services', title: 'SERVICES' },
                { id: 'routes', title: 'ROUTES' },
                { id: 'sustainability', title: 'SUSTAINABILITY' },
                { id: 'news', title: 'NEWS' },
                { id: 'career', title: 'CAREER' },
                { id: 'contact', title: 'CONTACT' }
            ]
        };
    },
    methods: {
        toggleSidebar() {
            this.sidebarOpen = !this.sidebarOpen;
        },
        scrollToSection(sectionId, event) {
            if (event) {
                event.preventDefault();
            }
            this.sidebarOpen = false;
            const element = document.getElementById(sectionId);
            if (element) {
                window.scrollTo({
                    top: element.offsetTop,
                    behavior: 'smooth'
                });
            }
        },
        handleScroll() {
            const scrollPosition = window.scrollY;
            if (scrollPosition < window.innerHeight * 0.5) {
                this.activeSection = 'home';
            } else {
                for (const item of this.navItems) {
                    if (item.id === 'home') continue;
                    const section = document.getElementById(item.id);
                    if (section) {
                        const sectionTop = section.offsetTop;
                        const sectionHeight = section.offsetHeight;
                        if (scrollPosition >= sectionTop - window.innerHeight * 0.3 &&
                            scrollPosition < sectionTop + sectionHeight - window.innerHeight * 0.3) {
                            this.activeSection = item.id;
                            if (!this.sectionVisibility[item.id]) {
                                this.sectionVisibility[item.id] = true;
                            }
                        }
                    }
                }
            }
            this.heroVisible = scrollPosition < window.innerHeight * 0.8;
        },
        handleClickOutside(event) {
            const sidebar = document.querySelector('.sidebar');
            const toggleButton = document.querySelector('.menu-toggle');
            if (this.sidebarOpen &&
                !sidebar.contains(event.target) &&
                !toggleButton.contains(event.target)) {
                this.sidebarOpen = false;
            }
        }
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll);
        document.addEventListener('click', this.handleClickOutside);
        setTimeout(() => {
            this.heroVisible = true;
        }, 300);
    },
    unmounted() {
        window.removeEventListener('scroll', this.handleScroll);
        document.removeEventListener('click', this.handleClickOutside);
    }
});
</script>

<style scoped>
/* [Keep your existing styles here, adjusted as needed] */
.sidebar {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 250px;
    background: rgba(255, 255, 255, 0.95);
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
    padding: 2rem 1rem;
    z-index: 1000;
    transform: translateX(-100%);
    transition: transform 0.4s ease;
}

.sidebar.open {
    transform: translateX(0);
}

/* Add other styles as per your original component */
</style>