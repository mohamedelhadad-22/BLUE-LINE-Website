import { createApp } from "vue";
import "@/assets/style.css";
import "leaflet/dist/leaflet.css";
import router from "./router";
import App from "./App.vue";
import { createI18n } from "vue-i18n";
import ar from "@/locales/ar.json";
import en from "@/locales/en.json";

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: "en",
  fallbackLocale: "en",
  messages: { en, ar },
});

const app = createApp(App);

app.use(router);

app.use(i18n);
app.mount("#app");
