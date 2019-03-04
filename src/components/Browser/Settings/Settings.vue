<template>
  <div class="media-settings">
    <v-layout row justify-center>
      <v-dialog
        v-model="this.$store.state.showSettings"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
        scrollable
      >
        <v-card tile>
          <v-toolbar card dark color="primary">
            <v-btn icon dark @click="hideSettings()">
              <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>Settings</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn dark flat @click="saveSettings()">Save</v-btn>
            </v-toolbar-items>
            <v-menu bottom right offset-y>
              <v-btn slot="activator" dark icon>
                <v-icon>more_vert</v-icon>
              </v-btn>
              <v-list>
                <v-list-tile v-for="(item, i) in items" :key="i" @click="1">
                  <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
          </v-toolbar>

          <v-card-text>
            <v-list three-line subheader>
              <v-subheader>User Controls</v-subheader>
              <v-list-tile avatar>
                <v-list-tile-content>
                  <v-list-tile-title>Connected Applications</v-list-tile-title>
                  <div class="text-xs-center">
                    <v-btn
                      :loading="loading4"
                      dark
                      :color=" dropbox ? 'green' : 'info'"
                      @click="connectDropbox()"
                    >{{ dropbox ? 'Remove Dropbox' : 'Connect Dropbox' }}</v-btn>
                    <v-btn
                      :loading="loading4"
                      dark
                      :color="googleDrive ? 'green' : 'info'"
                      @click="connectDropbox()"
                    >{{ googleDrive ? 'Remove Google Drive' : 'Connect Google Drive' }}</v-btn>
                  </div>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile avatar>
                <v-list-tile-content>
                  <v-list-tile-title>Content filtering</v-list-tile-title>
                  <v-list-tile-sub-title>Set the content filtering level to restrict apps that can be downloaded</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile avatar>
                <v-list-tile-content>
                  <v-list-tile-title>Password</v-list-tile-title>
                  <v-list-tile-sub-title>Require password for purchase or use password to restrict purchase</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
            <v-divider></v-divider>
            <v-list three-line subheader>
              <v-subheader>General</v-subheader>
              <v-list-tile avatar>
                <v-list-tile-action>
                  <v-checkbox color="primary" v-model="notifications"></v-checkbox>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>Notifications</v-list-tile-title>
                  <v-list-tile-sub-title>Notify me about updates to apps or games that I downloaded</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile avatar>
                <v-list-tile-action>
                  <v-checkbox color="primary" v-model="sound"></v-checkbox>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>Sound</v-list-tile-title>
                  <v-list-tile-sub-title>Auto-update apps at any time. Data charges may apply</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile avatar>
                <v-list-tile-action>
                  <v-checkbox color="primary" v-model="widgets"></v-checkbox>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>Auto-add widgets</v-list-tile-title>
                  <v-list-tile-sub-title>Automatically add home screen widgets</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile avatar>
                <v-list-tile-action>
                  <v-checkbox color="primary" v-model="widgets"></v-checkbox>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>Suggestions</v-list-tile-title>
                  <v-list-tile-sub-title>Make relevant files handy when you need them in Quick Access.</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-card-text>

          <div style="flex: 1 1 auto;"></div>
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>

<script>
import * as types from "./../../../store/mutation-types";
import Dropbox from "dropbox";
import Fetch from "axios";
import { api } from "./../../../app/Api";

export default {
  name: "media-settings",
  data() {
    return {
      dialog3: false,
      notifications: false,
      sound: true,
      loading4: false,
      widgets: false,
      items: [
        {
          title: "Save"
        },
        {
          title: "Save & Close"
        }
      ]
    };
  },
  computed: {
    dropbox: function() {
      return this.$store.state.settings.dropbox.accessToken != null && this.$store.state.settings.dropbox.accessToken != ""  ? true : false;
    },
    googleDrive: function() {
      return false;
    }
  },
  methods: {
    hideSettings: function() {
      this.$store.commit(types.HIDE_SETTINGS);
    },
    saveSettings: function() {
      const payload = {};
      payload.action = "set";
      payload.settings = this.$store.state.settings;
      this.$store
        .dispatch("settings", payload)
        .then(() => {
          payload.action = "get";
          payload.settings = api.user.userData;
          this.$store.dispatch("settings", payload);
        })
        .catch(err => {
          console.log(err);
        });
    },
    connectDropbox: function() {
      if (!this.dropbox) {
        var CLIENT_ID = "w3mmmph398qrnx9";
        var dbx = new Dropbox.Dropbox({ clientId: CLIENT_ID, fetch: Fetch });
        var authUrl = dbx.getAuthenticationUrl(`http://localhost:${api.config.redirectPort}/auth`);

        const win = window.open(
          authUrl,
          "targetWindow",
          "toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=500"
        );
        const payload = {};
        var timer = setInterval(function() {
          if (win.closed) {
            clearInterval(timer);
            payload.action = "get";
            payload.settings = api.user.userData;
            this.$store.dispatch("settings", payload);
          }
        }.bind(this), 500);
      } else {
        this.$store.state.settings.accessToken = "";
        this.saveSettings();
      }
    }
  }
};
</script>
