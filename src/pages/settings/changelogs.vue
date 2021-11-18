<template>
  <div class="p-5">
    <a class="ui button fluid" @click="$router.go(-1)"><i class="arrow left icon"></i></a>
  </div>

  <div class="p-5">
    <div class="mt-5 border rounded-lg p-5 border-gray-300 filter shadow-md bg-gray-100 text-center" v-for="version in Object.keys(changelogs)" :key="version">
      <h2 class="text-center">{{version}}</h2>

      <template v-for="changelog in Object.keys(changelogs[version])">
        <label>{{changelog}} - {{changelogs[version][changelog]}}</label>
      </template>
    </div>
  </div>
<!--  <label class="text-white">-->
<!--    {{changelogs}}-->
<!--  </label>-->
</template>

<script>
import changelogs from "../../changelogs.json";

export default {
  name: "changelogs",
  setup() {
    return {changelogs};
  }
}
</script>

<style scoped>

</style>