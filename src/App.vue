<script lang="ts">
import {defineComponent, ref} from "vue";
import {Storage} from "@capacitor/storage";
import {useUserStore} from "./stores/user";

import axios from "axios";

import Navbar from "./components/Navbar.vue";
import router from "./router";
import {useRouter} from "vue-router";

export default defineComponent({
  components: {Navbar},
  setup() {
    const user = useUserStore();
    const router = useRouter();

    let finishedLoading = ref(false);

    async function handleAuth() {
      let token = (await Storage.get({key: "token"})).value;
      console.log(`token: ${token}`);

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

      let mode = getPreferredColorScheme();

      if(mode === "dark") {
        //@ts-ignore
        document.querySelector("body").classList.add("bg-black");
      }

      user.$patch({isMobile, isDarkMode: mode === "dark"});
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

    responsive();

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
