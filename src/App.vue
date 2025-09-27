<script lang="ts">
import { defineComponent } from 'vue';
import NavBar from './components/navBar/NavBar.vue';
import AppFooter from './components/layout/AppFooter.vue';
import RoutesMap from './components/RoutesMap.vue';

export default defineComponent({
  name: 'App',
  components: { NavBar, AppFooter, RoutesMap },
  computed: {
    showRoutesDemo(): boolean {
      return this.$route.name !== 'Home';
    },
  },
});
</script>

<template>
  <div class="content" :class="$i18n.locale == 'ar' ? 'arabic' : 'english'">
    <NavBar />
    <div class="router_content">
      <RouterView />
    </div>
    <section v-if="showRoutesDemo" class="routes-demo" aria-labelledby="global-routes-heading">
      <div class="routes-demo__shell">
        <h2 id="global-routes-heading">Explore Folk Maritime Routes</h2>
        <p class="routes-demo__intro">
          Interact with the Folk Maritime network map to see port calls, sailing sequences, and transit times.
        </p>
        <RoutesMap initial-route-id="NRS" />
      </div>
    </section>
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

.routes-demo {
  background: #f5f8fb;
  padding: clamp(3rem, 8vw, 5rem) clamp(1.5rem, 6vw, 3.5rem);
}

.routes-demo__shell {
  margin: 0 auto;
  max-width: 1180px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.routes-demo__shell h2 {
  margin: 0;
  font-size: clamp(2rem, 3vw, 2.6rem);
  color: #0f1f2f;
}

.routes-demo__intro {
  margin: 0;
  max-width: 620px;
  color: #495b6f;
  line-height: 1.6;
}
</style>
