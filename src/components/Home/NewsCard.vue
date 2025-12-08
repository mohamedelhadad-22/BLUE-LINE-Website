<script lang="ts">
import { defineComponent } from "vue";
interface Post {
  id?: number;
  title?: string;
  summary?: String;
  link?: String;
  image?: string;
  icon?: string;
};
export default defineComponent({
  name: "NewsCard",
  props: {
    data: {
      type: Object as () => Post,
      required: true,
    },
  },
});
</script>

<template>
  <article class="news-card" :style="{ backgroundImage: `url(${data.image})` }">
    <div class="news-card__overlay"></div>
    <div class="news-card__content">
      <div class="news-card__icon">
        <img :src="data.icon || ''" :alt="data.title ? data.title : ''" />
      </div>
      <h3 class="news-card__title">
        {{ data.title }}
      </h3>
      <p class="news-card__description">
        {{ data.summary }}
      </p>
    </div>
  </article>
</template>

<style scoped>
.news-card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 450px;
  overflow: hidden;
  transition: transform 0.3s ease;
  max-width: 331px;
  max-height: 510px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
  justify-content: flex-end
}

.news-card:hover {
  transform: translateY(-4px);
}

.news-card__overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, #041B3C 100%);
  z-index: 1;
}

.news-card__content {
  position: relative;
  z-index: 2;
  display: flex;
  height: 100%;
  justify-content: flex-end;
  padding: 13.257px 13.257px 25.984px 19.09px;
  flex-direction: column;
  align-items: flex-start;
  gap: 8.485px;
}

.news-card__icon {
  width: 27.575px;
  height: 27.575px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.news-card__icon img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.news-card__title {
  color: #FFF;
  text-align: center;
  font-size: 19.09px;
  font-weight: 600;
  line-height: 14.848px;
}

.news-card__description {
  color: #FFF;
  font-size: 10.606px;
  font-weight: 500;
  line-height: normal;
}

@media (max-width: 768px) {
  .news-card {
    min-height: 380px;
  }

  .news-card__content {
    padding: 1.5rem;
  }

  .news-card__icon {
    width: 40px;
    height: 40px;
    margin-bottom: 1rem;
  }

  .news-card__title {
    font-size: 1.4rem;
  }

  .news-card__description {
    font-size: 0.95rem;
    max-width: 100%;
  }
}

@media (max-width: 480px) {
  .news-card {
    min-height: 320px;
  }

  .news-card__content {
    padding: 1.25rem;
  }

  .news-card__icon {
    width: 36px;
    height: 36px;
  }

  .news-card__title {
    font-size: 1.25rem;
    margin-bottom: 0.75rem;
  }

  .news-card__description {
    font-size: 0.9rem;
  }
}
</style>
