<template>
  <Navigation></Navigation>

  <div class="p-5">
    <router-link class="ui button fluid" to="/dashboard/nutrition/search">Browse</router-link>
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