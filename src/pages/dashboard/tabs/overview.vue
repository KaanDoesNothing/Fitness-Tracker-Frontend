<template>
  <div class="p-5 flex justify-center">
    <div class="mt-5 border rounded-lg p-2 border-gray-300 filter shadow-md bg-gray-100">
      <h2 class="text-center">This week's statistics</h2>
      <sui-statistic-group class="flex justify-center">
        <sui-statistic :value="weekWorkouts.length.toString()" label="Workouts"></sui-statistic>
        <sui-statistic :value="weekExercises.length.toString()" label="Exercises performed" />
        <sui-statistic :value="`${weekExercises.reduce((prev, next) => prev + (next.calories | 0), 0).toString()}`" label="Calories Burned" />
      </sui-statistic-group>
    </div>
  </div>

  <div class="p-5 flex justify-center">
<!--    <div class="mt-5 border rounded-lg p-2 border-gray-300 filter shadow-md bg-gray-100">-->
<!--      <h2 class="text-center">Other statistics</h2>-->
<!--        <sui-statistic-group class="flex justify-center">-->
<!--          <sui-statistic :value=workouts.length.toString() label="Workouts"></sui-statistic>-->
<!--          <sui-statistic :value=exerciseCount.toString() label="Exercises" />-->
<!--          <sui-statistic :value="`${workouts.reduce((prev, next) => prev + (next.calories | 0), 0).toString()}`" label="Total Calories Burned" />-->
<!--        </sui-statistic-group>-->
<!--    </div>-->


<!--    <div class="ui card filter drop-shadow-md bg-gray-900">-->
<!--      <div class="content">-->
<!--        <sui-statistic-group class="flex justify-center">-->
<!--          <sui-statistic :value=workouts.length.toString() label="Workouts" />-->
<!--          <sui-statistic :value=exerciseCount.toString() label="Exercises" />-->
<!--          <sui-statistic :value="`${workouts.reduce((prev, next) => prev + (next.calories | 0), 0).toString()}`" label="Total Calories Burned" />-->
<!--        </sui-statistic-group>-->
<!--      </div>-->
<!--    </div>-->
<!--    <sui-card class="filter drop-shadow-md">-->
<!--      <sui-card-content>-->
<!--        <sui-statistic-group class="flex justify-center">-->
<!--          <sui-statistic :value=workouts.length.toString() label="Workouts" />-->
<!--          <sui-statistic :value=exerciseCount.toString() label="Exercises" />-->
<!--          <sui-statistic :value="`${workouts.reduce((prev, next) => prev + (next.calories | 0), 0).toString()}`" label="Total Calories Burned" />-->
<!--        </sui-statistic-group>-->
<!--      </sui-card-content>-->
<!--    </sui-card>-->
  </div>

<!--  <div class="p-5 text-center">-->
<!--    <button class="ui button red" @click.prevent="logout">Logout</button>-->
<!--  </div>-->

  <sui-dimmer :active="!workouts && !exerciseCount">
    <sui-loader></sui-loader>
  </sui-dimmer>
</template>

<script>
import axios from "axios";
import {ref} from "vue";
import {useUserStore} from "../../../stores/user";
import {useRouter} from "vue-router";
import {api} from "../../../config";
import {Storage} from "@capacitor/storage";
import {sortExercisesThisWeekForOverview, sortWorkoutsThisWeekForOverview} from "../../../utils";

export default {
  name: "overview",
  setup() {
    const user = useUserStore();

    const exerciseCount = ref(0);
    const workouts = ref([]);
    const weekWorkouts = ref([]);
    const weekExercises = ref([]);

    async function fetchWorkouts() {
      const res = await axios.post(`${api}/api/user/workouts`, null, {headers: {authorization: `Bearer ${user.token}`}});

      if(res.data.workouts) {
        workouts.value = res.data.workouts;

        weekWorkouts.value = sortWorkoutsThisWeekForOverview(res.data.workouts);
        weekExercises.value = sortExercisesThisWeekForOverview(res.data.workouts);
      }
    }

    async function fetchExercises() {
      const res = await axios.post(`${api}/api/user/exercises`, null, {headers: {authorization: `Bearer ${user.token}`}});

      exerciseCount.value = res.data.exercises.length;
    }

    fetchWorkouts();
    fetchExercises();

    return {exerciseCount, workouts, weekWorkouts, weekExercises}
  }
}
</script>

<style scoped>

</style>