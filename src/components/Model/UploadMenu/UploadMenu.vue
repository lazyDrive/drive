<template>
  <div id="media-create-folder">
    <v-dialog v-model="yes" persistent width="800px">
      <v-card class="elevation-12">
        <v-toolbar height="50px" light>
          <strong>Upload details</strong>
          <v-spacer></v-spacer>
          <v-btn small color="success">Add more files</v-btn>
          <v-btn small color="primary">Hide</v-btn>
        </v-toolbar>
        <v-list subheader class="scroll-section">
          <v-subheader>
            <strong>Folders</strong>
          </v-subheader>
          <v-list-tile v-for="item in itemsupload" :key="item.title" avatar @click="1">
            <div class="progress" :style="`width: ${item.prog}%`"></div>
            <v-list-tile-avatar>
              <v-icon :class="[item.iconClass]">{{ item.icon }}</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title style="font-size: 14px;">{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn small icon color="error">
                <v-icon color="white lighten-1">close</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>

          <v-divider></v-divider>

          <v-subheader>Files</v-subheader>
          <v-list-tile v-for="item in items2upload" :key="item.title" @click="1">
            <div class="progress" :style="`width: ${item.prog}%`"></div>
            <v-list-tile-avatar>
              <v-icon :class="[item.iconClass]">{{ item.icon }}</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title style="font-size: 14px;">{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn small icon color="success">
                <v-icon color="white lighten-1">check</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import * as types from "./../../../store/mutation-types";

export default {
  name: "media-upload-menu",
  data: () => ({
    yes: true,
    itemsupload: [
      {
        icon: "folder",
        iconClass: "grey lighten-1 white--text",
        title: "Photos",
        subtitle: "Jan 9, 2014",
        prog: 12
      },
      {
        icon: "folder",
        iconClass: "grey lighten-1 white--text",
        title: "Recipes",
        prog: 40,
        subtitle: "Jan 17, 2014"
      },
      {
        icon: "folder",
        iconClass: "grey lighten-1 white--text",
        title: "Work",
        prog: 19,
        subtitle: "Jan 28, 2014"
      }
    ],
    items2upload: [
      {
        icon: "assignment",
        iconClass: "blue white--text",
        title: "Vacation itinerary",
        prog: 92,
        subtitle: "Jan 20, 2014"
      },
      {
        icon: "call_to_action",
        iconClass: "amber white--text",
        title: "Kitchen remodel",
        prog: 82,
        subtitle: "Jan 10, 2014"
      },
      {
        icon: "call_to_action",
        iconClass: "amber white--text",
        title: "Kitchen remodel",
        prog: 82,
        subtitle: "Jan 10, 2014"
      },
      {
        icon: "call_to_action",
        iconClass: "amber white--text",
        title: "Kitchen remodel",
        prog: 82,
        subtitle: "Jan 10, 2014"
      },
      {
        icon: "call_to_action",
        iconClass: "amber white--text",
        title: "Kitchen remodel",
        prog: 82,
        subtitle: "Jan 10, 2014"
      },
      {
        icon: "call_to_action",
        iconClass: "amber white--text",
        title: "Kitchen remodel",
        prog: 82,
        subtitle: "Jan 10, 2014"
      },
      {
        icon: "call_to_action",
        iconClass: "amber white--text",
        title: "Kitchen remodel",
        prog: 82,
        subtitle: "Jan 10, 2014"
      }
    ]
  }),

  methods: {
    hideCreateFolderModal: function() {
      this.$store.commit(types.HIDE_CREATE_FOLDER_MODAL);
    },
    create: function() {
      const foldername = this.defaultData;
      this.$store.dispatch("createDirectory", { foldername });
    }
  }
};
</script>
<style>
.confirm-text {
  text-align: left;
  font-size: 20px;
}
</style>
