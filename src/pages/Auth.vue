<template>
  <div class="p-5 text-center">
    <h2>{{type === "login" ? "Log in" : "Sign up"}}</h2>
    <div class="ui error message" v-if="error">
      <label>{{error}}</label>
    </div>
    <form class="ui form" :class="{'inverted': user.isDarkMode}" @submit.prevent="handleForm">
      <div class="field">
        <label :class="{'text-white': user.isDarkMode}">{{ $t("authentication.email") }}</label>
        <input name="email" type="email" required="required" v-model="form.email"/>
      </div>
      <div class="field">
        <label>{{ $t("authentication.password") }}</label>
        <input name="password" type="password" required="required" v-model="form.password"/>
      </div>


      <button class="ui button" type="submit" v-if="type === 'login'">{{  $t("authentication.signin") }}</button>
      <button class="ui button" type="submit" v-if="type === 'signup'">{{  $t("authentication.signup") }}</button>
    </form>

    <button :class="{'text-white': user.isDarkMode}" class="m-5 underline font-sans" v-if="type === 'signup'" @click.prevent="type = 'login'">{{$t("authentication.existingAccount")}}</button>
    <button :class="{'text-white': user.isDarkMode}" class="m-5 underline font-sans" v-if="type === 'login'" @click.prevent="type = 'signup'">{{$t("authentication.noExistingAccount")}}</button>
  </div>
</template>

<script>
import {computed, defineComponent, ref} from "vue";
import {Storage} from "@capacitor/storage";
import {useUserStore} from "../stores/user";
import axios from "axios";
import {useRouter} from "vue-router";
import {api} from "../config";

export default defineComponent({
  setup() {
    const user = useUserStore();
    const router = useRouter();

    const type = ref("signup");
    const error = ref(undefined);
    const form = ref({email: "", password: ""});

    async function handleForm() {
      this.error = undefined;

      if(this.type === "login") {
        let res = await axios.post(`${api}/auth/signin`, this.form);

        console.log(res.data);

        if (res.data.error) this.error = res.data.error;

        if (res.data.token) {
          await Storage.set({
            key: "token",
            value: res.data.token,
          });

          user.$patch({token: res.data.token});

          await router.push("/dashboard/overview");
        }
      }else if(this.type === "signup") {
        let res = await axios.post(`${api}/auth/signup`, this.form);

        if (res.data.error) this.error = res.data.error;

        if (res.data.token) {
          await Storage.set({
            key: "token",
            value: res.data.token,
          });

          user.$patch({token: res.data.token});

          await router.push("/dashboard/overview");
        }
      }
    }

    return {user: computed(() => user), type, error, form, handleForm}
  }
})
</script>

<!--<script>-->
<!--import {defineComponent} from "vue";-->
<!--import axios from "axios";-->

<!--export default defineComponent ({-->
<!--  name: "Auth",-->
<!--  data() {-->
<!--    return {-->
<!--      type: "signup",-->
<!--      error: undefined,-->
<!--      form: {-->
<!--        email: "",-->
<!--        password: ""-->
<!--      }-->
<!--    }-->
<!--  },-->
<!--  methods: {-->
<!--    async handleForm() {-->
<!--      this.error = undefined;-->

<!--      if(this.type === "login") {-->
<!--        let res = await axios.post("/api/auth/signin", this.form);-->

<!--        if (res.data.error) this.error = res.data.error;-->

<!--        if (res.data.token) {-->
<!--          localStorage.setItem("token", res.data.token);-->
<!--        }-->
<!--      }else if(this.type === "signup") {-->

<!--      }-->
<!--    }-->
<!--  }-->
<!--});-->
<!--</script>-->


<style scoped>

</style>