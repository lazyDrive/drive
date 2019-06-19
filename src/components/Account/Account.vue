<template>
  <v-content>
    <v-container fluid pa-0>
      <div class="background-shapes-wrapper">
        <div class="background-shapes-container">
          <div class="background-shape circle-one"></div>
          <div class="background-shape circle-two"></div>
          <div class="background-shape square-one"></div>
          <div class="background-shape square-two"></div>
          <div class="background-shape square-three"></div>
          <div class="background-shape triangle-one"></div>
          <div class="background-shape triangle-two"></div>
          <div class="background-shape triangle-three"></div>
          <div class="background-shape rectangle-one"></div>
          <div class="background-shape rectangle-two"></div>
        </div>
      </div>
      <v-layout row wrap>
        <v-flex xs12 sm4 id="sign-in-text-wrapper" v-bind:class="{ switch: isSwitch }">
          <v-layout column align-center justify-center fill-height pa-3>
            <div class="login-wrapper text-xs-center mb-3 pa-5">
              <div class="display-1 font-weight-black mb-3" v-if="isSwitch">Hello Friend</div>
              <div class="display-1 font-weight-black mb-3" v-else>Welcome Back!</div>
              <span
                class="subheading"
                v-if="isSwitch"
              >Enter your personal details and start journey with us</span>
              <span
                class="subheading"
                v-else
              >To keep connected with us, please login with your personal info</span>
            </div>
            <v-btn
              round
              outline
              large
              dark
              ripple
              v-if="isSwitch"
              id="sign-up"
              @click="isSwitch = !isSwitch"
            >Sign up</v-btn>
            <v-btn
              round
              outline
              large
              dark
              ripple
              v-else
              id="sign-in"
              @click="isSwitch = !isSwitch"
            >Sign in</v-btn>
          </v-layout>
        </v-flex>
        <v-flex
          xs12
          sm8
          id="sign-up-form-wrapper"
          class="active"
          v-bind:class="{ switch: isSwitch}"
        >
          <v-layout column align-center justify-center pa-3 mt-5>
            <v-flex xs12 mb-3 mt-5>
              <div class="login-wrapper text-xs-center">
                <div class="display-1 font-weight-black">Create Account</div>
              </div>
            </v-flex>
            <v-flex xs12 mb-3>
              <v-btn outline fab small color="blue-grey lighten-4">
                <v-icon color="grey darken-4">mdi-facebook</v-icon>
              </v-btn>
              <v-btn outline fab small color="blue-grey lighten-4">
                <v-icon color="grey darken-4">mdi-google-plus</v-icon>
              </v-btn>
              <v-btn outline fab small color="blue-grey lighten-4">
                <v-icon color="grey darken-4">mdi-linkedin</v-icon>
              </v-btn>
            </v-flex>
            <v-flex xs12 mb-2>
              <span class="grey--text text--lighten-1">or use your email for registration</span>
            </v-flex>
            <v-flex xs12 class="form-wrapper">
              <v-text-field
                box
                full-width
                single-line
                label="Name"
                background-color="#f4f8f7"
                color="grey darken-2"
                prepend-inner-icon="mdi-account-outline"
                mb-0
              ></v-text-field>
              <v-text-field
                box
                full-width
                single-line
                label="Email"
                autocomplete="false"
                background-color="#f4f8f7"
                color="grey darken-2"
                prepend-inner-icon="mdi-email-outline"
              ></v-text-field>
              <v-text-field
                v-model="password"
                :append-icon="show1 ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
                :type="show1 ? 'text' : 'password'"
                box
                full-width
                single-line
                label="Password"
                background-color="#f4f8f7"
                color="grey darken-2"
                prepend-inner-icon="mdi-lock-outline"
                @click:append="show1 = !show1"
              ></v-text-field>
            </v-flex>
            <v-btn round large dark ripple color="teal" id="sign-up" @click="show = !show">Sign up</v-btn>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>
<script>
import { api } from "./../../app/Api";

export default {
  name: "media-login",
  data() {
    return {
      valid: false,
      e1: false,
      password: "",
      show1: false,
      isSwitch: false,
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

      var timer = setInterval(
        function() {
          if (api.auth.loggedIn()) {
            clearInterval(timer);
            if (response.status == 200) {
              this.$router.push("/drive/u/0/my-drive");
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
