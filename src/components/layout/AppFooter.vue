<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AppFooter",
  data() {
    return {};
  },
  computed: {
    isArabic(): boolean {
      return this.$i18n.locale.startsWith("ar");
    },
    direction(): "rtl" | "ltr" {
      return this.isArabic ? "rtl" : "ltr";
    },
  },
});
</script>

<template>
  <footer class="footer" :dir="direction">
    <!-- container -->
    <div class=" footer-container">
      <div class="footer-content">
        <div class="footer_columns logo_column">
          <div class="logo_svg">
            <img src="@/assets/BlueLineLogo.svg" alt="Blue Line Logo" />
            <div class="logo_text">
              <h1>{{ $t("footer.BlueLine") }}</h1>
              <span>{{ $t("footer.BlueLineDesc") }}</span>
            </div>
          </div>
          <p>
            {{ $t("footer.FooterDescription") }}
          </p>
        </div>
        <!-- <div class="footer_columns">
          <h2 class="title_footer">
            {{ $t("footer.BusinessMedia") }}
          </h2>
          
          <RouterLink to="/">{{ $t("footer.about") }}</RouterLink>
          <RouterLink to="/">{{ $t("footer.contact") }}</RouterLink>
          <RouterLink to="/">{{ $t("footer.OurServices") }}</RouterLink>
      </div> -->
        <!-- privacy-policy -->
        <!-- terms-conditions -->
        <!-- terms-conditions -->
        <div class="footer_columns contact_us">
          <h2 class="title_footer">
            {{ $t("footer.contact") }}
          </h2>
          <ul class="contacts">
            <li>
              <div class="contact_icon">
                <img src="@/assets/IconPhone.svg" alt="">
              </div>
              0223555525 / 054 757 5530
            </li>
            <li>
              <div class="contact_icon">
                <img src="@/assets/MailIcon.svg" alt="">
              </div>
              info@blueline-sa.net
            </li>
            <li>
              <div class="contact_icon">
                <img src="@/assets/LocationIcon.svg" alt="">
              </div>
              KSA , Egypt
            </li>
          </ul>
        </div>
        <!-- <div class="footer_columns">
          <h2 class="title_footer">
            {{ $t("footer.WorkingHours") }}
          </h2>
          <div class="hours">
            <p>{{ $t("footer.WorkingDays") }}</p>
            <p>{{ $t("footer.WorkingDaysHours") }}</p>
          </div>
          <div class="social_links">
            <a href="#">
              <img src="@/assets/FacebookIcon.svg" alt="Facebook" />
            </a>
            <a href="#">
              <img src="@/assets/LinkedIn.svg" alt="Facebook" />
            </a>
          </div>
        </div> -->
        <div class="footer_columns">
          <h2 class="title_footer">
            {{ $t("footer.Legal") }}
          </h2>
          <!-- privacy-policy -->
          <RouterLink to="/">{{ $t("footer.about") }}</RouterLink>
          <!-- terms-conditions -->
          <RouterLink to="/">{{ $t("footer.contact") }}</RouterLink>
        </div>
      </div>

      <div class="footer-bottom">
        <span>{{ $t("footer.copyright") }}</span>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  display: flex;
  width: 100%;
  padding: 53px 52px 32px 52px;
  flex-direction: column;
  align-items: flex-start;
  border-top: 1px solid #E5E7EB;
  background: #FFF;
}

.footer-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px
}

.footer-content {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 24px;
}

.footer_columns {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-width: 20%;
  flex: 1 1 auto;
  min-width: 200px;
}

.footer_columns a {
  display: flex;
  padding: 8px 0;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  color: #71717A;
  font-size: 14px;
  font-weight: 500;
  line-height: 19.6px;
}

.logo_text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.641px;
}

.logo_text h1 {
  color: #1E1443;
  font-family: "Inter Tight";
  font-size: 19.694px;
  font-style: normal;
  font-weight: 600;
  line-height: 18.463px;
}

.logo_text span {
  color: #1E1443;
  font-family: "Inter Tight";
  font-size: 8.206px;
  font-style: normal;
  font-weight: 600;
  line-height: 8.206px;
}

.logo_svg {
  display: flex;
  padding-left: 5px;
  align-items: center;
  gap: 6.975px;
}

.logo_svg img {
  width: 30.793px;
  height: 25px;
  aspect-ratio: 30.79/25.00;
}

.contact_us {
  max-width: 25%;
}

.contacts {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
}

.contacts li {
  display: flex;
  padding: 4px 0;
  align-items: flex-start;
  gap: 12px;

  color: #71717A;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 19.6px;
  letter-spacing: -0.32px;
}

.footer_columns .hours {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.footer_columns .hours p {
  color: #71717A;
  font-family: "Inter Tight";
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 19.6px;
  /* 140% */
  letter-spacing: -0.32px;
}

.footer_columns .social_links {
  display: flex;
  align-items: flex-start;
  gap: 8px;
}

.footer_columns .social_links a {
  display: flex;
  width: 24.429px;
  height: 24px;
  padding: 5.143px 7.714px;
  align-items: center;
  justify-content: center;
  gap: 4.286px;
  aspect-ratio: 24.43/24.00;
  border-radius: 4285.286px;
  border: 0 solid #E5E7EB;
  background: #2970FF;
}

.logo_column {
  gap: 12px
}

.footer-bottom {
  width: 100%;
  display: flex;
  justify-content: center;
}

.footer-bottom span {
  color: #71717A;
  font-family: Inter;
  font-size: 12.6px;
  font-style: normal;
  font-weight: 500;
  line-height: 18.9px;
  letter-spacing: -0.32px;
}

/* Tablet styles (768px - 1024px) */
@media (max-width: 1024px) {
  .footer {
    padding: 40px 32px 24px 32px;
  }

  .footer-content {
    gap: 32px;
  }

  .footer_columns {
    max-width: 45%;
    min-width: 45%;
  }

  .logo_column {
    max-width: 100%;
    min-width: 100%;
  }

  .contact_us {
    max-width: 45%;
  }
}

/* Mobile styles (below 768px) */
@media (max-width: 768px) {
  .footer {
    padding: 32px 20px 20px 20px;
  }

  .footer-container {
    gap: 24px;
  }

  .footer-content {
    flex-direction: column;
    gap: 24px;
  }

  .footer_columns {
    max-width: 100%;
    min-width: 100%;
  }

  .logo_column {
    max-width: 100%;
  }

  .contact_us {
    max-width: 100%;
  }

  .contacts li {
    font-size: 13px;
    line-height: 18px;
  }

  .footer_columns a {
    font-size: 13px;
    line-height: 18px;
  }

  .footer_columns .hours p {
    font-size: 13px;
    line-height: 18px;
  }

  .footer-bottom span {
    font-size: 11px;
    line-height: 16px;
    text-align: center;
  }
}

/* Small mobile styles (below 480px) */
@media (max-width: 480px) {
  .footer {
    padding: 24px 16px 16px 16px;
  }

  .logo_text h1 {
    font-size: 17px;
    line-height: 16px;
  }

  .logo_text span {
    font-size: 7px;
    line-height: 7px;
  }

  .logo_svg img {
    width: 26px;
    height: 21px;
  }

  .contacts li {
    gap: 8px;
    font-size: 12px;
    line-height: 16px;
  }

  .footer_columns a {
    font-size: 12px;
    line-height: 16px;
    padding: 6px 0;
  }

  .footer_columns .hours p {
    font-size: 12px;
    line-height: 16px;
  }

  .footer_columns .title_footer {
    font-size: 14px;
  }

  .footer-bottom span {
    font-size: 10px;
    line-height: 14px;
  }
}
</style>
