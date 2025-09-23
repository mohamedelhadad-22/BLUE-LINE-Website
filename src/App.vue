<script lang="ts">
import { defineComponent } from 'vue';
import NavBar from './components/navBar/NavBar.vue';
import AppFooter from './components/layout/AppFooter.vue';
export default defineComponent({
  name: 'App',
  components: { NavBar, AppFooter },
});
</script>

<template>
  <div class="content" :class="$i18n.locale == 'ar' ? 'arabic' : 'english'">
    <NavBar />
    <div class="router_content" >
      <RouterView />
    </div>
    <AppFooter />
  </div>
</template>

<style scoped>
.content {
  position: relative;
  width: 100%;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
}
.router_content {
  position: relative;
  width: 100%;
  flex: 1 1 auto;
  overflow: hidden;
}
</style>
