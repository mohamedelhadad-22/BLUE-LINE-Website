<script lang="ts">
import { defineComponent, markRaw } from "vue";
import HeroBanner from "@/components/resuble/HeroBanner.vue";
import heroBg from "@/assets/feeder-services-hero.xlarge.webp";
import accordionComponent from "@/components/resuble/accordionComponent.vue";
import NewsSection from "@/components/Home/NewsSection.vue";
import hover1 from "@/assets/hover-1.jpg";
import hover2 from "@/assets/hover-2.jpg";
import hover3 from "@/assets/hover-3.jpg";
import hoverIcon from "@/assets/hover-box-icon.svg";
import news1 from "@/assets/hover-1.jpg";
import news2 from "@/assets/hover-1.jpg";
import news3 from "@/assets/hover-1.jpg";

interface hoverBoxs {
  title: string;
  id: number;
  icon: string;
  img: string;
  desc: string;
}
export default defineComponent({
  name: "FeedersServicesView",
  components: { HeroBanner, accordionComponent, NewsSection },
  data() {
    return {
      heroBg: markRaw(heroBg),
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
      feedersNews: {
        kicker: this.$t('FeedersServices.newsKicker'),
        title: this.$t('FeedersServices.newsTitle'),
        cta: this.$t('FeedersServices.newsCta'),
        posts: [
          {
            id: 'feeder-expansion',
            type: 'Service Update',
            date: '2025-09-15',
            title: this.$t('FeedersServices.news1Title'),
            summary: this.$t('FeedersServices.news1Summary'),
            link: '/news-insights#feeder-expansion',
            image: news1
          },
          {
            id: 'port-connectivity',
            type: 'Partnership',
            date: '2025-08-22',
            title: this.$t('FeedersServices.news2Title'),
            summary: this.$t('FeedersServices.news2Summary'),
            link: '/news-insights#port-connectivity',
            image: news2
          },
          {
            id: 'sustainable-shipping',
            type: 'Innovation',
            date: '2025-07-18',
            title: this.$t('FeedersServices.news3Title'),
            summary: this.$t('FeedersServices.news3Summary'),
            link: '/news-insights#sustainable-shipping',
            image: news3
          }
        ]
      },
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
  <section class="FeedersServices">
    <!-- Hero Section -->
    <HeroBanner :titleKey="$t('FeedersServices.heroTitle')" :title="$t('FeedersServices.heroDesc')"
      :subtitleKey="$t('FeedersServices.heroDesc')" height="50vh" :media-src="heroBg" :withImg="true" />

    <div class="container">
      <!-- Breadcrumb -->
      <nav class="breadcrumbs" aria-label="breadcrumb">
        <a href="/">{{ $t("Home") }}</a>
        <span class="sep" aria-hidden="true">/</span>
        <span class="current">{{ $t("FeedersServices.FeedersServices") }}</span>
      </nav>

      <!-- Feeder services -->
      <div class="container">
        <div class="services">
          <h1>{{ $t("FeedersServices.FeedersServices") }}</h1>
          <p class="titDesc">{{ $t("FeedersServices.FeederservicesTitle") }}</p>
          <div class="desc_row">
            <div class="accordion">
              <p>{{ $t("FeedersServices.FeederservicesDesc") }}</p>
              <accordionComponent :steps="steps" />
            </div>
            <div class="image">
              <img src="@/assets/FeedersServices.jpg" alt="Feeders Services" />
              <h3>{{ $t("FeedersServices.Internationaltrade") }}</h3>
              <p>{{ $t("FeedersServices.InternationaltradeDesc") }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="container">
        <div class="oursolutions">
          <h1>{{ $t("FeedersServices.Oursolutions") }}</h1>
          <p class="titDesc">{{ $t("FeedersServices.OursolutionsDesc") }}</p>
          <div class="imageHover">
            <div class="imgBox" v-for="box in hoverBoxs" :key="box.id" :class="{ active: activeIndex === box.id }"
              @click="toggleActive(box.id)">
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
        <div class="Transportation_text">
          <div class="image_box">
            <img src="@/assets/Transportation.jpg" alt="Transportation photo" />
          </div>
          <div class="content_box">
            <div class="h4">
              {{ $t("FeedersServices.TransportationTitle") }}
            </div>
            <p>{{ $t("FeedersServices.TransportationDesc") }}</p>
          </div>
        </div>
      </div>
      
      <!-- News Section -->
      <NewsSection :newsData="feedersNews" />
    </div>
  </section>
</template>

<style scoped>
.services {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 9rem;
}

.services h1 {
  text-transform: uppercase;
}

.services .titDesc {
  font-size: clamp(3rem, 3.0967741935vw, 4rem);
  line-height: 1.2;
  font-weight: 300;
  max-width: 80%;
}

.desc_row {
  display: flex;
  flex-direction: row;
  gap: 8rem;
  margin-top: 4rem;
  justify-content: space-between;
  width: 100%;
  align-items: flex-start;
}

.desc_row .accordion {
  max-width: 65%;
  width: 100%;
}

.accordion p {
  line-height: 1.4;
  font-size: 1.6rem;
  font-weight: 500;
}

.desc_row .image {
  max-width: 30%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 20px;
}

.desc_row .image img {
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

.text {
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

.text img {
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
  background: linear-gradient(to bottom,
      rgba(0, 0, 0, 0.1) 0%,
      rgba(0, 0, 0, 0.25) 35%,
      rgba(0, 0, 0, 0.45) 100%);
  content: "";
  transition: opacity 300ms ease;
}

.imgBox.active:before {
  /* Slightly stronger overlay when active for best contrast */
  background: linear-gradient(to bottom,
      rgba(0, 0, 0, 0.452) 0%,
      rgba(0, 0, 0, 0.568) 35%,
      rgba(0, 0, 0, 0.55) 100%);
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

.Transportation_text {
  margin-top: 6rem;
  display: flex;
  align-items: flex-start;
  width: 100%;
  overflow: hidden;
  max-height: 29rem;
  margin-bottom: 4rem;
}

.Transportation_text .image_box {
  max-width: 50%;
  flex-grow: 1;
  position: relative;
  min-height: 100%;
}

.Transportation_text .image_box img {
  width: 100%;
  object-fit: cover;
  min-height: 100%;
}

.Transportation_text .content_box {
  max-width: 50%;
  background-color: var(--color-primary);
  color: #fff;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  height: 100%;
  padding-inline: 5.42%;
  min-height: 100%;
  padding-block: 6.4rem;
}

.content_box h4 {
  line-height: 1.4;
  font-size: 2.3rem;
  font-weight: 400;
}

.content_box p {
  line-height: 1.4;
  font-size: 1.4rem;
  font-weight: 400;
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
  .services {
    margin-top: 6rem;
  }

  .services .titDesc {
    max-width: 90%;
  }

  .desc_row {
    gap: 4rem;
  }

  .oursolutions {
    margin-top: 6rem;
  }

  .text img {
    max-width: 50px;
    height: 50px;
  }

  .imgBox .text h3 {
    max-width: 90%;
    font-size: 22px
  }

  .imgBox .text p {
    font-size: 18px
  }

  .imgBox:not(.active) .text p {
    display: none;
  }

  .imgBox:not(.active) .text h3 {
    font-size: 22px;
  }

  .Transportation_text {
    min-height: 22rem;
  }

  .Transportation_text .content_box {
    padding-block: 2rem;
    min-height: 20rem;
  }

  .content_box p {
    font-size: 16px;
  }
}

@media (max-width: 1024px) {
  .services {
    margin-top: 4rem;
    gap: 1.5rem;
  }

  .services .titDesc {
    max-width: 95%;
    font-size: clamp(2.5rem, 4vw, 3.5rem);
  }

  .desc_row {
    gap: 3rem;
    margin-top: 3rem;
  }

  .desc_row .accordion {
    max-width: 60%;
  }

  .desc_row .image {
    max-width: 35%;
  }

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

  .content_box p {
    line-height: 1;
    font-size: 1rem;
  }

  .Transportation_text .image_box img {
    min-height: 24rem;
  }
}

@media (max-width: 768px) {
  .breadcrumbs {
    font-size: 1.4rem;
    margin-bottom: 2rem;
  }

  .breadcrumbs a,
  .breadcrumbs .current {
    display: inline-block;
    max-width: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .services {
    margin-top: 3rem;
    gap: 1.2rem;
  }

  .services h1 {
    font-size: clamp(1.8rem, 3vw, 2.4rem);
  }

  .services .titDesc {
    max-width: 100%;
    font-size: clamp(2.2rem, 4.5vw, 3.2rem);
  }

  .desc_row {
    flex-direction: column;
    gap: 2.5rem;
    margin-top: 2.5rem;
  }

  .desc_row .accordion,
  .desc_row .image {
    max-width: 100%;
  }

  .accordion p {
    font-size: 1.4rem;
  }

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

  .imgBox.active>img {
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
  .container {
    padding-inline: 1rem;
  }

  .breadcrumbs {
    font-size: 1.2rem;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .breadcrumbs a,
  .breadcrumbs .current {
    max-width: 120px;
  }

  .services {
    margin-top: 2rem;
    gap: 1rem;
  }

  .services h1 {
    font-size: clamp(1.6rem, 4vw, 2rem);
  }

  .services .titDesc {
    font-size: clamp(1.8rem, 5vw, 2.8rem);
  }

  .desc_row {
    gap: 2rem;
    margin-top: 2rem;
  }

  .accordion p {
    font-size: 1.3rem;
  }

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

  .imgBox.active>img {
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
  .container {
    padding-inline: 0.8rem;
  }

  .services {
    margin-top: 1.5rem;
  }

  .services .titDesc {
    font-size: clamp(1.6rem, 6vw, 2.4rem);
  }

  .desc_row {
    gap: 1.5rem;
  }

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



/* Responsive layout for Transportation_text */
@media (max-width: 1024px) {
  .Transportation_text {
    max-height: none;
  }

  .Transportation_text .content_box {
    padding-block: 4.8rem;
    padding-inline: 4%;
  }
}

@media (max-width: 768px) {
  .Transportation_text {
    flex-direction: column;
    align-items: stretch;
    gap: 2rem;
  }

  .Transportation_text .image_box,
  .Transportation_text .content_box {
    max-width: 100%;
    min-height: auto;
  }

  .Transportation_text .image_box img {
    height: auto;
    max-height: 50vh;
  }

  .content_box h4 {
    font-size: 2rem;
  }

  .content_box p {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .Transportation_text {
    margin-top: 4rem;
    margin-bottom: 3rem;
  }

  .Transportation_text .content_box {
    padding-block: 3.6rem;
    padding-inline: 6%;
    gap: 1.2rem;
  }

  .content_box h4 {
    font-size: 1.8rem;
  }

  .content_box p {
    font-size: 1rem;
  }
}
</style>
