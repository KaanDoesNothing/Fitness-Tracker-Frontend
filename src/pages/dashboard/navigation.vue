<template>
  <div class="m-5">
    <div class="flex p-1 justify-center border rounded-lg bg-gray-100">
      <router-link :class="classes" to="/dashboard/overview">{{ $t("navigation.overview") }}</router-link>
      <router-link :class="classes" to="/dashboard/workouts">{{ $t("navigation.workouts") }}</router-link>
      <router-link :class="classes" to="/dashboard/exercises">{{ $t("navigation.exercises") }}</router-link>
      <router-link :class="classes" to="/dashboard/nutrition">{{ $t("navigation.nutrition") }}</router-link>
    </div>
  </div>
</template>

<script>
import {computed, defineComponent, ref} from "vue";
import {useRoute} from "vue-router";

import {useUserStore} from "../../stores/user";

export default defineComponent({
  name: "Navigation",
  setup() {
    const user = useUserStore();
    const route = useRoute();

    const classes = ref("p-3 text-black border-none no-underline");

    return {tab: computed(() => route.params.tab), user: computed(() => user), classes};
  }
});
</script>

<style scoped>
a:hover {
  color: black;
}


a.active.focus, a.active:focus,
a.focus, a:active.focus,
a:active:focus, a:focus {
  outline: none;
  box-shadow: none;
  background-color: transparent;
}
</style>