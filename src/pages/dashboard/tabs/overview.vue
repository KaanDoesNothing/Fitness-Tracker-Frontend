<template>
  <Navigation></Navigation>
  <div class="p-5 flex justify-center">
    <div class="mt-5 border rounded-lg p-2 border-gray-300 filter shadow-md bg-gray-100">
      <h2 class="text-center">{{ $t("tabs.overview.currentWeekStatistics") }}</h2>
      <sui-statistic-group class="flex justify-center">
        <sui-statistic :value="weekWorkouts.length.toString()" :label="$t('tabs.overview.workouts')"></sui-statistic>
        <sui-statistic :value="weekExercises.length.toString()" :label="$t('tabs.overview.exercisesPerformed')" />
        <sui-statistic :value="`${weekExercises.reduce((prev, next) => prev + (next.calories | 0), 0).toString()}`" :label="$t('tabs.overview.caloriesBurned')" />
      </sui-statistic-group>
    </div>
  </div>

  <div class="p-5 flex justify-center">

  <sui-dimmer :active="!workouts && !exerciseCount">
    <sui-loader></sui-loader>
  </sui-dimmer>
  </div>
</template>

<script>
import axios from "axios";
import {ref} from "vue";
import {useUserStore} from "../../../stores/user";
import {useRouter} from "vue-router";
import {api} from "../../../config";
import {Storage} from "@capacitor/storage";
import {sortExercisesThisWeekForOverview, sortWorkoutsThisWeekForOverview} from "../../../utils";
import Navigation from "../navigation.vue";

export default {
  name: "overview",
  components: {Navigation},
  setup() {
    const user = useUserStore();

    // (async () => {user.updateCache()})();

    const exerciseCount = ref(0);
    const workouts = ref([]);
    const weekWorkouts = ref([]);
    const weekExercises = ref([]);

    weekWorkouts.value = sortWorkoutsThisWeekForOverview(user.cache.workouts);
    weekExercises.value = sortExercisesThisWeekForOverview(user.cache.workouts);
    exerciseCount.value = user.cache.exercises.length;

    return {exerciseCount, workouts, weekWorkouts, weekExercises}
  }
}
</script>

<style scoped>

</style>