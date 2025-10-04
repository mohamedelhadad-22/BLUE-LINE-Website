<script lang="ts">
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";
import InfiniteTicker from "@/components/resuble/InfiniteTicker.vue";
import accordionComponent from "@/components/resuble/accordionComponent.vue";
type Step = {
  title: string;
  description: string;
};
export default defineComponent({
  name: "CareersView",
  components: { InfiniteTicker, accordionComponent },
  setup() {
    const { t, locale } = useI18n();
    return { t, locale };
  },
  data() {
    return {
      openIndex: this.initiallyOpen,
      focusIndex: this.initiallyOpen,
      heading: "",
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
  computed: {
    ouerValues() {
      const values = [
        {
          id: 1,
          title: this.$t("careersPage.SustainableSolutions"),
          desc: this.$t("careersPage.SustainableDesc"),
        },
        {
          id: 2,
          title: this.$t("careersPage.PositiveImpact"),
          desc: this.$t("careersPage.ImpactDesc"),
        },
        {
          id: 3,
          title: this.$t("careersPage.Customercentricity"),
          desc: this.$t("careersPage.centricityDesc"),
        },
      ];
      return values;
    },
  },
});
</script>

<template>
  <section class="careers-page">
    <header class="careers-hero">
      <div class="container">
        <p class="kicker">{{ t("careersPage.kicker") }}</p>
        <h1 class="title">{{ t("careersPage.title") }}</h1>
        <p class="subtitle">{{ t("careersPage.intro") }}</p>
        <button class="apply_btn">{{ $t("careersPage.apply") }}</button>
      </div>
    </header>
    <nav class="breadcrumbs" aria-label="breadcrumb">
      <a href="/">{{ t("Home") }}</a>
      <span class="sep" aria-hidden="true">/</span>
      <span class="current">{{ t("pages.careers.headline") }}</span>
    </nav>

    <section class="life_at_blueline">
      <div class="container">
        <div class="life_content">
          <h6>{{ $t("careersPage.LIFEATBLUE") }}</h6>
          <h3>{{ $t("careersPage.LIFEATFOLKDesc") }}</h3>
          <p>{{ $t("careersPage.LIFEATBLUEiNTORO") }}</p>
        </div>
      </div>
    </section>
    <section class="ouer_values">
      <div class="container">
        <div class="content_values">
          <h2>
            {{ $t("careersPage.valuesTitle") }}
          </h2>
          <p>{{ $t("careersPage.valuesDesc") }}</p>
        </div>
        <div class="values_sections">
          <div class="box" v-for="value in ouerValues">
            <div class="circle">{{ value.id }}</div>
            <h4>{{ value.title }}</h4>
            <p>{{ value.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="infinite_slider container">
      <InfiniteTicker
        :items="['Working together towards a shared vision.']"
        :speed="280"
        :gap="30"
        direction="ltr"
        :pauseOnHover="false"
      />
    </section>
    <section class="RecruitmentSteps">
      <div class="container">
        <div class="apply-steps-div">
          <div class="apply-steps__grid">
            <h5>{{ $t("careersPage.WorkingTogether") }}</h5>
            <figure class="apply-steps__media">
              <img
                src="@/assets/WhatsApp-Image-1446-10-29-at-15-01-57.large.jpg"
                alt="imageAlt"
                loading="lazy"
              />
            </figure>
          </div>
          <div class="accordiong">
            <p>
              {{ $t("careersPage.WorkingTogetherDesc") }}
            </p>
            <h4>{{ $t("careersPage.applicationprocess") }}</h4>
            <accordionComponent :steps="steps" />
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<style scoped>
.careers-page {
  display: block;
}
.careers-hero {
  padding: 96px 0 40px;
  background: #0b1420;
  color: #fff;
  background-image: url("@/assets/careerhero.jpg");
  padding-block: clamp(56px, 5.2258064516vw, 81px);
  min-height: clamp(436px, 30.5806451613vw, 474px);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
.apply_btn {
  display: inline-flex;
  position: relative;
  align-items: center;
  justify-content: center;
  transition:
    color 0.3s,
    background-color 0.3s,
    border-color 0.3s,
    opacity 0.3s;
  border: 1px solid #80fd66;
  background-color: #80fd66;
  cursor: pointer;
  padding-block: 0.5rem;
  padding-inline: 3.2rem;
  min-height: 3rem;
  text-align: center;
  line-height: 1.4;
  color: #004d45;
  font-size: 1.8rem;
  font-weight: 400;
  margin-top: 32px;
}

.breadcrumbs {
  font-size: 13px;
  opacity: 0.8;
  margin-bottom: 16px;
  padding-inline: 5.42%;
  padding-top: 3.2rem;
}
.breadcrumbs a {
  color: #00000077;
  text-decoration: none;
}
.breadcrumbs .sep {
  margin: 0 8px;
  opacity: 0.5;
}
.breadcrumbs .current {
  color: #000;
  opacity: 0.9;
}

.life_at_blueline {
  margin-inline-end: 12.764%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-inline: 5.42%;
  margin-bottom: 6rem;
}
.life_at_blueline .life_content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-inline-end: 12.764%;
}
.life_content h6 {
  display: inline-flex;
  align-items: center;
  text-transform: uppercase;
  line-height: 1.25;
  font-size: 1.6rem;
  font-weight: 500;
}
.life_content h3 {
  font-size: clamp(1rem, 3.6129032258vw, 4rem);
  line-height: 1.2;
  font-weight: 300;
}
.life_content p {
  font-size: 2rem;
  color: #2b3990d7;
  margin-top: 2rem;
  line-height: 1.4;
  font-weight: 300;
}

.ouer_values {
  padding-block: clamp(64px, 9.2903225806vw, 144px);
  background-color: #262262;
  color: #fff;
}

@media (min-width: 768px) {
  .ouer_values {
    padding-inline: 5.42%;
  }
}
.content_values {
  margin-inline-end: 40.424%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.content_values h2 {
  font-size: clamp(3rem, 3.6129032258vw, 4.6rem);
  line-height: 1.2;
  font-weight: 300;
}
.content_values p {
  font-size: clamp(1.2rem, 1.5483870968vw, 2.4rem);
  line-height: 1.4;
  font-weight: 300;
}
.values_sections {
  display: flex;
  gap: 20px;
  margin-top: 4.8rem;
}
.values_sections .box {
  border-right: 1px solid#27a9e198;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-inline: clamp(32px, 2.5806451613vw, 40px);
}
.arabic .values_sections .box {
  border-left: 1px solid#27a9e198;
  border-right: none;
}
.values_sections .box:last-of-type {
  border: none;
}
.values_sections .box .circle {
  width: 60px;
  height: 60px;
  border: 2px solid#27aae1;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.values_sections .box h4 {
  font-size: 1.5rem;
}
.values_sections .box p {
  font-size: 16px;
}

.infinite_slider {
  display: flex;
  width: 100%;
  padding: 120px 0;
}
.RecruitmentSteps {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-bottom: 70px;
  padding: 0 100px 90px;
}
.apply-steps-div {
  display: flex;
  width: 100%;
  gap: 10.638%;
  justify-content: space-between;
}
.apply-steps__grid {
  max-width: 50%;
  display: flex;
  flex-direction: column;
  gap: 50px;
}
.apply-steps__grid h5 {
  font-size: clamp(1rem, 2.064516129vw, 2rem);
  font-weight: 300;
  color: #000;
}
.apply-steps__media img {
  width: 100%;
  height: clamp(350px, 38.7096774194vw, 600px);
  display: block;
  width: 100%;
  object-fit: cover;
}
.accordiong {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 50%;
}
.accordiong p {
  line-height: 1.4;
  font-size: 1.4rem;
  font-weight: 400;
}
.accordiong h4 {
  margin-top: clamp(32px, 2.7096774194vw, 42px);
  margin-bottom: clamp(16px, 1.5483870968vw, 24px);
  text-transform: uppercase;
  line-height: 1.25;
  font-size: 1.2rem;
  font-weight: 600;
}
.kicker {
  letter-spacing: 0.08em;
  text-transform: uppercase;
  opacity: 0.8;
  margin: 0 0 16px;
}
.title {
  margin: 0 0 12px;
  font-size: 44px;
  line-height: 1.15;
  letter-spacing: -0.01em;
}
.subtitle {
  margin: 0;
  opacity: 0.9;
  font-size: 18px;
  line-height: 1.6;
  max-width: 70ch;
}

.careers-highlights {
  padding: 56px 0;
}
.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}
.card {
  background: #0e1826;
  color: #e6eef9;
  border: 1px solid #1e2a3b;
  border-radius: 14px;
  padding: 24px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
}
.card h3 {
  margin: 0 0 8px;
  font-size: 20px;
  font-weight: 700;
}
.card p {
  margin: 0;
  opacity: 0.9;
}
.list {
  margin: 0;
  padding-inline-start: 18px;
}
.list li {
  margin: 6px 0;
}

.careers-cta {
  padding: 24px 0 8px;
  text-align: center;
}
.btn {
  display: inline-block;
  background: #2aa6ff;
  color: #001019;
  border-radius: 999px;
  padding: 12px 22px;
  text-decoration: none;
  font-weight: 800;
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease,
    background 0.15s ease;
  box-shadow: 0 6px 18px rgba(42, 166, 255, 0.35);
}
.btn:hover {
  background: #4db6ff;
  transform: translateY(-1px);
}
.btn:active {
  transform: translateY(0);
  box-shadow: 0 2px 8px rgba(42, 166, 255, 0.35);
}
.note {
  margin-top: 10px;
  opacity: 0.8;
}

.careers-gallery {
  padding: 32px 0 80px;
}
.thumbs {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  align-items: center;
}
.thumbs img {
  width: 100%;
  height: auto;
  display: block;
}

@media (max-width: 900px) {
  .grid {
    grid-template-columns: 1fr;
  }
  .title {
    font-size: 34px;
  }
  .thumbs {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media (max-width: 520px) {
  .title {
    font-size: 28px;
  }
  .subtitle {
    font-size: 16px;
  }
  .thumbs {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Basic RTL tweaks */
:dir(rtl) .breadcrumbs .sep {
  transform: scaleX(-1);
}
:dir(rtl) .breadcrumbs {
  direction: rtl;
}
</style>
<style></style>
