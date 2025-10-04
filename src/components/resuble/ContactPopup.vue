<template>
  <div
    v-if="open"
    class="popup-overlay"
    @click.self="close"
    :dir="rtl ? 'rtl' : 'ltr'"
  >
    <div
      class="popup"
      role="dialog"
      :aria-labelledby="ids.title"
      aria-modal="true"
    >
      <button class="popup-close" @click="close" :aria-label="t('Close')">
        ×
      </button>
      <h2 class="popup-title" :id="ids.title">{{ t("Contact us") }}</h2>

      <form class="popup-form" @submit.prevent="submit">
        <label class="popup-field">
          <span>{{ t("Name of the Company") }}</span>
          <input
            v-model="form.company"
            :placeholder="t('Enter the company name')"
            autocomplete="organization"
            required
          />
        </label>

        <label class="popup-field">
          <span>{{ t("Industry") }}</span>
          <input
            v-model="form.industry"
            :placeholder="t('Enter the industry')"
            autocomplete="organization-title"
            required
          />
        </label>

        <label class="popup-field">
          <span>{{ t("Commercial Registration") }}</span>
          <input
            v-model="form.registration"
            :placeholder="t('Enter commercial registration number')"
            inputmode="numeric"
            required
          />
        </label>

        <button type="submit" class="popup-submit">{{ t("Submit") }}</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ContactPopup",
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
    t(key: string) {
      // vue-i18n passthrough (fallback to key if $t not present)
      // @ts-ignore
      return typeof this.$t === "function" ? this.$t(key) : key;
    },
    close() {
      this.$emit("close");
    },
    submit() {
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
  background: #041a15;
  color: #fff;
  border-radius: 8px;
  padding: 28px 24px 18px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  border: 1px solid #0c2c24;
  position: relative;
}

/* Close */
.popup-close {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 1px solid #1b593e;
  color: #89ff7a;
  background: transparent;
  cursor: pointer;
  font-size: 18px;
  line-height: 1;
  display: grid;
  place-items: center;
}
.popup-close:focus-visible {
  outline: 2px solid #89ff7a;
  outline-offset: 2px;
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
  color: #cfe7de;
}

/* Inputs */
.popup-field input {
  height: 44px;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #0e3027;
  background: #fff;
  color: #0a1b17;
  outline: none;
}
.popup-field input:focus-visible {
  box-shadow: 0 0 0 2px #89ff7a;
  border-color: #1c6349;
}

/* Submit */
.popup-submit {
  margin-top: 8px;
  height: 48px;
  border-radius: 6px;
  width: 100%;
  border: none;
  background: #78ff7d;
  color: #041a15;
  font-weight: 800;
  cursor: pointer;
}
.popup-submit:focus-visible {
  outline: 2px solid #c9ffd3;
  outline-offset: 2px;
}
</style>
