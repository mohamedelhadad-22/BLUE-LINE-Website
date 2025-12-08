<script lang="ts">
import { defineComponent, computed } from "vue";
import { useI18n } from 'vue-i18n';
import 'vue3-carousel/carousel.css'
import { Carousel, Slide, Navigation, Pagination } from 'vue3-carousel'

import NewsCard from "@/components/Home/NewsCard.vue";
import ConstructionMaterials from "@/assets/Construction-Materials_bg.jpg";
import Automotive from "@/assets/Automotive_bg.jpg";
import FurnitureHouseware from "@/assets/Furniture-Houseware._bgpng.png";
import Packaging from "@/assets/Packaging_bg.png";
import packageIcon from "@/assets/pscksge.svg";
import Electronics from "@/assets/slider123.jpg";
import Automotive2 from "@/assets/Automotive.jpg";

interface Post {
  id?: number;
  title?: string;
  summary?: string;
  link?: string;
  image?: string;
  icon?: string;
}

export default defineComponent({
  name: "NewsSection",
  components: {
    NewsCard,
    Carousel,
    Slide,
    Navigation,
    Pagination,
  },
  setup() {
    const { t } = useI18n();

    const posts = computed<Post[]>(() => [
      {
        id: 1,
        title: t('industriesSection.industries.automotive.title'),
        summary: t('industriesSection.industries.automotive.summary'),
        link: "/news-insights#mala-awards",
        image: Automotive,
        icon: packageIcon,
      },
      {
        id: 2,
        title: t('industriesSection.industries.furnitureHouseware.title'),
        summary: t('industriesSection.industries.furnitureHouseware.summary'),
        link: "/news-insights#south-red-sea",
        image: FurnitureHouseware,
        icon: packageIcon,
      },
      {
        id: 3,
        title: t('industriesSection.industries.packaging.title'),
        summary: t('industriesSection.industries.packaging.summary'),
        link: "/news-insights#student-tour",
        image: Packaging,
        icon: packageIcon,
      },
      {
        id: 4,
        title: t('industriesSection.industries.constructionMaterials.title'),
        summary: t('industriesSection.industries.constructionMaterials.summary'),
        link: "/news-insights#student-tour",
        image: ConstructionMaterials,
        icon: packageIcon,
      },
      {
        id: 5,
        title: t('industriesSection.industries.automotive.title'),
        summary: t('industriesSection.industries.automotive.summary'),
        link: "/news-insights#student-tour",
        image: Automotive2,
        icon: packageIcon,
      },
      {
        id: 6,
        title: t('industriesSection.industries.electronics.title'),
        summary: t('industriesSection.industries.electronics.summary'),
        link: "/news-insights#student-tour",
        image: Electronics,
        icon: packageIcon,
      },
    ]);

    return {
      posts,
      t,
    };
  },
  data() {
    return {
      carouselSettings: {
        itemsToShow: 4,
        snapAlign: 'start' as const,
        wrapAround: true,
        autoplay: 3000, // Auto-slide every 4 seconds
        pauseAutoplayOnHover: false,
        gap: 20, // Gap between slides in pixels
        breakpoints: {
          320: {
            itemsToShow: 1,
            snapAlign: 'start' as const
          },
          768: {
            itemsToShow: 2,
            snapAlign: 'start' as const
          },
          1024: {
            itemsToShow: 3,
            snapAlign: 'start' as const
          },
          1280: {
            itemsToShow: 4,
            snapAlign: 'start' as const
          }
        }
      },
    }
  }
});
</script>

<template>
  <section class="news-section" id="news">
    <div class="container news-shell">
      <div class="news-header">
        <span class="news-title_badge">
          {{ t('industriesSection.kicker') }}
        </span>
        <h2>{{ t('industriesSection.title') }}</h2>
        <p>{{ t('industriesSection.subtitle') }}</p>
      </div>
      <Carousel v-bind="carouselSettings" class="news-carousel">
        <Slide v-for="post in posts" :key="post.id">
          <NewsCard :data="post" />
        </Slide>
        <!--
        <template #addons>
          <Navigation />
          <Pagination />
        </template> -->
      </Carousel>
    </div>
  </section>
</template>

<style scoped>
.news-section {
  padding: 52px 0 100px 0;
  /* background: #f9fbff; */
  /* color: #0f1f2f; */
}

.news-shell {
  /* margin: 0 auto; */
  width: 100%;
  /* max-width: 1200px; */
  display: flex;
  flex-direction: column;
  gap: 37px;
}

.news-header {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 1rem;
}

.news-title_badge {
  display: flex;
  padding: 7px 10.5px;
  align-items: flex-start;
  background: #2970FF;
  color: #FFF;
  font-weight: 500;
  font-size: 14px;
}

.news-header h2 {
  color: #000;
  font-family: Lato;
  font-size: 48px;
  font-style: normal;
  font-weight: 700;
  line-height: 99.936%;
}

.news-header p {
  color: #71717A;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
}

.news-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 20px;
}

@media (max-width: 1024px) {
  .news-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    justify-items: center;
  }
}

@media (max-width: 720px) {
  .news-grid {
    grid-template-columns: 1fr;
  }
}

/* Carousel custom styles */
.news-carousel :deep(.carousel__slide) {
  /* padding: 0 !important; */
  /* margin: 0 !important; */
  /* width: 100% !important; */
  overflow: hidden;
}
.news-carousel.carousel {
  /* overflow: hidden; */
}
.news-carousel :deep(.carousel__track) {
  /* gap: 20px !important; */
}

.news-carousel :deep(.carousel__viewport) {
  /* overflow: visible; */
}

.news-carousel :deep(.carousel__slide) > * {
  width: 100%;
  max-width: 100%;
}
</style>
