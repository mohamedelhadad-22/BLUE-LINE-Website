<template>
    <section class="video-background">
        <video autoplay muted loop playsinline class="video" poster="@/assets/hero-teaser-poster.webp">
            <source :src="heroVideo" type="video/mp4" />
            Your browser does not support the video tag.
        </video>

        <div class="overlay">
            <slot />
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import heroVideo from '@/assets/hero-teaser-864.mp4';

export default defineComponent({
    name: 'BackgroundVideo',
    data() {
        return {
            heroVideo,
        };
    },
});
</script>

<style scoped>
.video-background {
    position: relative;
    width: 100%;
    height: 100vh;
    overflow: hidden;
}

.video {
    position: absolute;
    top: 50%;
    left: 50%;
    min-width: 100%;
    min-height: 100%;
    width: auto;
    height: auto;
    transform: translate(-50%, -50%);
    object-fit: cover;
    z-index: 0;
}

/* Overlay that allows content over video */
.overlay {
    position: relative;
    z-index: 1;
    width: 100%;
    height: 100%;
    padding: 0 2rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    color: white;
    background-color: #00000091;
}
</style>
