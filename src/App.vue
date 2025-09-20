<script lang="ts">
import { defineComponent } from 'vue';
import NavBar from './components/navBar/NavBar.vue';
export default defineComponent({
  name: 'App',
  components: { NavBar },
});
</script>

<template>
  <div class="content">
    <NavBar />
    <div class="router_content container" :class="$i18n.locale == 'ar' ? 'arabic' : 'english'">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.content {}
</style>
