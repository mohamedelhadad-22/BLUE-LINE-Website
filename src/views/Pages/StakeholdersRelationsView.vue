<script lang="ts">
import { defineComponent, shallowRef } from "vue";
import HeroBanner from "@/components/resuble/HeroBanner.vue";
import commonButton from "@/components/resuble/common_button.vue";

import heroImg from "@/assets/2Untitled-5.xlarge.jpg?url";

export default defineComponent({
  name: "StakeholdersRelationsView",
  components: { HeroBanner, commonButton },
  data() {
    return {
      heroImg: shallowRef(heroImg),
    };
  },
  computed: {
    BlueLinenumbers() {
      const value = [
        {
          id: 1,
          number: "40" + " " + this.$t("stakeholders.million"),
          desc: this.$t("stakeholders.Desc1"),
        },
        {
          id: 2,
          number: "4023",
          desc: this.$t("stakeholders.Desc2"),
        },
        {
          id: 3,
          number: "2024",
          desc: this.$t("stakeholders.Desc3"),
        },
      ];
      return value;
    },
  },
});
</script>

<template>
  <section class="Stakeholders">
    <div class="container">
      <HeroBanner
        :title="$t('stakeholders.Stakeholders')"
        :subtitle="$t('stakeholders.StakeholdersDesc')"
        :media-src="heroImg"
        :with-img="true"
      >
        <commonButton :text="$t('stakeholders.ContactUs')" buttonType="XL" />
      </HeroBanner>
    </div>

    <section class="StrategicObjectives">
      <div class="container">
        <div class="strategi_content">
          <nav class="breadcrumbs" aria-label="breadcrumb">
            <a href="/">{{ $t("Home") }}</a>
            <span class="sep" aria-hidden="true">/</span>
            <span class="current">{{ $t("pages.careers.headline") }}</span>
          </nav>
          <div class="statsNumbers">
            <h2 class="title">{{ $t("stakeholders.StrategicObjectives") }}</h2>
            <div class="container dvider"></div>

            <div class="numbers_boxs">
              <div
                class="box"
                v-for="number in BlueLinenumbers"
                :key="number.id"
              >
                <h3>{{ number.number }}</h3>
                <div class="square"></div>
                <p>{{ number.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="why_blue_line">
      <div class="container">
        <div class="why_content">
          <div class="left_side">
            <h6 class="title">{{ $t("stakeholders.whyBlueLine") }}</h6>
            <h1>{{ $t("stakeholders.whyBlueLineTitle") }}</h1>
            <p>{{ $t("stakeholders.whyBlueLineDesc") }}</p>

            <div class="saudi_falg">
              <img src="@/assets/image-(4)٦.png" alt="" />
            </div>
          </div>
          <div class="right_side">
            <div class="box_label">
              <h3>{{ $t("stakeholders.StrategicGlobal") }}</h3>
              <p>{{ $t("stakeholders.StrategicGlobalDesc") }}</p>
            </div>
            <div class="box_label">
              <h3>{{ $t("stakeholders.EnhancedGlobal") }}</h3>
              <p>{{ $t("stakeholders.EnhancedGlobalDesc") }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section_line container container--noPadding">
      <div class="dividerLine__inner"></div>
    </section>
  </section>
</template>

<style scoped>
.Stakeholders {
  display: flex;
  flex-direction: column;
  margin-bottom: 70px;
}
.StrategicObjectives {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.strategi_content {
  display: flex;
  flex-direction: column;
  background-color: var(--color-primary);
  width: 100%;
}
.statsNumbers {
  display: flex;
  flex-direction: column;
  padding-bottom: 50px;
}
.statsNumbers h2 {
  text-align: center;
  font-size: 28px;
  color: #fff;
}
.dvider {
  margin-top: clamp(48px, 5.6774193548vw, 68px);
  height: 1px;
  width: 80%;
  background: #817979;
}
.numbers_boxs {
  display: flex;
  flex-direction: row;
  gap: 20px;
  justify-content: center;
  padding: 0 10rem;
  margin: 3rem 0;
}
.numbers_boxs .box {
  padding-inline: 1rem;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  text-align: center;
  color: #fff;
}
.box .square {
  width: 10px;
  height: 10px;
  background-color: var(--color-accent);
}
.box h3 {
  font-size: clamp(4.8rem, 4.1290322581vw, 6.4rem);
  line-height: 1.2;
  font-weight: 300;
}
.box p {
  font-size: 20px;
  line-height: 1.2;
  font-weight: 300;
}
.breadcrumbs * {
  color: #fff;
}
.why_blue_line {
  width: 100%;
}
.why_content {
  display: flex;
  flex-direction: row;
  gap: 12.764%;
  padding-inline: 5.42%;
  padding-block: clamp(64px, 9.2903225806vw, 144px);
  background-color: #eff6f5;
}
.why_content .left_side {
  display: flex;
  flex-direction: column;
  gap: 32px;
  max-width: 50%;
}
.left_side h6 {
  font-size: 1rem;
}
.left_side h1 {
  font-size: 3.2rem;
  font-weight: 500;
}
.left_side p {
  margin-top: 20px;
  font-size: 1.8rem;
  font-weight: 500;
}
.why_content .right_side {
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  /* justify-content: center; */
  max-width: 50%;
}

.right_side .box_label {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-block: clamp(24px, 2.064516129vw, 32px);
  border-top: 1px solid #dadada;
}
.right_side h3 {
  line-height: 1.4;
  font-size: 1.8rem;
  font-weight: 400;
}

.right_side p {
  line-height: 1.4;
  font-size: 1.6rem;
  font-weight: 400;
}
.saudi_falg {
  margin-top: clamp(40px, 5.1612903226vw, 80px);
}
.saudi_falg img {
  width: 100%;
  height: 100%;
}
.container--noPadding {
  padding-right: 0;
  padding-left: 0;
}
.dividerLine {
  position: relative;
  z-index: 0;
}
.section_line {
  position: relative;
  display: flex;
  height: 12rem;
  margin-top: 20px;
  align-items: center;
  justify-content: center;
  padding-right: 12%;
}
.section_line::after {
  background-image: url("@/assets/dividerLine.svg");
  position: absolute;
  top: 0;
  z-index: 1;
  background-position: 100% -1%;
  background-repeat: repeat;
  background-size: 100% 51%;
  padding-top: 12.5rem;
  width: 12.5rem;
  height: 0;
  content: "";
  pointer-events: none;
  right: 0;
  padding-top: 24%;
  width: 24%;
  right: 0;
  transform: scaleX(-1);
}
@media (min-width: 768px) {
  .dividerLine__inner {
    /* padding-inline: 5.42%; */
  }
}
.dividerLine__inner.dvider {
  width: 100%;
}
.dividerLine__inner {
  display: block;
  background-color: #dadada;
  height: 1px;
  width: 100%;
  /* margin-top: 6rem; */
}
@media (min-width: 768px) {
  .dividerLine--line .dividerLine__inner:before {
    width: calc(100% - 16px);
  }
}
</style>
