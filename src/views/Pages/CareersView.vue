<script lang="ts">
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: "CareersView",
  setup() {
    const { t, locale } = useI18n();
    return { t, locale };
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
    <nav class="container breadcrumbs" aria-label="breadcrumb">
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
    <section class="careers-highlights">
      <div class="container grid">
        <div class="card">
          <h3>{{ t("careersPage.sections.why.title") }}</h3>
          <ul class="list">
            <li>{{ t("careersPage.sections.why.points[0]") }}</li>
            <li>{{ t("careersPage.sections.why.points[1]") }}</li>
            <li>{{ t("careersPage.sections.why.points[2]") }}</li>
          </ul>
        </div>
        <div class="card">
          <h3>{{ t("careersPage.sections.life.title") }}</h3>
          <p>{{ t("careersPage.sections.life.body") }}</p>
        </div>
      </div>
    </section>

    <section class="careers-cta">
      <div class="container">
        <a
          :href="t('careersPage.cta.mailto')"
          class="btn"
          :aria-label="t('careersSection.ctaAria')"
        >
          {{ t("careersPage.cta.label") }}
        </a>
        <p class="note">{{ t("careersPage.cta.desc") }}</p>
      </div>
    </section>

    <section class="careers-gallery">
      <div class="container thumbs">
        <img
          src="/src/assets/career-containers.svg"
          :alt="t('careersSection.galleryAlt.containers')"
        />
        <img
          src="/src/assets/career-team.svg"
          :alt="t('careersSection.galleryAlt.team')"
        />
        <img
          src="/src/assets/career-meeting.svg"
          :alt="t('careersSection.galleryAlt.meeting')"
        />
        <img
          src="/src/assets/career-vessel.svg"
          :alt="t('careersSection.galleryAlt.vessel')"
        />
        <img
          src="/src/assets/career-detail.svg"
          :alt="t('careersSection.galleryAlt.detail')"
        />
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
