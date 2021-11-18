<script lang="ts">
import {defineComponent, ref} from "vue";
import {Storage} from "@capacitor/storage";
import { Dialog } from "@capacitor/dialog";
import {useUserStore} from "./stores/user";

import axios from "axios";

import Navbar from "./components/Navbar.vue";
import router from "./router";
import {useRouter} from "vue-router";
import {setDarkMode} from "./utils";

import changelogs from "./changelogs.json";

export default defineComponent({
  components: {Navbar},
  setup() {
    const user = useUserStore();
    const router = useRouter();

    let finishedLoading = ref(false);

    async function handleAuth() {
      let token = (await Storage.get({key: "token"})).value;

      let isMobile = isMobileDevice();

      if(token) {
        user.$patch({token});

        if(isMobile) {
          await router.push("/dashboard/overview");
        }
      }else if(isMobile) {
        await router.push("/auth");
      }
    }

    window.addEventListener("resize", responsive);

    function isMobileDevice() {
      return window.innerWidth < 1000;
    }

    function responsive() {
      let isMobile = isMobileDevice();

      user.$patch({isMobile});
    }

    function getPreferredColorScheme() {
      if (window.matchMedia) {
        if(window.matchMedia("(prefers-color-scheme: dark)").matches){
          return "dark";
        } else {
          return "light";
        }
      }
      return "light";
    }

    async function init() {
      let darkMode = await Storage.get({key: "darkmode"});

      if(darkMode.value !== null) {
        user.setDarkMode(darkMode.value === "true");
      }else {
        let mode = getPreferredColorScheme();

        user.setDarkMode(mode === "dark");
      }

      let settings = await Storage.get({key: "settings"});

      if(settings.value) {
        user.$patch({settings: JSON.parse(settings.value)});
      }

      //Check for updates

      let currentVersion = Object.keys(changelogs).length;

      let latestChangelogs = (await axios.get("https://raw.githubusercontent.com/KaanDoesNothing/Fitness-Tracker-Frontend/master/src/changelogs.json")).data;
      let latestVersion = Object.keys(latestChangelogs).length;

      console.log(currentVersion, latestVersion);

      if(latestVersion > currentVersion) {
        await Dialog.alert({
          title: "Update available",
          message:`You can update at kaanlikescoding.me/static/fitness/versions/${Object.keys(latestChangelogs)[0]}.apk`
        });
      }
    }

    responsive();

    init();

    handleAuth().then(() => {finishedLoading.value = true});

    return {finishedLoading}
  }
});
</script>
<!--{headers: {-->
<!--"authorization": "Bearer " + token-->
<!--}}-->

<template>
  <template v-if="finishedLoading">
    <Navbar></Navbar>
    <router-view></router-view>
  </template>

  <template v-if="!finishedLoading">
    <sui-dimmer :active="true">
      <sui-loader></sui-loader>
    </sui-dimmer>
  </template>
</template>
