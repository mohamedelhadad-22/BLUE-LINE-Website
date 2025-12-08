<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

interface FormData {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  message: string;
}

const formData = reactive<FormData>({
  fullName: "",
  companyName: "",
  email: "",
  phone: "",
  message: "",
});

const isSubmitting = ref(false);

const handleSubmit = async () => {
  isSubmitting.value = true;
  // TODO: Implement form submission
  setTimeout(() => {
    isSubmitting.value = false;
    // Reset form
    Object.assign(formData, {
      fullName: "",
      companyName: "",
      email: "",
      phone: "",
      message: "",
    });
  }, 1000);
};

// FAQ items with i18n
const faqItems = computed(() => [
  {
    icon: "clock",
    question: t("pages.contact.support.faq1.question"),
    answer: t("pages.contact.support.faq1.answer"),
  },
  {
    icon: "tracking",
    question: t("pages.contact.support.faq2.question"),
    answer: t("pages.contact.support.faq2.answer"),
  },
  {
    icon: "quote",
    question: t("pages.contact.support.faq3.question"),
    answer: t("pages.contact.support.faq3.answer"),
  },
  {
    icon: "international",
    question: t("pages.contact.support.faq4.question"),
    answer: t("pages.contact.support.faq4.answer"),
  },
]);
</script>

<template>
  <div class="contact-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-background">
        <img src="@/assets/contacts-hero.jpg" alt="Ocean freight" class="hero-image" />
        <div class="hero-overlay"></div>
      </div>
      <div class="hero-content">
        <h1 class="hero-title">{{ t('pages.contact.hero.title') }}</h1>
        <p class="hero-subtitle">
          {{ t('pages.contact.hero.subtitle') }}
        </p>
      </div>
    </section>

    <!-- Contact Form Section -->
    <section class="form-section">
      <div class="form-container">
        <div class="form-header">
          <h2 class="form-title">{{ t('pages.contact.formSection.title') }}</h2>
          <p class="form-subtitle">
            {{ t('pages.contact.formSection.subtitle') }}
          </p>
        </div>

        <form @submit.prevent="handleSubmit" class="contact-form">
          <div class="form-row">
            <div class="form-field">
              <label for="fullName" class="field-label">{{ t('pages.contact.formSection.fullName') }}</label>
              <input id="fullName" v-model="formData.fullName" type="text" class="field-input"
                :placeholder="t('pages.contact.formSection.fullNamePlaceholder')" required />
            </div>
            <div class="form-field">
              <label for="companyName" class="field-label">{{ t('pages.contact.formSection.companyName') }}</label>
              <input id="companyName" v-model="formData.companyName" type="text" class="field-input"
                :placeholder="t('pages.contact.formSection.companyNamePlaceholder')" />
            </div>
          </div>

          <div class="form-row">
            <div class="form-field">
              <label for="email" class="field-label">{{ t('pages.contact.formSection.email') }}</label>
              <input id="email" v-model="formData.email" type="email" class="field-input"
                :placeholder="t('pages.contact.formSection.emailPlaceholder')" required />
            </div>
            <div class="form-field">
              <label for="phone" class="field-label">{{ t('pages.contact.formSection.phone') }}</label>
              <input id="phone" v-model="formData.phone" type="tel" class="field-input"
                :placeholder="t('pages.contact.formSection.phonePlaceholder')" />
            </div>
          </div>

          <div class="form-field">
            <label for="message" class="field-label">{{ t('pages.contact.formSection.message') }}</label>
            <textarea id="message" v-model="formData.message" class="field-textarea"
              :placeholder="t('pages.contact.formSection.messagePlaceholder')" rows="6" required></textarea>
          </div>

          <button type="submit" class="submit-button" :disabled="isSubmitting">
            <span>{{ t('pages.contact.formSection.submitButton') }}</span>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.5 4.5L15 9M15 9L10.5 13.5M15 9H3" stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
        </form>
      </div>
    </section>

    <!-- Quick Support Section -->
    <section class="support-section">
      <div class="support-container">
        <div class="support-header">
          <h2 class="support-title">{{ t('pages.contact.support.title') }}</h2>
          <p class="support-subtitle">{{ t('pages.contact.support.subtitle') }}</p>
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
        <h2 class="branches-title">{{ t('pages.contact.branches.title') }}</h2>

        <!-- Saudi Branch -->
        <div class="branch-card">
          <div class="branch-info">
            <div class="branch-label">{{ t('pages.contact.branches.saudi.label') }}</div>
            <h3 class="branch-name">{{ t('pages.contact.branches.saudi.name') }}</h3>

            <div class="branch-details">
              <div class="detail-group">
                <label class="detail-label">{{ t('pages.contact.branches.saudi.addressLabel') }}</label>
                <p class="detail-text" v-html="t('pages.contact.branches.saudi.address')"></p>
              </div>

              <div class="detail-group">
                <label class="detail-label">{{ t('pages.contact.branches.saudi.phoneLabel') }}</label>
                <p class="detail-value">{{ t('pages.contact.branches.saudi.phone') }}</p>
              </div>

              <div class="detail-group">
                <label class="detail-label">{{ t('pages.contact.branches.saudi.mailLabel') }}</label>
                <p class="detail-value">{{ t('pages.contact.branches.saudi.mail') }}</p>
              </div>

              <div class="detail-group">
                <label class="detail-label">{{ t('pages.contact.branches.saudi.hoursLabel') }}</label>
                <p class="detail-value" v-html="t('pages.contact.branches.saudi.hours')"></p>
              </div>

              <div class="contact-persons">
                <div class="contact-person">
                  <strong>{{ t('pages.contact.branches.saudi.finance') }}</strong>
                  <p>{{ t('pages.contact.branches.saudi.financePhone') }}</p>
                  <p>{{ t('pages.contact.branches.saudi.financeEmail') }}</p>
                </div>

                <div class="contact-person">
                  <strong>{{ t('pages.contact.branches.saudi.manager') }}</strong>
                  <p>{{ t('pages.contact.branches.saudi.managerPhone') }}</p>
                  <p>{{ t('pages.contact.branches.saudi.managerEmail') }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="branch-image">
            <img src="@/assets/saudiBranche_image.png" :alt="t('pages.contact.branches.saudi.name')" />
          </div>
        </div>

        <!-- Egypt Branch -->
        <div class="branch-card">
          <div class="branch-info">
            <h3 class="branch-name">{{ t('pages.contact.branches.egypt.name') }}</h3>

            <div class="branch-details">
              <div class="detail-group">
                <label class="detail-label">{{ t('pages.contact.branches.egypt.addressLabel') }}</label>
                <p class="detail-text" v-html="t('pages.contact.branches.egypt.address')"></p>
              </div>

              <div class="detail-group">
                <label class="detail-label">{{ t('pages.contact.branches.egypt.phoneLabel') }}</label>
                <p class="detail-value">{{ t('pages.contact.branches.egypt.phone') }}</p>
              </div>

              <div class="detail-group">
                <label class="detail-label">{{ t('pages.contact.branches.egypt.mobileLabel') }}</label>
                <p class="detail-value">{{ t('pages.contact.branches.egypt.mobile') }}</p>
              </div>

              <div class="detail-group">
                <label class="detail-label">{{ t('pages.contact.branches.egypt.mailLabel') }}</label>
                <p class="detail-value">{{ t('pages.contact.branches.egypt.mail') }}</p>
              </div>

              <div class="detail-group">
                <label class="detail-label">{{ t('pages.contact.branches.egypt.hoursLabel') }}</label>
                <p class="detail-value" v-html="t('pages.contact.branches.egypt.hours')"></p>
              </div>

              <div class="contact-persons">
                <div class="contact-person">
                  <strong>{{ t('pages.contact.branches.egypt.finance') }}</strong>
                  <p>{{ t('pages.contact.branches.egypt.financePhone') }}</p>
                  <p>{{ t('pages.contact.branches.egypt.financeEmail') }}</p>
                </div>

                <div class="contact-person">
                  <strong>{{ t('pages.contact.branches.egypt.manager') }}</strong>
                  <p>{{ t('pages.contact.branches.egypt.managerPhone') }}</p>
                  <p>{{ t('pages.contact.branches.egypt.managerEmail') }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="branch-image">
            <img src="@/assets/EgyptBranche_image.png" :alt="t('pages.contact.branches.egypt.name')" />
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
  padding-bottom: 0;
  background-image: url("@/assets/Framesvg.svg");
  background-position: left bottom;
  background-repeat: no-repeat;
  background-size: contain;
  min-height: 640px;
  max-height: 640px;

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
  position: absolute;
  top: -9rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
  max-width: 960px;
  margin: 0 auto;
  background: white;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  padding: 58px 47px;
  width: 100%;
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
  transition: border-color 0.2s;
}

.field-input::placeholder,
.field-textarea::placeholder {
  color: #adaebc;
}

.field-input:focus,
.field-textarea:focus {
  border-color: var(--primary-blue);
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
  transition: background-color 0.2s, box-shadow 0.2s;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.submit-button:hover:not(:disabled) {
  background: #2563eb;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.submit-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
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
  }

  .support-section,
  .branches-section {
    padding: 48px 40px;
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

  .form-row {
    grid-template-columns: 1fr;
  }

  .form-container {
    padding: 32px 24px;
  }

  .form-title,
  .support-title,
  .branches-title {
    font-size: 32px;
    line-height: 36px;
  }

  .faq-grid {
    grid-template-columns: 1fr;
    gap: 24px;
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

  .support-section,
  .branches-section {
    padding: 40px 24px;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 28px;
    line-height: 32px;
  }

  .hero-subtitle {
    font-size: 16px;
    line-height: 24px;
  }

  .form-title,
  .support-title,
  .branches-title {
    font-size: 28px;
    line-height: 32px;
  }

  .form-container {
    padding: 24px 16px;
  }

  .faq-card {
    flex-direction: column;
  }

  .branch-name {
    font-size: 24px;
  }

  .detail-text,
  .detail-value,
  .contact-person,
  .contact-person p {
    font-size: 16px;
  }
}
</style>
