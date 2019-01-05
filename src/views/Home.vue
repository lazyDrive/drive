<template>
  <div id="app">
    <v-app>
      <v-toolbar fixed dark>
        <v-toolbar-title>Media Manager</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn v-if="!isLoggedIn" v-on:click.stop.prevent :to="{ path: '/login' }" flat>Sign in</v-btn>
        <v-btn v-if="!isLoggedIn" v-on:click.stop.prevent :to="{ path: '/signup' }"  flat>Sign up</v-btn>
        <v-btn v-if="isLoggedIn" v-on:click.stop.prevent :to="{ path: '/drive/u/0/my-drive' }"  flat>My Drive</v-btn>
        <v-btn icon target="_blank" href="https://github.com/Anu1601CS/media-manager" flat>
          <v-icon>code</v-icon>
        </v-btn>
      </v-toolbar>
      <v-content>
        <section>
          <v-parallax src="https://cdn.vuetifyjs.com/images/parallax/material.jpg" height="600">
            <v-layout column align-center justify-center class="white--text">
              <img src="./../assets/logo.png" alt="media-manager" height="100">
              <h1 class="white--text mb-2 display-1 text-xs-center">Media Manager</h1>
              <div class="subheading mb-3 text-xs-center">Made with Vuejs and Node.js</div>
              <v-btn v-if="!isLoggedIn" color="black" dark large v-on:click.stop.prevent :to="{ path: '/login' }">Get Started</v-btn>
              <v-btn v-if="isLoggedIn" color="black" dark large v-on:click.stop.prevent :to="{ path: '/drive/u/0/my-drive' }">Go To Drive</v-btn>
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
          <v-container grid-list-xl>
            <v-layout row wrap align-center>
              <v-flex xs12 sm6 md3>
                <v-card>
                  <img src="./../assets/node.png" width="100%" height="180">
                  <v-card-title primary-title>
                    <div>
                      <h3 class="headline mb-0">Node.js</h3>
                      <div>Node.js is cross-platform JavaScript run-time environment that executes JavaScript code outside of a browser.</div>
                    </div>
                  </v-card-title>

                  <v-card-actions>
                    <v-btn target="_blank" flat href="https://nodejs.org/en/" color="orange">Explore</v-btn>
                  </v-card-actions>
                </v-card>
              </v-flex>
              <v-flex xs12 sm6 md3>
                <v-card>
                  <img src="./../assets/vue.png">

                  <v-card-title primary-title>
                    <div>
                      <h3 class="headline mb-0">Vuejs + Vuex</h3>
                      <div>Vue.js is an open-source JavaScript framework for building user interfaces and single-page applications.</div>
                    </div>
                  </v-card-title>

                  <v-card-actions>
                    <v-btn target="_blank" href="https://vuejs.org/" flat color="orange">Explore</v-btn>
                  </v-card-actions>
                </v-card>
              </v-flex>
              <v-flex xs12 sm6 md3>
                <v-card>
                  <img src="./../assets/mongo.png" width="100%" height="180">

                  <v-card-title primary-title>
                    <div>
                      <h3 class="headline mb-0">MongoDB</h3>
                      <div>MongoDB is a NoSQL database program, MongoDB uses JSON-like documents with schemata.</div>
                    </div>
                  </v-card-title>

                  <v-card-actions>
                    <v-btn target="_blank" href="https://www.mongodb.com/" flat color="orange">Explore</v-btn>
                  </v-card-actions>
                </v-card>
              </v-flex>
              <v-flex xs12 sm6 md3>
                <v-card>
                  <img src="./../assets/express.png" width="90%" height="180">

                  <v-card-title primary-title>
                    <div>
                      <h3 class="headline mb-0">Express</h3>
                      <div>
                        Express.js is a web application framework for Node.js.
                        It is designed for building web applications and APIs.
                      </div>
                    </div>
                  </v-card-title>

                  <v-card-actions>
                    <v-btn target="_blank" href="https://expressjs.com/" flat color="orange">Explore</v-btn>
                  </v-card-actions>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </section>
      </v-content>
      <v-footer dark height="auto">
        <v-card class="flex" flat tile>
          <!-- <v-card-title class="teal">
            <strong class="subheading">Get connected with us on social networks!</strong>

            <v-spacer></v-spacer>

            <v-btn v-for="icon in icons" :key="icon" class="mx-3" dark icon>
              <v-icon size="24px">{{ icon }}</v-icon>
            </v-btn>
          </v-card-title> -->

          <v-card-actions class="grey darken-3 justify-center">
            &copy;2018 —
            <strong> Anurag</strong>
          </v-card-actions>
        </v-card>
      </v-footer>
    </v-app>
  </div>
</template>

<script>

import {api} from './../app/Api';

export default {
  name: "media-home",
  data() {
    return {
      title: "Your Logo",
      icons: [
        "fab fa-facebook",
        "fab fa-twitter",
        "fab fa-google-plus",
        "fab fa-linkedin",
        "fab fa-instagram"
      ]
    };
  },
  computed: {
    isLoggedIn: function(){
      return api.auth.loggedIn();
    }
  },
};
</script>
