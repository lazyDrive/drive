<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-layout column align-center justify-center>
        <v-flex xs12 mb-3 mt-5>
          <div class="text-xs-center">
            <div v-if="signup" class="display-1 font-weight-black">Create Account</div>
            <div v-if="!signup" class="display-1 font-weight-black">Welcome back!</div>
          </div>
        </v-flex>
        <v-flex xs12 mb-3>
          <v-btn outlined fab small color="blue-grey lighten-4">
            <v-icon color="grey darken-4">mdi-facebook</v-icon>
          </v-btn>
          <v-btn outlined fab small color="blue-grey lighten-4">
            <v-icon color="grey darken-4">mdi-google-plus</v-icon>
          </v-btn>
          <v-btn outlined fab small color="blue-grey lighten-4">
            <v-icon color="grey darken-4">mdi-linkedin</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs12 mb-2>
          <span v-if="signup" class="grey--text text--lighten">or use your email for registration</span>
          <span v-if="!signup" class="grey--text text--lighten">We're so excited to see you again!</span>
        </v-flex>
        <v-flex xs12 class="form-wrapper">
          <v-text-field
            v-model="username"
            filled
            full-width
            v-if="signup"
            single-line
            :label="`${signup ? 'Username' : 'Username or Email'}`"
            :rules="usernameRules"
            background-color="#dcdada"
            color="grey darken-2"
            outlined
            prepend-inner-icon="mdi-account-outlined"
            mb-0
          ></v-text-field>
          <v-text-field
            v-model="name"
            filled
            v-if="signup"
            full-width
            :rules="nameRules"
            single-line
            label="Name"
            background-color="#dcdada"
            color="grey darken-2"
            outlined
            prepend-inner-icon="mdi-account-outlined"
            mb-0
          ></v-text-field>
          <v-text-field
            v-model="email"
            filled
            full-width
            single-line
            label="Email"
            :rules="emailRules"
            autocomplete="false"
            background-color="#dcdada"
            color="grey darken-2"
            outlined
            prepend-inner-icon="mdi-email-outline"
          ></v-text-field>
          <v-text-field
            v-model="password"
            :append-icon="eye ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
            :type="eye ? 'text' : 'password'"
            filled
            full-width
            single-line
            :rules="passwordRules"
            label="Password"
            background-color="#dcdada"
            color="grey darken-2"
            outlined
            prepend-inner-icon="mdi-lock-outlined"
            @click:append="eye = !eye"
          ></v-text-field>
          <v-btn
            v-if="!signup"
            rounded
            large
            dark
            depressed
            ripple
            @click="login"
            color="#1ed760"
            class="sign-up"
          >LOG IN</v-btn>
          <v-btn
            v-if="signup"
            rounded
            large
            dark
            @click="createAccount"
            depressed
            ripple
            color="#1ed760"
            class="sign-up"
          >Sign up</v-btn>
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
      name: "",
      username: "",
      email: "",
      password: "",
      signup: true,
      valid: false,
      show: true,
      eye: false,
      loading: false,
      /* eslint-disable */
      usernameRules: [v => !!v || "Username is required."],
      passwordRules: [v => !!v || "Password is required"],
      nameRules: [
        v => !!v || "Name is required.",
        v => /^[a-zA-Z ]*$/.test(v) || "Name must be valid."
      ],
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
    createAccount() {
      const data = {
        name: this.name,
        email: this.email,
        password: this.password
      };
      this.$store
        .dispatch("signup", data)
        .then(() => {
          this.password = "";
          this.name = "";
          this.email = "";
          this.username = "";
          // this.clear();
        })
        .catch(error => {
          console.log(error);
        });
    },
    login() {
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
              this.$router.push("/drive/u/0/my-drive");
              this.loading = false;
            }
          }
        }.bind(this),
        500
      );
    },
    clear() {
      this.password = "";
      this.name = "";
      this.email = "";
      this.username = "";
    }
  }
};
</script>
