<template>
  <v-menu
    v-model="menuState"
    :position-x="this.$store.state.showFileMenuX"
    :position-y="this.$store.state.showFileMenuY"
    absolute
    offset-y
    transition="scale-transition"
    id="media-file-menu"
  >
    <v-list>
      <v-list-tile v-for="(item, index) in items" :key="index" @click="fire(item.link, itemId)">
        <v-list-tile-action v-if="item.icon">
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
      </v-list-tile>
    </v-list>
  </v-menu>
</template>

<script>
import * as types from "./../../../store/mutation-types";

export default {
  name: "media-file-menu",
  data: () => ({
    itemId: Math.floor(Math.random() * 100000000 + 1),
    n: Math.floor(Math.random() * 17 + 1),
    items: [
      { title: "Preview", icon: "remove_red_eye", link: "preview" },
      { title: "Edit", icon: "edit", link: "edit" },
      { title: "Delete", icon: "delete", link: "delete" },
      { title: "Share", icon: "share", link: "share" },
      { title: "Rename", icon: "spellcheck", link: "rename" },
      { title: "Download", icon: "cloud_download", link: "download" },
      { title: "Stars", icon: "stars", link: "stars" },
      { title: "View Details", icon: "info", link: "viewDetails" },
      { title: "Get shareable link", icon: "link", link: "getShareableLike" }
    ]
  }),
  computed: {
    rand: function() {
      return Math.floor(Math.random() * 100000000 + 1);
    },
    menuState: {
      get: function() {
        return this.$store.state.showFileMenu;
      },
      set: function() {
        // think about this
        // this.$store.commit(types.HIDE_FILE_MENU);
      }
    }
  },
  methods: {
    delete: function() {
      this.showConfirmDeleteModal();
    },
    edit: function(e) {
      console.log(e);
    },
    preview: function() {
      const item = this.$store.state.selectedItems[0];
      this.$store.dispatch("log", item);
      this.$store.commit(types.LOAD_FULL_CONTENTS_SUCCESS, item);
      this.$store.commit(types.SHOW_PREVIEW_MODAL);
    },
    download: function() {
      const files = this.$store.state.selectedItems;
      this.$store.dispatch("download", files);
    },
    getShareableLike: function(e) {
      console.log(e);
    },
    viewDetails: function(e) {
      this.$store.commit(types.SHOW_INFOBAR);
      console.log(e);
    },
    stars: function(e) {
      console.log(e);
    },
    showConfirmDeleteModal: function() {
      this.$store.commit(types.SHOW_CONFIRM_DELETE_MODAL);
    },
    rename: function() {
      this.$store.commit(types.SHOW_RENAME_MODAL);
    },
    share: function() {
      console.log("share");
    },
    fire: function(a, itemId) {
      this.$store.commit(types.HIDE_FILE_MENU);
      this[a](itemId);
    }
  }
};
</script>
