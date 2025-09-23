<script lang="ts">
import { defineComponent } from 'vue';
import NavBar from './components/navBar/NavBar.vue';
export default defineComponent({
  name: 'App',
  components: { NavBar },
});
</script>

<template>
  <div class="content" :class="$i18n.locale == 'ar' ? 'arabic' : 'english'">
    <NavBar />
    <div class="router_content" >
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.content {
  position: relative;
  width:100%;
  min-height: 100dvh;
}
.router_content {
  position: relative;
  width: 100%;
  min-height: 100dvh;
  overflow: hidden;
}
</style>
