<template>
  <transition name="overlay-fade">
    <div v-if="open" class="popup-overlay" @click.self="close">
      <transition name="popup-scale">
        <div
          class="popup"
          role="dialog"
          :aria-labelledby="ids.title"
          aria-modal="true"
        >
          <button class="popup-close" @click="close" :aria-label="$t('Close')">
            <ColseIcon />
          </button>
          <h2 class="popup-title" :id="ids.title">
            {{ $t("stakeholders.ContactUs") }}
          </h2>

          <form class="popup-form" @submit.prevent="submitForm">
            <label class="popup-field">
              <span>{{ $t("stakeholders.CompanyName") }}</span>
              <input
                v-model="form.company"
                :placeholder="$t('stakeholders.CompanyName')"
                autocomplete="organization"
                required
              />
            </label>

            <label class="popup-field">
              <span>{{ $t("stakeholders.Industry") }}</span>
              <input
                v-model="form.industry"
                :placeholder="$t('stakeholders.Industry')"
                autocomplete="organization-title"
                required
              />
            </label>

            <label class="popup-field">
              <span>{{ $t("stakeholders.CommercialRegistration") }}</span>
              <input
                v-model="form.registration"
                :placeholder="$t('stakeholders.CommercialRegistration')"
                inputmode="numeric"
                required
              />
            </label>

            <button type="button" @click="submitForm" class="popup-submit">
              {{ $t("stakeholders.submit") }}
            </button>
          </form>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script lang="ts">
import ColseIcon from "@/assets/svg/colseIcon.vue";
import { defineComponent } from "vue";
export default defineComponent({
  name: "ContactPopup",
  components: { ColseIcon },
  props: {
    open: { type: Boolean, default: false },
    rtl: { type: Boolean, default: false },
  },
  data() {
    return {
      ids: { title: "contact-popup-title" },
      form: { company: "", industry: "", registration: "" },
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    submitForm() {
      this.$emit("submit", { ...this.form });
      this.form.company = "";
      this.form.industry = "";
      this.form.registration = "";
      this.close();
    },
  },
});
</script>

<style scoped>
/* Transitions */
.overlay-fade-enter-active,
.overlay-fade-leave-active {
  transition: opacity 200ms ease;
}
.overlay-fade-enter-from,
.overlay-fade-leave-to {
  opacity: 0;
}

.popup-scale-enter-active,
.popup-scale-leave-active {
  transition:
    transform 220ms ease,
    opacity 220ms ease;
}
.popup-scale-enter-from,
.popup-scale-leave-to {
  transform: translateY(10px) scale(0.98);
  opacity: 0;
}

/* Overlay */
.popup-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: grid;
  place-items: center;
  z-index: 1000;
}

/* Panel */
.popup {
  width: min(640px, 92vw);
  background: #262262;
  color: #fff;
  border-radius: 8px;
  padding: 28px 24px 18px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  border: 1px solid #2b3990;
  position: relative;
}

/* Close */
.popup-close {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 28px;
  height: 28px;
  cursor: pointer;
  background: none;
  border: none;
  outline: none;
}
.arabic .popup-close {
  left: 12px;
  right: unset;
}
/* Title */
.popup-title {
  margin: 0 0 18px;
  font-size: clamp(18px, 2.2vw, 24px);
  font-weight: 700;
}

/* Form */
.popup-form {
  display: grid;
  gap: 14px;
}
.popup-field {
  display: grid;
  gap: 6px;
}
.popup-field span {
  font-size: 14px;
  font-weight: 600;
  color: #fff;
}

/* Inputs */
.popup-field input {
  height: 44px;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #2b3990;
  background: #fff;
  color: #0a1b17;
  outline: none;
}
.popup-field input:focus-visible {
  box-shadow: 0 0 0 2px #27a9e148;
  border-color: #2b3990;
}

/* Submit */
.popup-submit {
  margin-top: 8px;
  height: 48px;
  border-radius: 6px;
  width: 100%;
  border: none;
  background: #27aae1;
  color: #041a15;
  font-weight: 800;
  cursor: pointer;
}
.popup-submit:focus-visible {
  outline: 2px solid #27a9e148;
  outline-offset: 2px;
}
</style>
<style>
.popup-close svg path {
  stroke: #fff;
}
</style>
