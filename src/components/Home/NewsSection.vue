<script lang="ts">
import { defineComponent, } from "vue";
import NewsCard from "@/components/Home/NewsCard.vue";
import ConstructionMaterials from "@/assets/Construction-Materials_bg.jpg";
import Automotive from "@/assets/Automotive_bg.jpg";
import FurnitureHouseware from "@/assets/Furniture-Houseware._bgpng.png";
import Packaging from "@/assets/Packaging_bg.png";
import packageIcon from "@/assets/pscksge.svg";

interface Post {
  id?: number;
  title?: string;
  summary?: String;
  link?: String;
  image?: string;
  icon?: string;
};

export default defineComponent({
  name: "NewsSection",
  components: {
    NewsCard,
  },
  data() {
    return {
      posts: [
        {
          id: 1,
          title: 'Automotive',
          summary:
            "The automotive industry relies on precision logistics to maintain seamless production and meet market demands. BlueLine delivers specialised solutions to securely transport parts and components, ensuring efficiency, compliance, and reliability across your supply chain.",
          link: "/news-insights#mala-awards",
          image: Automotive,
          icon: packageIcon,
        },
        {
          id: 2,
          title:
            "Furniture & Houseware",
          summary:
            "The furniture and housewares industry requires expert logistics to ensure safe and timely delivery. At BlueLine, we provide tailored solutions for bulky furniture and delicate goods, combining precision handling, customs expertise, and flexible freight options to safeguard your",
          link: "/news-insights#south-red-sea",
          image: FurnitureHouseware,
          icon: packageIcon,
        },
        {
          id: 3,
          title:
            'Packaging',
          summary:
            "Efficient logistics are essential for the packaging industry's success. At BlueLine, we deliver tailored freight solutions to streamline your supply chain, safeguard materials, and support sustainability, ensuring your goods are handled with precision every step of the way.",
          link: "/news-insights#student-tour",
          image: Packaging,
          icon: packageIcon,
        },
        {
          id: 4,
          title:
            'Construction Materials',
          summary:
            "Efficient logistics are essential for the packaging industry's success. At BlueLine, we deliver tailored freight solutions to streamline your supply chain, safeguard materials, and support sustainability, ensuring your goods are handled with precision every step of the way.",
          link: "/news-insights#student-tour",
          image: ConstructionMaterials,
          icon: packageIcon,
        },
      ] as Post[],
    };
  },

});
</script>

<template>
  <section class="news-section" id="news">
    <div class="container news-shell">
      <div class="news-header">
        <span class="news-title_badge">
          Industries
        </span>
        <h2>The Industries We Can Provide Services To</h2>
        <p>Consistent, effective, and economical shipping options for enterprises across the globe.</p>
      </div>
      <div class="news-grid">
        <NewsCard v-for="post in posts" :key="post.id" :data="post" />
      </div>
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
</style>
