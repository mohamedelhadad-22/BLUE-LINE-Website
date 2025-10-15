<script lang="ts">
import { defineComponent } from "vue";

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
});
</script>

<template>
  <footer class="footer" :dir="direction">
    <div class="footer-shell">
      <div class="footer-top">
        <div class="footer-brand">
          <div class="logo_svg">
            <img src="@/assets/BL_Logo Png-03 1.svg" alt="" />
          </div>
          <div class="text">
            <div class="footer-logo">
              <span class="footer-logo__mark">Blueline</span>
            </div>
            <p class="footer-tagline">
              Seamless experiences from booking to delivery.
            </p>
            <p class="footer-description">
              Blue Line Services company was established in 2023 with a mission
              to connect regional ports seamlessly and catalyze trade across the
              Middle East, India, and East Africa.
            </p>
          </div>
        </div>

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
      </div>

      <div class="footer-bottom">
        <div class="footer-legal">
          <span>© Blue Line. All Rights Reserved 2025</span>
          <RouterLink to="/privacy-policy">Privacy Policy</RouterLink>
          <RouterLink to="/terms-conditions">Terms & Conditions</RouterLink>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: #1d3a8f;
  color: #fff;
  padding: 100px 20px 30px 20px;
  display: flex;
  justify-content: center;
}

.footer-shell {
  width: 100%;
  max-width: 1400px;
  display: flex;
  flex-direction: column;
  gap: 48px;
}

.footer-top {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 60px;
  align-items: start;
}

.footer-brand {
  display: flex;
  gap: 33px;
}
.footer-brand .logo_svg img {
  width: 118px;
  height: 118px;
  aspect-ratio: 1/1;
}
.text {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 400px;
}
.footer-logo {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.footer-logo__mark {
  font-size: 24px;
  font-weight: 700;
  color: #fff;
  letter-spacing: 0.5px;
}

.footer-tagline {
  font-size: 16px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
  line-height: 1.5;
}

.footer-description {
  font-size: 14px;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
  margin: 0;
}

.footer-columns {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 48px;
}

.footer-column__title {
  margin: 0 0 20px;
  font-size: 16px;
  font-weight: 600;
  color: #fff;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.footer-links a {
  color: rgba(255, 255, 255, 0.85);
  font-size: 14px;
  text-decoration: none;
  transition: color 0.2s ease;
  line-height: 1.5;
}

.footer-links a:hover,
.footer-links a:focus-visible {
  color: #fff;
  text-decoration: underline;
}

.footer-bottom {
  display: flex;
  justify-content: center;
  padding-top: 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-legal {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  justify-content: center;
}

.footer-legal a {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  transition: color 0.2s ease;
}

.footer-legal a:hover,
.footer-legal a:focus-visible {
  color: #fff;
  text-decoration: underline;
}

/* Responsive Styles */
@media (max-width: 1024px) {
  .footer-top {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .footer-brand {
    max-width: 100%;
  }

  .footer-columns {
    grid-template-columns: repeat(2, 1fr);
    gap: 32px;
  }
}

@media (max-width: 768px) {
  .footer {
    padding: 40px 20px 20px;
  }

  .footer-shell {
    gap: 32px;
  }

  .footer-columns {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .footer-bottom {
    padding-top: 20px;
  }

  .footer-legal {
    flex-direction: column;
    gap: 12px;
    font-size: 13px;
  }
}
</style>
