<script lang="ts">
import { defineComponent, shallowRef } from "vue";
import locationPinIcon from "@/assets/svg/locationPinIcon.vue";

type ComposerLocale = { value: string };
type ComposerInstance = { locale: ComposerLocale };

interface Location {
  id: number;
  country: string;
  description: string;
  isActive: boolean;
}

export default defineComponent({
  name: "OurLocations",
  computed: {
    composerLocale(): string {
      return (
        (this.$i18n as unknown as ComposerInstance | undefined)?.locale
          ?.value ?? "en"
      );
    },
    isArabic(): boolean {
      return this.composerLocale.startsWith("ar");
    },
    sectionDirection(): "rtl" | "ltr" {
      return this.isArabic ? "rtl" : "ltr";
    },
  },
  data() {
    return {
      locationIcon: shallowRef(locationPinIcon),
      locations: [
        {
          id: 1,
          country: "Egypt",
          description:
            "Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator.",
          isActive: true,
        },
        {
          id: 2,
          country: "Saudi Arabia",
          description:
            "Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator.",
          isActive: false,
        },
        {
          id: 3,
          country: "Brazil",
          description:
            "Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator.",
          isActive: false,
        },
        {
          id: 4,
          country: "Spain",
          description:
            "Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator.",
          isActive: false,
        },
      ] as Location[],
    };
  },
  methods: {
    setActiveLocation(id: number) {
      this.locations = this.locations.map((location) => ({
        ...location,
        isActive: location.id === id,
      }));
    },
  },
});
</script>

<template>
  <section id="locations" class="locations-section" :dir="sectionDirection">
    <div class="locations-shell">
      <div class="locations-content">
        <!-- Left side: Locations list -->
        <div class="locations-list">
          <h2 class="locations-title">Our Locations</h2>

          <div class="location-cards">
            <div
              v-for="location in locations"
              :key="location.id"
              :class="[
                'location-card',
                { 'location-card--active': location.isActive },
              ]"
              @click="setActiveLocation(location.id)"
              @keypress.enter="setActiveLocation(location.id)"
              tabindex="0"
              role="button"
              :aria-pressed="location.isActive"
            >
              <div class="location-card-content">
                <div class="location-icon">
                  <component :is="locationIcon"></component>
                </div>
                <div class="location-info">
                  <h3 class="location-country">{{ location.country }}</h3>
                  <p class="location-description">{{ location.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right side: Map visualization -->
        <div class="locations-map">
          <div class="map-background">
            <!-- World map background -->
            <img
              src="@/assets/map-background.svg"
              alt="World Map"
              class="map-world"
            />

            <!-- World map overlay with continents -->
            <img
              src="@/assets/map-overlay.svg"
              alt="Continents"
              class="map-overlay"
            />

            <!-- Location markers container -->
            <div class="location-markers">
              <!-- Egypt marker -->
              <div
                class="location-marker location-marker--egypt"
                :class="{ active: locations[0]?.isActive }"
              >
                <div class="marker-pulse"></div>
                <div class="marker-dot"></div>
              </div>

              <!-- Saudi Arabia marker -->
              <div
                class="location-marker location-marker--saudi"
                :class="{ active: locations[1]?.isActive }"
              >
                <div class="marker-pulse"></div>
                <div class="marker-dot"></div>
              </div>

              <!-- Brazil marker -->
              <div
                class="location-marker location-marker--brazil"
                :class="{ active: locations[2]?.isActive }"
              >
                <div class="marker-pulse"></div>
                <div class="marker-dot"></div>
              </div>

              <!-- Spain marker -->
              <div
                class="location-marker location-marker--spain"
                :class="{ active: locations[3]?.isActive }"
              >
                <div class="marker-pulse"></div>
                <div class="marker-dot"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.locations-section {
  position: relative;
  width: 100%;
  background: #1d3a8f;
  color: #ffffff;
  padding: clamp(3rem, 6vw, 6rem) 0;
  overflow: hidden;
}

.locations-shell {
  margin: 0 auto;
  width: 100%;
  max-width: 1920px;
}

.locations-content {
  display: grid;
  grid-template-columns: 679px 1fr;
  min-height: 1080px;
}

/* Left side - Locations list */
.locations-list {
  padding: clamp(2rem, 4vw, 8rem) clamp(2rem, 4vw, 7.5rem);
  background: #1d3a8f;
  position: relative;
  z-index: 2;
}

.locations-title {
  font-family: "Lato", sans-serif;
  font-weight: 700;
  font-size: clamp(24px, 3vw, 32px);
  line-height: 1.2;
  color: #ffffff;
  margin: 0 0 clamp(2rem, 4vw, 3rem);
}

.location-cards {
  display: flex;
  flex-direction: column;
  gap: clamp(1rem, 2vw, 1.5rem);
}

.location-card {
  position: relative;
  padding: clamp(1.5rem, 3vw, 2.25rem) clamp(1.25rem, 2.5vw, 2rem);
  border: 1px solid #ffffff;
  background: transparent;
  transition: all 0.3s ease;
  cursor: pointer;
  outline: none;
}

.location-card:hover {
  background: rgba(56, 89, 185, 0.3);
  border-color: #ffffff;
}

.location-card:focus-visible {
  outline: 2px solid #ffffff;
  outline-offset: 2px;
}

.location-card--active {
  background: #3859b9;
  border-color: #3859b9;
}

.location-card--active:hover {
  background: #3859b9;
}

.location-card-content {
  display: flex;
  gap: clamp(1rem, 2vw, 1.5rem);
  align-items: flex-start;
}

.location-icon {
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.location-info {
  flex: 1;
  min-width: 0;
}

.location-country {
  font-family: "Lato", sans-serif;
  font-weight: 700;
  font-size: clamp(18px, 2vw, 24px);
  line-height: 1.2;
  color: #ffffff;
  margin: 0 0 clamp(0.5rem, 1vw, 0.75rem);
}

.location-description {
  font-family: "Lato", sans-serif;
  font-weight: 300;
  font-size: clamp(16px, 1.5vw, 20px);
  line-height: 1.45;
  letter-spacing: 0.03em;
  color: #ffffff;
  margin: 0;
  opacity: 0.95;
}

/* Right side - Map */
.locations-map {
  position: relative;
  background: linear-gradient(180deg, #1d3a8f 0%, #2b3990 100%);
  overflow: hidden;
}

.map-background {
  position: relative;
  width: 100%;
  height: 100%;
  aspect-ratio: 16 / 9; /* Maintain consistent aspect ratio */
  margin: 0 auto;
}

.map-world {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain; /* Changed from cover to contain to prevent distortion */
  object-position: center;
  opacity: 0.15;
}

.map-overlay {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain; /* Changed from cover to contain to prevent distortion */
  object-position: center;
  opacity: 1;
  mix-blend-mode: lighten;
}

/* Location markers */
.location-markers {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.location-marker {
  position: absolute;
  transform: translate(-50%, -50%);
  width: 44px;
  height: 44px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

/* .location-marker--egypt {
  left: 50rem;
  top: 30rem;
}

.location-marker--saudi {
  left: 56rem;
  top: 33rem;
}

.location-marker--brazil {
  left: 14rem;
  top: 40rem;
}

.location-marker--spain {
  left: 22rem;
  top: 12rem;
} */

/* Specific marker positions - based on world map geography */
.location-marker--egypt {
  left: 58%;
  top: 46%;
}

.location-marker--saudi {
  left: 62%;
  top: 48%;
}

.location-marker--brazil {
  left: 34%;
  top: 54%;
}

.location-marker--spain {
  left: 39%;
  top: 30%;
}

.marker-pulse {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: #000;
  opacity: 0.15;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.marker-dot {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: white;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.location-marker:not(.active) .marker-pulse {
  opacity: 0.15;
}

.location-marker.active .marker-pulse {
  opacity: 0.5;
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.location-marker.active .marker-dot {
  background: #fff;
  animation: marker-glow 2s ease-in-out infinite;
}

@keyframes pulse {
  0%,
  100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.5;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.15);
    opacity: 0.3;
  }
}

@keyframes marker-glow {
  0%,
  100% {
    filter: drop-shadow(0 0 8px rgba(142, 253, 111, 0.8));
  }
  50% {
    filter: drop-shadow(0 0 16px rgba(142, 253, 111, 1));
  }
}

/* Responsive Design */
@media (max-width: 1400px) {
  .locations-content {
    grid-template-columns: 580px 1fr;
  }

  .marker-dot {
    width: 26px;
    height: 26px;
  }
  /* Specific marker positions - based on world map geography */
  .location-marker--egypt {
    left: 58%;
    top: 46%;
  }

  .location-marker--saudi {
    left: 62%;
    top: 49%;
  }

  .location-marker--brazil {
    left: 36%;
    top: 54%;
  }

  .location-marker--spain {
    left: 38%;
    top: 39%;
  }
}

@media (max-width: 1024px) {
  .locations-content {
    grid-template-columns: 1fr;
    min-height: auto;
  }

  .locations-list {
    padding: clamp(2rem, 4vw, 4rem) clamp(1.5rem, 4vw, 3rem);
  }

  .locations-map {
    min-height: 500px;
    position: relative;
  }

  .map-background {
    aspect-ratio: 16 / 9;
  }

  /* Adjust marker sizes for tablets */
  .location-marker {
    width: 40px;
    height: 40px;
  }

  .marker-pulse {
    width: 60px;
    height: 60px;
  }

  .marker-dot {
    width: 26px;
    height: 26px;
  }
  /* Specific marker positions - based on world map geography */
  .location-marker--egypt {
    left: 58%;
    top: 46%;
  }

  .location-marker--saudi {
    left: 62%;
    top: 48%;
  }

  .location-marker--brazil {
    left: 34%;
    top: 58%;
  }

  .location-marker--spain {
    left: 39%;
    top: 22%;
  }
}

@media (max-width: 720px) {
  .locations-section {
    padding: clamp(2rem, 4vw, 3rem) 0;
  }

  .location-card-content {
    flex-direction: column;
    gap: 0.75rem;
  }

  .locations-map {
    min-height: 400px;
  }

  .map-background {
    aspect-ratio: 16 / 9; /* Maintain aspect ratio on mobile */
  }

  /* Smaller markers for mobile */
  .location-marker {
    width: 45px;
    height: 45px;
  }

  .marker-pulse {
    width: 45px;
    height: 45px;
  }

  .marker-dot {
    width: 27px;
    height: 27px;
  }
}

@media (max-width: 480px) {
  .locations-map {
    min-height: 350px;
  }

  .map-background {
    aspect-ratio: 16 / 9; /* Maintain aspect ratio on very small screens */
  }

  /* Even smaller markers for very small screens */
  .location-marker {
    width: 35px;
    height: 35px;
  }

  .marker-pulse {
    width: 20px;
    height: 20px;
  }

  .marker-dot {
    width: 16px;
    height: 16px;
  }
  /* Specific marker positions - based on world map geography */
  .location-marker--egypt {
    left: 58%;
    top: 46%;
  }

  .location-marker--saudi {
    left: 62%;
    top: 48%;
  }

  .location-marker--brazil {
    left: 34%;
    top: 58%;
  }

  .location-marker--spain {
    left: 39%;
    top: 22%;
  }
}

/* RTL Support */
.locations-section[dir="rtl"] .location-card-content {
  direction: rtl;
}

.locations-section[dir="rtl"] .location-info {
  text-align: right;
}
</style>
