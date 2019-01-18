<template>
  <div class="media-main-login">
    <media-login></media-login>
    <media-alert></media-alert>
  </div>
</template>

<script>
import LoginForm from "@/components/Account/LoginForm";

export default {
  name: "media-main-login",
  components: {
    "media-login": LoginForm
  }
};
</script>
