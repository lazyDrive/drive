<template>
  <div id="media-create-folder">
    <v-dialog v-model="this.$store.state.showUploadMenu" persistent width="800px">
      <v-card class="elevation-12">
        <v-toolbar height="50px" light flat>
          <strong>Upload details</strong>
          <v-spacer></v-spacer>

          <v-menu offset-y>
            <v-btn slot="activator" color="primary" small>Add more files</v-btn>
            <v-list>
              <v-list-tile v-for="(item, index) in items" :key="index" @click="fire(item.link)">
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>

          <v-btn
            small
            color="success"
            @click.prevent="done()"
            v-if="this.$store.state.isUploading == 2"
          >Done</v-btn>
          <v-btn small color="error" @click.prevent="hide()" v-else>Hide</v-btn>
        </v-toolbar>

        <v-list subheader class="scroll-section">
          <v-subheader>Files & Folder</v-subheader>
          <v-list-tile v-for="item in uploadingItems" :key="item.id" @click="1">
            <div
              class="progress progress--going"
              v-if="item.uploadPercent < 100"
              :style="`width: ${item.uploadPercent}%`"
            ></div>
            <div
              class="progress progress--success"
              v-else-if="item.uploadPercent = 100"
              :style="`width: ${item.uploadPercent}%`"
            ></div>
            <v-list-tile-avatar>
              <v-icon :class="[item.iconClass]">{{ item.icon }}</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title style="font-size: 14px;">{{ item.title }}</v-list-tile-title>
              <v-list-tile-title style="font-size: 14px;"><span style="color:blue">Size: {{ item.size }}</span></v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn small icon color="success" v-if="item.uploadPercent == 100">
                <v-icon color="white lighten-1">check</v-icon>
              </v-btn>
              <v-btn small icon color="error" v-else>
                <v-icon color="white lighten-1">close</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "media-upload-menu",
  data: () => ({
    items: [
      { title: "Upload File", link: "fileUpload" },
      { title: "Upload Folder", link: "folderUpload" }
    ]
  }),
  computed: {
    uploadingItems: function() {
      return this.$store.state.uploadItemsMenu;
    }
  },
  methods: {
    hide: function() {
      this.$store.state.isUploading = false;
      this.$store.state.showUploadMenu = false;
    },
    done: function() {
      this.hide();
    },
    fileUpload: function() {
      this.$emit("tiggerSelectFile");
    },
    folderUpload: function() {
      this.$emit("tiggerSelectFolder");
    },
    fire: function(a) {
      this[a](a);
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
