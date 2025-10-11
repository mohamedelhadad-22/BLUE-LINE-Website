<script lang="ts">
import { defineComponent } from "vue";
import NewsHeroSlider from "@/components/resuble/NewsHeroSlider.vue";
import sider2 from "@/assets/sider2.jpg";
import slider1 from "@/assets/sider1.jpg";
import slider3 from "@/assets/sider3.jpg";

export default defineComponent({
  name: "NewsInsightsView",
  components: { NewsHeroSlider },
  data() {
    return {};
  },
  computed: {
    slides() {
      const slides = [
        {
          image: slider1,
          title:
            'شركة "فلك البحرية" تنظّم جولة ميدانية لطلاب كلية الدراسات البحرية على متن سفينة الحاويات "فلك جدة"',
          excerpt:
            'نظمت الشركة جولة ميدانية متخصصة لطلاب كلية الدراسات البحرية في جامعة الملك عبدالعزيز على متن سفينة الحاويات "فلك جدة".',
          date: "2025-06-03",
          href: "/news/falak-visit",
          isAd: false,
        },
        {
          image: sider2,
          title: "عنوان خبر آخر تجريبي",
          excerpt: "وصف موجز للخبر…",
          date: "2025-05-20",
          href: "/news/2",
        },
        {
          image: slider3,
          title: "عنوان خبر آخر تجريبي",
          excerpt: "وصف موجز للخبر…",
          date: "2025-05-20",
          href: "/news/2",
        },
      ]
      return slides;
    },
  },
  methods: {},
});
</script>

<template>
  <div class="NewsInsights">
    <div class="container">
      <NewsHeroSlider
        :slides="slides"
        :autoplay="true"
        :intervalMs="7000"
        :rtl="true"
        @changed="(i) => console.log('slide', i)"
      />
    </div>
  </div>
</template>
