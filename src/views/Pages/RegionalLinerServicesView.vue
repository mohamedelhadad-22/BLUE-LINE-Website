<script lang="ts">
import { defineComponent } from "vue";
import HeroBanner from "@/components/resuble/HeroBanner.vue";
import heroBg from "@/assets/RegionalLiner-bunner.webp";
import anchorIcon from "@/assets/svg/anchorIcon.vue";
import mapPointerIcon from "@/assets/svg/mapPointerIcon.vue";
import ComputerLine from "@/assets/computer-line.vue";
import shipIcon from "@/assets/svg/shipIcon.vue";
import PixelCheckerIcon from "@/assets/svg/PixelCheckerIcon.vue";
import hover1 from "@/assets/hover-1.jpg";
import hover2 from "@/assets/hover-2.jpg";
import hover3 from "@/assets/hover-3.jpg";
import hoverIcon from "@/assets/hover-box-icon.svg";
import accordionComponent from "@/components/resuble/accordionComponent.vue";

interface hoverBoxs {
  title: string;
  id: number;
  icon: string;
  img: string;
  desc: string;
}

export default defineComponent({
  name: "RegionalLinerServicesView",
  components: { HeroBanner, PixelCheckerIcon, accordionComponent },
  data() {
    return {
      heroBg,
      AdvantagesList: [
        {
          id: 1,
          icon: anchorIcon,
          title: this.$t("Advantages.CostEffective"),
        },
        {
          id: 2,
          icon: mapPointerIcon,
          title: this.$t("Advantages.Consistent"),
        },
        {
          id: 3,
          icon: ComputerLine,
          title: this.$t("Advantages.Competitive"),
        },
        {
          id: 4,
          icon: shipIcon,
          title: this.$t("Advantages.LinerShipping"),
        },
      ],
      hoverBoxs: [
        {
          id: 1,
          icon: hoverIcon,
          img: hover1,
          title: this.$t("FeedersServices.heroOne"),
          desc: this.$t("FeedersServices.heroOneDesc"),
        },
        {
          id: 2,
          icon: hoverIcon,
          img: hover2,
          title: this.$t("FeedersServices.heroTow"),
          desc: this.$t("FeedersServices.heroTowDesc"),
        },
        {
          id: 3,
          icon: hoverIcon,
          img: hover3,
          title: this.$t("FeedersServices.heroThree"),
          desc: this.$t("FeedersServices.heroThreeDesc"),
        },
      ] as hoverBoxs[],
      activeIndex: null as number | null,
      steps: [
        {
          title: "Interview with a recruiter",
          description:
            "Discuss your work experience and aspirations with our expert recruiter.",
        },
        {
          title: "Interview with the team",
          description:
            "Meet your future teammates and talk through real scenarios and expectations.",
        },
        {
          title: "Portfolio showcase and assessment",
          description:
            "Share relevant work and complete a short, practical task (if applicable).",
        },
        {
          title: "Job offer and streamlined onboarding process",
          description:
            "We align on details and prepare you for a smooth, confident start.",
        },
      ],
    };
  },
  methods: {
    toggleActive(id: any) {
      // Toggle the active state; clicking the same item collapses it
      this.activeIndex = this.activeIndex === id ? null : id;
    },
  },
});
</script>

<template>
  <div class="RegionalLiner">
    <div class="container">
      <HeroBanner
        :titleKey="$t('RegionalLiner.heroTitle')"
        :title="$t('RegionalLiner.heroDesc')"
        :subtitleKey="$t('RegionalLiner.heroDesc')"
        height="50vh"
        :media-src="heroBg"
        :withImg="true"
      />

      <div class="regionalServices">
        <!-- Breadcrumb -->
        <nav class="breadcrumbs" aria-label="breadcrumb">
          <a href="/">{{ $t("Home") }}</a>
          <span class="sep" aria-hidden="true">/</span>
          <span class="current">{{ $t("RegionalLiner.RegionalLiner") }}</span>
        </nav>

        <div class="services_content">
          <div class="text">
            <h5><PixelCheckerIcon />{{ $t("RegionalLiner.RegionalLiner") }}</h5>
            <h2>{{ $t("RegionalLiner.services_title") }}</h2>
            <p>
              {{ $t("RegionalLiner.services_desc") }}
            </p>
          </div>

          <div class="row">
            <div class="row_text">
              <h4>{{ $t("RegionalLiner.Strategically_situated") }}</h4>
              <p>{{ $t("RegionalLiner.Strategically_desc") }}</p>
            </div>
            <div class="row_img">
              <img src="@/assets/service_img_row.webp" alt="" />
            </div>
          </div>
        </div>
      </div>

      <div class="Advantages">
        <div class="container">
          <div class="fixedTextFeatures__inner">
            <div class="fixedTextFeatures__content">
              <h5><PixelCheckerIcon />{{ $t("Advantages.Advantages") }}</h5>
              <h2>{{ $t("Advantages.Advantages_title") }}</h2>
              <p>{{ $t("Advantages.Advantages_desc") }}</p>
            </div>
            <div class="fixedTextFeatures__features">
              <div
                v-for="item in AdvantagesList"
                :key="item.id"
                class="fixedTextFeatures__feature"
              >
                <div class="icon">
                  <component :is="item.icon" />
                </div>

                <h4>{{ item.title }}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="container">
        <div class="oursolutions">
          <h1><PixelCheckerIcon />{{ $t("FeedersServices.Oursolutions") }}</h1>
          <p class="titDesc">
            {{ $t("FeedersServices.OursolutionsDesc") }}
          </p>
          <div class="imageHover">
            <div
              class="imgBox"
              v-for="box in hoverBoxs"
              :key="box.id"
              :class="{ active: activeIndex === box.id }"
              @click="toggleActive(box.id)"
            >
              <img :src="box.img" :alt="box.title" />
              <div class="text">
                <img :src="box.icon" alt="" />
                <h3>{{ box.title }}</h3>
                <p>{{ box.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="container">
        <div class="wideAccordion__inner">
          <div class="text">
            <h2><PixelCheckerIcon /> {{ $t("ourOffer.ourOffer_title") }}</h2>
            <h1>{{ $t("ourOffer.ourOffer_Desc") }}</h1>
          </div>

          <accordionComponent :steps="steps" />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.RegionalLiner {
  display: flex;
  flex-direction: column;
}
.regionalServices {
  display: flex;
  flex-direction: column;
  gap: 8rem;
  background-color: #eff6f5;
  position: relative;
}
.regionalServices:after {
  position: absolute;
  top: 0;
  z-index: 1;
  background-image: url(/src/assets/aboutPatern.svg);
  background-position: 100% -1%;
  background-repeat: repeat;
  background-size: 100% 51%;
  padding-top: 12.5rem;
  width: 12.5rem;
  height: 0;
  content: "";
  pointer-events: none;
  right: 0;
  transform: scaleX(-1);
  padding-top: 24%;
  width: 24%;
}
.arabic .regionalServices:after {
  transform: scaleX(1);
  left: 0;
  right: auto;
}
.services_content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-inline: 5.42%;
  padding-bottom: 8rem;
}
.services_content .text {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 70%;
}
.services_content .text h5 {
  color: #000;
  font-weight: 600;
  font-size: 1.125rem;
  display: flex;
  align-items: center;
  gap: 6px;
}
.services_content .text h2 {
  font-size: 2.8rem;
  line-height: 1.4;
  font-weight: 500;
}
.services_content .text p {
  font-size: clamp(1.4rem, 3.0967741935vw, 2rem);
  line-height: 1.2;
  font-weight: 300;
}
.services_content .row {
  display: flex;
  gap: 10%;
  margin-top: clamp(40px, 5.1612903226vw, 80px);
}
.services_content .row .row_img {
  width: 100%;
  max-width: 50%;
}
.row .row_img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.services_content .row .row_text {
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 100%;
  max-width: 40%;
  justify-content: flex-start;
}
.services_content .row .row_text h4 {
  font-size: 1.8rem;
  line-height: 1.4;
  font-weight: 400;
}
.services_content .row .row_text p {
  line-height: 1.4;
  font-size: 1.2rem;
  font-weight: 400;
}
.fixedTextFeatures__inner {
  display: flex;
  gap: 4rem;
  width: 100%;
  justify-content: space-between;
  padding: 8rem 0;
  padding-inline: 5.42%;
}
.fixedTextFeatures__content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 50%;
}
.fixedTextFeatures__content h5 {
  display: inline-flex;
  align-items: center;
  text-transform: uppercase;
  line-height: 1.25;
  font-size: 1.6rem;
  font-weight: 500;
  gap: 6px;
}
.fixedTextFeatures__content h2 {
  font-size: max(3.2rem, min(3.0967741935vw, 4.8rem));
  font-size: clamp(3.2rem, 3.0967741935vw, 4.8rem);
  line-height: 1.2;
  font-weight: 300;
}
.fixedTextFeatures__content p {
  line-height: 1.4;
  font-size: 1.2rem;
  font-weight: 400;
}
.fixedTextFeatures__features {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 40%;
  width: 100%;
}
.fixedTextFeatures__features .fixedTextFeatures__feature {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 40px;
  display: flex;
  align-items: center;
  border: 1px solid #d2d2d2;
  border-radius: 8px;
}
.fixedTextFeatures__features .fixedTextFeatures__feature h4 {
  font-size: clamp(0.8rem, 1.5483870968vw, 1.4rem);
  line-height: 1.4;
  color: #000;
  max-width: 80%;
}
.fixedTextFeatures__feature .icon {
  display: flex;
  align-items: center;
  align-self: flex-start;
  justify-content: center;
  background-color: #00383214;
  width: 4rem;
  height: 4rem;
  padding: 14px;
  border-radius: 2px;
}
.fixedTextFeatures__feature .icon svg {
  width: 100%;
  height: 100%;
}

.oursolutions {
  margin-top: 8rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.oursolutions h1 {
  display: inline-flex;
  align-items: center;
  text-transform: uppercase;
  line-height: 1.25;
  font-size: 1.4rem;
  font-weight: 500;
  gap: 6px;
}

.oursolutions p {
  font-size: clamp(3.2rem, 3.0967741935vw, 4.8rem);
  line-height: 1.2;
  font-weight: 300;
}

.imageHover {
  margin-top: 3rem;
  display: flex;
  width: 100%;
  justify-content: space-between;
  min-height: clamp(360px, 51.6129032258vw, 800px);
  gap: 0;
}

.imgBox {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  border: 1px solid#FFF;
  border-block: none;
  border-inline: 1px solid transparent;
  /* Use flex-basis for smoother width transitions in flex containers */
  flex: 1 1 25%;
  max-width: 50%;
  transition:
    flex-basis 450ms ease,
    max-width 450ms ease,
    transform 300ms ease,
    box-shadow 300ms ease;
  cursor: pointer;
  overflow: hidden;
}

.imgBox:hover {
  transform: translateY(-2px);
}

.imgBox:focus-within {
  outline: 2px solid var(--primary, #1a73e8);
  outline-offset: -2px;
}

.imgBox.active {
  /* Expand the active box for emphasis */
  flex-basis: 50%;
  max-width: 60%;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
}

.imgBox img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.oursolutions .text {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: absolute;
  transform: scale(1);
  transition:
    opacity 0.6s 0.3s,
    visibility 0.6s 0.3s,
    transform 0.6s 0.3s;
  visibility: visible;
  opacity: 1;
}

.oursolutions .text img {
  width: 100px;
  height: 100px;
  opacity: 0;
}

.imgBox:before {
  display: block;
  position: absolute;
  inset: 0;
  z-index: 1;
  /* above image, below text */
  /* Subtle top fade to full dim at bottom for readability */
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.1) 0%,
    rgba(0, 0, 0, 0.25) 35%,
    rgba(0, 0, 0, 0.45) 100%
  );
  content: "";
  transition: opacity 300ms ease;
}

.imgBox.active:before {
  /* Slightly stronger overlay when active for best contrast */
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.452) 0%,
    rgba(0, 0, 0, 0.568) 35%,
    rgba(0, 0, 0, 0.55) 100%
  );
}

/* Better text readability and subtle reveal on activate */
.imgBox .text {
  color: #fff;
  text-align: center;
  padding: 1rem;
  z-index: 2;
  gap: 1rem;
}

.imgBox:not(.active) .text h3 {
  font-size: 30px;
}

.imgBox .text h3 {
  font-size: clamp(2rem, 3.0967741935vw, 3rem);
  line-height: 1.2;
  font-weight: 300;
  max-width: 70%;
}

.imgBox .text p {
  max-width: 36ch;
  font-size: 20px;
  opacity: 1;
}

.imgBox:not(.active) .text p {
  opacity: 0;
}

.imgBox.active .text {
  transform: scale(1.03);
}

.imgBox.active .text img {
  opacity: 1;
}

.wideAccordion__inner {
  padding-inline: 5.42%;
  padding-block: clamp(64px, 9.2903225806vw, 144px);
  background-color: #eff6f5;
  display: flex;
  flex-direction: column;
}
.wideAccordion__inner .text {
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin-bottom: 32px;
}
.wideAccordion__inner h2 {
  display: inline-flex;
  align-items: center;
  text-transform: uppercase;
  line-height: 1.25;
  font-size: 1.6rem;
  font-weight: 500;
  gap: 6px;
}
.wideAccordion__inner h1 {
  font-size: clamp(3.2rem, 3.0967741935vw, 4.8rem);
  line-height: 1.2;
  font-weight: 300;
}

/* Reduce motion for users that prefer it */
@media (prefers-reduced-motion: reduce) {
  .imgBox {
    transition: none;
  }

  .text {
    transition: none;
  }
}
/* Responsive styles */
@media (max-width: 1200px) {
  .imgBox .text h3 {
    max-width: 90%;
    font-size: 22px;
  }

  .imgBox .text p {
    font-size: 18px;
  }

  .imgBox:not(.active) .text p {
    display: none;
  }

  .imgBox:not(.active) .text h3 {
    font-size: 22px;
  }
}
@media (max-width: 1024px) {
  .oursolutions {
    margin-top: 5rem;
  }

  .oursolutions p {
    font-size: clamp(2.8rem, 4vw, 4.2rem);
  }

  .imageHover {
    margin-top: 2.5rem;
    min-height: clamp(300px, 45vw, 600px);
  }

  .imgBox .text p {
    font-size: 18px;
  }
}

@media (max-width: 768px) {
  .oursolutions {
    margin-top: 4rem;
  }

  .oursolutions h1 {
    font-size: clamp(1.2rem, 2.5vw, 1.4rem);
  }

  .oursolutions p {
    font-size: clamp(2.4rem, 5vw, 3.6rem);
  }

  .imageHover {
    flex-direction: column;
    margin-top: 2rem;
    min-height: auto;
    gap: 1rem;
  }

  .imgBox {
    flex: 1 1 auto;
    max-width: 100%;
    min-height: 250px;
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
  }

  .imgBox.active {
    flex-basis: auto;
    max-width: 100%;
    transform: scale(1.02);
    min-height: 460px;
  }

  .imgBox.active > img {
    min-height: 420px;
  }

  .imgBox .text h3 {
    font-size: clamp(1.2rem, 4vw, 2rem);
    max-width: 90%;
  }

  .imgBox .text p {
    font-size: 1.2rem;
    max-width: 90%;
  }

  .imgBox:not(.active) .text p {
    opacity: 1;
  }
}
@media (max-width: 480px) {
  .oursolutions {
    margin-top: 3rem;
  }

  .oursolutions h1 {
    font-size: clamp(1.1rem, 3vw, 1.3rem);
  }

  .oursolutions p {
    font-size: clamp(1rem, 6vw, 3.2rem);
  }

  .imageHover {
    margin-top: 1.5rem;
    gap: 0.8rem;
  }

  .imgBox {
    min-height: 200px;
    border-radius: 6px;
  }

  .imgBox.active > img {
    min-height: 520px;
  }

  .imgBox .text {
    padding: 0.8rem;
    gap: 0.8rem;
  }

  .imgBox .text img {
    width: 40px;
    height: 40px;
  }

  .imgBox .text h3 {
    font-size: clamp(1rem, 4.5vw, 1.6rem);
    max-width: 95%;
  }

  .imgBox .text p {
    font-size: 1rem;
    max-width: 95%;
    line-height: 1.3;
  }
}
@media (max-width: 320px) {
  .oursolutions {
    margin-top: 2.5rem;
  }

  .oursolutions p {
    font-size: clamp(1rem, 7vw, 2.8rem);
  }

  .imageHover {
    gap: 0.6rem;
  }

  .imgBox {
    min-height: 180px;
  }

  .imgBox .text {
    padding: 0.6rem;
  }

  .imgBox .text img {
    width: 50px;
    height: 50px;
  }

  .imgBox .text h3 {
    font-size: clamp(1.2rem, 5vw, 1.8rem);
  }

  .imgBox .text p {
    font-size: 1.2rem;
  }
}
</style>
