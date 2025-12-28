<template>
  <div class="lazy-image-wrapper" :style="{ aspectRatio: aspectRatio || 'auto' }">
    <img
      v-if="isLoaded || isInView"
      :src="isInView ? src : placeholder"
      :alt="alt"
      :class="['lazy-image', { 'is-loaded': isLoaded }]"
      @load="onImageLoad"
      @error="onImageError"
      loading="lazy"
    />
    <div v-if="!isLoaded && isInView" class="lazy-image-loader">
      <div class="spinner"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue';

export default defineComponent({
  name: 'LazyImage',
  props: {
    src: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E',
    },
    aspectRatio: {
      type: String,
      default: null,
    },
  },
  setup(props) {
    const isInView = ref(false);
    const isLoaded = ref(false);
    const imageRef = ref<HTMLElement | null>(null);
    let observer: IntersectionObserver | null = null;

    const onImageLoad = () => {
      isLoaded.value = true;
    };

    const onImageError = () => {
      console.error(`Failed to load image: ${props.src}`);
    };

    onMounted(() => {
      // Use Intersection Observer for better performance
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              isInView.value = true;
              if (observer && entry.target) {
                observer.unobserve(entry.target);
              }
            }
          });
        },
        {
          rootMargin: '50px', // Start loading 50px before the image enters viewport
        }
      );

      if (imageRef.value) {
        observer.observe(imageRef.value);
      }
    });

    onUnmounted(() => {
      if (observer) {
        observer.disconnect();
      }
    });

    return {
      isInView,
      isLoaded,
      imageRef,
      onImageLoad,
      onImageError,
    };
  },
});
</script>

<style scoped>
.lazy-image-wrapper {
  position: relative;
  overflow: hidden;
  background-color: #f0f0f0;
}

.lazy-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}

.lazy-image.is-loaded {
  opacity: 1;
}

.lazy-image-loader {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #2970ff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
