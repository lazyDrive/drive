<template>
  <div class="home">
    <media-login></media-login>
    <media-alert></media-alert>
  </div>
</template>

<script>
import { api } from "./../app/Api";
import LoginForm from "@/components/Account/LoginForm";

export default {
  name: "media-home",
  data() {
    return {};
  },
  components: {
    "media-login": LoginForm
  },
  computed: {
    isLoggedIn: function() {
      return api.auth.loggedIn();
    }
  }
};
</script>
