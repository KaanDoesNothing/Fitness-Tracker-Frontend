import { createApp } from "vue";
import {createPinia } from "pinia";
// @ts-ignore
import FomanticUI from "vue-fomantic-ui";
import "fomantic-ui-css/semantic.css";

import router from "./router";

import App from "./App.vue";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(FomanticUI);

app.mount("#app");
