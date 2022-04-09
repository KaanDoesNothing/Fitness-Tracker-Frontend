<template>
  <FBackButton></FBackButton>

  <div class="p-5">
    <sui-dimmer :active="!messages">
      <sui-loader></sui-loader>
    </sui-dimmer>

    <div style="max-height: 400px !important; overflow-y: scroll;" id="chatBox">

      <FMessage v-for="message in messages" :author="message.user.name" :content="message.content"></FMessage>
    </div>

    <br>

    <form class="ui form" @submit.prevent="sendMessage">
      <div class="fields">
        <div class="field">
          <input class="ui input" v-model="messageInput">
        </div>
        <div class="field">
          <button class="ui button" type="submit">Send</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import {ref, defineComponent, computed} from "vue";
//
import {io} from "socket.io-client";
//
import Navbar from "../components/Navbar.vue";
import {fetchMessages} from "../utils";
import {useUserStore} from "../stores/user";
import {socketApi} from "../config";
import FMessage from "../components/chat/message.vue";
import FBackButton from "../components/ui/FBackButton.vue";

export default defineComponent({
  name: "Chat.vue",
  components: {FBackButton, FMessage, Navbar},
  setup() {
    const user = useUserStore();

    const client = io(socketApi);

    let messages = ref([]);
    let messageInput = ref("");

    fetchMessages({token: user.token}).then(res => {
      // messages.value = res;

      client.emit("messagedReceived", true);
    }).then(scrollToBottom);

    client.on("connect", () => {
      console.log("Connected");
      client.emit("setUser", {token: user.token});
    });

    function sendMessage() {
      console.log(messageInput.value);

      client.emit("message", {content: messageInput.value});

      messageInput.value = "";
    }

    function scrollToBottom() {
      let container = document.querySelector("#chatBox");

      if(!container) return;

      container.scrollTop = container.scrollHeight;
    }

    client.on("message", (data) => {
      console.log(data);
      messages.value.push(data);

      setTimeout(() => {
        scrollToBottom();
      }, 500);
    });

    return {messageInput, sendMessage, messages: computed(() => {
        return messages.value;
    })}
  }
});
</script>

<style scoped>

</style>