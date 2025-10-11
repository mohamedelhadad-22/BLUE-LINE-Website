<script lang="ts">
import { defineComponent, type PropType } from "vue";
import NewsCard from "@/components/Home/NewsCard.vue";
import newsMalaAwards from "@/assets/news-mala-awards.svg";
import newsSouthRedSea from "@/assets/news-south-red-sea.svg";
import newsStudentTour from "@/assets/news-student-tour.svg";

type RawPost = {
  id: string;
  type?: string;
  date?: string;
  title?: string;
  summary?: string;
  link?: string;
  image?: string;
};

type ImageMap = Record<string, string>;

type FormattedPost = Required<Pick<RawPost, "id" | "title" | "summary">> & {
  type: string;
  dateLabel: string;
  link: string;
  image: string;
};

const DEFAULT_IMAGE_MAP: ImageMap = {
  "mala-awards": newsMalaAwards,
  "south-red-sea": newsSouthRedSea,
  "student-tour": newsStudentTour,
};

const DEFAULT_FALLBACK_POSTS: RawPost[] = [
  {
    id: "mala-awards",
    type: "Announcement",
    date: "2025-08-01",
    title:
      'Folk Maritime Wins "Rising Star Organization" at MALA Awards 2025',
    summary:
      "Folk Maritime is recognised at the MALA Awards for its rapid progress, innovation, and commitment to elevating regional logistics standards.",
    link: "/news-insights#mala-awards",
    image: newsMalaAwards,
  },
  {
    id: "south-red-sea",
    type: "Announcement",
    date: "2025-07-07",
    title:
      "Folk Maritime Expands South Red Sea Service with Enhanced Jeddah-Centric Rotation",
    summary:
      "The strategic extension of Folk Maritime's South Red Sea Service strengthens regional connectivity and amplifies Saudi Arabia's role as a logistics hub.",
    link: "/news-insights#south-red-sea",
    image: newsSouthRedSea,
  },
  {
    id: "student-tour",
    type: "Community",
    date: "2025-06-03",
    title:
      'Folk Maritime Organizes Tour for Maritime Students Onboard Container Vessel "Folk Jeddah"',
    summary:
      "Students from King Abdulaziz University experience life onboard Folk Jeddah, gaining practical insight into modern vessel operations.",
    link: "/news-insights#student-tour",
    image: newsStudentTour,
  },
];

const DEFAULT_FALLBACK_IMAGE = newsMalaAwards;

const getNestedValue = <T,>(
  source: Record<string, any> | undefined,
  path: string
): T | undefined => {
  if (!source || !path) return undefined;
  return path.split(".").reduce<any>((acc, key) => {
    if (acc && typeof acc === "object" && key in acc) {
      return acc[key];
    }
    return undefined;
  }, source);
};

export default defineComponent({
  name: "NewsSection",
  components: {
    NewsCard,
  },
  props: {
    newsData: {
      type: Object as PropType<{
        kicker?: string;
        title?: string;
        cta?: string;
        posts?: RawPost[];
      }>,
      default: () => ({}),
    },
    translationsKey: {
      type: String,
      default: "homeNews",
    },
    imageMap: {
      type: Object as PropType<ImageMap>,
      default: () => ({ ...DEFAULT_IMAGE_MAP }),
    },
    fallbackPosts: {
      type: Array as PropType<RawPost[]>,
      default: () =>
        DEFAULT_FALLBACK_POSTS.map((post) => ({
          ...post,
        })),
    },
    fallbackImage: {
      type: String,
      default: DEFAULT_FALLBACK_IMAGE,
    },
  },
  computed: {
    composerLocale(): string {
      return this.$i18n.locale;
    },
    isArabic(): boolean {
      return this.composerLocale.startsWith("ar");
    },
    direction(): "rtl" | "ltr" {
      return this.isArabic ? "rtl" : "ltr";
    },
    computedNewsData(): {
      kicker?: string;
      title?: string;
      cta?: string;
      posts?: RawPost[];
    } {
      // Use prop data if provided, otherwise fallback to i18n
      if (this.newsData && Object.keys(this.newsData).length > 0) {
        return this.newsData;
      }
      
      const messages = (
        this.$i18n as unknown as { messages?: Record<string, any> }
      ).messages;
      const localeMessages = messages?.[this.composerLocale] ?? {};
      const fallbackFromLocale = getNestedValue<{
        kicker?: string;
        title?: string;
        cta?: string;
        posts?: RawPost[];
      }>(localeMessages, this.translationsKey);
      return (fallbackFromLocale ?? {}) as {
        kicker?: string;
        title?: string;
        cta?: string;
        posts?: RawPost[];
      };
    },
    posts(): FormattedPost[] {
      const locale = this.isArabic ? "ar-SA" : "en-GB";
      const dateFormatter = new Intl.DateTimeFormat(locale, {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });

      const sourcePosts =
        (this.computedNewsData.posts?.length
          ? this.computedNewsData.posts
          : this.fallbackPosts) ?? [];

      return sourcePosts.map((post) => {
        const date = post.date ? new Date(post.date) : new Date();
        return {
          id: post.id,
          type: post.type ?? "",
          dateLabel: dateFormatter.format(date),
          title: post.title ?? "",
          summary: post.summary ?? "",
          link: post.link ?? "#",
          image:
            post.image ??
            this.imageMap[post.id] ??
            this.fallbackImage,
        };
      });
    },
    layoutClass(): Record<string, boolean> {
      return {
        "news-section--rtl": this.isArabic,
      };
    },
    ctaLabel(): string {
      return this.computedNewsData.cta ?? "";
    },
  },
});
</script>

<template>
  <section class="news-section" id="news" :dir="direction">
    <div class="news-shell">
      <div class="news-header">
        <span class="news-kicker">
          <span class="news-kicker__icon" aria-hidden="true">✦</span>
          {{ computedNewsData.kicker }}
        </span>
        <h2 class="news-title">
          {{ computedNewsData.title }}
        </h2>
      </div>
      <div class="news-grid" :class="layoutClass">
        <NewsCard
          v-for="post in posts"
          :key="post.id"
          :post="post"
          :cta-label="ctaLabel"
          :is-rtl="isArabic"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.news-section {
  padding: clamp(3.5rem, 8vw, 6rem) clamp(1.5rem, 6vw, 3.5rem);
  background: #f9fbff;
  color: #0f1f2f;
}

.news-shell {
  margin: 0 auto;
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  gap: clamp(2rem, 4vw, 3rem);
}

.news-header {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.news-kicker {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 1rem;
  border-radius: 999px;
  background: rgba(124, 97, 255, 0.12);
  color: #5e4ff9;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 0.8rem;
  width: fit-content;
}

.news-kicker__icon {
  font-size: 0.9rem;
}

.news-title {
  margin: 0;
  font-size: clamp(2.1rem, 3.5vw, 3rem);
  font-weight: 700;
  color: #081829;
}

.news-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: clamp(1.5rem, 3vw, 2.5rem);
}

@media (max-width: 1024px) {
  .news-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 720px) {
  .news-grid {
    grid-template-columns: 1fr;
  }
}
</style>
