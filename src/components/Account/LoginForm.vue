<template>
  <div class="media-login">
    <v-toolbar dark>
      <v-btn v-on:click.stop.prevent :to="{ path: '/' }" flat>Home</v-btn>
      <v-toolbar-title>Media Manager</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-on:click.stop.prevent :to="{ path: '/login' }" flat>Sign in</v-btn>
      <v-btn v-on:click.stop.prevent :to="{ path: '/signup' }" flat>Sign up</v-btn>
      <v-btn icon href="https://github.com/Anu1601CS/media-manager" flat>
        <v-icon>code</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height class="loginOverlay">
        <v-layout flex align-center justify-center>
          <v-flex xs12 sm4 elevation-6>
            <v-toolbar class="pt-5 blue darken-4">
              <v-toolbar-title class="white--text">
                <h4>Welcome Back</h4>
              </v-toolbar-title>
            </v-toolbar>
            <v-card>
              <v-card-text class="pt-4">
                <div>
                  <v-form v-model="valid" ref="form" v-on:submit.prevent>
                    <v-text-field
                      label="Enter your e-mail address"
                      v-model="email"
                      :rules="emailRules"
                      required
                    ></v-text-field>
                    <v-text-field
                      label="Enter your password"
                      v-model="password"
                      min="8"
                      :append-icon="e1 ? 'visibility' : 'visibility_off'"
                      :append-icon-cb="() => (e1 = !e1)"
                      :type="e1 ? 'text' : 'password'"
                      :rules="passwordRules"
                      counter
                      required
                    ></v-text-field>
                    <v-layout justify-space-between>
                      <v-btn
                        :loading="loading"
                        :disabled="loading"
                        @click="submit"
                        :class=" { 'blue darken-4 white--text' : valid, disabled: !valid }"
                      >
                        Sign in
                        <span slot="loader">Signing in...</span>
                      </v-btn>
                      <a href>Forgot Password</a>
                    </v-layout>
                  </v-form>
                </div>
              </v-card-text>
              <v-divider></v-divider>
              <div>
                <br>
                <a href=""><img src="./../../assets/google_signin.png"></a>
              </div>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </div>
</template>
<script>
import { api } from "./../../app/Api";
import router from "./../../router";

export default {
  name: "media-login",
  data() {
    return {
      valid: false,
      e1: false,
      password: "",
      loading: false,
      passwordRules: [v => !!v || "Password is required"],
      email: "",
      /* eslint-disable */
      emailRules: [
        v => !!v || "E-mail is required",
        v =>
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "E-mail must be valid"
      ]
      /* eslint-enable */
    };
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        const data = {
          email: this.email,
          password: this.password
        };
        this.loading = true;

        this.$store
          .dispatch("login", data)
          .then(result => {
            this.loading = false;
            this.finalize(result);
          })
          .catch(err => {
            this.loading = false;
            api._handleError(err);
          });
      }
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

      if (response.status == 200) {
        router.push("/drive/u/0/my-drive");
      }
    },
    clear() {
      this.$refs.form.reset();
    }
  }
};
</script>
