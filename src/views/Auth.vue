<template>
  <div>
    <img src="./../assets/loding.gif">
  </div>
</template>

<script>
import { api } from "./../app/Api";

export default {
  name: "media-auth",
  data() {
    return {};
  },
  methods: {
    saveToken() {
      const search = "?" + window.location.hash.split("#")[1];
      const urlParams = new URLSearchParams(search);
      const accessToken = urlParams.get("access_token");

      if (
        accessToken == "" ||
        accessToken == null ||
        accessToken == undefined
      ) {
        this.$router.push("/PageNotFound");
      } else {
        let data = this.$store.state.settings || {};
        data.accessToken = accessToken;
        data.uid = urlParams.get("uid");
        data.accountId = urlParams.get("account_id");
        data.email = api.user.userData.email;

        const payload = {};

        payload.settings = data;
        payload.action = "set";

        this.$store
          .dispatch("settings", payload)
          .then(() => {
            window.close();
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  },
  created() {
    this.saveToken();
  }
};
</script>
