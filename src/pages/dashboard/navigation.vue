<template>
  <div class="m-5">
    <div class="flex p-1 justify-center border rounded-lg bg-gray-100">
      <router-link :class="classes" to="/dashboard/overview"><i class="chart line icon"></i> {{ $t("navigation.overview") }}</router-link>
      <router-link :class="classes" to="/dashboard/workouts"><i class="running icon"></i> {{ $t("navigation.workouts") }}</router-link>
      <router-link :class="classes" to="/dashboard/exercises"><i class="dumbbell icon"></i> {{ $t("navigation.exercises") }}</router-link>
      <router-link :class="classes" to="/dashboard/nutrition"><i class="fruit-apple icon"></i> {{ $t("navigation.nutrition") }}</router-link>
    </div>
  </div>

<!--  <nav class="nav">-->
<!--    <div class="flex p-1 justify-center border rounded-lg bg-gray-100">-->
<!--      <router-link :class="classes" to="/dashboard/overview">{{ $t("navigation.overview") }}</router-link>-->
<!--      <router-link :class="classes" to="/dashboard/workouts">{{ $t("navigation.workouts") }}</router-link>-->
<!--      <router-link :class="classes" to="/dashboard/exercises">{{ $t("navigation.exercises") }}</router-link>-->
<!--      <router-link :class="classes" to="/dashboard/nutrition">{{ $t("navigation.nutrition") }}</router-link>-->
<!--    </div>-->
<!--  </nav>-->
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

    const classes = ref("p-3 text-black border-none no-underline nav__link");

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


.nav {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 55px;
  background-color: #ffffff;
  display: flex;
  overflow-x: auto;
}

.nav__link {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  min-width: 50px;
  overflow: hidden;
  white-space: nowrap;
  font-family: sans-serif;
  font-size: 13px;
  color: #444444;
  text-decoration: none;
  -webkit-tap-highlight-color: transparent;
  transition: background-color 0.1s ease-in-out;
}
</style>