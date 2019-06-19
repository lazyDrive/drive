<template>
  <div class="media-home">
    <v-app>
      <media-login></media-login>
      <media-alert></media-alert>
    </v-app>
  </div>
</template>

<script>
import { api } from "./../app/Api";
import LoginForm from "@/components/Account/Account";

export default {
  name: "media-home",
  data() {
    return {
      title: "Your Logo",
      icons: [
        "fab fa-facebook",
        "fab fa-twitter",
        "fab fa-google-plus",
        "fab fa-linkedin",
        "fab fa-instagram"
      ]
    };
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
