<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-layout column align-center justify-center>
        <v-flex xs12 mb-3 mt-5>
          <div class="text-xs-center">
            <div v-show="signup" class="display-1 font-weight-black">Create Account</div>
            <div v-show="!signup" class="display-1 font-weight-black">Welcome back!</div>
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
          <span v-show="signup" class="grey--text text--lighten">or use your email for registration</span>
          <span v-show="!signup" class="grey--text text--lighten">We're so excited to see you again!</span>
        </v-flex>
        <v-flex xs12 class="form-wrapper">
          <v-text-field
            box
            full-width
            single-line
            label="Username"
            background-color="#f4f8f7"
            color="grey darken-2"
            prepend-inner-icon="mdi-account-outline"
            mb-0
          ></v-text-field>
          <v-text-field
            v-show="signup"
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
            v-show="signup"
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
          <v-btn v-show="!signup" round large dark ripple color="teal" class="sign-up">LOG IN</v-btn>
          <v-btn v-show="signup" round large dark ripple color="teal" class="sign-up">Sign up</v-btn>
        </v-flex>
        <br>
        <v-flex xs12 mb-2>
          <p>
            Already have an account?
            <a @click="signup = !signup">Login</a>
          </p>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>
<script>
import { api } from "./../../app/Api";

export default {
  name: "media-login",
  data() {
    return {
      signup: true,
      valid: false,
      e1: false,
      show: true,
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
