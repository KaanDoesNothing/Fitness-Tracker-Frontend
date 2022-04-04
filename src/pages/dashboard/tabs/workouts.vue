<template>
  <Navigation></Navigation>

  <div class="p-5">
    <div class="flex justify-center">
      <button class="ui positive button fluid" @click.prevent="addWorkoutModal = true; error = false">{{  $t("actions.add_workout") }}</button>
<!--      <button class="p-3 bg-white w-screen rounded-lg text-white" style="background-color: #21BA45;">Add</button>-->
    </div>

<!--    <sui-dimmer :active="sortedWorkouts === undefined">-->
<!--      <sui-loader></sui-loader>-->
<!--    </sui-dimmer>-->

    <div v-for="day in sortedWorkouts" :key="day.date" class="text-center mt-5 border rounded-lg p-2 border-gray-300 filter shadow-md bg-gray-100">
      <h2 class="header">{{day.date}}</h2>
      <sui-list relaxed>
        <sui-list-item v-for="workout in day.workouts">
          <sui-list-content v-if="user.settings.compactMode">
<!--            <FItem :title="workout.name" v-slot:content>-->
<!--              <label class="text-gray-500">{{workout.timestamp + ' '}}</label>&ndash;&gt;-->
<!--              <label class="text-gray-500" v-if="workout.type === 'weights'">({{workout.weight}}kg {{workout.reps}}x{{workout.sets}})</label>-->
<!--              <label class="text-gray-500" v-if="workout.type === 'cardio'">({{workout.calories}}cal {{workout.duration}}min)</label>-->
<!--            </FItem>-->
            <router-link class="font-sans text-black" :to="`/dashboard/workouts/${workout.id}`">{{ workout.name }}
              -

              <label class="text-gray-500">{{workout.timestamp + ' '}}</label>
              <label class="text-gray-500" v-if="workout.type === 'weights'">({{workout.weight}}kg {{workout.reps}}x{{workout.sets}})</label>
              <label class="text-gray-500" v-if="workout.type === 'cardio'">({{workout.calories}}cal {{workout.duration}}min)</label>
            </router-link>
          </sui-list-content>

          <sui-list-content  v-if="!user.settings.compactMode">
            <router-link class="font-sans text-black" :to="`/dashboard/workouts/${workout.id}`">{{ workout.name }}</router-link>
              <sui-list-description>
                <label class="font-sans text-gray-500">{{workout.timestamp}}
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
      </form>
    </sui-modal-content>
  </sui-modal>
</template>

<script>
import {computed, defineComponent, ref} from "vue";
import axios from "axios";
import {useUserStore} from "../../../stores/user";

import {capitalizeFirst, fetchExercises, fetchWorkouts, sortWorkouts} from "../../../utils";
import {api} from "../../../config";
import Navigation from "../navigation.vue";
import FItem from "../../../components/ui/FItem.vue";

export default defineComponent({
  name: "Workouts",
  components: {FItem, Navigation},
  setup() {
    const user = useUserStore();

    const addWorkoutModal = ref(false);

    const form = ref({exercise: "", weight: "", reps: "", sets: "", duration: "", calories: ""});

    const error = ref(false);

    async function handleForm() {
      const res = await axios.post(`${api}/user/workouts/create`, {...form.value, date: Date.now()}, {headers: {authorization: `Bearer ${user.token}`}});

      if(res.data.success) {
        await user.updateCache();
        addWorkoutModal.value = false;
      }else if(res.data.error) {
        error.value = res.data.error;
      }
    }

    return {
      user: computed(() => user),
      exercises: computed(() => user.cache.exercises),
      sortedWorkouts: computed(() => sortWorkouts(user.cache.workouts)),
      addWorkoutModal,
      form,
      error,
      handleForm
    }
  }
});
</script>

<style scoped>

</style>