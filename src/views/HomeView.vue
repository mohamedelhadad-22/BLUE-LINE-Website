<script lang="ts">
import { defineComponent, shallowRef } from "vue";
import Rellax from "rellax";
import BackgroundVideo from "@/components/Home/BackgroundVideo.vue";
import OurMission from "@/components/Home/OurMission.vue";
import CeoSection from "@/components/Home/CeoSection.vue";
import ServicesSection from "@/components/Home/ServicesSection.vue";
import NewsSection from "@/components/Home/NewsSection.vue";
import CareersSection from "@/components/Home/CareersSection.vue";
import AboutSection from "@/components/Home/About.vue";
import asideMenu from "@/components/Home/asideMenu.vue";
import OurLocations from "@/components/Home/OurLocations.vue";
import { useLinkedScroll } from "@/composables/useLinkedScroll";
import EsgVerticalSlider from "@/components/Home/EsgVerticalSlider.vue";
import NumbersBox from "@/components/common/NumbersBox.vue";

import sliderOne from "@/assets/sustainability-03.large.webp";
import sliderTow from "@/assets/WhatsApp-Image-1446-10-29-at-15-32-47.large.jpg";
import sliderThree from "@/assets/WhatsApp-Image-1446-10-29-at-14-52-43.large.jpg";

type ParallaxInstance = { destroy: () => void } | null;
import commonButton from "@/components/resuble/common_button.vue";


export default defineComponent({
  name: "HomeView",
  components: {
    BackgroundVideo,
    OurMission,
    CeoSection,
    ServicesSection,
    NewsSection,
    CareersSection,
    AboutSection,
    asideMenu,
    OurLocations,
    EsgVerticalSlider,
    commonButton,
    NumbersBox
  },
  data() {
    return {
      activeSection: "home",
      sectionIds: [
        "home",
        "mission",
        "about",
        // "ceo",
        "services",
        "sustainability",
        "locations",
        "news",
        "career",
      ],
      parallaxInstance: null as ParallaxInstance,
      _unlinkNested: null as null | (() => void),
      slides: [
        {
          heading: "Blue Line Contributes to Global Sustainability Goals",
          copy: "We are committed to maritime decarbonization and intend to implement sustainable solutions that mitigate the environmental impact of our activity.",
          image: shallowRef(sliderOne),
          alt: "Green valley and river",
        },
        {
          heading:
            "Leading Regional Liner and Feeder Operator Providing Flexible and Sustainable Solutions and Creating Value for Our Stakeholders",
          copy: "Complying with IMO regulations, we uphold high sustainability standards, incorporating innovation into product development and fostering a workforce-centric approach.",
          image: shallowRef(sliderTow),
          alt: "Port crane and container vessel",
        },
        {
          heading:
            "Driving Change through Educational Programs for an Empowered Community",
          copy: "We nurture local talent and promote careers in the maritime industry, aligning with our commitment to CSR initiatives.",
          image: shallowRef(sliderThree),
          alt: "Handshake indoors",
        },
      ],
    };
  },
  methods: {
    scrollToSection(id: string) {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        this.activeSection = id;
      }
    },
    handleScroll() {
      const scrollY = window.scrollY;
      let current = "home";
      this.sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (scrollY >= top - 200) current = id;
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
        if (typeof window === "undefined") return;
        const targets = document.querySelectorAll(".js-parallax");
        if (!targets.length) return;
        const RellaxConstructor = Rellax as unknown as new (
          selector: string,
          options?: Record<string, unknown>
        ) => { destroy: () => void };
        this.parallaxInstance = new RellaxConstructor(".js-parallax", {
          center: true,
          round: true,
        });
      });
    },
    linkServicesScroll() {
      const comp: any = this.$refs.servicesSectionRef;
      const sectionEl: HTMLElement | null = comp?.$el ?? null;
      const inner: HTMLElement | null =
        sectionEl?.querySelector(".accordionSlider__content") ?? null;
      if (!sectionEl || !inner) return;

      inner.setAttribute("tabindex", "0");

      if (this._unlinkNested) {
        this._unlinkNested();
        this._unlinkNested = null;
      }
      this._unlinkNested = useLinkedScroll({
        inner,
        sectionEl,
        wheelScale: 1.05,
      });
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll, { passive: true });
    this.handleScroll();
    this.initParallax();

    this.$nextTick(() => {
      this.linkServicesScroll();
    });
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
    if (this.parallaxInstance) {
      this.parallaxInstance.destroy();
      this.parallaxInstance = null;
    }
    if (this._unlinkNested) {
      this._unlinkNested();
      this._unlinkNested = null;
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
            <span class="hero-line"> Connecting you to </span>
            <span class="hero-line hero-line--accent"> your customers </span>
          </h1>
          <p class="hero-subtitle">
            Seamless experiences from booking to delivery.
          </p>
          <commonButton :text="$t('Discover More')" buttonType="XL" :click="scrollToSection('mission')"
            :isBlueColor="true" :isRadius="true" />
          <!-- <div class="hero-ornaments">
            <span
              class="hero-ornament hero-ornament--primary js-parallax"
              data-rellax-speed="3"
            ></span>
            <span
              class="hero-ornament hero-ornament--secondary js-parallax"
              data-rellax-speed="5"
            ></span>
          </div> -->
        </div>
      </BackgroundVideo>
    </div>

    <!-- <asideMenu :activeSection="activeSection" @navigate="scrollToSection" /> -->

    <OurMission id="mission" />
    <AboutSection id="about" />
    <!-- <CeoSection id="ceo" /> -->

    <!-- Services section -->
    <ServicesSection ref="servicesSectionRef" />

    <EsgVerticalSlider :slides="slides" id="sustainability" />
    <!-- <div class="sustainability_section" id="sustainability">
      {{ $t("sustainability") }}
    </div> -->
    <OurLocations id="locations" />

    <NewsSection id="news" />
    <CareersSection id="career" />
  </div>
</template>

<style scoped>
.sustainability_section {
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
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%
}

.hero-title {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  font-size: clamp(2.5rem, 4vw + 1rem, 4.5rem);
  font-weight: 700;
  margin: 0;
  align-items: center;
}

.hero-line {
  line-height: 1.1;
  color: #fff;
  font-family: Lato;
  font-size: 96px;
  font-style: normal;
  font-weight: 500;
  line-height: 99.936%;
}

.hero-line--accent {
  /* color: #2aa1d8; */
  /* font-weight: 700; */
}

.hero-subtitle {
  margin-top: 1.5rem;
  color: #FFF;
  text-align: center;
  font-size: 32px;
  font-weight: 400;
  line-height: 99.936%;
  margin-bottom: 61px;
}

.hero-ornaments {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.hero-ornament {
  position: absolute;
  border-radius: 9999px;
  background: radial-gradient(circle at 30% 30%,
      rgba(128, 253, 102, 0.8),
      rgba(128, 253, 102, 0));
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
  background: radial-gradient(circle at 30% 30%,
      rgba(64, 168, 248, 0.7),
      rgba(64, 168, 248, 0));
}

@media (max-width: 768px) {
  .hero-content {
    text-align: start;
  }

  .hero-line {
    font-size: 60px;
  }

  .hero-line--accent {
    font-size: 44px;
  }

  .hero-subtitle {
    font-size: 14px;
  }

  .aboutUs__items {}
}

@media (max-width: 568px) {
  .hero-content {
    padding: 2rem 0rem;
  }

  .mission-card {
    align-items: center;
  }

  .hero-line {
    font-size: 40px;
  }

  .hero-line--accent {
    font-size: 34px;
  }

  .hero-subtitle {
    font-size: 18px;
  }
}
</style>
<style>
.hero-content .common_button_default {
  max-width: 322px;
  width: 100%;
}
</style>
