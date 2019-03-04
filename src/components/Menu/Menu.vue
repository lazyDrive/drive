<template>
  <div class="media-menu">
    <v-menu
      v-model="menuState"
      :position-x="this.$store.state.showMenu.x"
      :position-y="this.$store.state.showMenu.y"
      absolute
      offset-y
      transition="scale-transition"
      id="media-folder-menu"
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
  </div>
</template>

<script>
import * as types from "./../../store/mutation-types";

export default {
  name: "media-folder-menu",
  data: () => ({
    itemId: Math.floor(Math.random() * 100000000 + 1),
    items: [
      { title: "Open", icon: "open_in_browser", link: "open" },
      { title: "Delete", icon: "delete", link: "delete" },
      { title: "Share", icon: "share", link: "share" },
      { title: "Rename", icon: "spellcheck", link: "rename" },
      { title: "Download", icon: "cloud_download", link: "download" },
      { title: "Change Color", icon: "color_lens", link: "changeColor" },
      { title: "Stars", icon: "stars", link: "stars" },
      { title: "View Details", icon: "info", link: "viewDetails" },
      { title: "Get shareable link", icon: "link", link: "getShareableLink" }
    ]
  }),
  computed: {
    rand: function() {
      return Math.floor(Math.random() * 100000000 + 1);
    },
    menuState: {
      get: function() {
        return this.$store.state.showMenu.state;
      },
      set: function() {
        // think about this
        // this.$store.commit(types.HIDE_MENU);
      }
    }
  },
  methods: {
    delete: function(e) {
      this.showConfirmDeleteModal();
      console.log(e);
    },
    getShareableLink: function(e) {
      console.log(e);
    },
    changeColor: function(e) {
      console.log(e);
    },
    download: function() {
      const items = this.$store.state.selectedItems;
      this.$store.dispatch("download", items);
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
    open: function() {
      const item = this.$store.state.selectedItems[0];
      try {
        let path = item.path;
        if (path != "my-drive") {
          this.$router.push({
            path: `/drive/u/0/folder/${path}`
          });
        } else {
          this.$router.push({
            path: `/drive/u/0/my-drive`
          });
        }
      } catch (err) {
        console.log(err);
      }
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
      this.$store.commit(types.HIDE_MENU);
      this[a](itemId);
    }
  }
};
</script>
