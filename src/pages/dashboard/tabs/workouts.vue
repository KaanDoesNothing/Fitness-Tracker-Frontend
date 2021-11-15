<template>
  <div class="p-5">
    <div class="flex justify-center">
      <button class="ui positive button fluid" @click.prevent="addWorkoutModal = true; error = false">Add</button>
    </div>

    <sui-dimmer :active="sortedWorkouts === undefined">
      <sui-loader></sui-loader>
    </sui-dimmer>

    <div v-for="day in sortedWorkouts" :key="day.date" class="text-center mt-5 border rounded-lg p-2 border-gray-300 filter shadow-md bg-gray-100">
      <h2 class="header">{{day.date}}</h2>
      <sui-list relaxed>
        <sui-list-item v-for="workout in day.workouts">
          <sui-list-content>
            <router-link class="font-sans text-black" :to="`/dashboard/workouts/${workout.id}`">{{ workout.name }}</router-link>
            <sui-list-description>
              <label class="font-sans text-gray-500">{{workout.timeAgo}}
                <label v-if="workout.type === 'weights'">({{workout.weight}}kg {{workout.reps}}x{{workout.sets}})</label>
                <label v-if="workout.type === 'cardio'">({{workout.calories}}cal {{workout.duration}}min)</label>
              </label>
            </sui-list-description>
          </sui-list-content>
        </sui-list-item>
      </sui-list>
    </div>
  </div>

  <sui-modal v-model="addWorkoutModal">
    <sui-modal-header>Add an workout</sui-modal-header>
    <sui-modal-content>
      <div class="ui error message" v-if="error">
        <label>{{ error }}</label>
      </div>
      <form class="ui form" @submit.prevent="handleForm()">
        <div class="field">
          <label>Exercise</label>
          <select class="ui fluid dropdown" name="exercise" required v-model="form.exercise">
            <option v-for="exercise in exercises" :key="exercise.name" :value="exercise" selected="selected">{{ exercise.name }}</option>
          </select>
        </div>

        <template v-if="form.exercise?.type === 'weights'">
          <div class="field">
            <label>Weight</label>
            <input type="number" name="weight" v-model="form.weight">
          </div>
          <div class="field">
            <label>Repetitions</label>
            <input type="number" name="reps" v-model="form.reps">
          </div>
          <div class="field">
            <label>Sets</label>
            <input type="number" name="sets" v-model="form.sets">
          </div>
        </template>

        <template v-if="form.exercise?.type === 'cardio'">
          <div class="field">
            <label>Calories</label>
            <input type="number" name="calories" v-model="form.calories" required>
          </div>
          <div class="field">
            <label>Duration(Minutes)</label>
            <input type="number" name="duration" v-model="form.duration" required>
          </div>
        </template>

        <button class="ui button green fluid" type="submit">Add</button>
        <!--        <div class="field" hidden>-->
<!--          <label>Note</label>-->
<!--          <textarea class="ui" name="note"></textarea>-->
<!--        </div>-->
      </form>

<!--      <sui-button-group class="fluid">-->
<!--        <sui-button color="green" @click.prevent="handleForm">Add</sui-button>-->
<!--      </sui-button-group>-->
    </sui-modal-content>
<!--    <sui-modal-actions>-->
<!--      <sui-button-group class="fluid">-->
<!--        <sui-button color="green" @click.prevent="handleForm">Add</sui-button>-->
<!--      </sui-button-group>-->
<!--    </sui-modal-actions>-->
  </sui-modal>
</template>

<script>
import {computed, defineComponent, ref} from "vue";
import axios from "axios";
import {useUserStore} from "../../../stores/user";

import {capitalizeFirst, sortWorkouts} from "../../../utils";
import {api} from "../../../config";

export default defineComponent({
  name: "workouts",
  setup() {
    const user = useUserStore();

    const sortedWorkouts = ref(undefined);
    const workouts = ref([]);
    const exercises = ref([]);
    const form = ref({exercise: "", weight: "", reps: "", sets: "", duration: "", calories: ""});
    const error = ref(false);
    const addWorkoutModal = ref(false);

    async function fetchWorkouts() {
      const res = await axios.post(`${api}/api/user/workouts`, null, {headers: {authorization: `Bearer ${user.token}`}});
      // const resSorted = await axios.post(`${api}/api/user/workouts/sorted`, null, {headers: {authorization: `Bearer ${user.token}`}});

      if(res.data.workouts) {
        workouts.value = res.data.workouts;
      }

      sortedWorkouts.value = sortWorkouts(res.data.workouts);

      // if(resSorted.data.workouts) {
      //   // sortedWorkouts.value = resSorted.data.workouts;
      // }
    }

    async function fetchExercises() {
      const res = await axios.post(`${api}/api/user/exercises`, null, {headers: {authorization: `Bearer ${user.token}`}});

      if(res.data.exercises) {
        exercises.value = res.data.exercises.map(exercise => {
          return exercise;
        });
      }
    }

    async function handleForm() {
      const res = await axios.post(`${api}/api/user/workouts/create`, {...form.value, date: Date.now()}, {headers: {authorization: `Bearer ${user.token}`}});

      if(res.data.success) {
        await fetchWorkouts();
        addWorkoutModal.value = false;
      }else if(res.data.error) {
        error.value = res.data.error;
      }
    }

    fetchWorkouts();

    fetchExercises();

    return {workouts, exercises, addWorkoutModal, form, handleForm, error, sortedWorkouts};
  }
});
</script>

<style scoped>

</style>