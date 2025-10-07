import { createApp } from "vue";
import "@/assets/style.css";
import "leaflet/dist/leaflet.css";
import router from "./router";
import App from "./App.vue";
import { createI18n } from "vue-i18n";
import ar from "@/locales/ar.json";
import en from "@/locales/en.json";

import VueTelInput from "vue3-tel-input";
import "vue3-tel-input/dist/vue3-tel-input.css";

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: "en",
  fallbackLocale: "en",
  messages: { en, ar },
});

const app = createApp(App);

app.use(router);
app.use(VueTelInput, {
  mode: "international",
  autoDefaultCountry: false,
  validCharactersOnly: true,
  inputOptions: { showDialCode: true, placeholder: "5 1234 5678" },
  dropdownOptions: { showSearchBox: true },
  defaultCountry: "SA",
});
app.use(i18n);
app.mount("#app");
