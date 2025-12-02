<template>
  <section class="about_blue">
    <div class="container">
      <div class="about_container">
        <div class="text_box">
          <h2>About Blue Line</h2>
          <p>
            Blue Line is a Saudi-owned logistics service provider, established in 2011, with a strong presence across
            Saudi Arabia, Egypt, Oman, and Dubai.
          </p>

          <p>
            We specialize in air and ocean freight forwarding, customs brokerage, and international courier services,
            offering seamless, reliable, and professional logistics solutions tailored to our clients' needs.
          </p>
          <p>
            Backed by over 25 years of combined industry experience, our team ensures operational excellence through
            efficiency, transparency, and personalized service.
          </p>
          <p>
            With a global network of partners and a proven reputation for credibility, integrity, and reliability, Blue
            Line has become a trusted leader in regional and international logistics.
          </p>

        </div>
        <div class="img_box">
          <img src="@/assets/about_image.png" alt="about blue line" />
        </div>
      </div>

      <div class="about_numbers">

        <NumbersBox v-for="box in aboutNumbers" :key="box.id" :icon="box.icon" :number="box.number" :text="box.text"
          suffix="+" iconType="component" />

      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NumbersBox from "@/components/common/NumbersBox.vue";

// Numbers Icons
import yearsAward from "@/assets/svg/yearsAward.vue";
import ConectionsIcon from "@/assets/svg/ConectionsIcon.vue";
import handsIcons from "@/assets/svg/handsIcons.vue";
import BuldingIcon from "@/assets/svg/BuldingIcon.vue";

export default defineComponent({
  name: "OurMission",
  components: {
    NumbersBox,
    yearsAward,
    ConectionsIcon,
    handsIcons,
    BuldingIcon
  },
  props: {},
  data() {
    return {
      aboutNumbers: [
        {
          id: 1,
          icon: yearsAward,
          number: 50,
          text: "Global Partners",
          suffix: "+",
        },
        {
          id: 2,
          icon: ConectionsIcon,
          number: 120,
          text: "Successful Projects",
          suffix: "+",
        },
        {
          id: 3,
          icon: handsIcons,
          number: 500,
          text: "Satisfied Clients",
          suffix: "+",
        },
        {
          id: 4,
          icon: BuldingIcon,
          number: 10,
          text: "Years of Experience",
          suffix: "+",
        },
      ],
    };
  },
  computed: {},
  methods: {},
});
</script>

<style scoped>
.about_blue {
  display: flex;
  padding-top: 64px;
  padding-bottom: 26px;
}

.about_container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 32px;
  align-self: stretch;
}

.text_box {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 50%;
}

.text_box h2 {
  color: #1E2225;
  font-size: 30px;
  font-weight: 600;
}

.text_box p {
  color: #71717A;
  font-size: 18px;
  font-weight: 400;
  line-height: 24px;
}

.img_box {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 50%;
}

.img_box img {
  width: 100%;
  border-radius: 0 0 0 103px;
  background: url(<path-to-image>) lightgray 50% / cover no-repeat;
  max-width: 584px;
  max-height: 389px;
  aspect-ratio: 584/389;
}


.about_numbers {
  margin-top: 64px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 24px;
}
</style>
