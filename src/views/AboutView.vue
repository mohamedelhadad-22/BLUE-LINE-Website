<script lang="ts">
import { defineComponent } from "vue";
import TeamMemberModal from "@/components/TeamMemberModal.vue";
import arrow from "@/assets/svg/arrow.vue";
import EsgVerticalSlider from "@/components/Home/EsgVerticalSlider.vue";
import about1 from "@/assets/about-1.jpg";
import about2 from "@/assets/about-2.jpg";
import about3 from "@/assets/about-3.jpg";
import teamIcon from "@/assets/svg/teamIcon.vue";
import mapPointerIcon from "@/assets/svg/mapPointerIcon.vue";
import arrowsInIcon from "@/assets/svg/arrowsInIcon.vue";
import anchorIcon from "@/assets/svg/anchorIcon.vue";
import computerLine from "@/assets/computer-line.vue";
import shipIcon from "@/assets/svg/shipIcon.vue";
import sun from "@/assets/sun.vue";
export default defineComponent({
  name: "aboutView",
  components: {
    TeamMemberModal,
    arrow,
    EsgVerticalSlider,
    teamIcon,
    mapPointerIcon,
    arrowsInIcon,
    anchorIcon,
    computerLine,
    shipIcon,
    sun,
  },
  data() {
    return {
      activeIndex: 0,
      lastImageIndex: 0,
      boardMembers: [
        {
          id: 1,
          name: "Abdullah Mohammed Alzamil",
          role: "Chairman",
          image:
            "https://folkmaritime.com/storage/media/70/Abdullah-Alzamil_preview_rev_1.png",
          bio: "Bio placeholder for Chairman.",
        },
        {
          id: 2,
          name: "Bakr AlMuhanna",
          role: "Vice Chairman",
          image:
            "https://folkmaritime.com/storage/media/71/Bakr-AlMuhanna_preview_rev_1.png",
          bio: "Bio placeholder for Vice Chairman.",
        },
        {
          id: 3,
          name: "Abdullah Alsalem",
          role: "Member",
          image:
            "https://folkmaritime.com/storage/media/72/100-(1)_preview_rev_1.png",
          bio: "Bio placeholder for member.",
        },
        {
          id: 4,
          name: "Faris AlJarboa",
          role: "Member",
          image:
            "https://folkmaritime.com/storage/media/73/0Q7A9933-2-edited_preview_rev_1.png",
          bio: "Bio placeholder for member.",
        },
        {
          id: 5,
          name: "Ranjith Powell",
          role: "Member",
          image:
            "https://folkmaritime.com/storage/media/74/Ranjith-Powell-Photo_preview_rev_1.png",
          bio: "Bio placeholder for member.",
        },
        {
          id: 6,
          name: "Jesper Kjaedegaard",
          role: "Member",
          image:
            "https://folkmaritime.com/storage/media/75/Jesper-Kjaedegaard---Will-send-you-another-picture_preview_rev_1.png",
          bio: "Bio placeholder for member.",
        },
        {
          id: 7,
          name: "Peter Ford",
          role: "Member",
          image:
            "https://folkmaritime.com/storage/media/76/Peter-Ford_preview_rev_1.png",
          bio: "Bio placeholder for member.",
        },
        {
          id: 8,
          name: "Basil Abulhamayel",
          role: "Member",
          image:
            "https://folkmaritime.com/storage/media/99/Basil-Abulhamayel-1.png",
          bio: "Bio placeholder for member.",
        },
      ],
      execMembers: [
        {
          id: 1,
          name: "Poul Hestbaek",
          role: "Chief Executive Officer",
          image:
            "https://folkmaritime.com/storage/media/16/conversions/team-poul_hestbaek.medium.webp",
          bio: "Poul is a seasoned maritime industry leader with executive experience across Europe, Latin America, and APAC.",
        },
        {
          id: 2,
          name: "Kim Kennet Larsen",
          role: "Chief Commercial Officer",
          image: "https://folkmaritime.com/storage/media/174/222kim.gif",
          bio: "Kim brings extensive commercial leadership and strategy execution across global shipping markets.",
        },
        {
          id: 3,
          name: "Khalid Fawzi",
          role: "Chief Financial Officer",
          image: "https://folkmaritime.com/storage/media/177/khalid-fawzi.png",
          bio: "Khalid Fawzi is a highly experienced financial leader with over 20 years of expertise across Saudi Arabia.",
        },
        {
          id: 1,
          name: "Poul Hestbaek",
          role: "Chief Executive Officer",
          image:
            "https://folkmaritime.com/storage/media/16/conversions/team-poul_hestbaek.medium.webp",
          bio: "Poul is a seasoned maritime industry leader with executive experience across Europe, Latin America, and APAC.",
        },
        {
          id: 2,
          name: "Kim Kennet Larsen",
          role: "Chief Commercial Officer",
          image: "https://folkmaritime.com/storage/media/174/222kim.gif",
          bio: "Kim brings extensive commercial leadership and strategy execution across global shipping markets.",
        },
        {
          id: 1,
          name: "Poul Hestbaek",
          role: "Chief Executive Officer",
          image:
            "https://folkmaritime.com/storage/media/16/conversions/team-poul_hestbaek.medium.webp",
          bio: "Poul is a seasoned maritime industry leader with executive experience across Europe, Latin America, and APAC.",
        },
        {
          id: 2,
          name: "Kim Kennet Larsen",
          role: "Chief Commercial Officer",
          image: "https://folkmaritime.com/storage/media/174/222kim.gif",
          bio: "Kim brings extensive commercial leadership and strategy execution across global shipping markets.",
        },
      ],
      modalOpen: false,
      selectedMember: null as any,
      // slides now computed to reflect locale changes
    };
  },
  computed: {
    esgSlides(): Array<{
      heading: string;
      copy?: string;
      image: string;
      alt?: string;
    }> {
      return [
        {
          heading: this.$t("aboutPage.esg.slide1.title") as string,
          copy: this.$t("aboutPage.esg.slide1.desc") as string,
          image: about1 as unknown as string,
          alt: "Sustainability image",
        },
        {
          heading: this.$t("aboutPage.esg.slide2.title") as string,
          copy: this.$t("aboutPage.esg.slide2.desc") as string,
          image: about2 as unknown as string,
          alt: "Sustainability image",
        },
        {
          heading: this.$t("aboutPage.esg.slide3.title") as string,
          copy: this.$t("aboutPage.esg.slide3.desc") as string,
          image: about3 as unknown as string,
          alt: "Sustainability image",
        },
      ];
    },
  },
  methods: {
    toggleItem(index: number) {
      // Toggle open/close; close if same, open otherwise
      const next = this.activeIndex === index ? -1 : index;
      // if opening, update last image index to this index
      if (next !== -1) {
        this.lastImageIndex = next;
      } else {
        // if closing the current open item, keep lastImageIndex unchanged
      }
      this.activeIndex = next;
    },
    // Smooth height transitions for accordion bodies
    onEnter(el: Element) {
      const element = el as HTMLElement;
      element.style.height = "0px";
      element.style.opacity = "0";
      const target = element.scrollHeight;
      // force reflow
      void element.offsetHeight;
      element.style.transition = "height 300ms ease, opacity 300ms ease";
      element.style.height = target + "px";
      element.style.opacity = "1";
    },
    onAfterEnter(el: Element) {
      const element = el as HTMLElement;
      element.style.height = "auto";
      element.style.transition = "";
    },
    onLeave(el: Element) {
      const element = el as HTMLElement;
      const start = element.scrollHeight;
      element.style.height = start + "px";
      element.style.opacity = "1";
      // force reflow
      void element.offsetHeight;
      element.style.transition = "height 300ms ease, opacity 300ms ease";
      element.style.height = "0px";
      element.style.opacity = "0";
    },
    openMember(member: any) {
      this.selectedMember = member;
      this.modalOpen = true;
    },
    closeModal() {
      this.modalOpen = false;
      this.selectedMember = null;
      console.log(this.modalOpen);
    },
    isActive(index: number) {
      return this.activeIndex === index;
    },
  },
  mounted() {},
});
</script>

<template>
  <div class="about_page">
    <div class="container">
      <div class="heroGeneric">
        <div class="heroGeneric__content">
          <h1>
            <span>{{ $t("aboutPage.Connecting") }}</span>
            {{ $t("aboutPage.ConnectingDesc") }}
          </h1>
        </div>
      </div>

      <div class="about-us container">
        <div class="breadcrumbs__inner">
          <ul class="breadcrumbs__items">
            <li class="breadcrumbs__item">
              <router-link to="/" class="breadcrumbs__link">{{
                $t("aboutPage.home")
              }}</router-link>
            </li>
            <li class="breadcrumbs__item">
              <span class="breadcrumbs__text">{{
                $t("aboutPage.Aboutus")
              }}</span>
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
                  <mapPointerIcon />
                </div>
                <p class="columnIcons__itemText">
                  {{ $t("aboutPage.points.point1") }}
                </p>
              </li>
              <li class="columnIcons__item">
                <div class="columnIcons__itemIcon">
                  <arrowsInIcon />
                </div>
                <p class="columnIcons__itemText">
                  {{ $t("aboutPage.points.point2") }}
                </p>
              </li>
              <li class="columnIcons__item">
                <div class="columnIcons__itemIcon">
                  <anchorIcon />
                </div>
                <p class="columnIcons__itemText">
                  {{ $t("aboutPage.points.point3") }}
                </p>
              </li>
              <li class="columnIcons__item">
                <div class="columnIcons__itemIcon">
                  <computerLine />
                </div>
                <p class="columnIcons__itemText">
                  {{ $t("aboutPage.points.point4") }}
                </p>
              </li>
              <li class="columnIcons__item">
                <div class="columnIcons__itemIcon">
                  <shipIcon />
                </div>
                <p class="columnIcons__itemText">
                  {{ $t("aboutPage.points.point5") }}
                </p>
              </li>
              <li class="columnIcons__item">
                <div class="columnIcons__itemIcon sun-icon">
                  <sun />
                </div>
                <p class="columnIcons__itemText">
                  {{ $t("aboutPage.points.point6") }}
                </p>
              </li>
            </ul>
          </div>

          <div class="columnIcons__text">
            <div class="columnIcons__text-sticky">
              <h2 class="columnIcons__textTitle heading__h3">
                {{ $t("aboutPage.sectionTitle") }}
              </h2>
              <div class="columnIcons__intro">
                <div class="columnIcons__introText">
                  {{ $t("aboutPage.sectionBody") }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="valuesAccordion">
        <div class="valuesAccordion__inner">
          <div class="valuesAccordion__tiles">
            <div class="valuesAccordion__tile">
              <div class="valuesAccordion__tileContent">
                <div
                  class="valuesAccordion__decor label label--decor label--decor03"
                ></div>
                <h3 class="valuesAccordion__tileTitle heading__h3">
                  {{ $t("aboutPage.values.mission.title") }}
                </h3>
                <p class="valuesAccordion__tileText p margin-2-t">
                  {{ $t("aboutPage.values.mission.body") }}
                </p>
              </div>
              <div class="valuesAccordion__tileImage">
                <img
                  class="valuesAccordion__tileImg"
                  src="https://folkmaritime.com/storage/media/147/conversions/Untitled-5121212.medium.jpg"
                  alt="image"
                />
              </div>
            </div>

            <div class="valuesAccordion__tile">
              <div class="valuesAccordion__tileContent">
                <div
                  class="valuesAccordion__decor label label--decor label--decor04"
                ></div>
                <h3 class="valuesAccordion__tileTitle heading__h3">
                  {{ $t("missionSection.items.vision.title") }}
                </h3>
                <p class="valuesAccordion__tileText p margin-2-t">
                  {{ $t("missionSection.items.vision.body") }}
                </p>
              </div>
              <div class="valuesAccordion__tileImage">
                <img
                  class="valuesAccordion__tileImg"
                  src="https://folkmaritime.com/storage/media/120/conversions/WhatsApp-Image-1446-10-29-at-15-06-28.medium.jpg"
                  alt="image"
                />
              </div>
            </div>
          </div>

          <div class="valuesAccordion__content">
            <div class="valuesAccordion__image">
              <img
                class="valuesAccordion__img"
                :style="{
                  opacity: (
                    activeIndex === -1
                      ? lastImageIndex === 0
                      : activeIndex === 0
                  )
                    ? '1'
                    : '0',
                  zIndex:
                    activeIndex === -1
                      ? lastImageIndex === 0
                        ? 2
                        : 1
                      : activeIndex === 0
                        ? 2
                        : 1,
                  transition: 'opacity 0.3s',
                }"
                src="https://folkmaritime.com/storage/media/159/conversions/11-02.medium.jpg"
                alt="image"
                data-values-accordion-image="0"
              />
              <img
                class="valuesAccordion__img"
                :style="{
                  opacity: (
                    activeIndex === -1
                      ? lastImageIndex === 1
                      : activeIndex === 1
                  )
                    ? '1'
                    : '0',
                  zIndex:
                    activeIndex === -1
                      ? lastImageIndex === 1
                        ? 2
                        : 1
                      : activeIndex === 1
                        ? 2
                        : 1,
                  transition: 'opacity 0.3s',
                }"
                src="https://folkmaritime.com/storage/media/160/conversions/222222222222222-01.medium.jpg"
                alt="image"
                data-values-accordion-image="1"
              />
              <img
                class="valuesAccordion__img"
                :style="{
                  opacity: (
                    activeIndex === -1
                      ? lastImageIndex === 2
                      : activeIndex === 2
                  )
                    ? '1'
                    : '0',
                  zIndex:
                    activeIndex === -1
                      ? lastImageIndex === 2
                        ? 2
                        : 1
                      : activeIndex === 2
                        ? 2
                        : 1,
                  transition: 'opacity 0.3s',
                }"
                src="https://folkmaritime.com/storage/media/161/conversions/33333333333333-02.medium.jpg"
                alt="image"
                data-values-accordion-image="2"
              />
              <img
                class="valuesAccordion__img"
                :style="{
                  opacity: (
                    activeIndex === -1
                      ? lastImageIndex === 3
                      : activeIndex === 3
                  )
                    ? '1'
                    : '0',
                  zIndex:
                    activeIndex === -1
                      ? lastImageIndex === 3
                        ? 2
                        : 1
                      : activeIndex === 3
                        ? 2
                        : 1,
                  transition: 'opacity 0.3s',
                }"
                src="https://folkmaritime.com/storage/media/162/conversions/4445444-01.medium.jpg"
                alt="image"
                data-values-accordion-image="3"
              />
            </div>

            <div class="valuesAccordion__accordion">
              <div
                class="valuesAccordion__decor label label--decor label--decor03"
              ></div>
              <h3 class="valuesAccordion__title heading__h3">Our Values</h3>
              <p class="valuesAccordion__text p margin-2-t">
                Blue Line is a dynamic, innovative, and reliable logistics
                company committed to advancing Saudi Arabia’s transportation and
                logistics ambitions through continuous progress and consistent
                delivery.
              </p>

              <div class="valuesAccordion__items margin-6-t">
                <div
                  class="valuesAccordion__item"
                  :class="{ 'valuesAccordion__item--opened': isActive(0) }"
                  data-values-accordion-item="0"
                >
                  <button
                    type="button"
                    class="valuesAccordion__itemHead"
                    data-values-accordion-head=""
                    @click="toggleItem(0)"
                  >
                    <span class="valuesAccordion__itemTitle"
                      >{{ $t("aboutPage.values.items.customer.title")
                      }}<span> </span
                    ></span>
                  </button>
                  <transition
                    @enter="onEnter"
                    @after-enter="onAfterEnter"
                    @leave="onLeave"
                  >
                    <div
                      v-show="isActive(0)"
                      class="valuesAccordion__itemBody"
                      data-values-accordion-body=""
                    >
                      <div class="valuesAccordion__itemBodyInner p">
                        {{ $t("aboutPage.values.items.customer.body") }}
                      </div>
                    </div>
                  </transition>
                </div>
                <div
                  class="valuesAccordion__item"
                  data-values-accordion-item="1"
                  :class="{ 'valuesAccordion__item--opened': isActive(1) }"
                >
                  <button
                    type="button"
                    class="valuesAccordion__itemHead"
                    data-values-accordion-head=""
                    @click="toggleItem(1)"
                  >
                    <span class="valuesAccordion__itemTitle"
                      >{{ $t("aboutPage.values.items.integrity.title")
                      }}<span> </span
                    ></span>
                  </button>
                  <transition
                    @enter="onEnter"
                    @after-enter="onAfterEnter"
                    @leave="onLeave"
                  >
                    <div
                      v-show="isActive(1)"
                      class="valuesAccordion__itemBody"
                      data-values-accordion-body=""
                    >
                      <div class="valuesAccordion__itemBodyInner p">
                        {{ $t("aboutPage.values.items.integrity.body") }}
                      </div>
                    </div>
                  </transition>
                </div>
                <div
                  class="valuesAccordion__item"
                  data-values-accordion-item="2"
                  :class="{ 'valuesAccordion__item--opened': isActive(2) }"
                >
                  <button
                    type="button"
                    class="valuesAccordion__itemHead"
                    data-values-accordion-head=""
                    @click="toggleItem(2)"
                  >
                    <span class="valuesAccordion__itemTitle"
                      >{{ $t("aboutPage.values.items.innovation.title")
                      }}<span> </span
                    ></span>
                  </button>
                  <transition
                    @enter="onEnter"
                    @after-enter="onAfterEnter"
                    @leave="onLeave"
                  >
                    <div
                      v-show="isActive(2)"
                      class="valuesAccordion__itemBody"
                      data-values-accordion-body=""
                    >
                      <div class="valuesAccordion__itemBodyInner p">
                        {{ $t("aboutPage.values.items.innovation.body") }}
                      </div>
                    </div>
                  </transition>
                </div>
                <div
                  class="valuesAccordion__item"
                  data-values-accordion-item="3"
                  :class="{ 'valuesAccordion__item--opened': isActive(3) }"
                >
                  <button
                    type="button"
                    class="valuesAccordion__itemHead"
                    data-values-accordion-head=""
                    @click="toggleItem(3)"
                  >
                    <span class="valuesAccordion__itemTitle"
                      >{{ $t("aboutPage.values.items.sustainability.title")
                      }}<span> </span
                    ></span>
                  </button>
                  <transition
                    @enter="onEnter"
                    @after-enter="onAfterEnter"
                    @leave="onLeave"
                  >
                    <div
                      v-show="isActive(3)"
                      class="valuesAccordion__itemBody"
                      data-values-accordion-body=""
                    >
                      <div class="valuesAccordion__itemBodyInner p">
                        {{ $t("aboutPage.values.items.sustainability.body") }}
                      </div>
                    </div>
                  </transition>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="textBanner">
        <div class="textBanner__inner">
          <div class="textBanner__image">
            <img
              class="textBanner__img"
              src="https://folkmaritime.com/storage/media/144/conversions/Untitled-511.xlarge.jpg"
              alt="image"
            />
          </div>

          <div class="textBanner__content">
            <h3 class="textBanner__title">
              {{ $t("aboutPage.leaders.title") }}
            </h3>
            <p class="textBanner__text p margin-4-t">
              {{ $t("aboutPage.leaders.body") }}
            </p>
          </div>
        </div>
      </div>

      <div class="peopleList">
        <div class="peopleList__inner">
          <div class="peopleList__decor label label--decor">
            <teamIcon />
            {{ $t("aboutPage.board.title") }}
          </div>
          <div class="peopleList__items">
            <div v-for="m in boardMembers" :key="m.id" class="peopleList__item">
              <div class="peopleList__image">
                <img class="peopleList__img" :src="m.image" :alt="m.name" />
              </div>
              <div class="peopleList__name margin-3-t">{{ m.name }}</div>
              <div class="peopleList__function margin-1-t">{{ m.role }}</div>
              <div class="read_more_btn margin-6-t">
                <a class="peopleList__link link" @click="openMember(m)">
                  {{ $t("aboutPage.readMore") }}
                  <arrow />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="peopleList Ourteam">
        <div class="peopleList__inner">
          <div class="peopleList__decor label label--decor">
            <teamIcon /> {{ $t("aboutPage.team.kicker") }}
          </div>
          <h2 class="heading__h3 margin-3-t">
            {{ $t("aboutPage.team.title") }}
          </h2>
          <div class="peopleList__text"></div>
          <div class="peopleList__items">
            <div
              v-for="member in execMembers"
              :key="member.id"
              class="peopleList__item"
            >
              <div class="peopleList__image">
                <img
                  class="peopleList__img"
                  :src="member.image"
                  :alt="member.name"
                />
              </div>
              <div class="peopleList__name margin-3-t">{{ member.name }}</div>
              <div class="peopleList__function margin-1-t">
                {{ member.role }}
              </div>
              <div class="read_more_btn margin-6-t">
                <a class="peopleList__link link" @click="openMember(member)">
                  {{ $t("aboutPage.readMore") }}
                  <arrow />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <EsgVerticalSlider :slides="esgSlides" class="sustainability-about" />
    <!-- <SustainabilitySlider :slides="esgSlides" /> -->
    <TeamMemberModal
      :open="modalOpen"
      :member="selectedMember"
      @close="closeModal"
    />
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
.arabic .heroGeneric__content {
  padding: 0px 60px 0 0px;
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
  padding-bottom: 8rem;
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
.arabic .about-us::after {
  right: unset;
  left: 0px;
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
    padding-inline: 5.42%;
    padding-bottom: 8rem;
  }
}
.columnIcons__content {
  display: flex;
  margin-top: 4.8rem;
  gap: 6rem;
  position: relative;
}
.columnIcons__boxes {
  /* margin-top: 4.8rem; */
  width: 100%;
}
@media (min-width: 1024px) {
  .columnIcons__boxes {
    margin-top: 0;
    width: calc(40% - 0px);
  }
}

.columnIcons__text {
  width: 100%;
}

@media (min-width: 1024px) {
  .columnIcons__text {
    width: calc(60% - 70px);
  }

  .columnIcons__text-sticky {
    position: sticky;
    top: 120px;
    align-self: flex-start;
    z-index: 1;
  }
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
.columnIcons__itemIcon svg {
  width: 2rem;
  height: 2rem;
}
@media (min-width: 768px) {
  .valuesAccordion {
    margin-inline: 0px;
  }
}
.valuesAccordion__inner {
  padding-block: clamp(64px, 9.2903225806vw, 144px);
  background-color: #004d45;
}
@media (min-width: 768px) {
  .valuesAccordion__inner {
    padding-inline: 5.42%;
  }
}

@media (min-width: 768px) {
  .valuesAccordion__tile {
    grid-template-columns: 40.424% 40.424%;
    column-gap: 12.764%;
  }
}
.valuesAccordion__tile {
  display: grid;
  grid-template-rows: auto auto 1fr;
  width: 100%;
}

.valuesAccordion__tileContent {
  position: relative;
  /* grid-row: 2 / 3;
  padding-inline-start: 4.2rem; */
}
@media (min-width: 768px) {
  .valuesAccordion__tileContent {
    padding-inline-start: 15.788%;
    grid-row: 1 / 2;
    grid-column: 1 / 2;
  }
}
.valuesAccordion__tileImage {
  height: max(190px, min(24.5161290323vw, 380px));
  height: clamp(190px, 24.5161290323vw, 380px);
  position: relative;
  grid-row: 1 / 2;
  margin-bottom: 3.4rem;
}
@media (min-width: 768px) {
  .valuesAccordion__tileImage {
    grid-row: 1 / 2;
    grid-column: 2 / 3;
    margin-bottom: 0;
  }
}
.valuesAccordion__decor {
  position: absolute;
  top: 0.5rem;
  inset-inline-start: 0;
}
.label {
  display: inline-flex;
  align-items: center;
  text-transform: uppercase;
  line-height: 1.25;
  font-size: 1.6rem;
  font-weight: 500;
}
.valuesAccordion__tileTitle {
  line-height: 1.2;
  color: #80fd66;
  font-weight: 300;
}
@media (min-width: 768px) {
  .valuesAccordion__tileText {
    font-size: 1.8rem;
  }
}
.valuesAccordion__tileText {
  color: #fff;
}
.p {
  line-height: 1.4;
  font-size: 1.2rem;
  font-weight: 400;
}
.margin-2-t {
  margin-top: 16px;
}
.valuesAccordion__tileImg {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.valuesAccordion__tiles {
  gap: clamp(60px, 6.1935483871vw, 96px);
  display: flex;
  flex-wrap: wrap;
}
.valuesAccordion__content {
  display: flex;
  flex-direction: column;
  margin-top: 7.6rem;
}

@media (min-width: 768px) {
  .valuesAccordion__content {
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    margin-top: 14rem;
  }
}
.valuesAccordion__image {
  display: block;
  position: relative;
  margin-bottom: 3.2rem;
  width: 100%;
  height: 32rem;
  overflow: hidden;
}
@media (min-width: 768px) {
  .valuesAccordion__image {
    width: 44%;
    height: 52rem;
  }
}

.valuesAccordion__img {
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.valuesAccordion__accordion {
  position: relative;
  width: 100%;
}
@media (min-width: 768px) {
  .valuesAccordion__accordion {
    padding-inline-start: 8.5rem;
    width: 50%;
  }
}
.valuesAccordion__decor {
  position: absolute;
  top: 0.5rem;
  inset-inline-start: 0;
}

.valuesAccordion__title {
  padding-inline-start: 4.2rem;
  line-height: 1.2;
  color: #80fd66;
  font-weight: 300;
}

@media (min-width: 768px) {
  .valuesAccordion__title {
    padding-inline-start: 0;
  }
}

.valuesAccordion__text {
  color: #fff;
  padding-inline-start: 4.2rem;
}

.margin-2-t {
  margin-top: 16px;
}
@media (min-width: 768px) {
  .valuesAccordion__text {
    padding-inline-start: 0;
  }
}
.valuesAccordion__items {
  border-top: 1px solid #80fd66;
  border-bottom: 1px solid #80fd66;
  counter-reset: ac-item;
}
.margin-6-t {
  margin-top: 48px;
}
.valuesAccordion__itemHead {
  min-height: max(30px, min(2.1935483871vw, 34px));
  min-height: clamp(30px, 2.1935483871vw, 34px);
  display: flex;
  position: relative;
  align-items: center;
  background-color: transparent;
  cursor: pointer;
  padding: 3rem;
  width: 100%;
  color: #fff;
}
button {
  border: 0;
}
@media (min-width: 768px) {
  .valuesAccordion__itemTitle {
    font-size: 1.2rem;
  }
}
.valuesAccordion__itemTitle {
  transition: color 0.3s;
  font-size: 1.4rem;
  font-weight: 300;
  text-align: start;
}

.valuesAccordion__itemHead:after {
  font-family: icomoon !important;
  font-style: normal;
  font-variant: normal;
  font-weight: 400;
  line-height: 1;
  text-transform: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: block;
  position: absolute;
  top: 50%;
  width: 24px;
  height: 24px;
  margin-top: -12px;
  font-size: 24px;
  line-height: 24px;
  text-align: right;
  transition: color 0.3s;
  color: #80fd66;
  content: "";
}
html:not([dir="rtl"]) .valuesAccordion__itemHead:after {
  right: 2rem;
}
html:not([dir="rtl"]) .valuesAccordion__itemHead:after {
  right: 0;
}
.valuesAccordion__item--opened .valuesAccordion__itemHead:after {
  content: "";
}
.valuesAccordion__item--opened .valuesAccordion__itemBody {
  height: auto;
  overflow: visible;
}
.valuesAccordion__itemBody {
  display: block;
  height: 0;
  overflow: hidden;
}
.valuesAccordion__itemBodyInner {
  padding-top: 1.2rem;
  padding-bottom: 3rem;
  padding-inline: 3rem;
  line-height: 1.4;
  color: #fff;
  font-size: 1.2rem;
  font-weight: 300;
  font-style: normal;
}
.valuesAccordion__item + .valuesAccordion__item {
  border-top: 1px solid #80fd66;
}
.textBanner {
  margin-inline: -2rem;
}
@media (min-width: 768px) {
  .textBanner {
    margin-inline: 0;
  }
}
.textBanner__inner {
  padding-block: clamp(64px, 9.2903225806vw, 144px);
  position: relative;
  background-color: #eff6f5;
}
.textBanner__image {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.textBanner__img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.textBanner__content {
  padding: max(24px, min(2.5806451613vw, 40px));
  padding: clamp(24px, 2.5806451613vw, 40px);
  position: relative;
  z-index: 2;
  margin-inline: 2rem;
  background-color: #fff;
}
@media (min-width: 768px) {
  .textBanner__content {
    margin: 0 auto;
    max-width: 35rem;
  }
}
@media (min-width: 768px) {
  .textBanner__title {
    font-size: 5.6rem;
  }
}
.textBanner__title {
  line-height: 1.2;
  font-size: 3rem;
  font-weight: 300;
}
.textBanner__text {
  color: #003832;
}

.margin-4-t {
  margin-top: 32px;
}
.peopleList {
  margin-inline: -2rem;
}
.peopleList__inner {
  padding-block: max(64px, min(9.2903225806vw, 144px));
  padding-block: clamp(64px, 9.2903225806vw, 144px);
  padding-inline: 2rem;
  overflow: hidden;
}
@media (min-width: 768px) and (min-width: 768px) {
  .peopleList__inner {
    padding-inline: 5.42%;
  }
}
.peopleList__decor svg {
  width: 30px;
  height: 30px;
}
.peopleList__decor {
  padding-top: 5px;
}
.heading__h3 {
  font-size: max(3.2rem, min(3.0967741935vw, 4.8rem));
  font-size: clamp(3.2rem, 3.0967741935vw, 4.8rem);
  line-height: 1.2;
  font-weight: 300;
}
.margin-3-t {
  margin-top: 24px;
}
.peopleList__text {
  opacity: 0.72;
  line-height: 1.4;
  font-size: 1.8rem;
}
@media (min-width: 768px) {
  .peopleList__text {
    font-size: 2rem;
  }
}

.peopleList__items {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 32px;
  margin-top: 3.2rem;
}

@media (min-width: 768px) {
  .peopleList__items {
    grid-template-columns: repeat(3, 1fr);
    gap: 86px 28px;
    margin-top: 6.4rem;
  }
}
.peopleList__item {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.peopleList__image {
  display: flex;
  position: relative;
  align-items: flex-end;
  justify-content: flex-end;
  background-color: #eff6f5;
  padding-top: 3.4rem;
  padding-inline-end: 2.4rem;
}

.peopleList__img {
  width: 80%;
  aspect-ratio: 1 / 1;
}
@media (min-width: 768px) {
  .peopleList__img {
    width: 60%;
  }
}
.peopleList__name {
  line-height: 1.2;
  font-size: 1.6rem;
}
@media (min-width: 768px) {
  .peopleList__name {
    font-size: 1.8rem;
  }
}
.peopleList__function {
  opacity: 0.72;
  line-height: 1.4;
  font-size: 0.8rem;
}
@media (min-width: 768px) {
  .peopleList__function {
    font-size: 1.2rem;
  }
}

.read_more_btn {
  display: flex;
  flex-direction: row;
  cursor: pointer;
  gap: 20px;
}

.peopleList__link {
  display: flex;
  flex-direction: row;
  cursor: pointer;
  gap: 20px;
  background: none;
  border: none;
  transition: all 0.3s ease-in-out;
  border-bottom: 1px solid var(--color-primary);
  color: var(--color-primary);
  font-size: 1rem;
}
.read_more_btn svg {
  width: 20px;
  transition: all 0.3s ease-in-out;
}

.peopleList__link:hover {
  color: var(--color-accent);
  border-bottom: 1px solid var(--color-accent);
}
.peopleList__link:hover svg {
  transform: translate(6px);
}
.arabic .read_more_btn svg {
  transform: rotate(-180deg);
}
.arabic .peopleList__link:hover svg {
  transform: translate(-10px);
  transform: rotate(-180deg);
}
.sun-icon svg {
  width: 2rem;
}
</style>
<style>
.peopleList__link:hover svg path {
  stroke: var(--color-accent);
}
.sustainability-about {
  margin-bottom: 40px;
}
.sustainability-about .rail {
  height: 60dvh;
}
.sustainability-about .panel {
  min-height: 60dvh;
  padding: 0 60px 0 40px;
}
.sustainability-about .heading {
  font-size: 1.4rem;
}
.sustainability-about .panel-inner {
  display: flex;
  justify-content: space-between;
}
.sustainability-about .panel-inner .media {
  max-width: 50%;
  width: 100%;
}
.columnIcons__itemIcon svg path {
  stroke: #262262;
}
.sun-icon svg path{
  stroke: #262262;
  fill: transparent;
}
</style>
