<template>
  <Navigation>

  </Navigation>
  <div class="p-5">
    <div class="flex justify-center">
      <button class="ui positive button fluid" @click.prevent="addExerciseModal = true; error = false">{{  $t("actions.add_exercise") }}</button>
    </div>

    <div class="text-center mt-5">
      <label class="text-white font-sans text-xl">{{$t(`exerciseTypes.weights`)}}</label>

      <FItem v-slot:content :title="`${exercise.name}`" v-for="exercise in weightExercises">
        <router-link :to="`/dashboard/exercises/${exercise.id}`" class="text-gray-500">{{  $t("actions.edit") }}</router-link>
      </FItem>
    </div>

    <div class="text-center mt-5">
      <label class="text-white font-sans text-xl">{{$t(`exerciseTypes.cardio`)}}</label>

      <FItem v-slot:content :title="`${exercise.name}`" v-for="exercise in cardioExercises">
        <router-link :to="`/dashboard/exercises/${exercise.id}`" class="text-gray-500">{{  $t("actions.edit") }}</router-link>
      </FItem>
    </div>

<!--    <FItem v-slot:content :title="`${exercise.name} (${$t(`exerciseTypes.${exercise.type}`)})`" v-for="exercise in exercises">-->
<!--      <router-link :to="`/dashboard/exercises/${exercise.name}`" class="text-gray-500">{{  $t("actions.edit") }}</router-link>-->
<!--    </FItem>-->
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

import {capitalizeFirst, fetchExercises} from "../../../utils";
import {api} from "../../../config";
import FItem from "../../../components/ui/FItem.vue";

import Navigation from "../navigation.vue";

export default defineComponent({
  name: "Exercises",
  components: {Navigation, FItem},
  setup() {
    const user = useUserStore();

    // const exercises = ref([]);
    const form = ref({name: "", type: ""});
    const error = ref(false);
    const addExerciseModal = ref(false);

    async function handleForm() {
      const res = await axios.post(`${api}/user/exercises/create`, form.value, {headers: {authorization: `Bearer ${user.token}`}});

      if(res.data.success) {
        await user.updateCache();
        addExerciseModal.value = false;
      }else if(res.data.error) {
        error.value = res.data.error;
      }
    }

    return {
      rawExercises: computed(() =>  user.cache.exercises),
      weightExercises: computed(() => user.cache.exercises.filter(exercise => exercise.type === "weights").map(exercise => { exercise.name = capitalizeFirst(exercise.name); return exercise; })),
      cardioExercises: computed(() => user.cache.exercises.filter(exercise => exercise.type === "cardio").map(exercise => { exercise.name = capitalizeFirst(exercise.name); return exercise; })),
      addExerciseModal,
      form,
      handleForm,
      error,
      darkMode: computed(() => user.value.darkMode)
    };
  }
});
</script>

<style scoped>

</style>