<template >
  <ul class="context__menu" ref="contextMenu">
    <li @click.prevent="open()" class="context__menu-item">
      <a class="context__menu-btn">
        <i class="fa fa-folder-open"></i>
        <span class="context__menu-text">Open</span>
      </a>
    </li>
    <li class="context__menu-item context__menu-item-disabled">
      <button type="button" class="context__menu-btn">
        <span class="context__menu-text">Open in New Window</span>
      </button>
    </li>
    <li class="context__menu-separator"></li>
    <li class="context__menu-item">
      <button type="button" class="context__menu-btn">
        <i class="fa fa-reply"></i>
        <span class="context__menu-text">Reply</span>
      </button>
    </li>
    <li class="context__menu-item">
      <button type="button" class="context__menu-btn">
        <i class="fa fa-star"></i>
        <span class="context__menu-text">Favorite</span>
      </button>
    </li>
    <li class="context__menu-separator"></li>
    <li class="context__menu-item">
      <button type="button" class="context__menu-btn">
        <i class="fa fa-download"></i>
        <span class="context__menu-text">Save</span>
      </button>
    </li>
    <li class="context__menu-item">
      <button type="button" class="context__menu-btn">
        <i class="fa fa-edit"></i>
        <span class="context__menu-text">Rename</span>
      </button>
    </li>
    <li class="context__menu-item">
      <button type="button" class="context__menu-btn">
        <i class="fa fa-trash"></i>
        <span class="context__menu-text">Delete</span>
      </button>
    </li>
  </ul>
</template>

<script>
import * as types from "./../../store/mutation-types.js";

export default {
  name: "lazy-contextmenu",
  data: () => {
    return {};
  },
  methods: {
    onContextMenu: function(event) {
      event.preventDefault();
      const menu = this.$refs.contextMenu;
      menu.style.left = event.pageX + "px";
      menu.style.top = event.pageY + "px";
      menu.classList.add("context__menu-show");
    },
    hideContextMenu: function(event) {
      event.preventDefault();
      const menu = this.$refs.contextMenu;
      menu.classList.remove("context__menu-show");
    },
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
      console.log("open");
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
  },
  created() {
    document.addEventListener("mousedown", this.hideContextMenu, false);
    document.addEventListener("contextmenu", this.onContextMenu, false);
  },
  destroyed() {
    document.removeEventListener("mousedown", this.hideContextMenu, false);
    document.removeEventListener("contextmenu", this.onContextMenu, false);
  }
};
</script>
