<template>
  <Navigation></Navigation>

  <div class="p-5">
    <form class="ui action input fluid" @submit.prevent="search">
      <input type="text" :placeholder="`${$t('actions.browse')}...`" v-model="input">
      <button class="ui button" :class="{loading}" role="button" type="submit">{{ $t("actions.browse") }}</button>
    </form>
  </div>

  <div class="p-5">
    <div v-for="product in results" class="p-5 mb-2 border rounded-lg font-sans bg-gray-100" :key="product._id">
      <router-link class="text-black" :to="`/dashboard/nutrition/view/${product.id}`">{{product.product_name}}</router-link>
      <br>
      <label class="text-gray-500">- {{product.brands}} {{product.serving_size ? `, ${product.serving_size}` : ""}}</label>
    </div>
  </div>
</template>

<script>
import {defineComponent, ref} from "vue";
import axios from "axios";
import {api} from "../../../../config";
import Navigation from "../../navigation.vue";

export default defineComponent({
  name: "search",
  components: {Navigation},
  setup() {
    let searchDelay;

    let input = ref("");
    let results = ref([]);
    let loading = ref(false);

    async function search() {
      loading.value = true;

      let res = (await axios.get(`${api}/api/nutrition/search?q=` + input.value)).data;

      results.value = res.data.products;

      loading.value = false;
    }

    //@keydown="handleAutoSearch"

    function handleAutoSearch() {
      searchDelay = setTimeout(() => search(), 1500);
    }

    return {results, input, loading, search, handleAutoSearch}
  }
});
</script>

<style scoped>

</style>