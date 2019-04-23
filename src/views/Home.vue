<template>
  <div class="media-login">
    <media-login></media-login>
  </div>
</template>

<script>
import { api } from "./../app/Api";
import LoginForm from "@/components/Account/LoginForm";

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
