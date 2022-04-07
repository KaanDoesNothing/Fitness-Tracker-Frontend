<template>
  <Navigation></Navigation>

  <div class="p-5 text-center" v-if="product">
    <sui-image class="p-10 rounded-sm" size="large" :src="product.image_url" />

    <h3 class="text-white">{{product.product_name}}</h3>
    <h4 class="text-gray-500">{{product.brands}}</h4>
<!--    <h5 class="text-gray-500">{{product.product_quantity}}{{product.type}}</h5>-->

    <br>

    <label>Nutrition</label>

    <div>
      <label class="text-white font-sans text-xl">Information per 100g/ml</label>

      <FItem v-slot:content :title="`Calories`">
        <label class="text-gray-500">{{ product.nutriments["energy-kcal_100g"] }}g</label>
      </FItem>
      <FItem v-slot:content :title="`Proteins`">
        <label class="text-gray-500">{{ product.nutriments["proteins_100g"] }}g</label>
      </FItem>
      <FItem v-slot:content :title="`Sugars`">
        <label class="text-gray-500">{{ product.nutriments["sugars_100g"] }}g</label>
      </FItem>
      <FItem v-slot:content :title="`Carbohydrates`">
        <label class="text-gray-500">{{ product.nutriments["carbohydrates_100g"] }}g</label>
      </FItem>
      <FItem v-slot:content :title="`Fat`">
        <label class="text-gray-500">{{ product.nutriments["fat_100g"] }}g</label>
      </FItem>
      <FItem v-slot:content :title="`Salt`">
        <label class="text-gray-500">{{ product.nutriments["salt_100g"] }}g</label>
      </FItem>
    </div>
<!--    <sui-table celled>-->
<!--      <sui-table-header>-->
<!--        <sui-table-row>-->
<!--          <sui-table-header-cell>Type</sui-table-header-cell>-->
<!--          <sui-table-header-cell>Amount</sui-table-header-cell>-->
<!--          <sui-table-header-cell>Per</sui-table-header-cell>-->
<!--        </sui-table-row>-->
<!--      </sui-table-header>-->
<!--      <sui-table-body>-->
<!--        <sui-table-row>-->
<!--          <sui-table-cell>Calories</sui-table-cell>-->
<!--          <sui-table-cell>{{ product.nutriments["energy-kcal_100g"] }}</sui-table-cell>-->
<!--          <sui-table-cell>100g</sui-table-cell>-->
<!--        </sui-table-row>-->
<!--        <sui-table-row>-->
<!--          <sui-table-cell>Proteins</sui-table-cell>-->
<!--          <sui-table-cell>{{ product.nutriments["proteins_100g"] }}g</sui-table-cell>-->
<!--          <sui-table-cell>100g</sui-table-cell>-->
<!--        </sui-table-row>-->
<!--        <sui-table-row>-->
<!--          <sui-table-cell>Carbohydrates</sui-table-cell>-->
<!--          <sui-table-cell>{{ product.nutriments["carbohydrates_100g"] }}g</sui-table-cell>-->
<!--          <sui-table-cell>100g</sui-table-cell>-->
<!--        </sui-table-row>-->
<!--        <sui-table-row>-->
<!--          <sui-table-cell>Fat</sui-table-cell>-->
<!--          <sui-table-cell>{{ product.nutriments["fat_100g"] }}g</sui-table-cell>-->
<!--          <sui-table-cell>100g</sui-table-cell>-->
<!--        </sui-table-row>-->
<!--        <sui-table-row>-->
<!--          <sui-table-cell>Sugars</sui-table-cell>-->
<!--          <sui-table-cell>{{ product.nutriments["sugars_100g"] }}g</sui-table-cell>-->
<!--          <sui-table-cell>100g</sui-table-cell>-->
<!--        </sui-table-row>-->
<!--        <sui-table-row>-->
<!--          <sui-table-cell>Salt</sui-table-cell>-->
<!--          <sui-table-cell>{{ product.nutriments["salt_100g"] }}g</sui-table-cell>-->
<!--          <sui-table-cell>100g</sui-table-cell>-->
<!--        </sui-table-row>-->
<!--      </sui-table-body>-->
<!--    </sui-table>-->

  </div>

  <sui-dimmer :active="product === undefined">
    <sui-loader></sui-loader>
  </sui-dimmer>
</template>

<script>
import {defineComponent, ref} from "vue";
import axios from "axios";
import {useRoute} from "vue-router";

import {api} from "../../../../config"
import Navigation from "../../navigation.vue";
import FItem from "../../../../components/ui/FItem.vue";

export default defineComponent({
  name: "view",
  components: {FItem, Navigation},
  setup() {
    const route = useRoute();

    let product = ref(undefined);

    async function fetchProduct() {
      let res = (await axios.get(`${api}/nutrition/product?id=` + route.params.id)).data;
      let _keywords = res.data._keywords;

      if(_keywords.includes("soda") || _keywords.includes("food")) {
        res.data.type = "ml";
      }else {
        res.data.type = "g";
      }

      product.value = res.data
    }

    fetchProduct();

    return {product}
  }
});
</script>

<style scoped>

</style>