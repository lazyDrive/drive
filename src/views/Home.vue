<template>
  <div id="app">
    <v-app>
      <v-toolbar fixed dark>
        <v-toolbar-title>Media Manager</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn href="/#/login" flat>Login</v-btn>
        <v-btn href="/#/signup" flat>Register</v-btn>
        <v-btn icon href="https://github.com/Anu1601CS/media-manager" flat>
        <v-icon>code</v-icon>
        </v-btn>
      </v-toolbar>
      <v-content>
        <section>
          <v-parallax src="https://cdn.vuetifyjs.com/images/parallax/material.jpg" height="600">
            <v-layout column align-center justify-center class="white--text">
              <img src="./../assets/logo11.png" alt="media-manager" height="100">
              <h1 class="white--text mb-2 display-1 text-xs-center">Media Manager</h1>
              <div class="subheading mb-3 text-xs-center">Made with Vuejs and Node.js</div>
              <v-btn color="black" dark large href="/#/login">Get Started</v-btn>
            </v-layout>
          </v-parallax>
        </section>

        <section>
          <v-layout column wrap class="my-5" align-center>
            <v-flex xs12 sm4 class="my-3">
              <div class="text-xs-center">
                <h2 class="headline">Open Source Media Manager</h2>
                <!-- <span class="subheading">Cras facilisis mi vitae nunc</span> -->
              </div>
            </v-flex>
            <v-flex xs12>
              <v-container grid-list-xl>
                <v-layout row wrap align-center>
                  <v-flex xs12 md4>
                    <v-card class="elevation-0 transparent">
                      <v-card-text class="text-xs-center">
                        <v-icon x-large class="blue--text text--lighten-2">color_lens</v-icon>
                      </v-card-text>
                      <v-card-title primary-title class="layout justify-center">
                        <div class="headline text-xs-center">Material Design</div>
                      </v-card-title>
                      <v-card-text>Vuetify is used as a frontend framework which is completely based on Vuejs and Material Design which gives Good and Fresh look to application.</v-card-text>
                    </v-card>
                  </v-flex>
                  <v-flex xs12 md4>
                    <v-card class="elevation-0 transparent">
                      <v-card-text class="text-xs-center">
                        <v-icon x-large class="blue--text text--lighten-2">flash_on</v-icon>
                      </v-card-text>
                      <v-card-title primary-title class="layout justify-center">
                        <div class="headline">Fast development</div>
                      </v-card-title>
                      <v-card-text>This project is under fast development. Your Contributions are welcomed.</v-card-text>
                    </v-card>
                  </v-flex>
                  <v-flex xs12 md4>
                    <v-card class="elevation-0 transparent">
                      <v-card-text class="text-xs-center">
                        <v-icon x-large class="blue--text text--lighten-2">build</v-icon>
                      </v-card-text>
                      <v-card-title primary-title class="layout justify-center">
                        <div class="headline text-xs-center">Completely Open Sourced</div>
                      </v-card-title>
                      <v-card-text>This project is completely open source so everyone can takes the benefits of this application.</v-card-text>
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-flex>
          </v-layout>
        </section>
      </v-content>
    </v-app>
  </div>
</template>

<script>
export default {
  name: "media-home",
  data() {
    return {
      title: "Your Logo"
    };
  }
};
</script>
