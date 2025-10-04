<script lang="ts">
import { defineComponent } from "vue";

type Step = {
  title: string;
  description: string;
};

export default defineComponent({
  name: "RecruitmentSteps",
  props: {
    heading: {
      type: String,
      default: "",
      required: false,
    },
    steps: {
      type: Array as () => Step[],
      required: true,
    },
    initiallyOpen: { type: Number, default: 0 }, // index
  },
  data() {
    return {
      openIndex: this.initiallyOpen,
      focusIndex: this.initiallyOpen,
    };
  },
  methods: {
    toggle(i: number) {
      this.openIndex = this.openIndex === i ? -1 : i;
      this.focusIndex = i;
    },
    onKeydown(i: number, e: KeyboardEvent) {
      const max = this.steps.length - 1;
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        this.focusIndex = i === max ? 0 : i + 1;
        (this.$refs[`btn-${this.focusIndex}`] as HTMLButtonElement)?.focus();
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        this.focusIndex = i === 0 ? max : i - 1;
        (this.$refs[`btn-${this.focusIndex}`] as HTMLButtonElement)?.focus();
      } else if (e.key === "Home") {
        e.preventDefault();
        this.focusIndex = 0;
        (this.$refs[`btn-0`] as HTMLButtonElement)?.focus();
      } else if (e.key === "End") {
        e.preventDefault();
        this.focusIndex = max;
        (this.$refs[`btn-${max}`] as HTMLButtonElement)?.focus();
      } else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        this.toggle(i);
      }
    },
    panelId(i: number) {
      return `step-panel-${i}`;
    },
    btnId(i: number) {
      return `step-button-${i}`;
    },
  },
});
</script>

<template>
  <div class="apply-steps">
    <div class="apply-steps__grid">
      <p class="apply-steps__eyebrow">{{ heading }}</p>

      <ul class="steps" role="list">
        <li v-for="(step, i) in steps" :key="i" class="step">
          <div class="step__header">
            <button
              class="step__button"
              :id="btnId(i)"
              :aria-expanded="openIndex === i"
              :aria-controls="panelId(i)"
              :ref="`btn-${i}`"
              @click="toggle(i)"
              @keydown="onKeydown(i, $event)"
            >
              <span class="step__title">
                <strong>{{ i + 1 }}.</strong> {{ step.title }}
              </span>

              <!-- plus/minus icon -->
              <span class="step__icon" aria-hidden="true">
                <svg
                  v-if="openIndex === i"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M5 12h14"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>
                <svg v-else width="20" height="20" viewBox="0 0 24 24">
                  <path
                    d="M12 5v14M5 12h14"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>
              </span>
            </button>
          </div>

          <div
            class="step__panel"
            :id="panelId(i)"
            role="region"
            :aria-labelledby="btnId(i)"
            :hidden="openIndex !== i"
          >
            <p class="step__desc">
              {{ step.description }}
            </p>
          </div>

          <hr class="step__divider" />
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.apply-steps {
}

.apply-steps__grid {
}

.apply-steps__media img {
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
  border-radius: 6px;
}

.apply-steps__eyebrow {
  font-size: 0.85rem;
  letter-spacing: 0.06em;
  font-weight: 700;
  text-transform: uppercase;
  color: #111827; /* near-black */
  margin: 0 0 1rem 0;
}

.steps {
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
}

.step__header {
  display: flex;
  align-items: center;
}

.step__button {
  appearance: none;
  border: none;
  background: transparent;
  padding: 2rem 0;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  text-align: start;
  cursor: pointer;
}

.step__button:focus-visible {
  outline: 2px solid #0ea5e9; /* sky-500 */
  outline-offset: 3px;
  border-radius: 4px;
}

.step__title {
  font-size: 1.35rem;
  line-height: 1.3;
  color: #111827;
}

.step__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.step__panel {
  padding: 0 0.125rem 1.75rem 0;
  color: #374151; /* gray-700 */
  font-size: 1rem;
}

.step__divider {
  border: 0;
  height: 1px;
  background: #e5e7eb; /* gray-200 */
}

/* Motion: subtle expand/collapse */
.step__panel[hidden] {
  display: block; /* keep height animation possible */
  max-height: 0;
  overflow: hidden;
  padding-bottom: 0;
}
.step__panel {
  transition:
    max-height 0.28s ease,
    padding 0.28s ease,
    opacity 0.28s ease;
  max-height: 180px; /* enough for one paragraph */
  opacity: 1;
}
.step__panel[hidden] {
  opacity: 0;
}

/* Responsive */
@media (max-width: 900px) {
  .apply-steps__grid {
    grid-template-columns: 1fr;
  }
  .apply-steps__media {
    order: -1;
  }
}
</style>
