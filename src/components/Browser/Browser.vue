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

    <!-- Media content -->
    <media-content></media-content>

    <!-- Media Upload Menu -->
    <media-upload-menu></media-upload-menu>

    <!-- quick upload -->
    <media-quick-upload @tiggerSelectFile="selectFile"></media-quick-upload>

    <!-- Media settings -->
    <media-settings></media-settings>
  </div>
</template>

<script>
import * as types from "./.././../store/mutation-types.js";

export default {
  name: "media-browser",
  data() {
    return {};
  },
  methods: {
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
    processFile: async function() {
      var files = this.$refs.inputFile.files;
      const uploadPath = this.$store.state.selectedDirectory;

      for (var i = 0; i < files.length; i++) {
        let file = files[i];
        file.id = i;

        const formData = new FormData();
        formData.append("files", file);

        await this.$store.dispatch("upload", { formData, uploadPath });
      }

      this.$store.commit(types.SET_IS_LOADING, false);

      this.$refs.formFile.reset();
    },
    processFolder: async function() {
      var files = this.$refs.inputFolder.files;
      let selectedPath = this.$store.state.selectedDirectory;

      for (var i = 0; i < files.length; i++) {
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

        await this.$store.dispatch("upload", { formData, uploadPath });
      }
      this.$store.commit(types.SET_IS_LOADING, false);
      this.$refs.formFolder.reset();
    }
  }
};
</script>
