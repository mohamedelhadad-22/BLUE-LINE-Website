<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";

// Types
type MissionKey = "mission" | "vision" | "purpose";

interface MissionCard {
  key: MissionKey;
  icon: string;
  alt: string;
}

// Composables
const { locale } = useI18n();

// Data
const cards: MissionCard[] = [
  {
    key: "mission",
    icon: new URL("@/assets/Frame 15.svg", import.meta.url).href,
    alt: "Mission Icon",
  },
  {
    key: "vision",
    icon: new URL("@/assets/Frame 14.svg", import.meta.url).href,
    alt: "Vision Icon",
  },
  {
    key: "purpose",
    icon: new URL("@/assets/Frame 16.svg", import.meta.url).href,
    alt: "Purpose Icon",
  },
];

// Computed
const isArabic = computed(() => locale.value.startsWith("ar"));
const sectionDirection = computed(() => (isArabic.value ? "rtl" : "ltr"));
</script>

<template>
  <section id="mission" class="mission-section" :dir="sectionDirection">
    <div class="mission-shell">
      <!-- <header class="mission-header">
                <span class="mission-kicker">
                    {{ $t('missionSection.kicker') }}
                </span>
                <h2 class="mission-title">
                    {{ $t('missionSection.title') }}
                </h2>
                <p class="mission-subtitle">
                    {{ $t('missionSection.subtitle') }}
                </p>
            </header> -->

      <div class="mission-grid" :class="{ 'is-rtl': isArabic }">
        <article
          v-for="card in cards"
          :key="card.key"
          :class="card.key"
          class="mission-card"
        >
          <div class="mission-icon">
            <img :src="card.icon" :alt="card.alt" />
          </div>

          <h3 class="mission-card__title">
            {{ $t(`missionSection.items.${card.key}.title`) }}
          </h3>
          <p class="mission-card__body">
            {{ $t(`missionSection.items.${card.key}.body`) }}
          </p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Section Styles */
.mission-section {
  position: relative;
  width: 100%;
  background: #ffffff;
  color: #172235;
  overflow: hidden;
}

.mission-shell {
  margin: 0 auto;
  max-width: 100%;
}

/* Grid Layout */
.mission-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0;
}

.mission-grid.is-rtl {
  direction: rtl;
}

/* Card Styles */
.mission-card {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  min-height: 100dvh;
  padding: clamp(2rem, 4vw, 3rem) clamp(1.5rem, 3vw, 2.5rem);
  border-inline-start: 1px solid #ecf0f8;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  overflow: hidden;
}

/* Card Background Colors */
.mission-card.mission {
  background: rgba(46, 90, 222, 0.08);
}

.mission-card.vision {
  background: rgba(29, 58, 144, 0.08);
}

.mission-card.purpose {
  background: rgba(0, 174, 255, 0.08);
}

/* Remove border from first card */
.mission-grid .mission-card:first-child {
  border-inline-start: none;
}

/* Hover Effects */
.mission-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), transparent);
  opacity: 0;
  transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: none;
}

.mission-card:hover::before {
  opacity: 1;
}

.mission-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.mission-card.mission:hover {
  background: rgba(46, 90, 222, 0.12);
}

.mission-card.vision:hover {
  background: rgba(29, 58, 144, 0.12);
}

.mission-card.purpose:hover {
  background: rgba(0, 174, 255, 0.12);
}

/* Icon Styles */
.mission-icon {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.mission-card:hover .mission-icon {
  transform: scale(1.1) rotate(5deg);
}

.mission-icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: filter 0.3s ease;
}

.mission-card:hover .mission-icon img {
  filter: brightness(1.1);
}

/* Typography */
.mission-card__title {
  color: #000000;
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 700;
  line-height: 1.2;
  margin: 0 0 1rem;
  margin-top: clamp(6rem, 12vw, 10rem);
  transition:
    color 0.3s ease,
    transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.mission-card:hover .mission-card__title {
  color: #172235;
  transform: translateX(4px);
}

.mission-grid.is-rtl .mission-card:hover .mission-card__title {
  transform: translateX(-4px);
}

.mission-card__body {
  margin: 0;
  color: #4d5558;
  font-size: clamp(1rem, 2vw, 1.5rem);
  font-weight: 400;
  line-height: 1.5;
  transition:
    color 0.3s ease,
    transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: 0.05s;
}

.mission-card:hover .mission-card__body {
  color: #172235;
  transform: translateX(4px);
}

.mission-grid.is-rtl .mission-card:hover .mission-card__body {
  transform: translateX(-4px);
}

/* Text Alignment */
.mission-grid.is-rtl .mission-card__title,
.mission-grid.is-rtl .mission-card__body {
  text-align: right;
}

.mission-grid:not(.is-rtl) .mission-card__title,
.mission-grid:not(.is-rtl) .mission-card__body {
  text-align: left;
}

/* Responsive Styles */
@media (max-width: 1024px) {
  .mission-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .mission-card {
    min-height: 60vh;
  }

  .mission-card__title {
    font-size: clamp(1.25rem, 2.5vw, 1.75rem);
    margin-top: clamp(4rem, 8vw, 6rem);
  }

  .mission-card__body {
    font-size: clamp(0.9rem, 1.8vw, 1.25rem);
  }
}

@media (max-width: 720px) {
  .mission-grid {
    grid-template-columns: 1fr;
  }

  .mission-card {
    min-height: auto;
    padding: clamp(2rem, 5vw, 3rem) clamp(1.25rem, 4vw, 2rem);
    border-inline-start: none;
    border-top: 1px solid #ecf0f8;
  }

  .mission-card:first-child {
    border-top: none;
  }

  .mission-card:hover {
    transform: translateY(-4px);
  }

  .mission-card__title {
    margin-top: clamp(2rem, 4vw, 3rem);
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .mission-card,
  .mission-card::before,
  .mission-icon,
  .mission-icon img,
  .mission-card__title,
  .mission-card__body {
    transition: none;
  }

  .mission-card:hover {
    transform: none;
  }

  .mission-card:hover .mission-icon {
    transform: none;
  }

  .mission-card:hover .mission-card__title,
  .mission-card:hover .mission-card__body {
    transform: none;
  }
}

@media (max-width: 568px) {
  .mission-card {
    align-items: center;
    text-align: center
  }
  .mission-card__body{
    text-align: center !important;
  }
}
</style>
