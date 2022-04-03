<template>
  <FBackButton></FBackButton>
  <div class="p-5 flex justify-center">
    <div class="mt-5 border rounded-lg p-2 border-gray-300 filter shadow-md bg-gray-100">
      <h2 class="text-center">{{workout.name}}</h2>

      <sui-statistic-group class="flex justify-center">
        <sui-statistic value="test" label="Exercise performed total"></sui-statistic>
      </sui-statistic-group>
    </div>
  </div>
</template>

<script>
import {useRoute} from "vue-router";
import {useUserStore} from "../../../../stores/user";
import axios from "axios";
import {api} from "../../../../config";
import {computed, defineComponent, ref} from "vue";
import FBackButton from "../../../../components/ui/FBackButton.vue";

export default defineComponent({
  name: "view.vue",
  components: {FBackButton},
  setup() {
    let user = useUserStore();
    let route = useRoute();

    let id = route.params.id

    let workout = ref({});

    async function fetchWorkout() {
      const res = await axios.post(`${api}/user/workout`, {id}, {headers: {authorization: `Bearer ${user.token}`}});

      workout.value = res.data.workout;
    }

    fetchWorkout();

    return {workout}
  }
});
</script>

<style scoped>

</style>