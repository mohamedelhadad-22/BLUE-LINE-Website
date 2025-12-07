<script lang="ts">
import { defineComponent } from "vue";
import NavBar from "./components/navBar/NavBar.vue";
import AppFooter from "./components/layout/AppFooter.vue";
import RoutesMap from "./components/RoutesMap.vue";

export default defineComponent({
  name: "App",
  components: { NavBar, AppFooter, RoutesMap },
  computed: {},
});
</script>

<template>
  <div class="content" :class="$i18n.locale == 'ar' ? 'arabic' : 'english'">
    <div class="router_content">
      <NavBar />
      <RouterView />
    </div>
    <AppFooter />
  </div>
</template>

<style scoped>
.content {
  position: relative;
  width: 100%;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
}
.router_content {
  position: relative;
  width: 100%;
  max-width: 100%;
  flex: 1 1 auto;
  overflow-x: hidden;
  min-height: 90dvh;
}
</style>
