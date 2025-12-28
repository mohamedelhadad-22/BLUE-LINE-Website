<script lang="ts">
import { defineComponent, shallowRef } from "vue";
import useVuelidate from "@vuelidate/core";
import { required, email, minLength, helpers } from "@vuelidate/validators";
import heroImage from '@/assets/contacts-hero.jpg'
import saudiImage from '@/assets/saudiBranche_image.png'
import egyptImage from '@/assets/EgyptBranche_image.png'

interface FormData {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  message: string;
}

export default defineComponent({
  name: "ContactView",
  data() {
    return {
      v$: useVuelidate(),
      formData: {
        fullName: "",
        companyName: "",
        email: "",
        phone: "",
        message: "",
      } as FormData,
      isSubmitting: false,
      submitSuccess: false,
      submitError: false,
      heroImage: shallowRef(heroImage),
      saudiImage: shallowRef(saudiImage),
      egyptImage: shallowRef(egyptImage),
    };
  },
  computed: {
    faqItems() {
      return [
        {
          icon: "clock",
          question: this.$t("contact.support.faq1.question"),
          answer: this.$t("contact.support.faq1.answer"),
        },
        {
          icon: "tracking",
          question: this.$t("contact.support.faq2.question"),
          answer: this.$t("contact.support.faq2.answer"),
        },
        {
          icon: "quote",
          question: this.$t("contact.support.faq3.question"),
          answer: this.$t("contact.support.faq3.answer"),
        },
        {
          icon: "international",
          question: this.$t("contact.support.faq4.question"),
          answer: this.$t("contact.support.faq4.answer"),
        },
      ];
    },
  },
  validations() {
    return {
      formData: {
        fullName: {
          required: helpers.withMessage(
            this.$t("contact.formValidation.fullNameRequired"),
            required
          ),
          minLength: helpers.withMessage(
            this.$t("contact.formValidation.fullNameMinLength"),
            minLength(2)
          ),
        },
        email: {
          required: helpers.withMessage(
            this.$t("contact.formValidation.emailRequired"),
            required
          ),
          email: helpers.withMessage(
            this.$t("contact.formValidation.emailInvalid"),
            email
          ),
        },
        phone: {},
        companyName: {},
        message: {
          required: helpers.withMessage(
            this.$t("contact.formValidation.messageRequired"),
            required
          ),
          minLength: helpers.withMessage(
            this.$t("contact.formValidation.messageMinLength"),
            minLength(10)
          ),
        },
      },
    };
  },
  methods: {
    async handleSubmit() {
      // Validate form
      const isValid = await this.v$.$validate();

      if (!isValid) {
        return;
      }

      this.isSubmitting = true;
      this.submitSuccess = false;
      this.submitError = false;

      try {
        // TODO: Implement actual form submission to backend
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Success
        this.submitSuccess = true;

        // Reset form after success
        setTimeout(() => {
          this.formData = {
            fullName: "",
            companyName: "",
            email: "",
            phone: "",
            message: "",
          };
          this.v$.$reset();
          this.submitSuccess = false;
        }, 3000);
      } catch (error) {
        this.submitError = true;
        setTimeout(() => {
          this.submitError = false;
        }, 5000);
      } finally {
        this.isSubmitting = false;
      }
    },
  },
});
</script>

<template>
  <div class="contact-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-background">
        <img :src="heroImage" alt="Ocean freight" class="hero-image" />
        <div class="hero-overlay"></div>
      </div>
      <div class="hero-content">
        <h1 class="hero-title">{{ $t('contact.hero.title') || 'Contact Us' }}</h1>
        <p class="hero-subtitle">
          {{ $t('contact.hero.subtitle') }}
        </p>
      </div>
    </section>

    <!-- Contact Form Section -->
    <section class="form-section">
      <div class="form-container">
        <div class="form-header">
          <h2 class="form-title">{{ $t('contact.formSection.title') }}</h2>
          <p class="form-subtitle">
            {{ $t('contact.formSection.subtitle') }}
          </p>
        </div>

        <!-- Success Message -->
        <div v-if="submitSuccess" class="alert alert-success">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18Z"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M7 10L9 12L13 8" stroke="currentColor" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>
          <span>{{ $t('contact.formMessages.success') }}</span>
        </div>

        <!-- Error Message -->
        <div v-if="submitError" class="alert alert-error">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18Z"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M10 6V10M10 14H10.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>
          <span>{{ $t('contact.formMessages.error') }}</span>
        </div>

        <form @submit.prevent="handleSubmit" class="contact-form">
          <div class="form-row">
            <div class="form-field">
              <label for="fullName" class="field-label">{{ $t('contact.formSection.fullName') }}</label>
              <input id="fullName" v-model="formData.fullName" type="text" class="field-input"
                :class="{ 'field-error': v$.formData.fullName.$error }"
                :placeholder="$t('contact.formSection.fullNamePlaceholder')" @blur="v$.formData.fullName.$touch()" />
              <span v-if="v$.formData.fullName.$error" class="error-message">
                {{ v$.formData.fullName.$errors[0]?.$message }}
              </span>
            </div>
            <div class="form-field">
              <label for="companyName" class="field-label">{{ $t('contact.formSection.companyName') }}</label>
              <input id="companyName" v-model="formData.companyName" type="text" class="field-input"
                :placeholder="$t('contact.formSection.companyNamePlaceholder')" />
            </div>
          </div>

          <div class="form-row">
            <div class="form-field">
              <label for="email" class="field-label">{{ $t('contact.formSection.email') }}</label>
              <input id="email" v-model="formData.email" type="email" class="field-input"
                :class="{ 'field-error': v$.formData.email.$error }"
                :placeholder="$t('contact.formSection.emailPlaceholder')" @blur="v$.formData.email.$touch()" />
              <span v-if="v$.formData.email.$error" class="error-message">
                {{ v$.formData.email.$errors[0]?.$message }}
              </span>
            </div>
            <div class="form-field">
              <label for="phone" class="field-label">{{ $t('contact.formSection.phone') }}</label>
              <input id="phone" v-model="formData.phone" type="tel" class="field-input"
                :placeholder="$t('contact.formSection.phonePlaceholder')" />
            </div>
          </div>

          <div class="form-field">
            <label for="message" class="field-label">{{ $t('contact.formSection.message') }}</label>
            <textarea id="message" v-model="formData.message" class="field-textarea"
              :class="{ 'field-error': v$.formData.message.$error }"
              :placeholder="$t('contact.formSection.messagePlaceholder')" rows="6"
              @blur="v$.formData.message.$touch()"></textarea>
            <span v-if="v$.formData.message.$error" class="error-message">
              {{ v$.formData.message.$errors[0]?.$message }}
            </span>
          </div>

          <button type="submit" class="submit-button" :disabled="isSubmitting">
            <span v-if="!isSubmitting">{{ $t('contact.formSection.submitButton') }}</span>
            <span v-else>{{ $t('contact.formValidation.submitting', 'Submitting...') }}</span>
            <svg v-if="!isSubmitting" width="18" height="18" viewBox="0 0 18 18" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M10.5 4.5L15 9M15 9L10.5 13.5M15 9H3" stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <svg v-else class="spinner" width="18" height="18" viewBox="0 0 18 18" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M9 2V5M9 13V16M16 9H13M5 9H2M14.364 14.364L12.243 12.243M5.757 5.757L3.636 3.636M14.364 3.636L12.243 5.757M5.757 12.243L3.636 14.364"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
        </form>
      </div>
    </section>

    <!-- Quick Support Section -->
    <section class="support-section">
      <div class="support-container">
        <div class="support-header">
          <h2 class="support-title">{{ $t('contact.support.title') }}</h2>
          <p class="support-subtitle">{{ $t('contact.support.subtitle') }}</p>
        </div>

        <div class="faq-grid">
          <div v-for="(item, index) in faqItems" :key="index" class="faq-card">
            <div class="faq-icon-wrapper">
              <div class="faq-icon">
                <svg v-if="item.icon === 'clock'" width="20" height="20" viewBox="0 0 20 20" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18Z"
                    stroke="#2970FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M10 6V10L13 13" stroke="#2970FF" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" />
                </svg>
                <svg v-else-if="item.icon === 'tracking'" width="25" height="20" viewBox="0 0 25 20" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 10H24M24 10L18 4M24 10L18 16" stroke="#2970FF" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" />
                </svg>
                <svg v-else-if="item.icon === 'quote'" width="15" height="20" viewBox="0 0 15 20" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M13 2H2C1.44772 2 1 2.44772 1 3V17C1 17.5523 1.44772 18 2 18H13C13.5523 18 14 17.5523 14 17V3C14 2.44772 13.5523 2 13 2Z"
                    stroke="#2970FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M4 6H11M4 10H11M4 14H8" stroke="#2970FF" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" />
                </svg>
                <svg v-else-if="item.icon === 'international'" width="20" height="20" viewBox="0 0 20 20" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18Z"
                    stroke="#2970FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  <path
                    d="M2 10H18M10 2C12 4.5 13 7.5 13 10C13 12.5 12 15.5 10 18M10 2C8 4.5 7 7.5 7 10C7 12.5 8 15.5 10 18"
                    stroke="#2970FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>
            </div>
            <div class="faq-content">
              <h3 class="faq-question">{{ item.question }}</h3>
              <p class="faq-answer">{{ item.answer }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Branches Section -->
    <section class="branches-section">
      <div class="branches-container">
        <h2 class="branches-title">{{ $t('contact.branches.title') }}</h2>

        <!-- Saudi Branch -->
        <div class="branch-card">
          <div class="branch-info">
            <div class="branch-label">{{ $t('contact.branches.saudi.label') }}</div>
            <h3 class="branch-name">{{ $t('contact.branches.saudi.name') }}</h3>

            <div class="branch-details">
              <div class="detail-group">
                <label class="detail-label">{{ $t('contact.branches.saudi.addressLabel') }}</label>
                <p class="detail-value">{{ $t('contact.branches.saudi.address') }}</p>
              </div>

              <div class="detail-group">
                <label class="detail-label">{{ $t('contact.branches.saudi.phoneLabel') }}</label>
                <p class="detail-value">{{ $t('contact.branches.saudi.phone') }}</p>
              </div>

              <div class="detail-group">
                <label class="detail-label">{{ $t('contact.branches.saudi.mailLabel') }}</label>
                <p class="detail-value">{{ $t('contact.branches.saudi.mail') }}</p>
              </div>

              <div class="detail-group">
                <label class="detail-label">{{ $t('contact.branches.saudi.hoursLabel') }}</label>
                <p class="detail-value">{{ $t('contact.branches.saudi.hours') }}</p>
                <p class="detail-value">{{ $t('contact.branches.saudi.hours') }}</p>
              </div>

              <div class="contact-persons">
                <div class="contact-person">
                  <strong>{{ $t('contact.branches.saudi.finance') }}</strong>
                  <p>{{ $t('contact.branches.saudi.financePhone') }}</p>
                  <p> Finance@blueline-sa.net</p>
                </div>

                <div class="contact-person">
                  <strong>{{ $t('contact.branches.saudi.manager') }}</strong>
                  <p>Mobile: +20 122 369 3800</p>
                  <p>mohamed.abdulaziz@blueline-sa.net</p>
                </div>
              </div>
            </div>
          </div>
          <div class="branch-image">
            <img :src="saudiImage" :alt="$t('contact.branches.saudi.name')" />
          </div>
        </div>

        <!-- Egypt Branch -->
        <div class="branch-card">
          <div class="branch-info">
            <h3 class="branch-name">{{ $t('contact.branches.egypt.name') }}</h3>

            <div class="branch-details">
              <div class="detail-group">
                <label class="detail-label">{{ $t('contact.branches.egypt.addressLabel') }}</label>
                <p class="detail-text">{{ $t('contact.branches.egypt.address') }}</p>
              </div>

              <div class="detail-group">
                <label class="detail-label">{{ $t('contact.branches.egypt.phoneLabel') }}</label>
                <p class="detail-value">{{ $t('contact.branches.egypt.phone') }}</p>
              </div>

              <div class="detail-group">
                <label class="detail-label">{{ $t('contact.branches.egypt.mobileLabel') }}</label>
                <p class="detail-value">{{ $t('contact.branches.egypt.mobile') }}</p>
              </div>

              <div class="detail-group">
                <label class="detail-label">{{ $t('contact.branches.egypt.mailLabel') }}</label>
                <p class="detail-value"> info@blueline-sa.net</p>
              </div>

              <div class="detail-group">
                <label class="detail-label">{{ $t('contact.branches.egypt.hoursLabel') }}</label>
                <p class="detail-value">{{ $t('contact.branches.egypt.hours') }}</p>
              </div>

              <div class="contact-persons">
                <div class="contact-person">
                  <strong>{{ $t('contact.branches.egypt.finance') }}</strong>
                  <p>{{ $t('contact.branches.egypt.financePhone') }}</p>
                  <p>Finance@blueline-sa.net </p>
                </div>

                <div class="contact-person">
                  <strong>{{ $t('contact.branches.egypt.manager') }}</strong>
                  <p>01223693800</p>
                  <p>mohamed.abdulaziz@blueline-sa.net</p>
                </div>
              </div>
            </div>
          </div>
          <div class="branch-image">
            <img :src="egyptImage" :alt="$t('contact.branches.egypt.name')" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* Root Variables */
.contact-page {
  --primary-blue: #2970ff;
  --dark-blue: #0a0f33;
  --text-primary: #1e2225;
  --text-secondary: #71717a;
  --border-color: #e5e7eb;
  --bg-light: #f8f9fc;
  --blue-light: #dbeafe;
  width: 100%;
  overflow-x: hidden;
}

/* Hero Section */
.hero-section {
  position: relative;
  height: 521px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.45);
}

.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  color: white;
  max-width: 896px;
  padding: 0 24px;
}

.hero-title {
  font-family: "Inter Tight", sans-serif;
  font-size: 56px;
  font-weight: 600;
  line-height: 60px;
  letter-spacing: -1.12px;
  margin: 0 0 12px 0;
}

.hero-subtitle {
  font-family: "Inter", sans-serif;
  font-size: 20px;
  font-weight: 500;
  line-height: 33px;
  letter-spacing: -0.32px;
  margin: 0;
}

/* Form Section with Blue Background */
.form-section {
  position: relative;
  background: var(--dark-blue);
  padding-top: 64px;
  padding-bottom: 80px;
  background-image: url("@/assets/Framesvg.svg");
  background-position: left bottom;
  background-repeat: no-repeat;
  background-size: contain;
  min-height: 640px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.blue-content {
  max-width: 960px;
  margin: 0 auto;
  text-align: center;
  padding-top: 64px;
  color: white;
}

.blue-title {
  font-family: "Inter Tight", sans-serif;
  font-size: 44px;
  font-weight: 600;
  line-height: 48px;
  letter-spacing: -0.88px;
  margin: 0 0 8px 0;
}

.blue-subtitle {
  font-family: "Inter", sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 28px;
  letter-spacing: -0.32px;
  margin: 0;
}

/* Form Container */
.form-container {
  position: relative;
  z-index: 1;
  max-width: 960px;
  width: calc(100% - 48px);
  margin: 0 auto;
  background: white;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  padding: 58px 47px;
  margin-top: -9rem;
}

.form-header {
  text-align: center;
  margin-bottom: 40px;
}

.form-title {
  font-family: "Inter Tight", sans-serif;
  font-size: 44px;
  font-weight: 600;
  line-height: 48px;
  letter-spacing: -0.88px;
  color: var(--dark-blue);
  margin: 0 0 6px 0;
}

.form-subtitle {
  font-family: "Inter", sans-serif;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: -0.32px;
  color: var(--text-secondary);
  margin: 0;
}

/* Alert Messages */
.alert {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  border-radius: 6px;
  margin-bottom: 24px;
  font-family: "Inter", sans-serif;
  font-size: 15px;
  font-weight: 500;
  line-height: 22px;
  animation: slideDown 0.3s ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.alert-success {
  background: #dcfce7;
  border: 1px solid #86efac;
  color: #166534;
}

.alert-success svg {
  stroke: #16a34a;
  flex-shrink: 0;
}

.alert-error {
  background: #fee2e2;
  border: 1px solid #fca5a5;
  color: #991b1b;
}

.alert-error svg {
  stroke: #dc2626;
  flex-shrink: 0;
}

/* Form Styles */
.contact-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.field-label {
  font-family: "Inter", sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: var(--text-primary);
}

.field-input,
.field-textarea {
  width: 100%;
  padding: 13px 15px;
  font-family: "Inter", sans-serif;
  font-size: 16px;
  line-height: 24px;
  color: var(--text-primary);
  background: white;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.field-input::placeholder,
.field-textarea::placeholder {
  color: #adaebc;
}

.field-input:focus,
.field-textarea:focus {
  border-color: var(--primary-blue);
  box-shadow: 0 0 0 3px rgba(41, 112, 255, 0.1);
}

/* Validation Error Styles */
.field-error {
  border-color: #ef4444 !important;
}

.field-error:focus {
  border-color: #ef4444 !important;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1) !important;
}

.error-message {
  font-family: "Inter", sans-serif;
  font-size: 13px;
  font-weight: 400;
  line-height: 18px;
  color: #dc2626;
  margin-top: -4px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.field-textarea {
  resize: vertical;
  min-height: 170px;
}

/* Submit Button */
.submit-button {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 16px 32px;
  background: var(--primary-blue);
  color: white;
  font-family: "Inter", sans-serif;
  font-size: 18px;
  font-weight: 400;
  line-height: 28px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s, box-shadow 0.2s, transform 0.1s;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.submit-button:hover:not(:disabled) {
  background: #2563eb;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transform: translateY(-1px);
}

.submit-button:active:not(:disabled) {
  transform: translateY(0);
}

.submit-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Spinner Animation */
.spinner {
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

/* Support Section */
.support-section {
  background: var(--bg-light);
  padding: 64px 80px;
}

.support-container {
  max-width: 1280px;
  margin: 0 auto;
}

.support-header {
  text-align: center;
  margin-bottom: 48px;
}

.support-title {
  font-family: "Inter Tight", sans-serif;
  font-size: 44px;
  font-weight: 600;
  line-height: 48px;
  letter-spacing: -0.88px;
  color: var(--text-primary);
  margin: 0 0 12px 0;
}

.support-subtitle {
  font-family: "Inter", sans-serif;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: -0.32px;
  color: var(--text-secondary);
  margin: 0;
}

/* FAQ Grid */
.faq-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
}

.faq-card {
  background: white;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 25px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  display: flex;
  gap: 16px;
  transition: box-shadow 0.2s;
}

.faq-card:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
}

.faq-icon-wrapper {
  flex-shrink: 0;
}

.faq-icon {
  width: 48px;
  height: 48px;
  border-radius: 99px;
  background: var(--blue-light);
  display: flex;
  align-items: center;
  justify-content: center;
}

.faq-content {
  flex: 1;
}

.faq-question {
  font-family: "Inter Tight", sans-serif;
  font-size: 20px;
  font-weight: 600;
  line-height: 28px;
  letter-spacing: -0.4px;
  color: var(--text-primary);
  margin: 0 0 12px 0;
}

.faq-answer {
  font-family: "Inter", sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
  letter-spacing: -0.32px;
  color: var(--text-secondary);
  margin: 0;
}

/* Branches Section */
.branches-section {
  padding: 60px 80px;
  background: white;
}

.branches-container {
  max-width: 1280px;
  margin: 0 auto;
}

.branches-title {
  font-family: "Inter Tight", sans-serif;
  font-size: 48px;
  font-weight: 700;
  line-height: 1;
  text-align: center;
  color: var(--text-primary);
  margin: 0 0 72px 0;
}

.branch-card {
  display: flex;
  gap: 19px;
  margin-bottom: 72px;
  background: white;
}

.branch-card:last-child {
  margin-bottom: 0;
}

.branch-info {
  flex: 0 0 385px;
  display: flex;
  flex-direction: column;
  gap: 19px;
  padding : 0 30px 0 0;
}

.branch-label {
  font-family: "Inter", sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: -0.32px;
  color: var(--text-secondary);
}

.branch-name {
  font-family: "Inter Tight", sans-serif;
  font-size: 32px;
  font-weight: 600;
  line-height: 1;
  letter-spacing: -0.4px;
  color: var(--text-primary);
  margin: 0;
}

.branch-details {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.detail-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.detail-label {
  font-family: "Inter", sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: -0.32px;
  color: var(--text-secondary);
}

.detail-text {
  font-family: "Inter Tight", sans-serif;
  font-size: 20px;
  font-weight: 500;
  line-height: 1.2;
  letter-spacing: -0.4px;
  color: var(--text-primary);
  margin: 0;
}

.detail-value {
  font-family: "Inter Tight", sans-serif;
  font-size: 20px;
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: -0.4px;
  color: var(--text-primary);
  margin: 0;
}

.contact-persons {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 8px;
}

.contact-person {
  font-family: "Inter Tight", sans-serif;
  font-size: 20px;
  font-weight: 500;
  line-height: 1.4;
  letter-spacing: -0.4px;
  color: var(--text-primary);
}

.contact-person strong {
  font-weight: 700;
  display: block;
  margin-bottom: 8px;
  color: #000;
}

.contact-person p {
  font-family: "Inter Tight", sans-serif;
  font-size: 20px;
  font-weight: 400;
  line-height: 1.4;
  letter-spacing: -0.4px;
  margin: 4px 0;
}

.branch-image {
  flex: 1;
  min-height: 616px;
  overflow: hidden;
}

.branch-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Responsive Design */
@media (max-width: 1200px) {
  .hero-title {
    font-size: 48px;
    line-height: 52px;
  }

  .form-container {
    padding: 40px 32px;
    width: calc(100% - 40px);
  }

  .support-section {
    padding: 64px 40px;
  }

  .branches-section {
    padding: 60px 40px;
  }

  .branch-info {
    flex: 0 0 340px;
  }
}

@media (max-width: 992px) {
  .form-section {
    min-height: auto;
    padding-bottom: 60px;
  }

  .form-container {
    margin-top: 0;
    width: calc(100% - 32px);
  }

  .support-section {
    padding: 56px 32px;
  }

  .branches-section {
    padding: 56px 32px;
  }

  .branch-card {
    flex-direction: column;
  }

  .branch-info {
    flex: 1;
  }

  .branch-image {
    min-height: 400px;
  }
}

@media (max-width: 768px) {
  .hero-section {
    height: 400px;
  }

  .hero-title {
    font-size: 36px;
    line-height: 40px;
  }

  .hero-subtitle {
    font-size: 18px;
    line-height: 28px;
  }

  .form-section {
    padding-top: 48px;
    padding-bottom: 48px;
    background-size: cover;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .form-container {
    padding: 32px 24px;
    width: calc(100% - 32px);
  }

  .form-title {
    font-size: 32px;
    line-height: 36px;
  }

  .form-subtitle {
    font-size: 14px;
    line-height: 22px;
  }

  .support-section {
    padding: 48px 24px;
  }

  .support-title,
  .branches-title {
    font-size: 32px;
    line-height: 36px;
  }

  .support-subtitle {
    font-size: 14px;
    line-height: 22px;
  }

  .faq-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .branches-section {
    padding: 48px 24px;
  }

  .branches-title {
    margin-bottom: 48px;
  }

  .branch-card {
    margin-bottom: 48px;
  }

  .branch-image {
    min-height: 300px;
  }
}

@media (max-width: 576px) {
  .hero-section {
    height: 350px;
  }

  .hero-content {
    padding: 0 20px;
  }

  .hero-title {
    font-size: 32px;
    line-height: 36px;
    letter-spacing: -0.64px;
  }

  .hero-subtitle {
    font-size: 16px;
    line-height: 24px;
  }

  .form-section {
    padding-top: 32px;
    padding-bottom: 32px;
  }

  .form-container {
    padding: 28px 20px;
    width: calc(100% - 24px);
  }

  .form-title {
    font-size: 28px;
    line-height: 32px;
  }

  .form-subtitle {
    font-size: 14px;
  }

  .field-label {
    font-size: 13px;
  }

  .field-input,
  .field-textarea {
    padding: 12px 14px;
    font-size: 15px;
  }

  .submit-button {
    padding: 14px 28px;
    font-size: 16px;
  }

  .support-section {
    padding: 40px 20px;
  }

  .support-title {
    font-size: 28px;
    line-height: 32px;
    margin-bottom: 8px;
  }

  .support-subtitle {
    font-size: 14px;
  }

  .faq-card {
    padding: 20px;
    flex-direction: column;
    align-items: flex-start;
  }

  .faq-icon {
    width: 44px;
    height: 44px;
  }

  .faq-question {
    font-size: 18px;
    line-height: 26px;
    margin-bottom: 10px;
  }

  .faq-answer {
    font-size: 15px;
    line-height: 24px;
  }

  .branches-section {
    padding: 40px 20px;
  }

  .branches-title {
    font-size: 28px;
    line-height: 32px;
    margin-bottom: 40px;
  }

  .branch-card {
    margin-bottom: 40px;
    gap: 16px;
  }

  .branch-info {
    gap: 16px;
  }

  .branch-name {
    font-size: 24px;
  }

  .detail-label {
    font-size: 13px;
  }

  .detail-text,
  .detail-value {
    font-size: 16px;
  }

  .contact-person {
    font-size: 16px;
  }

  .contact-person p {
    font-size: 16px;
  }

  .branch-image {
    min-height: 250px;
    border-radius: 8px;
  }
}

@media (max-width: 480px) {
  .hero-section {
    height: 300px;
  }

  .hero-title {
    font-size: 28px;
    line-height: 32px;
  }

  .hero-subtitle {
    font-size: 15px;
    line-height: 22px;
  }

  .form-container {
    padding: 24px 16px;
    width: calc(100% - 20px);
  }

  .form-title {
    font-size: 24px;
    line-height: 28px;
  }

  .support-title,
  .branches-title {
    font-size: 24px;
    line-height: 28px;
  }

  .faq-card {
    padding: 18px;
  }

  .faq-icon {
    width: 40px;
    height: 40px;
  }

  .faq-icon svg {
    width: 18px;
    height: 18px;
  }

  .faq-question {
    font-size: 16px;
    line-height: 24px;
  }

  .faq-answer {
    font-size: 14px;
    line-height: 22px;
  }

  .branch-name {
    font-size: 20px;
  }

  .detail-text,
  .detail-value,
  .contact-person,
  .contact-person p {
    font-size: 15px;
  }

  .branch-image {
    min-height: 220px;
  }
}

@media (max-width: 375px) {
  .hero-title {
    font-size: 24px;
    line-height: 28px;
  }

  .form-container {
    padding: 20px 14px;
  }

  .form-title {
    font-size: 22px;
    line-height: 26px;
  }

  .support-title,
  .branches-title {
    font-size: 22px;
    line-height: 26px;
  }

  .branch-name {
    font-size: 18px;
  }
}
</style>
