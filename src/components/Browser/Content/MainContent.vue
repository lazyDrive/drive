<template>
  <v-content class="media-content" style="padding-top: 35px;">
    <v-container fluid grid-list-md>
      <v-breadcrumbs :items="diskLoaded">
        <v-icon slot="divider">chevron_right</v-icon>
        <template slot="item" slot-scope="props">
          <a
            @click.stop="doThis(props.item.path)"
            :class="[props.item.disabled && 'disabled']"
          >{{ props.item.text }}</a>
        </template>
      </v-breadcrumbs>

      <div class="media-toolbar">
        <div class="media-loader" v-if="this.$store.state.isLoading"></div>
      </div>

      <div
        id="media-items"
        @dragenter="onDragEnter"
        @drop="onDrop"
        @dragover="onDragOver"
        @dragleave="onDragLeave"
        ref="browserItems"
      >
        <div class="media-dragoutline">
          <v-icon size="100">cloud_upload</v-icon>
          <p>Drop file(s) to Upload</p>
        </div>
        <slot name="contentList"></slot>
        <slot name="contentGrid"></slot>
      </div>
    </v-container>

    <!-- Add infrobar -->
    <media-infrobar v-if="this.$store.state.showInfoBar"></media-infrobar>
  </v-content>
</template>

<script>
import * as types from "./../../../store/mutation-types";
import { api } from "./../../../app/Api.js";

export default {
  name: "media-content",
  data: () => ({}),
  computed: {
    diskLoaded: function() {
      return this.$store.state.diskLoaded;
    }
  },
  methods: {
    doThis: function(path) {
      if (path) {
        this.$router.push({
          path: `/drive/u/0/folder/${path}`
        });
      } else {
        this.$router.push({
          path: `/drive/u/0/my-drive`
        });
      }
    },
    onScroll: api.debounce(function() {
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
        this.$store.state.loadLimit = this.$store.state.loadLimit + 10;

        const dir = this.$route.params.dir;
        const path = this.$route.params.path;

        this.$store.commit(types.SET_IS_LOADING, true);
        if (dir !== undefined && path == "folder") {
          this.$store.dispatch("update", { path: dir });
        } else {
          this.$store.dispatch("update", { path: "my-drive" });
        }
      }
    }, 300),
    // Listeners for drag and drop
    onDragEnter: function(event) {
      event.stopPropagation();
      return false;
    },

    // Notify user when file is over the drop area
    onDragOver: function(event) {
      event.preventDefault();
      document.querySelector(".media-dragoutline").classList.add("active");
      return false;
    },

    /* Upload files */
    dragUpload: async function() {
      let uploadSuccess = 0;
      while (this.$store.state.uploadItems.length > 0) {
        const item = this.$store.state.uploadItems.shift();
        const formData = item.file;
        const uploadPath = item.path;

        try {
          await this.$store.dispatch("upload", { formData, uploadPath });
          uploadSuccess = uploadSuccess + 1;
        } catch (error) {
          console.error(error);
        }

        this.$store.dispatch("update", {
          path: this.$store.state.selectedDirectory
        });
      }
      var data = {
        data: `${uploadSuccess} files uploaded.`,
        color: "success"
      };

      this.$store.commit(types.SHOW_SNACKBAR, data);
      this.$store.commit(types.SET_IS_UPLOADING, 2);
    },

    onDrop: function(event) {
      event.preventDefault();
      const uploadPath = this.$store.state.selectedDirectory;

      if (
        event.dataTransfer &&
        event.dataTransfer.files &&
        event.dataTransfer.files.length > 0
      ) {
        for (var i = 0; i < event.dataTransfer.files.length; i++) {
          let file = event.dataTransfer.files[i];
          document
            .querySelector(".media-dragoutline")
            .classList.remove("active");

          const formData = new FormData();
          const item = {};

          formData.append("files", file);
          item.id = file.name + i + file.lastModified + file.size + Date.now();
          item.icon = "assessment";
          item.file = formData;
          item.path = uploadPath;
          item.type = "file";
          item.iconClass = "grey lighten-1 white--text";
          item.title = file.name;
          item.subtitle = "";
          item.size = file.size;
          item.uploadPercent = 0;

          this.$store.state.uploadItems.push(item);
          this.$store.state.uploadItemsMenu.push(item);
        }
        if (this.$store.state.isUploading !== true) {
          this.$emit("tiggerdragUpload");
        }
      }

      document.querySelector(".media-dragoutline").classList.remove("active");
    },

    // Reset the drop area border
    onDragLeave: function(event) {
      event.stopPropagation();
      event.preventDefault();
      document.querySelector(".media-dragoutline").classList.remove("active");
      return false;
    }
  },
  created() {
    window.addEventListener("scroll", this.onScroll, false);
  },
  destroyed() {
    window.removeEventListener("scroll", this.onScroll, false);
  }
};
</script>
