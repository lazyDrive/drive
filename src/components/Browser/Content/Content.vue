<template>
  <v-content id="media-content">
    <v-container fluid grid-list-md>
      <v-breadcrumbs :items="diskLoaded">
        <template slot="item" slot-scope="props">
          <a
            :href="props.item.href"
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
          <v-icon size="200">cloud_upload</v-icon>
          <p>Drop file(s) to Upload</p>
        </div>

        <v-layout row wrap class="m-section" v-if="quick.length > 0">
          <span class="media-section-title">
            <strong>Recents & Quick Access</strong>
          </span>
        </v-layout>
        <v-layout row wrap>
          <media-file v-for="item in quick" :item="item" :key="item.id"></media-file>
        </v-layout>

        <v-layout row wrap class="m-section" v-if="folders.length > 0">
          <span class="media-section-title">
            <strong>Folders</strong>
          </span>
        </v-layout>
        <v-layout row wrap>
          <media-folder v-for="item in folders" :item="item" :key="item.id"></media-folder>
        </v-layout>

        <v-layout row wrap class="m-section" v-if="files.length > 0">
          <span class="media-section-title">
            <strong>Files</strong>
          </span>
        </v-layout>
        <v-layout row wrap>
          <media-file v-for="item in files" :item="item" :key="item.id"></media-file>
        </v-layout>
      </div>
    </v-container>

    <!-- Add infrobar -->
    <media-infrobar ref="infobar"></media-infrobar>
  </v-content>
</template>

<script>
import * as types from "./../../../store/mutation-types";

export default {
  name: "media-content",
  data: () => ({}),
  computed: {
    quick: function() {
      return this.$store.state.contents.filter(item => item.type == "quick");
    },
    diskLoaded: function() {
      return this.$store.state.diskLoaded;
    },
    folders: function() {
      return this.$store.state.contents.filter(
        item =>
          item.type == "dir" &&
          item.name
            .toLowerCase()
            .includes(this.$store.state.search.toLowerCase())
      );
    },
    files: function() {
      return this.$store.state.contents.filter(
        item =>
          item.type == "file" &&
          item.name
            .toLowerCase()
            .includes(this.$store.state.search.toLowerCase())
      );
    }
  },
  methods: {
    onScroll: function() {
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
        if (this.$store.state.isContentsLoaded) {
          setTimeout(function() {
            console.log("asas");
          }, 500);
          // this.$store.dispatch('getContents');
        }
      } else {
        this.$store.commit(types.SET_IS_LOADING_MORE, false);
      }
    },
    loadDir: function() {
      console.log("yes");
    },
    /* Unselect all browser items */
    unselectAllBrowserItems(event) {
      const notClickedBrowserItems =
        (this.$refs.browserItems &&
          !this.$refs.browserItems.contains(event.target)) ||
        event.target === this.$refs.browserItems;
      const notClickedInfobar =
        this.$refs.infobar !== undefined &&
        !this.$refs.infobar.$el.contains(event.target);
      const clickedOutside = notClickedBrowserItems && notClickedInfobar;
      if (clickedOutside && !this.$store.state.modelBackdrop) {
        this.$store.commit(types.UNSELECT_ALL_BROWSER_ITEMS);
      } else {
        this.$store.dispatch("update", {
          path: this.$store.state.selectedDirectory
        });
      }
    },
    // Listeners for drag and drop
    onDragEnter(event) {
      event.stopPropagation();
      return false;
    },

    // Notify user when file is over the drop area
    onDragOver(event) {
      event.preventDefault();
      document.querySelector(".media-dragoutline").classList.add("active");
      return false;
    },

    /* Upload files */
    upload(file) {
      // Create a new file reader instance
      let reader = new FileReader();

      // Add the on load callback
      reader.onload = progressEvent => {
        const result = progressEvent.target.result,
          splitIndex = result.indexOf("base64") + 7,
          content = result.slice(splitIndex, result.length);

        console.log(content);
        const formData = new FormData();
        formData.append("files", file);
        const uploadPath = this.$store.state.selectedDirectory;
        this.$store.dispatch("upload", { formData, uploadPath });
      };

      reader.readAsDataURL(file);
    },

    // Logic for the dropped file
    onDrop(event) {
      event.preventDefault();

      // Loop through array of files and upload each file
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
          this.upload(file);
        }
      }

      document.querySelector(".media-dragoutline").classList.remove("active");
    },

    // Reset the drop area border
    onDragLeave(event) {
      event.stopPropagation();
      event.preventDefault();
      document.querySelector(".media-dragoutline").classList.remove("active");
      return false;
    },
    findNext: function(code) {
      const current = this.current();
      const total = this.$store.state.contents.length;
      // const numFolder = this.folders.length;
      // const numFile = this.files.length;
      const infobar = this.$store.state.showInfoBar;
      const next = current;

      if (code == 40) {
        if (infobar) {
          if (total > current + 6) {
            return current + 6;
          } else {
            return next;
          }
        } else {
          if (total > current + 7) {
            return current + 7;
          } else {
            return next;
          }
        }
      }

      if (code == 38) {
        if (infobar) {
          if (0 <= current - 6) {
            return current - 6;
          } else {
            return next;
          }
        } else {
          if (0 <= current - 7) {
            return current - 7;
          } else {
            return next;
          }
        }
      }
    },
    current: function() {
      const selected = this.$store.state.selectedItems[0];

      return this.$store.state.contents.findIndex(file => {
        if (file.id === selected.id) {
          return true;
        }
      });
    },
    keyup: function(event) {
      if (
        this.$store.state.selectedItems.length == 1 &&
        !this.$store.state.modelBackdrop
      ) {
        if (event.keyCode == 27) {
          event.preventDefault();
          // const next = this.findNext(event.keyCode);
          // this.$store.commit(types.UNSELECT_ALL_BROWSER_ITEMS);
          // this.$store.commit(types.SELECT_BROWSER_ITEM, this.$store.state.contents[next]);
        } else if (event.keyCode == 39) {
          const current = this.current();
          if (current < this.$store.state.contents.length - 1) {
            this.$store.commit(types.UNSELECT_ALL_BROWSER_ITEMS);
            this.$store.commit(
              types.SELECT_BROWSER_ITEM,
              this.$store.state.contents[current + 1]
            );
          }
        } else if (event.keyCode == 38) {
          event.preventDefault();
          const next = this.findNext(event.keyCode);
          this.$store.commit(types.UNSELECT_ALL_BROWSER_ITEMS);
          this.$store.commit(
            types.SELECT_BROWSER_ITEM,
            this.$store.state.contents[next]
          );
        } else if (event.keyCode == 37) {
          const current = this.current();
          if (current > 0) {
            this.$store.commit(types.UNSELECT_ALL_BROWSER_ITEMS);
            this.$store.commit(
              types.SELECT_BROWSER_ITEM,
              this.$store.state.contents[current - 1]
            );
          }
        } else if (event.keyCode == 40) {
          event.preventDefault();
          const next = this.findNext(event.keyCode);
          this.$store.commit(types.UNSELECT_ALL_BROWSER_ITEMS);
          this.$store.commit(
            types.SELECT_BROWSER_ITEM,
            this.$store.state.contents[next]
          );
        } else if (event.keyCode == 13) {
          const item = this.$store.state.selectedItems[0];
          if (item.type == "dir") {
            this.$store.dispatch("getContents", item);
          } else {
            this.$store.commit(
              types.LOAD_FULL_CONTENTS_SUCCESS,
              this.$store.state.selectedItems[0]
            );
            this.$store.commit(types.SHOW_PREVIEW_MODAL);
          }
        }
      }
    }
  },
  created() {
    window.addEventListener("scroll", this.onScroll, false);
    document.body.addEventListener("keydown", this.keyup, false);
    document.body.addEventListener(
      "click",
      this.unselectAllBrowserItems,
      false
    );
  },
  destroyed() {
    window.removeEventListener("scroll", this.onScroll, false);
    document.body.removeEventListener("keydown", this.keyup, false);
    document.body.removeEventListener(
      "click",
      this.unselectAllBrowserItems,
      false
    );
  }
};
</script>
