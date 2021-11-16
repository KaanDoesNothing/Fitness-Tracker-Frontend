import { createApp } from "vue";
import {createPinia } from "pinia";
import * as VueI18n from "vue-i18n";
// @ts-ignore
import FomanticUI from "vue-fomantic-ui";
import "fomantic-ui-css/semantic.css";

import router from "./router";

import App from "./App.vue";
import {locales} from "./locales";
import {Storage} from "@capacitor/storage";

let settings = await Storage.get({key: "settings"});

let locale = "en";

if(settings.value) {
    let parsed = JSON.parse(settings.value);

    if(parsed.locale) locale = parsed.locale;
}

const i18n = VueI18n.createI18n({
    locale: locale,
    fallbackLocale: "en",
    messages: locales
});

const app = createApp(App);

app.use(i18n);

app.use(createPinia());
app.use(router);
app.use(FomanticUI);

app.mount("#app");
