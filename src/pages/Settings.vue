<template>
  <FBackButton></FBackButton>

  <div class="p-5">
    <FItem title="Dark Mode" v-slot:content>
      <div class="ui toggle checkbox">
        <input type="checkbox" @change.prevent="darkmode" v-model="user.isDarkMode">
        <label></label>
      </div>
    </FItem>

    <FItem title="Compact Mode" v-slot:content>
      <div class="ui toggle checkbox">
        <input type="checkbox" @change.prevent="compactmode" v-model="user.settings.compactMode">
        <label></label>
      </div>
    </FItem>

    <FItem title="Language" v-slot:content>
      <router-link class="ui" to="/settings/language"><i class="arrow right icon"></i></router-link>
    </FItem>

    <FItem title="Changelogs" v-slot:content>
      <router-link class="ui" to="/settings/changelogs"><i class="arrow right icon"></i></router-link>
    </FItem>

<!--    <FItem title="Dutch Language" v-slot:content>-->
<!--      <div class="ui toggle checkbox">-->
<!--        <input type="checkbox" @change.prevent="dutchmode" v-model="isDutch">-->
<!--        <label></label>-->
<!--      </div>-->
<!--    </FItem>-->

    <div class="p-5 mt-40 text-center">
      <button class="ui button bg-gray-100" @click.prevent="logout">{{ $t("authentication.logout") }}</button>
    </div>
  </div>
</template>

<script>
import {computed, defineComponent} from "vue";
import {useUserStore} from "../stores/user";
import {Storage} from "@capacitor/storage";
import {useRouter} from "vue-router";

import FItem from "../components/ui/FItem.vue";
import FBackButton from "../components/ui/FBackButton.vue";

export default defineComponent({
  name: "settings",
  components: {
    FBackButton,
    FItem
  },
  setup() {
    const user = useUserStore();
    const router = useRouter();

    function darkmode(e) {
      console.log(e);
      user.setDarkMode(e.target.checked);
    }

    function compactmode() {
      let settings = user.settings;
      Settings.compactMode = user.settings.compactMode;

      user.setSettings(Settings);
    }

    async function dutchmode() {
      let settings = user.settings;

      if(Settings.locale === "en") {
        Settings.locale = "nl";
      }else {
        Settings.locale = "en";
      }

      await user.setSettings(Settings);

      window.location.reload();
    }

    async function logout() {
      await Storage.remove({key: "token"});
      user.$patch({token: undefined});

      router.push("/");
    }

    return {user: computed(() => user), logout, darkmode, compactmode, dutchmode, isDutch: computed(() => user.settings.locale === 'nl')};
  }
});
</script>

<style scoped>

</style>