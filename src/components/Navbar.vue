<template>
  <div class="text-center p-20" v-if="user.isMobile">
    <h2 class="font-md font-sans" :class="{'text-white': user.isDarkMode}">{{currentTab}}</h2>
  </div>

  <div class="ui menu" :class="{'inverted': user.darkMode}" style="border-radius: 0px;" v-if="!user.isMobile">
    <div class="item">
      <router-link class="ui header" to="/">Fitness</router-link>
    </div>

    <div class="right menu">
      <div class="item" v-if="!user.token">
        <router-link class="ui text-black" to="/auth">Sign up</router-link>
      </div>
      <div class="item" v-if="user.token">
        <router-link class="ui text-black" to="/dashboard/overview">Dashboard</router-link>
      </div>
    </div>
  </div>
<!--  -->
<!--  -->
<!--  -->
<!--  <sui-menu>-->
<!--    <sui-menu-item>-->
<!--      <router-link class="ui header" to="/">Fitness</router-link>-->
<!--    </sui-menu-item>-->
<!--    <sui-menu-menu position="right">-->
<!--&lt;!&ndash;      <sui-menu-item>&ndash;&gt;-->
<!--&lt;!&ndash;        <router-link class="ui button" to="/auth?type=login">Log in</router-link>&ndash;&gt;-->
<!--&lt;!&ndash;      </sui-menu-item>&ndash;&gt;-->
<!--      <sui-menu-item v-if="!user.token">-->
<!--        <router-link class="ui text-black" to="/auth">Sign up</router-link>-->
<!--      </sui-menu-item>-->

<!--      <sui-menu-item v-if="user.token">-->
<!--        <router-link class="ui text-black" to="/dashboard/overview">Dashboard</router-link>-->
<!--      </sui-menu-item>-->
<!--    </sui-menu-menu>-->
<!--  </sui-menu>-->
</template>

<script>
import {computed, defineComponent} from "vue";
import {useUserStore} from "../stores/user";
import {useRoute} from "vue-router";

export default defineComponent({
  name: "Navbar",
  setup() {
    const user = useUserStore();
    const route = useRoute();

    return {user: computed(() => user), currentTab: computed(() => route.name)};
  }
});
</script>

<style scoped>

</style>