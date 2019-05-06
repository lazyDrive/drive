<template >
  <ul class="context__menu" ref="contextMenu">
    <li class="context__menu-item">
      <a href="#" class="context__menu-btn">
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
    <li class="context__menu-item context__menu-item-subcontext__menu">
      <button type="button" class="context__menu-btn">
        <i class="fa fa-users"></i>
        <span class="context__menu-text">Social</span>
      </button>
      <ul class="context__menu">
        <li class="context__menu-item">
          <button type="button" class="context__menu-btn">
            <i class="fa fa-comment"></i>
            <span class="context__menu-text">Comment</span>
          </button>
        </li>
        <li class="context__menu-item context__menu-item-subcontext__menu">
          <button type="button" class="context__menu-btn">
            <i class="fa fa-share"></i>
            <span class="context__menu-text">Share</span>
          </button>
          <ul class="context__menu">
            <li class="context__menu-item">
              <button type="button" class="context__menu-btn">
                <i class="fa fa-twitter"></i>
                <span class="context__menu-text">Twitter</span>
              </button>
            </li>
            <li class="context__menu-item">
              <button type="button" class="context__menu-btn">
                <i class="fa fa-facebook-official"></i>
                <span class="context__menu-text">Facebook</span>
              </button>
            </li>
            <li class="context__menu-item">
              <button type="button" class="context__menu-btn">
                <i class="fa fa-google-plus"></i>
                <span class="context__menu-text">Google Plus</span>
              </button>
            </li>
            <li class="context__menu-item">
              <button type="button" class="context__menu-btn">
                <i class="fa fa-envelope"></i>
                <span class="context__menu-text">Email</span>
              </button>
            </li>
          </ul>
        </li>
      </ul>
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
import { api } from "./../../app/Api.js";
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
    changeView: function(view) {
      this.$store.commit(types.CHANGE_VIEW, view);
    },
    unselectAllBrowserItems: function() {
      this.$store.commit(types.UNSELECT_ALL_BROWSER_ITEMS);
      this.selectAllFile = false;
      this.selectAllFolder = false;
    },
    viewDetails: function() {
      this.$store.commit(types.SHOW_INFOBAR);
    },
    showDeleteModel: function() {
      this.$store.commit(types.SHOW_CONFIRM_DELETE_MODAL);
    },
    newFolder: function() {
      this.$store.commit(types.SHOW_CREATE_FOLDER_MODAL);
    },
    showUploadMenu: function() {
      this.$store.state.showUploadMenu = true;
    },
    settings: function() {
      this.$store.commit(types.SHOW_SETTINGS);
    },
    folderUpload: function() {
      this.$emit("tiggerSelectFolder");
    },
    fileUpload: function() {
      this.$emit("tiggerSelectFile");
    },
    changeSearch(query) {
      this.$store.commit(types.SET_SEARCH_QUERY, query);
    },
    logout: function() {
      if (api.auth.logout()) {
        this.$router.push("/");
      }
    },
    fire: function(a) {
      this[a](a);
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
