<template>
  <Navigation></Navigation>

  <div class="p-5">
    <router-link class="ui button fluid" to="/dashboard/nutrition/search">{{ $t("tabs.nutrition.search") }}</router-link>
    <br>

    <router-link class="ui button fluid" to="/dashboard/nutrition/recipes">{{ $t("tabs.nutrition.browse_recipes")}}</router-link>

    <br>

    <router-link class="ui button fluid" to="/dashboard/nutrition/calories">{{ $t("tabs.nutrition.view_calories")}}</router-link>
  </div>
</template>

<script>
import Navigation from "../navigation.vue";

export default {
  name: "nutrition",
  components: {Navigation}
}
</script>

<style scoped>

</style>