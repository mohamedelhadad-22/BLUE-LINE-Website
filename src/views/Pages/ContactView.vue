<script setup lang="ts">
import { reactive, computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import useVuelidate from "@vuelidate/core";
import {
  helpers,
  required,
  email,
  minLength,
  maxLength,
} from "@vuelidate/validators";
import HeroBanner from "@/components/resuble/HeroBanner.vue";
import heroImg from "@/assets/contactHero.jpg";
const { t } = useI18n();

interface FormState {
  fullName: string;
  companyName: string;
  email: string;
  subject: string;
  country: string;
  message: string;
  agree: boolean;
  phone: string;
}

interface PhoneMeta {
  isValid: boolean;
  number: string;
  country: string;
}

const DEFAULT_COUNTRY = "Saudi Arabia";

const COUNTRIES = [
  "Saudi Arabia",
  "United Arab Emirates",
  "Bahrain",
  "Qatar",
  "Kuwait",
  "Oman",
  "Egypt",
  "Jordan",
  "Lebanon",
  "Turkey",
  "United Kingdom",
  "United States",
] as const;

// Form state
const form = reactive<FormState>({
  fullName: "",
  companyName: "",
  email: "",
  subject: "",
  country: DEFAULT_COUNTRY,
  message: "",
  agree: false,
  phone: "",
});

const phoneMeta = reactive<PhoneMeta>({
  isValid: false,
  number: "",
  country: "",
});

const submitting = ref(false);
const submitSuccess = ref(false);
const submitError = ref("");

// Validation rules
const phoneValid = helpers.withMessage(
  () => t("pages.contact.form.validation.phoneInvalid"),
  () => phoneMeta.isValid
);

const rules = computed(() => ({
  form: {
    fullName: {
      required: helpers.withMessage(
        () => t("pages.contact.form.validation.fullNameRequired"),
        required
      ),
    },
    companyName: {},
    email: {
      required: helpers.withMessage(
        () => t("pages.contact.form.validation.emailRequired"),
        required
      ),
      email: helpers.withMessage(
        () => t("pages.contact.form.validation.emailInvalid"),
        email
      ),
    },
    subject: {
      required: helpers.withMessage(
        () => t("pages.contact.form.validation.subjectRequired"),
        required
      ),
      minLength: helpers.withMessage(
        () => t("pages.contact.form.validation.subjectMinLength"),
        minLength(3)
      ),
      maxLength: helpers.withMessage(
        () => t("pages.contact.form.validation.subjectMaxLength"),
        maxLength(120)
      ),
    },
    country: {
      required: helpers.withMessage(
        () => t("pages.contact.form.validation.countryRequired"),
        required
      ),
    },
    message: {
      required: helpers.withMessage(
        () => t("pages.contact.form.validation.messageRequired"),
        required
      ),
      minLength: helpers.withMessage(
        () => t("pages.contact.form.validation.messageMinLength"),
        minLength(10)
      ),
    },
    agree: {
      required: helpers.withMessage(
        () => t("pages.contact.form.validation.privacyRequired"),
        required
      ),
    },
    phone: {
      required: helpers.withMessage(
        () => t("pages.contact.form.validation.phoneRequired"),
        required
      ),
      phoneValid,
    },
  },
}));

const v$ = useVuelidate(rules, { form });
const isValid = computed(() => !v$.value.form.$invalid);

// Phone handlers
const onPhoneValidate = (payload: any) => {
  phoneMeta.isValid = payload?.valid || false;
  phoneMeta.number = payload?.e164 || payload?.number || "";
  phoneMeta.country = payload?.country?.iso2 || "SA";
  form.phone = payload?.number || form.phone;
  v$.value.form.phone.$touch();
};

const onPhoneInput = (value: string) => {
  form.phone = value;
};

// Form submission
const resetForm = () => {
  const currentCountry = form.country;
  Object.assign(form, {
    fullName: "",
    companyName: "",
    email: "",
    subject: "",
    country: currentCountry,
    message: "",
    agree: false,
    phone: "",
  });
  Object.assign(phoneMeta, {
    isValid: false,
    number: "",
    country: "",
  });
  v$.value.$reset();
};

const onSubmit = async () => {
  v$.value.$touch();
  if (v$.value.$invalid) return;

  submitting.value = true;
  submitSuccess.value = false;
  submitError.value = "";

  try {
    // TODO: Replace with real API call
    // const payload = {
    //   ...form,
    //   phone_e164: phoneMeta.number,
    //   phone_country: phoneMeta.country,
    // };
    await new Promise((resolve) => setTimeout(resolve, 900));
    // await fetch("/api/contact", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(payload),
    // });

    submitSuccess.value = true;
    resetForm();
  } catch (error) {
    submitError.value = t("pages.contact.form.error");
  } finally {
    submitting.value = false;
  }
};
</script>

<template>
  <section class="contact-page">
    <div class="container">
      <HeroBanner
        :title="$t('pages.contact.form.title')"
        :subtitle="$t('pages.contact.form.subtitle')"
        :media-src="heroImg"
        :with-img="true"
      ></HeroBanner>
    </div>
    <!-- Breadcrumb -->
    <div class="breadcrumb">
      <div class="container">
        <a href="/" class="breadcrumb-link">{{
          t("pages.contact.form.breadcrumb.home")
        }}</a>
        <span class="breadcrumb-separator">/</span>
        <span class="breadcrumb-current">{{
          t("pages.contact.form.breadcrumb.contact")
        }}</span>
      </div>
    </div>

    <div class="container">
      <div class="contact-header">
        <h1 class="page-title">{{ t("pages.contact.form.whytitle") }}</h1>
        <!-- <p class="page-subtitle">
          {{ t("pages.contact.form.subtitle") }}
        </p> -->
      </div>

      <div class="contact-grid">
        <!-- Contact Information Sidebar -->
        <aside class="contact-info">
          <div class="info-section">
            <h3 class="info-title">
              {{ t("pages.contact.form.info.headOffice") }}
            </h3>
            <div class="info-content">
              <p
                class="info-address"
                v-html="t('pages.contact.form.info.address')"
              ></p>
              <p
                class="info-postal"
                v-html="t('pages.contact.form.info.postal')"
              ></p>
            </div>
          </div>

          <div class="info-section">
            <h3 class="info-title">
              {{ t("pages.contact.form.info.getInTouch") }}
            </h3>
            <div class="info-contact">
              <div class="contact-item">
                <svg
                  class="contact-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <a href="mailto:info@folkmaritime.com" class="contact-link">
                  info@folkmaritime.com
                </a>
              </div>
            </div>
          </div>

          <div class="info-section">
            <h3 class="info-title">
              {{ t("pages.contact.form.info.followUs") }}
            </h3>
            <nav class="social-links" aria-label="Social media">
              <a href="#" class="social-link" aria-label="LinkedIn">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"
                  />
                </svg>
              </a>
              <a href="#" class="social-link" aria-label="Twitter/X">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
                  />
                </svg>
              </a>
              <a href="#" class="social-link" aria-label="Instagram">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"
                  />
                </svg>
              </a>
              <a href="#" class="social-link" aria-label="Facebook">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z"
                  />
                </svg>
              </a>
            </nav>
          </div>
        </aside>

        <!-- Contact Form -->
        <div class="contact-form-wrapper">
          <form class="contact-form" @submit.prevent="onSubmit" novalidate>
            <div class="form-grid">
              <!-- Full Name -->
              <div class="form-field">
                <input
                  id="fullName"
                  type="text"
                  v-model.trim="form.fullName"
                  @blur="v$.form?.fullName.$touch()"
                  :class="[
                    'form-input',
                    { 'has-error': v$.form?.fullName.$error },
                  ]"
                  :aria-invalid="v$.form?.fullName.$error ? 'true' : 'false'"
                  autocomplete="name"
                  placeholder=" "
                />
                <label for="fullName" class="form-label">
                  {{ t("pages.contact.form.fields.fullName") }}
                  <span class="required">{{
                    t("pages.contact.form.fields.required")
                  }}</span>
                </label>
                <p v-if="v$.form?.fullName.$error" class="error-message">
                  {{ v$.form?.fullName.$errors?.[0]?.$message }}
                </p>
              </div>

              <!-- Company Name -->
              <div class="form-field">
                <input
                  id="companyName"
                  type="text"
                  v-model.trim="form.companyName"
                  class="form-input"
                  autocomplete="organization"
                  placeholder=" "
                />
                <label for="companyName" class="form-label">{{
                  t("pages.contact.form.fields.companyName")
                }}</label>
              </div>

              <!-- Email -->
              <div class="form-field">
                <input
                  id="email"
                  type="email"
                  v-model.trim="form.email"
                  @blur="v$.form?.email.$touch()"
                  :class="[
                    'form-input',
                    { 'has-error': v$.form?.email.$error },
                  ]"
                  :aria-invalid="v$.form?.email.$error ? 'true' : 'false'"
                  autocomplete="email"
                  placeholder=" "
                />
                <label for="email" class="form-label">
                  {{ t("pages.contact.form.fields.email") }}
                  <span class="required">{{
                    t("pages.contact.form.fields.required")
                  }}</span>
                </label>
                <p v-if="v$.form?.email.$error" class="error-message">
                  {{ v$.form?.email.$errors?.[0]?.$message }}
                </p>
              </div>

              <!-- Phone -->
              <div class="form-field">
                <label for="phone" class="form-label">
                  {{ t("pages.contact.form.fields.phone") }}
                  <span class="required">{{
                    t("pages.contact.form.fields.required")
                  }}</span>
                </label>
                <vue-tel-input
                  id="phone"
                  v-model="form.phone"
                  @validate="onPhoneValidate"
                  @input="onPhoneInput"
                  defaultCountry="SA"
                  @blur="v$.form?.phone.$touch()"
                  :class="{ 'has-error': v$.form?.phone.$error }"
                  :aria-invalid="v$.form?.phone.$error ? 'true' : 'false'"
                  :placeholder="t('pages.contact.form.placeholders.phone')"
                />
                <p v-if="v$.form?.phone.$error" class="error-message">
                  {{ v$.form?.phone.$errors?.[0]?.$message }}
                </p>
              </div>

              <!-- Subject -->
              <div class="form-field form-field--full">
                <input
                  id="subject"
                  type="text"
                  v-model.trim="form.subject"
                  @blur="v$.form?.subject.$touch()"
                  :class="[
                    'form-input',
                    { 'has-error': v$.form?.subject.$error },
                  ]"
                  :aria-invalid="v$.form?.subject.$error ? 'true' : 'false'"
                  placeholder=" "
                />
                <label for="subject" class="form-label">
                  {{ t("pages.contact.form.fields.subject") }}
                  <span class="required">{{
                    t("pages.contact.form.fields.required")
                  }}</span>
                </label>
                <p v-if="v$.form?.subject.$error" class="error-message">
                  {{ v$.form?.subject.$errors?.[0]?.$message }}
                </p>
              </div>

              <!-- Country -->
              <div class="form-field form-field--full select-field">
                <div class="select-wrapper">
                  <select
                    id="country"
                    v-model="form.country"
                    @change="v$.form?.country.$touch()"
                    :class="[
                      'form-select',
                      { 'has-error': v$.form?.country.$error },
                    ]"
                    :aria-invalid="v$.form?.country.$error ? 'true' : 'false'"
                  >
                    <option v-for="c in COUNTRIES" :key="c" :value="c">
                      {{ c }}
                    </option>
                  </select>
                  <svg
                    class="select-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <label for="country" class="form-label">
                  {{ t("pages.contact.form.fields.country") }}
                  <span class="required">{{
                    t("pages.contact.form.fields.required")
                  }}</span>
                </label>
                <p v-if="v$.form?.country.$error" class="error-message">
                  {{ v$.form?.country.$errors?.[0]?.$message }}
                </p>
              </div>

              <!-- Message -->
              <div class="form-field form-field--full">
                <textarea
                  id="message"
                  v-model.trim="form.message"
                  @blur="v$.form?.message.$touch()"
                  :class="[
                    'form-textarea',
                    { 'has-error': v$.form?.message.$error },
                  ]"
                  :aria-invalid="v$.form?.message.$error ? 'true' : 'false'"
                  placeholder=" "
                  rows="5"
                ></textarea>
                <label for="message" class="form-label">
                  {{ t("pages.contact.form.fields.message") }}
                  <span class="required">{{
                    t("pages.contact.form.fields.required")
                  }}</span>
                </label>
                <p v-if="v$.form?.message.$error" class="error-message">
                  {{ v$.form?.message.$errors?.[0]?.$message }}
                </p>
              </div>

              <!-- Privacy Checkbox -->
              <div class="form-field form-field--full">
                <div class="checkbox-wrapper">
                  <input
                    id="agree"
                    type="checkbox"
                    v-model="form.agree"
                    @change="v$.form?.agree.$touch()"
                    class="form-checkbox"
                    :aria-invalid="v$.form?.agree.$error ? 'true' : 'false'"
                  />
                  <label for="agree" class="checkbox-label">
                    {{ t("pages.contact.form.fields.privacyLabel") }}
                    <a
                      href="/privacy"
                      target="_blank"
                      rel="noopener"
                      class="privacy-link"
                      >{{ t("pages.contact.form.fields.privacyLink") }}</a
                    >
                    <span class="required">{{
                      t("pages.contact.form.fields.required")
                    }}</span>
                  </label>
                </div>
                <p v-if="v$.form?.agree.$error" class="error-message">
                  {{ v$.form?.agree.$errors?.[0]?.$message }}
                </p>
              </div>
            </div>

            <!-- Submit Button -->
            <div class="form-actions">
              <button
                type="submit"
                class="submit-btn"
                :disabled="submitting || !isValid"
                :aria-busy="submitting ? 'true' : 'false'"
              >
                <span v-if="!submitting">{{
                  t("pages.contact.form.submit")
                }}</span>
                <span v-else class="btn-loading">
                  <svg
                    class="spinner"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      class="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    ></circle>
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  {{ t("pages.contact.form.submitting") }}
                </span>
              </button>

              <transition name="fade">
                <p
                  v-if="submitSuccess"
                  class="status-message success"
                  role="status"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  {{ t("pages.contact.form.success") }}
                </p>
              </transition>

              <transition name="fade">
                <p v-if="submitError" class="status-message error" role="alert">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  {{ submitError }}
                </p>
              </transition>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* CSS Variables - Using Brand Colors from style.css */
.contact-page {
  --color-accent: #27aae1;
  --color-success: #10b981;
  --color-error: #ef4444;
  --color-text-primary: #0b1020;
  --color-text-secondary: #606b85;
  --color-text-muted: #9ca3af;
  --color-border: #2a3569;
  --color-border-light: #e5e7eb;
  --color-border-focus: #27aae1;
  --color-bg: #ffffff;
  --color-bg-secondary: #f9fafb;
  --color-bg-info: #f0f4ff;
  --border-radius: 8px;
  --transition: all 0.2s ease;
}

/* Breadcrumb */
.breadcrumb {
  /* background: var(--color-bg-secondary); */
  padding: 16px 0;
  /* border-bottom: 1px solid var(--color-border); */
}

.breadcrumb-link {
  color: var(--color-text-secondary);
  text-decoration: none;
  font-size: 14px;
  transition: color 0.2s;
}

.breadcrumb-link:hover {
  color: var(--color-primary);
}

.breadcrumb-separator {
  margin: 0 8px;
  color: var(--color-text-muted);
}

.breadcrumb-current {
  color: var(--color-text-primary);
  font-size: 14px;
  font-weight: 500;
}

/* Header */
.contact-header {
  text-align: center;
  padding: 48px 0 40px;
}

.page-title {
  font-size: clamp(32px, 5vw, 48px);
  font-weight: 700;
  color: var(--color-text-primary);
  margin: 0 0 12px;
  line-height: 1.2;
}

.page-subtitle {
  font-size: 18px;
  color: var(--color-text-secondary);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

/* Contact Grid Layout */
.contact-grid {
  display: grid;
  grid-template-columns: 350px 1fr;
  gap: 48px;
  padding-bottom: 80px;
}

@media (max-width: 1024px) {
  .contact-grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .contact-info {
    order: 2;
  }

  .contact-form-wrapper {
    order: 1;
  }
}

/* Contact Info Sidebar */
.contact-info {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.info-section {
  background: var(--color-bg-info);
  border-radius: var(--border-radius);
  padding: 24px;
  border: 1px solid rgba(39, 170, 225, 0.2);
}

.info-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--color-primary);
  margin: 0 0 16px;
}

.info-content {
  color: var(--color-text-primary);
}

.info-address,
.info-postal {
  font-size: 14px;
  line-height: 1.6;
  margin: 0 0 12px;
}

.info-postal {
  margin-bottom: 0;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.contact-icon {
  width: 20px;
  height: 20px;
  color: var(--color-primary);
  flex-shrink: 0;
}

.contact-link {
  color: var(--color-primary);
  text-decoration: none;
  font-size: 15px;
  font-weight: 500;
  transition: var(--transition);
}

.contact-link:hover {
  color: var(--color-primary-hover);
  text-decoration: underline;
}

/* Social Links */
.social-links {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.social-link {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg);
  border: 1px solid var(--color-border-light);
  border-radius: 8px;
  color: var(--color-primary);
  transition: var(--transition);
}

.social-link svg {
  width: 20px;
  height: 20px;
}

.social-link:hover {
  background: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(38, 34, 98, 0.2);
}

/* Contact Form */
.contact-form-wrapper {
  /* background: var(--color-bg);
  border: 1px solid var(--color-border-light);
  border-radius: var(--border-radius); */
  padding: 40px;
  /* box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05); */
}

@media (max-width: 640px) {
  .contact-form-wrapper {
    padding: 24px;
  }
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

@media (max-width: 640px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
}

/* Form Fields */
.form-field {
  display: flex;
  flex-direction: column;
  position: relative;
}

.form-field--full {
  grid-column: 1 / -1;
}

.form-label {
  position: absolute;
  left: 16px;
  top: 14px;
  font-size: 15px;
  font-weight: 400;
  color: var(--color-text-secondary);
  background: var(--color-bg);
  padding: 0 4px;
  pointer-events: none;
  transition: all 0.2s ease;
  transform-origin: left center;
}

.required {
  color: var(--color-error);
  margin-left: 2px;
}

.form-input,
.form-select,
.form-textarea {
  width: 100%;
  padding: 12px 16px;
  font-size: 15px;
  font-family: inherit;
  color: var(--color-text-primary);
  background: var(--color-bg);
  border: 1px solid var(--color-border-light);
  border-radius: var(--border-radius);
  outline: none;
  transition: var(--transition);
}

.form-input::placeholder,
.form-textarea::placeholder {
  color: var(--color-text-muted);
}

/* Floating label when focused or has value */
.form-input:focus + .form-label,
.form-input:not(:placeholder-shown) + .form-label,
.form-select:focus + .form-label,
.form-select:valid + .form-label,
.form-textarea:focus + .form-label,
.form-textarea:not(:placeholder-shown) + .form-label {
  top: -10px;
  font-size: 12px;
  font-weight: 500;
  color: var(--color-primary);
}

.form-input:focus,
.form-select:focus,
.form-textarea:focus {
  border-color: var(--color-border-focus);
  box-shadow: 0 0 0 3px rgba(39, 170, 225, 0.15);
}

.form-input:focus + .form-label,
.form-select:focus + .form-label,
.form-textarea:focus + .form-label {
  color: var(--color-border-focus);
}

.form-input.has-error,
.form-select.has-error,
.form-textarea.has-error {
  border-color: var(--color-error);
}

.form-input.has-error:focus,
.form-select.has-error:focus,
.form-textarea.has-error:focus {
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

.form-textarea {
  resize: vertical;
  min-height: 120px;
  line-height: 1.6;
  padding-top: 16px;
}

/* Textarea label positioning */
.form-field:has(textarea) .form-label {
  top: 16px;
}

/* Select Wrapper */
.select-wrapper {
  position: relative;
}

.form-select {
  appearance: none;
  padding-right: 40px;
  cursor: pointer;
}

.select-icon {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  color: var(--color-text-muted);
  pointer-events: none;
  z-index: 1;
}

/* Special handling for select field label */
.select-field .form-label {
  left: 16px;
  top: -10px;
  font-size: 12px;
  font-weight: 500;
  color: var(--color-primary);
}

.select-field .form-select:focus ~ .form-label {
  color: var(--color-border-focus);
}

/* Phone field - keep label above */
.form-field:has(#phone) .form-label {
  position: static;
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-primary);
  margin-bottom: 8px;
  padding: 0;
  transform: none;
}

/* Checkbox */
.checkbox-wrapper {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.form-checkbox {
  width: 18px;
  height: 18px;
  margin-top: 2px;
  cursor: pointer;
  accent-color: var(--color-primary);
}

.checkbox-label {
  font-size: 14px;
  color: var(--color-text-secondary);
  line-height: 1.5;
  cursor: pointer;
  margin: 0;
  font-weight: 400;
}

.privacy-link {
  color: var(--color-primary);
  text-decoration: underline;
  transition: var(--transition);
}

.privacy-link:hover {
  color: var(--color-primary-hover);
}

/* Error Message */
.error-message {
  margin-top: 6px;
  font-size: 13px;
  color: var(--color-error);
  display: flex;
  align-items: center;
  gap: 4px;
}

/* Form Actions */
.form-actions {
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.submit-btn {
  background: var(--color-primary);
  color: white;
  border: none;
  padding: 14px 32px;
  font-size: 16px;
  font-weight: 600;
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: var(--transition);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: fit-content;
}

.submit-btn:hover:not(:disabled) {
  background: var(--color-primary-hover);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(38, 34, 98, 0.25);
}

.submit-btn:active:not(:disabled) {
  transform: translateY(0);
}

.submit-btn:disabled {
  background: var(--color-text-muted);
  cursor: not-allowed;
  opacity: 0.6;
}

.btn-loading {
  display: flex;
  align-items: center;
  gap: 8px;
}

.spinner {
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Status Messages */
.status-message {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: var(--border-radius);
  font-size: 14px;
  font-weight: 500;
}

.status-message svg {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.status-message.success {
  background: #d1fae5;
  color: #065f46;
  border: 1px solid #6ee7b7;
}

.status-message.error {
  background: #fee2e2;
  color: #991b1b;
  border: 1px solid #fca5a5;
}

/* Fade Transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* RTL Support */
:dir(rtl) .select-icon {
  right: auto;
  left: 12px;
}

:dir(rtl) .form-select {
  padding-right: 16px;
  padding-left: 40px;
}

:dir(rtl) .breadcrumb-separator {
  transform: scaleX(-1);
}
</style>
