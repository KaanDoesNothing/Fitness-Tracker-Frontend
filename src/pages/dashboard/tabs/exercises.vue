<template>
  <div class="p-5">
    <div class="flex justify-center">
      <button class="ui positive button fluid" @click.prevent="addExerciseModal = true; error = false">Add</button>
    </div>

    <FItem v-slot:content :title="`${exercise.name} (${exercise.type})`" v-for="exercise in exercises">
      <router-link :to="`/dashboard/exercises/${exercise.name}`" class="text-gray-500">Edit</router-link>
    </FItem>
  </div>

  <sui-modal v-model="addExerciseModal">
    <sui-modal-header>Add an exercise</sui-modal-header>
    <sui-modal-content>
      <div class="ui error message" v-if="error">
        <label>{{ error }}</label>
      </div>
      <form class="ui form" @submit.prevent>
        <div class="field">
          <label>Name</label>
          <input name="name" type="text" required v-model="form.name"/></div>
        <div class="field">
          <label>Type</label>
          <select class="ui fluid dropdown" name="type" required v-model="form.type">
            <option value="weights" selected="selected">Weights</option>
            <option value="cardio">Cardio</option>
          </select>
        </div>
        <div class="field" hidden>
          <label>Description</label>
          <textarea class="ui" name="description"></textarea>
        </div>
      </form>
    </sui-modal-content>
    <sui-modal-actions>
      <sui-button-group class="fluid">
<!--        <sui-button color="red" @click.prevent="addExerciseModal = false">Cancel</sui-button>-->
        <sui-button color="green" @click.prevent="handleForm">Add</sui-button>
      </sui-button-group>
    </sui-modal-actions>
  </sui-modal>
</template>

<script>
import {computed, defineComponent, ref} from "vue";
import axios from "axios";
import {useUserStore} from "../../../stores/user";

import {capitalizeFirst} from "../../../utils";
import {api} from "../../../config";
import FItem from "../../../components/ui/FItem.vue";

export default defineComponent({
  name: "exercises",
  components: {FItem},
  setup() {
    const user = useUserStore();

    const exercises = ref([]);
    const form = ref({name: "", type: ""});
    const error = ref(false);
    const addExerciseModal = ref(false);

    async function fetchExercises() {
      const res = await axios.post(`${api}/api/user/exercises`, null, {headers: {authorization: `Bearer ${user.token}`}});

      if(res.data.exercises) {
        exercises.value = res.data.exercises.map(exercise => {
          exercise.type = capitalizeFirst(exercise.type);
          return exercise;
        });
      }
    }

    async function handleForm() {
      const res = await axios.post(`${api}/api/user/exercises/create`, form.value, {headers: {authorization: `Bearer ${user.token}`}});

      if(res.data.success) {
        await fetchExercises();
        addExerciseModal.value = false;
      }else if(res.data.error) {
        error.value = res.data.error;
      }
    }

    fetchExercises();

    return {exercises, addExerciseModal, form, handleForm, error};
  }
});
</script>

<style scoped>

</style>