<template>
  <div>
    <img src="./../assets/loding.gif">
  </div>
</template>

<script>
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
        const data = {};
        data.accessToken = accessToken;
        data.uid = urlParams.get("uid");
        data.accountId = urlParams.get("account_id");

        this.$store
          .dispatch("settings", data)
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
