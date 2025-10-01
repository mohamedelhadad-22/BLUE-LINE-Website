<template>
  <transition name="fade-scale">
    <div
      v-if="open"
      class="tm-modal"
      role="dialog"
      aria-modal="true"
      :aria-labelledby="labelId"
      @keydown.esc.prevent="emitClose"
      tabindex="-1"
      ref="dialog"
    >
      <div class="tm-modal__overlay" @click="emitClose" />
      <div class="tm-modal__panel">
        <button class="tm-modal__close" @click="emitClose" aria-label="Close">
          ×
        </button>
        <div class="tm-modal__body" v-if="member">
          <div class="tm-modal__media">
            <img :src="member.image" :alt="member.name" />
          </div>
          <div class="tm-modal__content">
            <h3 class="tm-modal__name" :id="labelId">{{ member.name }}</h3>
            <div class="tm-modal__role">{{ member.role }}</div>
            <p class="tm-modal__bio">{{ member.bio }}</p>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";
export interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  bio: string;
}

export default defineComponent({
  name: "TeamMemberModal",
  props: {
    open: { type: Boolean, required: true },
    member: { type: Object as PropType<TeamMember | null>, default: null },
  },
  emits: ["close"],
  computed: {
    labelId(): string {
      return this.member ? `team-name-${this.member.id}` : "team-name";
    },
  },
  watch: {
    open(val: boolean) {
      if (val) {
        this.$nextTick(() => {
          (this.$refs.dialog as HTMLElement | undefined)?.focus();
        });
      }
    },
  },
  methods: {
    emitClose() {
      console.log('closeModal')
      this.$emit("close");
    },
  },
});
</script>

<style scoped>
.tm-modal {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: grid;
  place-items: center;
  outline: none;
}
.tm-modal__overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: saturate(140%) blur(2px);
}
.tm-modal__panel {
  position: relative;
  background: #fff;
  width: min(880px, calc(100% - 32px));
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}
.tm-modal__close {
  position: absolute;
  top: 12px;
  right: 12px;
  background: transparent;
  font-size: 24px;
  line-height: 1;
  cursor: pointer;
}
.tm-modal__body {
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 24px;
  padding: 28px 32px;
}
.tm-modal__media img {
  width: 100%;
  height: auto;
  object-fit: cover;
  background: #eaf4f2;
}
.tm-modal__name {
  font-size: 22px;
  font-weight: 600;
  margin: 0 0 6px;
}
.tm-modal__role {
  color: #607374;
  margin-bottom: 16px;
}
.tm-modal__bio {
  line-height: 1.6;
  color: #222;
}
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition:
    opacity 180ms ease,
    transform 180ms ease;
}
.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.98);
}
@media (max-width: 640px) {
  .tm-modal__body {
    grid-template-columns: 1fr;
  }
}
</style>
