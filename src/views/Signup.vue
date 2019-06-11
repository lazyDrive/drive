<template>
  <div class="lazy__signup">
    <media-signup></media-signup>
  </div>
</template>

<script>
import SignupForm from "@/components/Account/SignupForm";

export default {
  name: "media-main-signup",
  components: {
    "media-signup": SignupForm
  }
};
</script>
