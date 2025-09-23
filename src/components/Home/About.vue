<script lang="ts">
import { defineComponent, shallowRef } from "vue";
import anchor from "@/assets/anchor.vue";
import computerLine from "@/assets/computer-line.vue";
import sunIcon from "@/assets/sun.vue";

type ComposerLocale = {
  value: string;
};

type ComposerInstance = {
  locale: ComposerLocale;
};

export default defineComponent({
  name: "AboutSection",
  computed: {
    composerLocale(): string {
      const composer = (this.$i18n as unknown as ComposerInstance | undefined)
        ?.locale;
      return composer?.value ?? "en";
    },
    isArabic(): boolean {
      return this.composerLocale.startsWith("ar");
    },
    sectionDirection(): "rtl" | "ltr" {
      return this.isArabic ? "rtl" : "ltr";
    },
    sectionLanguage(): "ar" | "en" {
      return this.isArabic ? "ar" : "en";
    },
  },
  data() {
    return {
      aboutUs__boxes: [
        {
          icon: shallowRef(anchor),
          text: "Digitalinnovation",
          id: 1,
        },
        {
          icon: shallowRef(computerLine),
          text: "Customer-centric",
          id: 1,
        },
        {
          icon: shallowRef(sunIcon),
          text: "Innovativesolutions",
          id: 1,
        },
      ],
    };
  },
});
</script>

<template>
  <section id="about" class="about-section">
    <div class="about-shell">
      <div class="about-content">
        <div class="about-tag">
          <span class="about-icon" aria-hidden="true">
            <svg viewBox="0 0 48 48">
              <path
                d="M24 8l10 10-10 10-10-10 10-10zm0 12l10 10-10 10-10-10 10-10z"
              />
            </svg>
          </span>
          <span class="about-label">{{ $t("aboutSection.tag") }}</span>
        </div>

        <h1 class="about-heading">
          {{ $t("aboutSection.headline") }}
        </h1>
        <p class="about-description">
          {{ $t("aboutSection.headDescription") }}
        </p>
      </div>

      <div class="about-pattern" aria-hidden="true">
        <div class="pattern-block" v-for="n in 6" :key="n"></div>
      </div>
    </div>
    <div class="aboutUs__boxes">
      <div class="aboutUs__items">
        <div
          class="aboutUs__item"
          v-for="boxe in aboutUs__boxes"
          :key="boxe.id"
        >
          <div class="aboutUs__itemIcon">
            <component :is="boxe.icon"></component>
          </div>
          <p class="aboutUs__itemText">
            {{ $t(`aboutSection.${boxe.text}`) }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-section {
  position: relative;
  width: 100%;
  padding: clamp(3rem, 7vw, 6rem) clamp(1.5rem, 8vw, 6rem);
  background: #eff6f5;
  overflow: hidden;
}

.about-shell {
  display: grid;
  grid-template-columns: minmax(0, 1fr) clamp(180px, 25vw, 260px);
  align-items: stretch;
  gap: clamp(2rem, 6vw, 4rem);
  max-width: 1240px;
  margin: 0 auto;
}

.about-content {
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
}

.about-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #222b39;
}

.about-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: linear-gradient(
    135deg,
    rgba(128, 82, 255, 0.85),
    rgba(82, 224, 255, 0.7)
  );
}

.about-icon svg {
  width: 22px;
  height: 22px;
  fill: #ffffff;
}

.about-heading {
  font-size: clamp(4rem, 3.6129032258vw, 5.6rem);
  line-height: 1.2;
  font-weight: 300;
}

.about-pattern {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, clamp(80px, 12vw, 110px));
  gap: clamp(0.75rem, 2vw, 1.5rem);
  align-self: center;
  justify-self: stretch;
}

.pattern-block {
  background: #fff;
  border-radius: clamp(10px, 2vw, 16px);
}

.pattern-block:nth-child(2),
.pattern-block:nth-child(5) {
  background: transparent;
}

.about-section[dir="rtl"] .about-shell {
  direction: rtl;
}

.about-section[dir="rtl"] .about-content {
  text-align: right;
}
.about-description {
  flex: 1;
  line-height: 1.4;
  font-size: 1.4rem;
  color: var(--color-secondary);
}

.aboutUs__boxes {
  margin-top: 8rem;
}
.aboutUs__items {
  display: flex;
  flex-direction: row;
  gap: 2.8rem;
  justify-content: space-between;
  width: 100%;
}
.aboutUs__item {
  display: flex;
  position: relative;
  flex: 1 0 30%;
  gap: 1.6rem;
  border: 1px solid #dadada;
  border-radius: 8px;
  padding: 1.6rem 2.4rem;
  line-height: 1.4;
  font-size: 2.4rem;
}
.aboutUs__itemIcon {
  display: flex;
  flex: 0 0 5rem;
  align-items: center;
  justify-content: center;
  background-color: #2b39901e;
  width: 4rem;
  height: 4rem;
  border-radius: 2px;
}
.aboutUs__itemIcon svg {
  width: 20px;
  height: 20px;
}
.aboutUs__itemText {
    flex: 1 0 70%;
}
@media (max-width: 960px) {
  .about-shell {
    grid-template-columns: 1fr;
  }

  .about-pattern {
    order: -1;
    justify-self: center;
    opacity: 0.6;
  }
}

@media (max-width: 640px) {
  .about-section {
    padding-block: clamp(2.5rem, 10vw, 4rem);
  }

  .about-pattern {
    grid-template-columns: repeat(3, 76px);
    grid-template-rows: repeat(2, 76px);
  }

  .pattern-block:nth-child(5) {
    background: rgba(220, 235, 235, 0.9);
  }
}
</style>
<style>
.aboutUs__itemIcon svg path {
  fill: var(--color-secondary);
}
</style>
