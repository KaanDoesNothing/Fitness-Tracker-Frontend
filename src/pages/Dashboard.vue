<template>
  <div class="m-5">
    <div class="flex justify-center border rounded-lg bg-gray-100">
      <router-link :class="classes" to="/dashboard/overview">Overview</router-link>
      <router-link :class="classes" to="/dashboard/workouts">Workouts</router-link>
      <router-link :class="classes" to="/dashboard/exercises">Exercises</router-link>
      <router-link :class="classes" to="/dashboard/nutrition">Nutrition</router-link>
    </div>
<!--    <sui-menu fluid :widths="4" :inverted="user.darkMode">-->
<!--      <router-link class="item font-sans" :class="{active: tab === 'overview'}" to="/dashboard/overview">Overview</router-link>-->
<!--      <router-link class="item font-sans" :class="{active: tab === 'workouts'}" to="/dashboard/workouts">Workouts</router-link>-->
<!--      <router-link class="item font-sans" :class="{active: tab === 'exercises'}" to="/dashboard/exercises">Exercises</router-link>-->
<!--      <router-link class="item font-sans" :class="{active: ['nutrition', 'nutrition-search', 'nutrition-view'].includes(tab)}" to="/dashboard/nutrition">Nutrition</router-link>-->
<!--    </sui-menu>-->
  </div>

  <Overview v-if="tab === 'overview'"></Overview>
  <Workouts v-if="tab === 'workouts'"></Workouts>
  <Exercises v-if="tab === 'exercises'"></Exercises>
  <Nutrition v-if="tab === 'nutrition'"></Nutrition>
  <NutritionSearch v-if="tab === 'nutrition-search'"></NutritionSearch>
  <NutritionView v-if="tab === 'nutrition-view'"></NutritionView>
</template>

<script>
import {computed, defineComponent, ref} from "vue";
import {useRoute} from "vue-router";

import Overview from "./dashboard/tabs/overview.vue";
import Workouts from "./dashboard/tabs/workouts.vue";
import Exercises from "./dashboard/tabs/exercises.vue";
import Nutrition from "./dashboard/tabs/nutrition.vue";
import NutritionSearch from "./dashboard/tabs/nutrition/search.vue";
import NutritionView from "./dashboard/tabs/nutrition/view.vue";
import {useUserStore} from "../stores/user";

export default defineComponent({
  name: "Dashboard",
  components: {Nutrition, NutritionSearch, NutritionView, Overview, Workouts, Exercises},
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