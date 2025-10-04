<script lang="ts">
import { defineComponent, PropType } from "vue";
type Align = "left" | "center" | "right" | "auto";
type VAlign = "top" | "middle" | "bottom";

export default defineComponent({
  name: "HeroBanner",
  props: {
    title: { type: String, default: "" },
    subtitle: { type: String, default: "" },
    titleKey: { type: String, default: "" },
    subtitleKey: { type: String, default: "" },

    mediaSrc: { type: String, default: "" },
    height: { type: String, default: "60vh" },
    objectPosition: { type: String, default: "center" },

    align: { type: String as PropType<Align>, default: "auto" },
    valign: { type: String as PropType<VAlign>, default: "middle" },
    boxed: { type: Boolean, default: true },

    overlay: { type: Boolean, default: true },
    overlayCss: {
      type: String,
      default:
        "linear-gradient(180deg, rgba(0,0,0,.55) 0%, rgba(0,0,0,.35) 45%, rgba(0,0,0,.55) 100%)",
    },
    contentMaxWidth: { type: String, default: "640px" },

    /* Direction handling */
    dir: { type: String as () => "ltr" | "rtl", default: "ltr" }, // fallback
    autoDir: { type: Boolean, default: true }, // detect from $i18n.locale
    flipForRtl: { type: Boolean, default: true }, // mirror bg in RTL

    radius: { type: String, default: "6px" },
    withImg: { type: Boolean, default: true },
  },
  computed: {
    locale(): string {
      // @ts-ignore – vue-i18n injected
      return (this as any).$i18n?.locale ?? "en";
    },
    computedDir(): "ltr" | "rtl" {
      if (!this.autoDir) return this.dir;
      return this.locale.startsWith("ar") ? "rtl" : "ltr";
    },
    resolvedAlign(): "left" | "center" | "right" {
      if (this.align === "auto")
        return this.computedDir === "rtl" ? "right" : "left";
      return this.align as any;
    },
    titleText(): string {
      // @ts-ignore
      const t = (k: string) => ((this as any).$t ? (this as any).$t(k) : k);
      return this.titleKey ? String(t(this.titleKey)) : this.title;
    },
    subtitleText(): string {
      // @ts-ignore
      const t = (k: string) => ((this as any).$t ? (this as any).$t(k) : k);
      return this.subtitleKey ? String(t(this.subtitleKey)) : this.subtitle;
    },
    styleVars(): Record<string, string> {
      return {
        "--hero-h": this.height,
        "--hero-radius": this.boxed ? this.radius : "0px",
        "--hero-object-pos": this.objectPosition,
        "--hero-content-max": this.contentMaxWidth,
        "--hero-overlay": this.overlay ? this.overlayCss : "none",
      };
    },
    classes(): Record<string, boolean> {
      return {
        hero: true,
        "hero--boxed": this.boxed,
        "hero--left": this.resolvedAlign === "left",
        "hero--center": this.resolvedAlign === "center",
        "hero--right": this.resolvedAlign === "right",
        "hero--top": this.valign === "top",
        "hero--middle": this.valign === "middle",
        "hero--bottom": this.valign === "bottom",
      };
    },
    mediaStyle(): Record<string, string> {
      const base =
        this.withImg && this.mediaSrc
          ? {
              backgroundImage: `url('${this.mediaSrc}')`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: this.objectPosition,
            }
          : {
              background:
                "linear-gradient(135deg,#2b3990 0%,#0b155e 50%,#051236 100%)",
            };

      if (this.flipForRtl && this.computedDir === "rtl") {
        base.transform = "scaleX(-1)";
        base.transformOrigin = "center";
      }
      return base;
    },
  },
});
</script>

<template>
  <section
    :class="[classes, 'hero_main', { without_Img: !(withImg && mediaSrc) }]"
    :style="styleVars"
    :dir="computedDir"
  >
    <div class="hero__media" :style="mediaStyle" aria-hidden="true">
      <span v-if="overlay" class="hero__overlay" aria-hidden="true" />
    </div>

    <div class="hero__inner">
      <h1 class="hero__title">{{ titleText }}</h1>
      <p v-if="subtitleText" class="hero__subtitle">{{ subtitleText }}</p>
      <div class="hero__actions"><slot /></div>
    </div>
  </section>
</template>

<style scoped>
.hero_main.without_Img {
  background-color: #2b3990;
}
.hero--boxed {
  max-width: 100%;
  margin-inline: auto;
  padding-inline: 1.25rem;
}

.hero {
  position: relative;
  min-height: var(--hero-h);
  /* border-radius: var(--hero-radius); */
  overflow: hidden;
}
.hero__media {
  position: absolute;
  inset: 0;
  will-change: transform;
}
.hero__overlay {
  position: absolute;
  inset: 0;
  background: var(--hero-overlay);
  pointer-events: none;
}

.hero__inner {
  position: relative;
  z-index: 1;
  min-height: var(--hero-h);
  display: grid;
  grid-template-rows: 1fr auto 1fr;
  padding: min(8vh, 6rem) 0;
}

.hero--left .hero__inner {
  justify-items: start;
  text-align: start;
}
.hero--center .hero__inner {
  justify-items: center;
  text-align: center;
}
.hero--right .hero__inner {
  justify-items: flex-start;
  text-align: start;
}

.hero--top .hero__inner {
  align-items: start;
}
.hero--middle .hero__inner {
  align-items: center;
}
.hero--bottom .hero__inner {
  align-items: end;
}

.hero__title,
.hero__subtitle,
.hero__actions {
  width: min(100%, var(--hero-content-max));
  padding-inline: 1rem;
}
.hero__title {
  color: #fff;
  font-weight: 700;
  line-height: 1.05;
  font-size: clamp(1rem, 6vw, 3.25rem);
  margin: 0 0 0.75rem 0;
  text-wrap: balance;
}
.hero__subtitle {
  color: #e5e7eb;
  font-size: clamp(1rem, 2.3vw, 1.25rem);
  line-height: 1.65;
  margin: 0;
}
.hero__actions {
  margin-top: 1.25rem;
  display: flex;
  gap: 0.75rem;
}
</style>
