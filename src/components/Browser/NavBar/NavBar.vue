<template>
  <div class="navbar" id="media-navbar">
    <v-navigation-drawer
      :clipped="$vuetify.breakpoint.lgAndUp"
      v-model="drawer"
      fixed
      app
      width="250"
    >
      <v-list dense>
        <div v-for="(item, i) in items" :key="i">
          <v-layout v-if="item.heading" :key="item.heading" row align-center>
            <v-flex xs6>
              <v-subheader v-if="item.heading">{{ item.heading }}</v-subheader>
            </v-flex>
            <v-flex xs6 class="text-xs-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-flex>
          </v-layout>
          <v-list-group
            v-else-if="item.children"
            v-model="item.model"
            :key="item.text"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon
          >
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>{{ item.text }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile v-for="(child, i) in item.children" :key="i" @click="fire(child.link)">
              <v-list-tile-action v-if="child.icon">
                <svg
                  v-if="child.icon == 'upload_file'"
                  class="a-s-fa-Ha-pa"
                  x="0px"
                  y="0px"
                  width="20px"
                  height="20px"
                  viewBox="0 0 20 20"
                  focusable="false"
                  fill="#000000"
                >
                  <path
                    d="M12,0H4C2.896,0,2.01,0.896,2.01,2L2,18c0,1.104,0.886,2,1.99,2H16c1.104,0,2-0.896,2-2V6L12,0z M11,13v4H9v-4H6l4-4l4,4H11 z M11,7V1.5L16.5,7H11z"
                  ></path>
                </svg>
                <svg
                  v-else-if="child.icon == 'upload_folder'"
                  class="a-s-fa-Ha-pa"
                  x="0px"
                  y="0px"
                  width="20px"
                  height="20px"
                  viewBox="0 0 20 20"
                  focusable="false"
                  fill="#000000"
                >tap-t
                  <path
                    d="M18,4h-8L8,2H2C0.896,2,0.01,2.896,0.01,4L0,16c0,1.104,0.896,2,2,2h16c1.104,0,2-0.896,2-2V6C20,4.896,19.104,4,18,4z M14,11v4h-2v-4H9l4-4l4,4H14z"
                  ></path>
                </svg>
                <v-icon v-else>{{ child.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{ child.text }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
          <v-list-tile v-else :key="item.text" @click="fire(item.link)">
            <v-list-tile-action>
              <v-icon color="black">{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.text }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </div>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      color="white"
      app
      fixed
      light
      flat
      class="m-over-toolbar"
    >
      <v-toolbar-title style="width: 300px" class="ml-0">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <span class="hidden-sm-and-down">Media Manager</span>
      </v-toolbar-title>
      <v-text-field
        flat
        solo-inverted
        hide-details
        @input="changeSearch"
        prepend-inner-icon="search"
        label="Search"
        class="hidden-sm-and-down"
      ></v-text-field>
      <v-spacer></v-spacer>

      <!-- <v-progress-circular :width="2" color="blue" indeterminate></v-progress-circular> -->
      <v-btn icon class="uploading" v-if="this.$store.state.isUploading == true">
        <v-icon medium color="green">cloud_upload</v-icon>
      </v-btn>
      <v-btn icon v-else-if="this.$store.state.isUploading == 2">
        <v-icon medium color="green">cloud_done</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon medium>settings</v-icon>
      </v-btn>

      <v-menu v-model="menu" :close-on-content-click="false" :nudge-width="200" offset-y>
        <v-btn icon slot="activator">
          <v-avatar size="30px" tile>
            <img src="./../../../assets/profile.png" alt="Profile Image">
          </v-avatar>
        </v-btn>

        <v-card>
          <v-list>
            <v-list-tile avatar>
              <v-list-tile-avatar>
                <img src="./../../../assets/profile.png" alt="John">
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title>Anurag</v-list-tile-title>
                <v-list-tile-sub-title>Creator of Media Manager</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>

          <v-divider></v-divider>
          <v-btn color="red" @click="logout()">Logout</v-btn>
        </v-card>
      </v-menu>
    </v-toolbar>
    <media-settings :dialog="dialogSettings"/>
  </div>
</template>

<script>
import * as types from "./../../../store/mutation-types";
import { api } from "./../../../app/Api.js";
import router from "./../../../router.js";

/* eslint-disable */
export default {
  name: "media-navbar",
  data: () => ({
    dialog: false,
    drawer: null,
    loading: null,
    dialogSettings: null,
    fav: true,
    menu: false,
    message: false,
    hints: true,
    items: [
      { icon: "create_new_folder", text: "New Folder", link: "newFolder" },
      {
        icon: "keyboard_arrow_up",
        "icon-alt": "keyboard_arrow_down",
        text: "Upload",
        model: true,
        children: [
          { icon: "upload_file", text: "File upload", link: "fileUpload" },
          { icon: "upload_folder", text: "Folder upload", link: "folderUpload" }
        ]
      },
      { icon: "query_builder", text: "Recents", link: "about" },
      { icon: "delete", text: "Bin", link: "about" },
      { icon: "content_copy", text: "Make Duplicate", link: "about" },
      {
        icon: "keyboard_arrow_up",
        "icon-alt": "keyboard_arrow_down",
        text: "More",
        model: false,
        children: [
          { text: "Import", link: "export" },
          { text: "Export", link: "export" },
          { text: "Print", link: "export" }
        ]
      },
      { icon: "settings", text: "Settings", link: "settings" },
      { icon: "chat_bubble", text: "Send feedback", link: "about" },
      { icon: "help", text: "Help", link: "about" },
      { icon: "phonelink", text: "App downloads", link: "about" }
    ]
  }),
  props: {
    source: String
  },
  components: {},
  mounted() {},
  methods: {
    newFolder: function() {
      this.$store.commit(types.SHOW_CREATE_FOLDER_MODAL);
    },
    settings: function() {
      this.$store.commit(types.SHOW_SETTINGS);
    },
    folderUpload: function() {
      this.$emit("tiggerSelectFolder");
    },
    fileUpload: function() {
      this.$emit("tiggerSelectFile");
    },
    changeSearch(query) {
      this.$store.commit(types.SET_SEARCH_QUERY, query);
    },
    logout: function() {
      if (api.auth.logout()) {
        router.push("/");
      }
    },
    fire: function(a) {
      this[a](a);
    }
  }
};
</script>
