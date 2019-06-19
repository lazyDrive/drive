<template>
  <div class="lazy__main">
    <!-- <div class="background-shapes-wrapper">
      <div class="background-shapes-container">
        <div class="background-shape circle-one"></div>
        <div class="background-shape circle-two"></div>
        <div class="background-shape square-one"></div>
        <div class="background-shape square-two"></div>
        <div class="background-shape square-three"></div>
      </div>
    </div>-->
    <div class="media__home">
      <media-login></media-login>
      <media-alert></media-alert>
    </div>
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
