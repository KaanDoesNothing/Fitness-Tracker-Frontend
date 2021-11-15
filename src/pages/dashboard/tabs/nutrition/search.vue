<template>
  <div class="p-5">
    <form class="ui action input fluid" @submit.prevent="search">
      <input type="text" placeholder="Search..." v-model="input">
      <button class="ui button" :class="{loading}" role="button" type="submit">Search</button>
    </form>
  </div>

  <div class="p-5">
    <div v-for="product in results" class="p-5 m-2 border rounded-lg font-sans bg-gray-100" :key="product._id">
      <router-link class="text-black" :to="`/dashboard/nutrition-view?id=${product.id}`">{{product.product_name}}</router-link>
      <br>
      <label class="text-gray-500">- {{product.brands}} {{product.serving_size ? `, ${product.serving_size}` : ""}}
      </label>
    </div>
  </div>
</template>

<script>
import {defineComponent, ref} from "vue";
import axios from "axios";
import {api} from "../../../../config";

export default defineComponent({
  name: "search",
  setup() {
    let input = ref("");
    let results = ref([]);
    let loading = ref(false);

    async function search() {
      loading.value = true;

      let res = (await axios.get(`${api}/api/nutrition/search?q=` + input.value)).data;

      results.value = res.data.products;

      loading.value = false;
    }

    return {results, input, loading, search}
  }
});
</script>

<style scoped>

</style>