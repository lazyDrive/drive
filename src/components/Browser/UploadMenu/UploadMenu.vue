<template>
  <div class="media-upload-menu" v-if="0">
    <v-card class="elevation-12 upload-section">
      <v-toolbar height="50px" dark>
        <strong>Uploading</strong>
        <v-spacer></v-spacer>
        <v-btn small dark icon>
          <v-icon>add</v-icon>
        </v-btn>
        <v-btn small dark icon>
          <v-icon v-if="!expand" @click="expand = !expand">expand_less</v-icon>
          <v-icon v-if="expand" @click="expand = !expand">expand_more</v-icon>
        </v-btn>
        <v-btn small dark icon>
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-list subheader class="scroll-section" v-if="expand">
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
  </div>
</template>

<script>
export default {
  name: "media-upload-menu",
  data: () => ({
    value: 60,
    expand: true,
    itemsupload: [
      {
        icon: "folder",
        iconClass: "grey lighten-1 white--text",
        title: "Photos",
        subtitle: "Jan 9, 2014",
        prog:12,
      },
      {
        icon: "folder",
        iconClass: "grey lighten-1 white--text",
        title: "Recipes",
        prog:40,
        subtitle: "Jan 17, 2014"
      },
      {
        icon: "folder",
        iconClass: "grey lighten-1 white--text",
        title: "Work",
        prog:19,
        subtitle: "Jan 28, 2014"
      }
    ],
    items2upload: [
      {
        icon: "assignment",
        iconClass: "blue white--text",
        title: "Vacation itinerary",
        prog:92,
        subtitle: "Jan 20, 2014"
      },
      {
        icon: "call_to_action",
        iconClass: "amber white--text",
        title: "Kitchen remodel",
        prog:82,
        subtitle: "Jan 10, 2014"
      }
    ]
  })
};
</script>
