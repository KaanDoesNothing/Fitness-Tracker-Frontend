<template>
  <div class="p-5 mt-5 border rounded-lg font-sans bg-gray-100 flex flex-wrap items-center justify-between">
    <div class="flex flex-shrink-0 items-center text-white">
      <label class="text-gray-500">
        {{title}}
      </label>
    </div>

    <div class="flex flex-wrap items-center text-white">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
import {computed, defineComponent} from "vue";

export default defineComponent({
  name: "FItem",
  props: {
    title: String,
  },
  setup(props) {
    return {props: computed(() => props)};
  }
});
</script>

<style scoped>

</style>