<template>
  <div class="media-browser">
    <div class="media-action">
      <div class="file">
        <form enctype="multipart/form-data" ref="formFile">
          <input multiple type="file" hidden ref="inputFile" @change="processFile">
        </form>
      </div>
      <div class="folder">
        <form enctype="multipart/form-data" ref="formFolder">
          <input
            multiple
            type="file"
            directory
            webkitdirectory
            mozdirectory
            hidden
            ref="inputFolder"
            @change="processFolder"
          >
        </form>
      </div>
    </div>
    <!-- media nav -->
    <media-nav-bar @tiggerSelectFile="selectFile" @tiggerSelectFolder="selectFolder"></media-nav-bar>

    <!-- Media content view-->
    <media-main-content @tiggerdragUpload="processUpload">
      <media-content-list v-if="this.$store.state.view == 'list'" slot="contentList"></media-content-list>
      <media-content-grid v-if="this.$store.state.view == 'grid'" slot="contentGrid"></media-content-grid>
    </media-main-content>

    <!-- Media Upload Menu -->
    <media-upload-menu @tiggerSelectFile="selectFile" @tiggerSelectFolder="selectFolder"></media-upload-menu>

    <!-- quick upload -->
    <media-quick-upload @tiggerSelectFile="selectFile"></media-quick-upload>

    <!-- Media settings -->
    <media-settings></media-settings>
  </div>
</template>

<script>
import * as types from "./.././../store/mutation-types.js";
import mainContent from "./../Browser/Content/MainContent";
import ContentGrid from "./../Browser/Content/Grid/ContentGrid";
import ContentList from "./../Browser/Content/List/ContentList";

export default {
  name: "media-browser",
  data() {
    return {};
  },
  components: {
    "media-main-content": mainContent,
    "media-content-list": ContentList,
    "media-content-grid": ContentGrid
  },
  methods: {
    processUpload: async function(type) {
      let uploadSuccess = 0;
      while (this.$store.state.uploadItems.length > 0) {
        const item = this.$store.state.uploadItems.shift();
        const formData = item.file;
        const uploadPath = item.path;
        const id = item.id;
        const type = item.type;

        try {
          await this.$store.dispatch("upload", {
            formData,
            uploadPath,
            id,
            type
          });
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

      if (type == "file") {
        this.$refs.formFile.reset();
      } else if (type == "folder") {
        this.$refs.formFolder.reset();
      }
    },
    selectFile: function() {
      const inputFile = this.$refs.inputFile;
      if (inputFile) {
        inputFile.click();
      } else {
        console.log("error");
      }
    },
    selectFolder: function() {
      const inputFolder = this.$refs.inputFolder;
      if (inputFolder) {
        inputFolder.click();
      } else {
        console.log("error");
      }
    },
    processFile: function() {
      var files = this.$refs.inputFile.files;
      const uploadPath = this.$store.state.selectedDirectory;

      for (var i = 0; i < files.length; i++) {
        const item = {};
        let file = files[i];
        file.id = i;

        const formData = new FormData();
        formData.append("files", file);

        item.id =
          file.name +
          i +
          file.lastModified +
          Math.random() +
          file.size +
          Date.now();
        item.icon = "assessment";
        item.file = formData;
        item.path = uploadPath;

        item.type = "file";
        item.iconClass = "grey lighten-1 white--text";
        item.title = file.name;
        item.subtitle = "";
        item.uploadPercent = 0;
        item.size = file.size;

        this.$store.state.uploadItems.push(item);
        this.$store.state.uploadItemsMenu.push(item);
      }

      if (this.$store.state.isUploading !== true) {
        this.processUpload("file");
      }
    },
    processFolder: async function() {
      var files = this.$refs.inputFolder.files;
      let selectedPath = this.$store.state.selectedDirectory;

      // let size = 0;
      for (var i = 0; i < files.length; i++) {
        const item = {};
        let file = files[i];
        file.id = i;

        const formData = new FormData();
        formData.append("files", file);

        let encodePath = "";
        if (selectedPath == "my-drive") {
          encodePath = `uploads/${file.webkitRelativePath.substring(
            0,
            file.webkitRelativePath.lastIndexOf("/")
          )}`;
        } else {
          encodePath = `${Buffer.from(selectedPath, "base64").toString(
            "ascii"
          )}/${file.webkitRelativePath.substring(
            0,
            file.webkitRelativePath.lastIndexOf("/")
          )}`;
        }

        const uploadPath = Buffer.from(encodePath).toString("base64");

        item.id =
          file.name +
          i +
          Math.random() +
          file.lastModified +
          file.size +
          Date.now();
        item.icon = "assessment";
        item.file = formData;
        item.path = uploadPath;

        item.type = "file";
        item.iconClass = "grey lighten-1 white--text";
        item.title = file.name;
        item.subtitle = "";
        item.uploadPercent = 0;
        item.size = file.size;

        this.$store.state.uploadItems.push(item);
        this.$store.state.uploadItemsMenu.push(item);
      }

      if (this.$store.state.isUploading !== true) {
        this.processUpload("folder");
      }
    }
  }
};
</script>
