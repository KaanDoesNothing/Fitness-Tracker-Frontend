<template>
  <div class="p-5">
    <a class="ui button fluid" @click="$router.go(-1)"><i class="arrow left icon"></i></a>

    <FItem :title="country.name" v-for="country in preparedCountries" v-slot:content>
      <button class="text-gray-500" @click="setLocale(country.code)">{{ currentLocale === country.code ? $t("actions.selected") : $t("actions.select") }}</button>
    </FItem>
  </div>
</template>

<script>
import {locales, codes} from "../../locales";
import FItem from "../../components/ui/FItem.vue";
import {useUserStore} from "../../stores/user";
import {computed} from "vue";

export default {
  name: "languageSelector",
  components: {FItem},
  setup() {
    const user = useUserStore();

    async function setLocale(code) {
      let settings = user.settings;

      settings.locale = code;

      await user.setSettings(settings);

      window.location.reload();
    }

    let preparedCountries = Object.keys(locales).map(key => {
      return {
        code: key,
        name: codes[key]
      }
    });

    return {setLocale, preparedCountries, currentLocale: computed(() => user.settings.locale)}
  }
}
</script>

<style scoped>

</style>