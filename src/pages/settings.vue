<template>
  <div class="p-5">
    <a class="ui button fluid" @click="$router.go(-1)"><i class="arrow left icon"></i></a>
  </div>

  <div class="p-5">
    <div class="p-5 border rounded-lg font-sans bg-gray-100 flex flex-wrap items-center justify-between">
      <div class="flex flex-shrink-0 items-center text-white">
        <label class="text-gray-500">
          Dark Mode
        </label>
      </div>

      <div class="flex flex-wrap items-center text-white">
        <div class="ui toggle checkbox">
          <input type="checkbox" @change.prevent="darkmode" v-model="user.isDarkMode">
          <label></label>
        </div>
      </div>
    </div>

    <div class="p-5 mt-5 border rounded-lg font-sans bg-gray-100 flex flex-wrap items-center justify-between">
      <div class="flex flex-shrink-0 items-center text-white">
        <label class="text-gray-500">
          Compact Mode
        </label>
      </div>

      <div class="flex flex-wrap items-center text-white">
        <div class="ui toggle checkbox">
          <input type="checkbox" @change.prevent="compactmode" v-model="user.settings.compactMode">
          <label></label>
        </div>
      </div>
    </div>

    <div class="p-5 mt-40 text-center">
      <button class="ui button bg-gray-100" @click.prevent="logout">Logout</button>
    </div>
  </div>
</template>

<script>
import {computed, defineComponent} from "vue";
import {useUserStore} from "../stores/user";
import {Storage} from "@capacitor/storage";
import {useRouter} from "vue-router";

export default defineComponent({
  name: "settings",
  setup() {
    const user = useUserStore();
    const router = useRouter();

    function darkmode(e) {
      console.log(e);
      user.setDarkMode(e.target.checked);
    }

    function compactmode() {
      let settings = user.settings;
      settings.compactMode = user.settings.compactMode;

      user.setSettings(settings);
    }

    async function logout() {
      await Storage.remove({key: "token"});
      user.$patch({token: undefined});

      router.push("/");
    }

    return {user: computed(() => user), logout, darkmode, compactmode};
  }
});
</script>

<style scoped>

</style>