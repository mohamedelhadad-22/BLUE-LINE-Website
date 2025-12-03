<template>
    <div ref="cardRef" class="stat-card">
        <div class="stat-card__icon" :class="{FlatIcon: isFlatIcon}">
            <img v-if="iconType === 'image'" :src="icon as string" :alt="text" />
            <component v-else-if="iconType === 'component'" :is="icon" />
            <div v-else v-html="icon as string"></div>
        </div>

        <div v-if="number !== undefined" class="stat-card__number">
            {{ displayNumber }}{{ suffix }}
        </div>

        <div class="stat-card__text">
            {{ text }}
        </div>
        <p class="stat-card__desc">
            {{ desc }}
        </p>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

interface Props {
    icon: string | object;
    number?: number;
    text: string;
    desc?: string;
    suffix?: string;
    duration?: number;
    iconType?: 'image' | 'component' | 'svg';
    delay?: number;
    isFlatIcon?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    suffix: '+',
    duration: 2000,
    iconType: 'image',
    delay: 0,
});

const cardRef = ref<HTMLElement | null>(null);
const displayNumber = ref(0);
const hasAnimated = ref(false);

const animateNumber = () => {
    if (hasAnimated.value || props.number === undefined) return;

    hasAnimated.value = true;
    const start = 0;
    const end = props.number;
    const duration = props.duration;
    const startTime = performance.now();

    const easeOutQuart = (x: number): number => {
        return 1 - Math.pow(1 - x, 4);
    };

    const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutQuart(progress);

        displayNumber.value = Math.floor(start + (end - start) * easedProgress);

        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            displayNumber.value = end;
        }
    };

    setTimeout(() => {
        requestAnimationFrame(animate);
    }, props.delay);
};

let observer: IntersectionObserver | null = null;

onMounted(() => {
    observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && !hasAnimated.value) {
                    animateNumber();
                }
            });
        },
        {
            threshold: 0.3,
            rootMargin: '0px',
        }
    );

    if (cardRef.value) {
        observer.observe(cardRef.value);
    }
});

onUnmounted(() => {
    if (observer && cardRef.value) {
        observer.unobserve(cardRef.value);
    }
});
</script>

<style scoped>
.stat-card {
    /* display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    text-align: center;
    gap: 16px;
    background: #ffffff;
    border-radius: 12px; */
    display: flex;
    max-width: 302px;
    max-height: 214px;
    padding: 34px;
    justify-content: center;
    align-items: center;
    gap: 16px;
    flex-direction: column;
    border-radius: 16px;
    border: 2px solid #F3F4F6;
    background: #FFF;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.stat-card:hover {
    /* transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08); */
    /* border: 0px; */
}

.stat-card__icon {
    display: flex;
    width: 56px;
    height: 56px;
    padding: 16px 17px;
    justify-content: center;
    align-items: center;
    border-radius: 1440px;
    background: #F4EBFF;
}
.stat-card__icon.FlatIcon {
    background: transparent;
    padding: 0;
}
.stat-card__icon img {
    width: 100%;
    height: 100%;
    max-width: 24px;
    max-height: 24px;
    object-fit: contain;
    filter: brightness(0) invert(1);
}

.stat-card__icon :deep(svg) {
    width: 24px;
    height: 24px;
}

.stat-card__number {
    font-size: 2.5rem;
    font-weight: 700;
    color: #1a202c;
    line-height: 1;
    letter-spacing: -0.02em;
}

.stat-card__text {
    font-size: 1rem;
    font-weight: 500;
    color: #718096;
    text-transform: capitalize;
}

.stat-card__desc {
    color: #71717A;
    text-align: center;
    font-family: Inter;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}

/* Responsive */
@media (max-width: 768px) {
    .stat-card {
        padding: 1.5rem;
    }

    .stat-card__icon {
        width: 56px;
        height: 56px;
    }

    .stat-card__number {
        font-size: 2rem;
    }

    .stat-card__text {
        font-size: 0.875rem;
        text-align: center;
    }
}
</style>