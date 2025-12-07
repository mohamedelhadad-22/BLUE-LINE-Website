<template>
  <header
    :class="[
      'header',
      route.path === '/' ? 'header--absolute' : 'header--relative',
      { 'header--open': isOpen },
    ]"
  >
    <div class="header__row">
      <RouterLink class="logo" to="/">
        <img src="@/assets/BlueLine-Logo.svg" alt="logo" />
      </RouterLink>

      <!-- Desktop Navigation -->
      <nav class="desktop-nav">
        <RouterLink class="nav-link active" to="/"
          >Home
          <!-- <svg
            xmlns="http://www.w3.org/2000/svg"
            width="29"
            height="8"
            viewBox="0 0 29 8"
            fill="none"
          >
            <path
              d="M14.75 3.25L28.25 0.75L14.75 7.25L0.75 0.75L14.75 3.25Z"
              fill="white"
            />
          </svg> -->
        </RouterLink>
        <RouterLink class="nav-link" to="/about">About Us</RouterLink>
        <RouterLink class="nav-link" to="/contact">Contact Us</RouterLink>
        <RouterLink class="nav-link" to="/faq-glossary">FAQ</RouterLink>
      </nav>

      <div class="actions">
        <!-- <button class="lang" @click="toggleLang">
          {{ currentLang === 'en' ? 'EN' : 'AR' }}
        </button> -->
        <RouterLink class="contact-btn" to="/contact"> Contact Us </RouterLink>
        <button
          class="burger"
          :aria-expanded="isOpen"
          aria-controls="mega-menu"
          @click.stop="isOpen = !isOpen"
          data-mega-toggle
        >
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
    <MegaMenu
      id="mega-menu"
      v-model="isOpen"
      :groups="groups"
      :lang="currentLang"
      @navigate="onNavigate"
    />
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MegaMenu from "./BurgerMenue.vue";
import { useRoute } from "vue-router";

type LinkItem = {
  label: string;
  href?: string;
  to?: string;
  external?: boolean;
  chevron?: boolean;
};
type SocialItem = { href?: string; iconText?: string };
type Group = {
  title: string;
  items: LinkItem[];
  extras?: LinkItem[];
  social?: SocialItem[];
};

export default defineComponent({
  name: "NavBar",
  components: { MegaMenu },
  setup() {
    const route = useRoute();
    return { route };
  },
  data() {
    return {
      isOpen: false as boolean,
      groups: [
        {
          title: "About Blue Line",
          items: [
            { label: "About us", to: "/about" },
            { label: "Stakeholders Relations", to: "/stakeholders-relations" },
            { label: "Career", to: "/careers" },
            { label: "Contact us", to: "/contact" },
          ],
        },
        {
          title: "Business Areas",
          items: [
            { label: "Feeder services", to: "/feeders-services" },
            {
              label: "Regional Liner Services",
              to: "/regional-liner-services",
            },
            { label: "Routes & Agents Contacts", to: "/routes-agents" },
            { label: "Fleet", to: "/fleet" },
            { label: "FAQ & Glossary", to: "/faq-glossary" },
          ],
        },
        {
          title: "Media center",
          items: [
            { label: "News & Insights", to: "/news-insights" },
            { label: "Downloads", to: "/downloads" },
          ],
          extras: [{ label: "E-commerce", href: "#shop", chevron: true }],
          social: [
            { href: "https://linkedin.com", iconText: "in" },
            { href: "https://x.com", iconText: "x" },
            { href: "https://instagram.com", iconText: "◎" },
            { href: "https://facebook.com", iconText: "f" },
          ],
        },
      ] as Group[],
    };
  },
  computed: {
    currentLang(): "en" | "ar" {
      const loc = (this as any).$i18n?.locale ?? "en";
      return loc === "ar" ? "ar" : "en";
    },
  },
  methods: {
    toggleLang() {
      const i18n = (this as any).$i18n;
      if (!i18n) return;
      i18n.locale = i18n.locale === "en" ? "ar" : "en";
      document.documentElement.dir = i18n.locale === "ar" ? "rtl" : "ltr";
    },
    onNavigate() {
      // example: analytics, etc.
    },
  },
});
</script>

<style scoped>
.header {
  --header-height: 72px;
  z-index: 120;
  width: 100%;
  background: transparent;
  transition:
    background 0.2s ease,
    box-shadow 0.2s ease;
}

.header--absolute {
  position: absolute;
  inset-inline: 0;
  top: 0;
}

.header--relative {
  position: relative;
}

.header__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 72px;
  /* max-width: 1476px; */
  margin: 0 auto;
  padding: 40px 100px 0
}

.logo {
  width: 266px;
  height: 60px;
  display: flex;
  align-items: center;
}

.logo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  flex-shrink: 0;
  aspect-ratio: 1/1;
}

/* Desktop Navigation */
.desktop-nav {
  display: none;
  gap: 42px;
  align-items: center;
  /* margin-inline-start: auto; */
}

.nav-link {
  color: #fff;
  text-align: center;
  font-family: Lato;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  transition: opacity 0.2s ease;
  white-space: nowrap;
}

.nav-link:hover {
  opacity: 0.8;
}
.nav-link.active {
  color: #2aa1d8;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  gap: 2px;
  align-items: center;
}
.nav-link.router-link-active {
  /* font-weight: 500; */
}

.header--relative .nav-link {
  color: #0d3a34;
}

.actions {
  display: flex;
  gap: 16px;
  align-items: center;
  margin-inline-start: auto;
}

.lang {
  background: none;
  border: 0;
  color: #fff;
  padding: 8px 12px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: opacity 0.2s ease;
}

.lang:hover {
  opacity: 0.8;
}

.header--relative .lang {
  color: #0d3a34;
}

.contact-btn {
  display: none;
  padding: 10px 24px;
  background: #00aeff;
  border: 2px solid #00aeff;
  color: #fff;
  text-decoration: none;
  border-radius: 0px;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.contact-btn:hover {
  /* background: transparent; */
  /* color: #0d3a34; */
}

.header--relative .contact-btn {
  border-color: #0d3a34;
  color: #0d3a34;
}

.header--relative .contact-btn:hover {
  background: #0d3a34;
  color: #fff;
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
  transition: 0.2s;
}
.header--relative .burger span {
  background: #000;
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

/* Responsive Styles */
/* Desktop: Show horizontal nav, hide burger */
@media (min-width: 1024px) {
  .desktop-nav {
    display: flex;
  }

  .contact-btn {
    display: inline-block;
  }

  .burger {
    display: none;
  }

  .actions {
    margin-inline-start: 32px;
  }
}

/* Tablet and Mobile: Hide horizontal nav, show burger */
@media (max-width: 1023px) {
  .desktop-nav {
    display: none;
  }

  .contact-btn {
    display: none;
  }

  .burger {
    display: block;
  }
}

@media (max-width: 568px) {
  .header__row{
    padding: 0 16px;
  }
  .logo{
    width: 50px;
    height: 50px;
  }
}
</style>
