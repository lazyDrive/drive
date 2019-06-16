<template>
  <section class="show lazy_login">
    <form ref="form">
      <h1>Welcome Back!</h1>
      <p>We're so excited to see you again!</p>
      <label for="email">
        Email
        <span></span>
      </label>
      <input id="email" name="email" type="email" v-model="email">
      <label for="password">
        Password
        <span></span>
      </label>
      <input autocomplete id="password" name="password" type="password" v-model="password">
      <input type="submit" value="Login" @click.prevent="submit()">
      <a href="/forgot">Forgot your password?</a>
      <a href="/signup">Register an account</a>
    </form>
  </section>
</template>
<script>
import { api } from "./../../app/Api";

export default {
  name: "lazy-login",
  data() {
    return {
      password: "",
      loading: false,
      email: ""
    };
  },
  methods: {
    submit() {
      const data = {
        email: this.email,
        password: this.password
      };
      this.loading = true;
      this.$store
        .dispatch("login", data)
        .then(result => {
          this.finalize(result);
        })
        .catch(err => {
          this.loading = false;
          api._handleError(err);
        });
    },
    finalize(response) {
      api.mediastorage.cookies.set("name", response.data.userData.name, 5000);
      api.mediastorage.cookies.set("email", response.data.userData.email, 5000);
      api.mediastorage.cookies.set("token", response.data.token, 5000);
      api.mediastorage.session.set("name", response.data.userData.name);
      api.mediastorage.session.set("email", response.data.userData.email);
      api.mediastorage.session.set("token", response.data.token);
      this.$store.state.token = response.data.token;
      this.$store.state.isUserLoggedIn = true;

      var timer = setInterval(
        function() {
          if (api.auth.loggedIn()) {
            clearInterval(timer);
            if (response.status == 200) {
              const payload = {};

              payload.action = "get";
              payload.settings = response.data.userData;

              this.$store
                .dispatch("settings", payload)
                .then(() => {
                  this.$router.push("/drive/u/0/my-drive");
                })
                .catch(err => {
                  api._handleError(err);
                });
              this.loading = false;
            }
          }
        }.bind(this),
        500
      );
    },
    clear() {
      this.$refs.form.reset();
    }
  }
};
</script>
