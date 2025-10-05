<script lang="ts">
import { defineComponent } from "vue";
import FeedbackModal from "@/components/common/FeedbackModal.vue";

type FooterLink = {
  labelKey: string;
  to: string;
};

type FooterSection = {
  titleKey: string;
  links: FooterLink[];
};

export default defineComponent({
  name: "AppFooter",
  components: {
    FeedbackModal,
  },
  data() {
    return {
      sections: [
        {
          titleKey: "footer.sections.about.title",
          links: [
            { labelKey: "footer.sections.about.links.about", to: "/about" },
            {
              labelKey: "footer.sections.about.links.stakeholders",
              to: "/stakeholders-relations",
            },
            { labelKey: "footer.sections.about.links.careers", to: "/careers" },
            { labelKey: "footer.sections.about.links.contact", to: "/contact" },
          ],
        },
        {
          titleKey: "footer.sections.business.title",
          links: [
            {
              labelKey: "footer.sections.business.links.feeders",
              to: "/feeders-services",
            },
            {
              labelKey: "footer.sections.business.links.liner",
              to: "/regional-liner-services",
            },
            {
              labelKey: "footer.sections.business.links.routes",
              to: "/routes-agents",
            },
            {
              labelKey: "footer.sections.business.links.faq",
              to: "/faq-glossary",
            },
            { labelKey: "footer.sections.business.links.fleet", to: "/fleet" },
          ],
        },
        {
          titleKey: "footer.sections.media.title",
          links: [
            {
              labelKey: "footer.sections.media.links.news",
              to: "/news-insights",
            },
            {
              labelKey: "footer.sections.media.links.downloads",
              to: "/downloads",
            },
          ],
        },
      ] as FooterSection[],
      socialLinks: [
        { id: "linkedin", href: "https://www.linkedin.com", label: "LinkedIn" },
        { id: "x", href: "https://www.twitter.com", label: "X" },
        {
          id: "instagram",
          href: "https://www.instagram.com",
          label: "Instagram",
        },
        { id: "facebook", href: "https://www.facebook.com", label: "Facebook" },
      ],
      isFeedbackOpen: false,
    };
  },
  computed: {
    isArabic(): boolean {
      return this.$i18n.locale.startsWith("ar");
    },
    direction(): "rtl" | "ltr" {
      return this.isArabic ? "rtl" : "ltr";
    },
  },
  methods: {
    scrollToTop() {
      if (typeof window === "undefined") {
        return;
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    openFeedback() {
      this.isFeedbackOpen = true;
    },
  },
});
</script>

<template>
  <footer class="footer" :dir="direction">
    <div class="footer-shell">
      <div class="footer-top">
        <div class="footer-brand">
          <div class="footer-logo" aria-hidden="true">
            <span class="footer-logo__mark">Blue</span>
            <span class="footer-logo__text">Line</span>
          </div>
        </div>
        <div class="footer-feedback">
          <button
            class="footer-feedback__cta"
            type="button"
            @click="openFeedback"
          >
            {{ $t("footer.feedback.text") }}
          </button>
        </div>
      </div>

      <hr class="footer-divider" />

      <div class="footer-body">
        <div class="footer-columns">
          <section
            v-for="section in sections"
            :key="section.titleKey"
            class="footer-column"
          >
            <h3 class="footer-column__title">
              {{ $t(section.titleKey) }}
            </h3>
            <ul class="footer-links">
              <li v-for="link in section.links" :key="link.to">
                <RouterLink :to="link.to">
                  {{ $t(link.labelKey) }}
                </RouterLink>
              </li>
            </ul>
          </section>
        </div>

        <div class="footer-badge">
          <div class="footer-badge__seal" aria-hidden="true">
            <span>⛵</span>
          </div>
          <span class="footer-badge__text">{{ $t("footer.pifLabel") }}</span>
        </div>
      </div>

      <hr class="footer-divider" />

      <div class="footer-bottom">
        <div class="footer-legal">
          <span>{{ $t("footer.legal.copyright") }}</span>
          <RouterLink to="/privacy-policy">
            {{ $t("footer.legal.privacy") }}
          </RouterLink>
          <RouterLink to="/terms-conditions">
            {{ $t("footer.legal.terms") }}
          </RouterLink>
        </div>

        <button class="footer-top__button" type="button" @click="scrollToTop">
          <span class="footer-top__icon" aria-hidden="true">⌃</span>
          <span class="sr-only">{{ $t("footer.backToTop") }}</span>
        </button>

        <div class="footer-social">
          <span class="footer-social__label">{{ $t("footer.follow") }}</span>
          <ul class="footer-social__list">
            <li v-for="item in socialLinks" :key="item.id">
              <a
                :href="item.href"
                target="_blank"
                rel="noopener"
                :aria-label="item.label"
              >
                <span
                  :class="['icon', `icon--${item.id}`]"
                  aria-hidden="true"
                ></span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
  <FeedbackModal v-model="isFeedbackOpen" />
</template>

<style scoped>
.footer {
  background: var(--color-primary);
  color: rgba(255, 255, 255, 0.82);
  padding: clamp(2.5rem, 5vw, 4rem) clamp(1.5rem, 6vw, 4rem);
  display: flex;
  justify-content: center;
}

.footer-shell {
  width: 100%;
  max-width: 1240px;
  display: flex;
  flex-direction: column;
  gap: clamp(2rem, 4vw, 3rem);
}

.footer-top {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1.5rem;
  justify-content: space-between;
}

.footer-brand {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.footer-logo {
  display: inline-flex;
  flex-direction: column;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: var(--color-primary);
}

.footer-logo__mark {
  font-size: 1.8rem;
  line-height: 1;
  color: #fff;
}

.footer-logo__text {
  font-size: 0.75rem;
  color: #fff;
}

.footer-feedback__cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.85rem 1.75rem;
  border-radius: 9px;
  background: var(--color-accent);
  color: #fff;
  font-weight: 600;
  font-size: 0.95rem;
  text-align: center;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  min-width: 240px;
  border: none;
  cursor: pointer;
}

.footer-feedback__cta:hover,
.footer-feedback__cta:focus-visible {
  transform: translateY(-2px);
  box-shadow: 0 16px 32px var(--color-accent);
}

.footer-feedback__cta:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 3px;
}

.footer-divider {
  border: none;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin: 0;
}

.footer-body {
  display: flex;
  flex-wrap: wrap;
  gap: clamp(2rem, 4vw, 3rem);
  justify-content: space-between;
}

.footer-columns {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: clamp(2rem, 3vw, 3rem);
  flex: 1 1 60%;
}

.footer-column__title {
  margin: 0 0 1rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 0.82rem;
  color: rgba(255, 255, 255, 0.6);
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.footer-links a {
  color: rgba(255, 255, 255, 0.82);
  font-size: 0.98rem;
  text-decoration: none;
  transition: color 0.2s ease;
}

.footer-links a:hover,
.footer-links a:focus-visible {
  color: var(--color-accent);
}

.footer-badge {
  display: flex;
  align-items: center;
  gap: 1rem;
  min-width: 200px;
  align-self: flex-start;
}

.footer-badge__seal {
  width: 68px;
  height: 68px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: var(--color-accent);
  background: var(--color-accent);
}

.footer-badge__text {
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.82);
}

.footer-bottom {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1.5rem;
  justify-content: space-between;
}

.footer-legal {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);
}

.footer-legal a {
  color: rgba(255, 255, 255, 0.75);
  text-decoration: none;
}

.footer-legal a:hover,
.footer-legal a:focus-visible {
  color: var(--color-accent);
}

.footer-top__button {
  border: none;
  background: transparent;
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  transition:
    color 0.2s ease,
    transform 0.2s ease;
}

.footer-top__button:hover,
.footer-top__button:focus-visible {
  color: var(--color-accent);
  transform: translateY(-2px);
}

.footer-social {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.footer-social__label {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);
}

.footer-social__list {
  display: flex;
  gap: 0.75rem;
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-social__list a {
  display: inline-flex;
  width: 36px;
  height: 36px;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.06);
  color: rgba(255, 255, 255, 0.82);
  transition:
    background 0.2s ease,
    transform 0.2s ease;
}

.footer-social__list a:hover,
.footer-social__list a:focus-visible {
  background: rgba(127, 253, 99, 0.2);
  transform: translateY(-1px);
}

.icon {
  font-size: 0.9rem;
}

.icon--linkedin::before {
  content: "in";
  font-weight: 700;
}

.icon--x::before {
  content: "𝕏";
}

.icon--instagram::before {
  content: "◎";
}

.icon--facebook::before {
  content: "f";
  font-weight: 700;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

@media (max-width: 960px) {
  .footer-columns {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .footer-badge {
    order: -1;
  }
}

@media (max-width: 640px) {
  .footer-shell {
    gap: 2rem;
  }

  .footer-top {
    flex-direction: column;
    align-items: flex-start;
  }

  .footer-columns {
    grid-template-columns: 1fr;
  }

  .footer-bottom {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .footer-social {
    width: 100%;
    justify-content: flex-start;
  }
}
</style>
