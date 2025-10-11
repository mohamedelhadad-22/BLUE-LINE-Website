<script lang="ts">
import { defineComponent } from "vue";
import HeroBanner from "@/components/resuble/HeroBanner.vue";
import heroBg from "@/assets/feeder-services-hero.xlarge.webp";
import accordionComponent from "@/components/resuble/accordionComponent.vue";
import NewsSection from "@/components/Home/NewsSection.vue";
import hover1 from "@/assets/hover-1.jpg";
import hover2 from "@/assets/hover-2.jpg";
import hover3 from "@/assets/hover-3.jpg";
import hoverIcon from "@/assets/hover-box-icon.svg";
import news1 from "@/assets/new2.jpg";
import news2 from "@/assets/new3.jpg";
import news3 from "@/assets/news1.jpg";

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
      heroBg: heroBg as string,
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
            <div
              class="imgBox"
              v-for="box in hoverBoxs"
              :key="box.id"
              :class="{ active: activeIndex === box.id }"
              role="button"
              tabindex="0"
              :aria-pressed="activeIndex === box.id"
              @click="toggleActive(box.id)"
              @keyup.enter.prevent="toggleActive(box.id)"
              @keyup.space.prevent="toggleActive(box.id)"
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
  gap: clamp(1.6rem, 2.5vw, 2.4rem);
  margin-top: clamp(2.4rem, 4vw, 3.2rem);
}

.services h1 {
  text-transform: uppercase;
  font-size: clamp(1.8rem, 4vw, 2.4rem);
}

.services .titDesc {
  font-size: clamp(1.8rem, 5vw, 2.8rem);
  line-height: 1.25;
  font-weight: 300;
  max-width: none;
}

.desc_row {
  display: grid;
  grid-template-columns: 1fr;
  gap: clamp(2rem, 4vw, 3.2rem);
  margin-top: clamp(2.4rem, 4vw, 3.6rem);
  align-items: start;
}

.desc_row .accordion {
  width: 100%;
}

.accordion p {
  line-height: 1.5;
  font-size: clamp(1.3rem, 3vw, 1.6rem);
  font-weight: 500;
}

.desc_row .image {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: clamp(1.4rem, 2.5vw, 2rem);
}

.desc_row .image img {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  border-radius: 12px;
}

.desc_row .image h3 {
  font-size: clamp(1.6rem, 4vw, 2.2rem);
  font-weight: 500;
  line-height: 1.3;
}

.desc_row .image p {
  font-size: clamp(1.4rem, 3.5vw, 1.6rem);
  line-height: 1.5;
}

.oursolutions {
  margin-top: clamp(4rem, 6vw, 6rem);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.oursolutions h1 {
  text-transform: uppercase;
  line-height: 1.25;
  font-size: clamp(1.2rem, 3vw, 1.4rem);
  font-weight: 500;
}

.oursolutions p {
  font-size: clamp(2.4rem, 5vw, 3.8rem);
  line-height: 1.2;
  font-weight: 300;
}

.imageHover {
  margin-top: clamp(2rem, 4vw, 3rem);
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: clamp(1.6rem, 2.5vw, 2.8rem);
  width: 100%;
}

.imgBox {
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  overflow: hidden;
  background: #fff;
  cursor: pointer;
  box-shadow: 0 10px 30px rgba(16, 24, 40, 0.08);
  transition: transform 240ms ease, box-shadow 240ms ease;
}

.imgBox:focus-visible {
  outline: 2px solid var(--color-primary, #1a73e8);
  outline-offset: 3px;
}

.imgBox img {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
}

.imgBox .text {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: clamp(1.6rem, 3vw, 2.4rem);
  background: #fff;
  color: var(--text-primary, #0f172a);
  text-align: left;
  flex-grow: 1;
}

.imgBox .text img {
  width: 56px;
  height: 56px;
  opacity: 1;
}

.imgBox .text h3 {
  font-size: clamp(1.6rem, 4vw, 2rem);
  line-height: 1.3;
  font-weight: 500;
}

.imgBox .text p {
  font-size: clamp(1.4rem, 3.5vw, 1.6rem);
  line-height: 1.5;
  opacity: 1;
}

@media (hover: hover) {
  .imgBox:hover {
    transform: translateY(-2px);
    box-shadow: 0 18px 40px rgba(15, 24, 40, 0.18);
  }
}

.Transportation_text {
  margin-top: clamp(4rem, 6vw, 6rem);
  display: grid;
  gap: clamp(2rem, 4vw, 3rem);
}

.Transportation_text .image_box img {
  width: 100%;
  border-radius: 12px;
  object-fit: cover;
}

.Transportation_text .content_box {
  border-radius: 12px;
  background-color: var(--color-primary);
  color: #fff;
  display: flex;
  flex-direction: column;
  gap: clamp(1.2rem, 3vw, 2rem);
  padding: clamp(2.4rem, 5vw, 4rem);
}

.content_box .h4 {
  line-height: 1.4;
  font-size: clamp(1.8rem, 4vw, 2.3rem);
  font-weight: 500;
}

.content_box p {
  line-height: 1.5;
  font-size: clamp(1.4rem, 3.5vw, 1.6rem);
  font-weight: 400;
}

@media (min-width: 768px) {
  .services {
    margin-top: clamp(3.2rem, 4vw, 4.8rem);
    gap: clamp(2rem, 3vw, 3rem);
  }

  .services h1 {
    font-size: clamp(2rem, 3vw, 2.8rem);
  }

  .services .titDesc {
    font-size: clamp(2.4rem, 3.6vw, 3.4rem);
    max-width: min(90%, 60ch);
  }

  .desc_row {
    gap: clamp(2.4rem, 3vw, 4rem);
  }

  .accordion p {
    font-size: clamp(1.4rem, 2.5vw, 1.7rem);
  }

  .imageHover {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  }

  .imgBox .text {
    padding: clamp(2rem, 3vw, 2.8rem);
  }

  .Transportation_text {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    align-items: stretch;
  }

  .Transportation_text .content_box {
    padding: clamp(3rem, 4vw, 4.8rem);
  }
}

@media (min-width: 900px) {
  .desc_row {
    grid-template-columns: minmax(0, 1fr) minmax(260px, 0.9fr);
  }
}

@media (min-width: 1024px) {
  .services h1 {
    font-size: clamp(2.2rem, 2.4vw, 3rem);
  }

  .services .titDesc {
    font-size: clamp(2.8rem, 3vw, 3.8rem);
  }

  .desc_row {
    margin-top: clamp(3.6rem, 4vw, 4.8rem);
    gap: clamp(3rem, 4vw, 5rem);
  }

  .oursolutions {
    margin-top: clamp(5rem, 6vw, 7rem);
  }

  .oursolutions p {
    font-size: clamp(3.2rem, 3vw, 4.4rem);
  }

  .imageHover {
    display: flex;
    gap: clamp(1.8rem, 2.2vw, 2.4rem);
  }

  .imgBox {
    flex: 1 1 0;
    min-height: clamp(360px, 30vw, 520px);
    box-shadow: none;
  }

  .imgBox img {
    height: 100%;
    aspect-ratio: auto;
  }

  .imgBox::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.18) 0%, rgba(0, 0, 0, 0.45) 65%, rgba(0, 0, 0, 0.65) 100%);
    transition: opacity 240ms ease;
    opacity: 1;
  }

  .imgBox .text {
    position: absolute;
    inset: 0;
    background: none;
    color: #fff;
    text-align: center;
    justify-content: center;
    align-items: center;
  }

  .imgBox .text img {
    width: clamp(74px, 8vw, 100px);
    height: clamp(74px, 8vw, 100px);
    opacity: 0;
    transition: opacity 240ms ease;
  }

  .imgBox .text h3 {
    font-size: clamp(2rem, 2.6vw, 3rem);
    max-width: 70%;
  }

  .imgBox .text p {
    max-width: 36ch;
    opacity: 0;
    transition: opacity 240ms ease;
  }

  .imgBox.active {
    flex-grow: 1.35;
    box-shadow: 0 18px 48px rgba(15, 24, 40, 0.3);
    transform: translateY(-2px);
  }

  .imgBox.active::before {
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.32) 0%, rgba(0, 0, 0, 0.58) 65%, rgba(0, 0, 0, 0.65) 100%);
  }

  .imgBox.active .text {
    transform: scale(1.03);
  }

  .imgBox.active .text img,
  .imgBox.active .text p {
    opacity: 1;
  }

  .imgBox:not(.active) .text h3 {
    font-size: clamp(1.8rem, 2.3vw, 2.6rem);
  }

  .Transportation_text {
    grid-template-columns: minmax(320px, 1.1fr) minmax(280px, 0.9fr);
    gap: clamp(2.8rem, 3vw, 4rem);
    margin-bottom: 4rem;
  }

  .Transportation_text .image_box img {
    height: 100%;
    border-radius: 12px 0 0 12px;
  }

  .Transportation_text .content_box {
    border-radius: 0 12px 12px 0;
    align-self: stretch;
    justify-content: center;
  }
}

@media (min-width: 1200px) {
  .services {
    margin-top: 8rem;
  }

  .Transportation_text {
    margin-top: 6.4rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .imgBox,
  .imgBox::before,
  .imgBox .text,
  .imgBox .text img,
  .imgBox .text p {
    transition: none !important;
  }
}
</style>
