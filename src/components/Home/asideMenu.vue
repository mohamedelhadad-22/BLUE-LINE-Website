<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AsideMenu",
  props: {
    activeSection: {
      type: String,
      required: false,
      default: "",
    },
  },
  data() {
    return {
      sections: [
        { id: "home", title: "home" },
        { id: "mission", title: "mission" },
        { id: "about", title: "about" },
        // { id: "ceo", title: "ceo" },
        { id: "services", title: "services" },
        // { id: "routes", title: "routes" },
        { id: "sustainability", title: "sustainability" },
        { id: "locations", title: "locations" },
        { id: "news", title: "news" },
        { id: "career", title: "career" },
      ],
    };
  },
  methods: {
    onClickSection(sectionId: string) {
      this.$emit("navigate", sectionId);
    },
  },
});
</script>

<template>
  <aside class="asideMenu">
    <div class="asideMenu__inner">
      <ul
        class="asideMenu__items"
        :class="activeSection !== 'home' ? 'active' : 'transparent'"
      >
        <li
          class="asideMenu__item"
          :class="{ active: activeSection === section.id }"
          v-for="section in sections"
          :key="section.id"
          @click="onClickSection(section.id)"
        >
          <a href="#" class="asideMenu__link" @click.prevent>
            {{ $t(`homeSection.${section.title}`) }}
          </a>
        </li>
      </ul>
    </div>
  </aside>
</template>

<style scoped>
.arabic .asideMenu {
  right: unset;
  left: 12px;
}

@media (min-width: 768px) {
  .asideMenu {
    display: block;
  }
}

.asideMenu {
  display: block;
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  /* visibility: hidden; */
  z-index: 10;
  right: 12px;
}

.asideMenu.transparent .asideMenu__inner {
  visibility: visible;
  border: none;
  border-top: none;
  background-color: transparent;
  list-style-type: none;
}

.asideMenu.active .asideMenu__inner {
  visibility: visible;
}

.arabic .asideMenu__inner {
  padding: 8px 20px 23px 28px;
}

.asideMenu__inner {
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  transition:
    border-color 0.3s,
    background-color 0.3s,
    visibility 0.3s;
  background-color: transparent;
}

.asideMenu__items {
  display: flex;
  position: relative;
  flex-direction: column;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 12px;
  padding-inline-end: 10px;
  list-style: none;
}

.asideMenu__items.active li a {
  opacity: 0;
}

.arabic .asideMenu__items:before {
  left: 16px;
  right: unset;
}

.asideMenu__items:before {
  position: absolute;
  top: 8px;
  bottom: 4px;
  visibility: visible;
  content: "";
  left: unset;
  right: 16px;
  background: url("@/assets/shield-01.svg");
}

.asideMenu.transparent .asideMenu__item {
  padding-inline-end: 28px;
}

.asideMenu.active .asideMenu__item {
  padding-inline-end: 0;
}

.asideMenu__item {
  position: relative;
  padding-inline-end: 28px;
  text-align: end;
  cursor: pointer;
  transition: padding-inline-end 0.3s;
  text-decoration: none;
}

.asideMenu__item.active .asideMenu__link {
}

.asideMenu__link {
  text-align: end;
  text-transform: uppercase;
  line-height: 1.25%;
  color: #fff;
  font-size: 1rem;
  font-weight: 400;
  font-style: normal;
}

.asideMenu.active .asideMenu__item.active:after {
  /* background-color: #80fd66; */
  background: url("@/assets/shield-active.svg");
}

.arabic .asideMenu__item:after {
  left: 0;
  right: unset;
}

.asideMenu__item.active:after {
  background: url("@/assets/shield-active.svg");
}

.asideMenu__item:after {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  transition: background-url 0.3s;
  visibility: visible;
  background-color: #fff;
  width: 22px;
  height: 22px;
  content: "";
  /* transform: rotate(45deg); */
  right: 0;
  background: url("@/assets/shield-01.svg");
}

.arabic .asideMenu__item {
  /* padding-inline-end: 0;
    padding-inline-start: 28px; */
}

.arabic .asideMenu__items {
  /* padding-inline-end: 0;
    padding-inline-start: 10px;
    align-items: flex-start; */
}
@media (max-width: 568px) {
  .asideMenu {
    display: none;
  }
}
</style>
