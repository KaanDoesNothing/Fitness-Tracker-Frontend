import { createApp } from "vue";
import {createPinia } from "pinia";
import * as VueI18n from "vue-i18n";
// @ts-ignore
import FomanticUI from "vue-fomantic-ui";
import "fomantic-ui-css/semantic.css";

import router from "./router";

import App from "./App.vue";
import {locales} from "./locales";

const i18n = VueI18n.createI18n({
    locale: "nl",
    fallbackLocale: "en",
    messages: locales
});

const app = createApp(App);

app.use(i18n);

app.use(createPinia());
app.use(router);
app.use(FomanticUI);

app.mount("#app");
