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
      BlueLinenumbers: [
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
      ],
    };
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
</style>
