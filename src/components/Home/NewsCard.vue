<script lang="ts">
import { defineComponent } from "vue";

type NewsPost = {
  id: string;
  type: string;
  dateLabel: string;
  title: string;
  summary: string;
  link: string;
  image: string;
};

export default defineComponent({
  name: "NewsCard",
  props: {
    post: {
      type: Object as () => NewsPost,
      required: true,
    },
    ctaLabel: {
      type: String,
      required: true,
    },
    isRtl: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    cardModifiers(): Record<string, boolean> {
      return {
        "news-card--rtl": this.isRtl,
      };
    },
  },
  methods: {
    isRouterLink(link: string): boolean {
      return link.startsWith("/") && !link.startsWith("//");
    },
    isExternalLink(link: string): boolean {
      return link.startsWith("http");
    },
  },
});
</script>

<template>
  <article class="news-card" :class="cardModifiers">
    <figure class="news-card__media">
      <img :src="post.image" :alt="post.title" loading="lazy" />
      <figcaption class="news-card__badge">{{ post.type }}</figcaption>
    </figure>
    <div class="news-card__body">
      <time class="news-card__date">
        {{ post.dateLabel }}
      </time>
      <h3 class="news-card__title">
        {{ post.title }}
      </h3>
      <p class="news-card__summary">
        {{ post.summary }}
      </p>
      <RouterLink
        v-if="isRouterLink(post.link)"
        :to="post.link"
        class="news-card__link"
      >
        {{ ctaLabel }}
        <span class="news-card__linkIcon" aria-hidden="true">→</span>
      </RouterLink>
      <a
        v-else
        :href="post.link"
        class="news-card__link"
        :target="isExternalLink(post.link) ? '_blank' : undefined"
        :rel="isExternalLink(post.link) ? 'noopener' : undefined"
      >
        {{ ctaLabel }}
        <span class="news-card__linkIcon" aria-hidden="true">→</span>
      </a>
    </div>
  </article>
</template>

<style scoped>
.news-card {
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 18px 40px rgba(15, 31, 47, 0.08);
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;
}

.news-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 30px 50px rgba(15, 31, 47, 0.12);
}

.news-card__media {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  margin: 0;
}

.news-card__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.news-card__badge {
  position: absolute;
  top: 1rem;
  inset-inline-start: 1rem;
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  background: #00AEFF;
  color: #ffffff;
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.news-card__body {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: clamp(1.5rem, 3vw, 2rem);
}

.news-card__date {
  font-size: 0.85rem;
  color: #587084;
}

.news-card__title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #102032;
  line-height: 1.45;
}

.news-card__summary {
  margin: 0;
  font-size: 0.98rem;
  line-height: 1.8;
  color: #3b4f60;
}

.news-card__link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-weight: 600;
  color: #0a6570;
  text-decoration: none;
  margin-top: auto;
  font-size: 0.95rem;
}

.news-card__linkIcon {
  font-size: 1rem;
  transition: transform 0.2s ease;
}

.news-card__link:hover .news-card__linkIcon,
.news-card__link:focus-visible .news-card__linkIcon {
  transform: translateX(4px);
}

.news-card__link:focus-visible {
  outline: 2px solid rgba(10, 101, 112, 0.4);
  outline-offset: 3px;
}

.news-card--rtl .news-card__linkIcon {
  transform: scaleX(-1);
}

.news-card--rtl .news-card__link:hover .news-card__linkIcon,
.news-card--rtl .news-card__link:focus-visible .news-card__linkIcon {
  transform: translateX(-4px) scaleX(-1);
}
</style>
