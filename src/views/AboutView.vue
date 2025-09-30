<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "aboutView",
  data() {
    return {};
  },
  methods: {},
  mounted() {},
});
</script>

<template>
  <div class="about_page container">
    <div class="heroGeneric">
      <div class="heroGeneric__content">
        <h1>
          <span>Connecting</span>
          {{ $t("Continents, Cultures, and Cargo") }}
        </h1>
      </div>
    </div>

    <div class="about-us container">
      <div class="breadcrumbs__inner">
        <ul class="breadcrumbs__items">
          <li class="breadcrumbs__item">
            <router-link to="/" class="breadcrumbs__link">Homepage</router-link>
          </li>
          <li class="breadcrumbs__item">
            <span class="breadcrumbs__text">About us</span>
          </li>
        </ul>
      </div>

      <div class="columnIcons__inner">
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
        <p class="columnIcons__intro">
          {{ $t("aboutSection.headDescription") }}
        </p>
      </div>

      <div class="columnIcons__content">
        <div class="columnIcons__boxes">
          <ul class="columnIcons__items">
            <li class="columnIcons__item">
              <div class="columnIcons__itemIcon">
                <span class="columnIcons__icon icon-pointer"></span>
              </div>
              <p class="columnIcons__itemText">
                Strategic location at the heart of global trade routes,
                supporting the Kingdom of Saudi Arabia’s ambition to become a
                global logistics hub
              </p>
            </li>
            <li class="columnIcons__item">
              <div class="columnIcons__itemIcon">
                <span class="columnIcons__icon icon-arrows-in"></span>
              </div>
              <p class="columnIcons__itemText">
                Enhanced supply chain transparency and reliability through agile
                local and regional connectivity
              </p>
            </li>
            <li class="columnIcons__item">
              <div class="columnIcons__itemIcon">
                <span class="columnIcons__icon icon-anchor"></span>
              </div>
              <p class="columnIcons__itemText">
                Committed to sustainable shipping practices, in alignment with
                the IMO's target of 40% Greenhouse gas (GHG) reduction by 2030
              </p>
            </li>
            <li class="columnIcons__item">
              <div class="columnIcons__itemIcon">
                <span class="columnIcons__icon icon-computer"></span>
              </div>
              <p class="columnIcons__itemText">
                Efficiency steers our endeavors, charting the course for
                groundbreaking industry standards
              </p>
            </li>
            <li class="columnIcons__item">
              <div class="columnIcons__itemIcon">
                <span class="columnIcons__icon icon-ship"></span>
              </div>
              <p class="columnIcons__itemText">
                Our vessels, schedules, and routes are customized to meet the
                unique preferences of our customers
              </p>
            </li>
            <li class="columnIcons__item">
              <div class="columnIcons__itemIcon">
                <span class="columnIcons__icon icon-sun"></span>
              </div>
              <p class="columnIcons__itemText">
                Dedicated to advancing skills, employment, and career growth
                within the maritime sector of the Kingdom of Saudi Arabia
              </p>
            </li>
          </ul>
        </div>

        <div class="columnIcons__text">
          <h2 class="columnIcons__textTitle heading__h3">
            Building a Global Logistics Hub through Transformative Shipping
            Initiatives
          </h2>
          <div class="columnIcons__intro">
            <div class="columnIcons__introText">
              Folk Maritime spearheads the journey towards positioning Saudi
              Arabia as a global logistics hub. Leveraging the country's
              distinctive geographic advantage on the Red Sea and Arabian Gulf,
              our strategic endeavors intend to improve connectivity, optimize
              logistics efficiency, and reinforce sector capabilities. We are
              committed to maritime sustainability, adhering to the IMO's target
              of 40% GHG reduction by 2030. We also support transformative
              technologies and the uptake of alternative zero—and near-zero GHG
              fuels. As a leading regional player in the maritime feeder and
              liner services, we actively strive to increase private sector
              participation in industries reliant on seamless logistics. Aligned
              with Saudi Arabia's Vision 2030 objectives, our commitment extends
              to enhancing export, re-export, and domestic cargo volumes,
              building a prosperous and influential future for the nation.
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about_page {
  display: flex;
  flex-direction: column;
  /* gap: 16px; */
  width: 100%;
}

.heroGeneric {
  padding-block: clamp(56px, 5.2258064516vw, 81px);
  width: 100%;
  min-height: clamp(436px, 30.5806451613vw, 474px);
  display: flex;
  position: relative;
  justify-items: center;
  width: 100%;
  color: #fff;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url(@/assets/hero-about.jpg);
  object-fit: cover;
}
.heroGeneric__content {
  max-width: 59.936%;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 0 0 0 60px;
}
.heroGeneric__content h1 {
  font-size: clamp(4.8rem, 4.6451612903vw, 7.2rem);
  line-height: 1.2;
  font-weight: 300;
}
.heroGeneric__content h1 span {
  color: #262262;
}

.about-us {
  position: relative;
  background-color: #eff6f5;
}
.about-us:after {
  background-image: url(/src/assets/aboutPatern.svg);
  position: absolute;
  top: 0;
  z-index: 3;
  background-position: 100% -1%;
  background-repeat: repeat;
  background-size: 100% 51%;
  width: 34%;
  height: 0;
  content: "";
  pointer-events: none;
  right: 0;
  padding-top: 34%;
  transform: scaleX(-1);
}
.breadcrumbs__inner {
  padding-top: 3.2rem;
  padding-inline: 2rem;
  color: #000;
}
@media (min-width: 768px) and (min-width: 768px) {
  .breadcrumbs__inner {
    padding-inline: 5.42%;
  }
}

.breadcrumbs__items {
  display: flex;
  position: relative;
  flex-wrap: wrap;
  visibility: hidden;
  z-index: 2;
  line-height: 1.4;
  font-size: 1.6rem;
}
.breadcrumbs__item {
  display: inline-flex;
  position: relative;
  visibility: visible;
  align-items: center;
}
.breadcrumbs__link {
  transition: opacity 0.3s;
  opacity: 0.5;
  color: inherit;
  font-size: 16px;
}
.breadcrumbs__item + .breadcrumbs__item:before {
  display: inline-block;
  flex-shrink: 0;
  opacity: 0.5;
  margin-inline: 0.8rem;
  content: "/";
}
.breadcrumbs__text {
  opacity: 0.7;
  font-size: 16px;
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
.columnIcons__inner {
  padding-inline: 2rem;
  padding-block: max(64px, min(9.2903225806vw, 144px));
  padding-block: clamp(64px, 9.2903225806vw, 144px);
  display: flex;
  position: relative;
  flex-direction: column;
  z-index: 2;
  background-color: #eff6f5;
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
@media (min-width: 768px) {
  .columnIcons__inner {
    padding-inline: 5.42%;
  }
}

.about-heading {
  font-size: clamp(2rem, 3.6129032258vw, 3.6rem);
  line-height: 1.2;
  font-weight: 300;
  margin-top: 24px;
}

@media (min-width: 768px) {
  .about-heading {
    padding-inline: 0 80px;
    max-width: 770px;
  }
}

@media (min-width: 768px) {
  .columnIcons__intro {
    flex-direction: row;
    margin-top: 4.8rem;
  }
}
.columnIcons__intro {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 3.2rem;
  width: 100%;
  color: #2b3990;
  flex: 1;
  line-height: 1.4;
  font-size: 1.4rem;
  padding-inline: 0 28px;
  max-width: 780px;
}

@media (min-width: 1024px) {
  .columnIcons__content {
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    margin-top: 8rem;
  }
}
.columnIcons__content {
  display: flex;
  /* flex-direction: column-reverse; */
  margin-top: 4.8rem;
  gap: 6rem;
}

@media (min-width: 1024px) {
  .columnIcons__boxes {
    margin-top: 0;
    width: calc(40% - 70px);
  }
}
.columnIcons__boxes {
  /* margin-top: 4.8rem; */
  width: 100%;
}

@media (min-width: 1024px) {
  .columnIcons__text {
    position: sticky;
    top: 4rem;
    width: calc(60% - 70px);
  }
}
.columnIcons__text {
  width: 100%;
}
@media (min-width: 768px) {
  .columnIcons__items {
    gap: 3.2rem;
  }
}
.columnIcons__items {
  display: flex;
  flex-direction: column;
  gap: 2.8rem;
}

@media (min-width: 1280px) {
  .columnIcons__item {
    gap: 3.2rem;
  }
}
@media (min-width: 1024px) {
  .columnIcons__item {
    flex-direction: row;
  }
}
@media (min-width: 768px) {
  .columnIcons__item {
    flex-direction: column;
    gap: 2.4rem;
    padding: 4rem 3.2rem;
  }
}
.columnIcons__item {
  display: flex;
  position: relative;
  flex: 1 0 30%;
  gap: 1.6rem;
  border: 1px solid #dadada;
  border-radius: 8px;
  padding: 1.6rem 2.4rem;
  line-height: 1.4;
  font-size: 2.4rem;
  flex-direction: row;
}
.columnIcons__item p {
  font-size: 28px;
}
.columnIcons__itemIcon {
  display: flex;
  flex: 0 0 5rem;
  align-items: center;
  justify-content: center;
  background-color: #004d4514;
  width: 5rem;
  height: 5rem;
}
</style>
