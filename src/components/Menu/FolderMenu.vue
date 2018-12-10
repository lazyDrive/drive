<template>
  <v-menu
  v-model="menuState"
  :position-x="this.$store.state.showFolderMenuX"
  :position-y="this.$store.state.showFolderMenuYX"
  absolute
  offset-y
  transition="scale-transition"
  >
  <v-list>
    <v-list-tile
    v-for="(item, index) in items"
    :key="index"
    @click="fire(item.link, itemId)"
    >
    <v-list-tile-action v-if="item.icon">
      <v-icon>{{ item.icon }}</v-icon>
    </v-list-tile-action>
    <v-list-tile-title>{{ item.title }}</v-list-tile-title>
  </v-list-tile>
</v-list>
</v-menu>
</template>

<script>
import * as types from "./../../store/mutation-types";

export default {
  name: 'Folder',
  data: () => ({
    itemId: Math.floor((Math.random() * 100000000) + 1),
    items: [
      { title: 'Delete', icon:'delete', link: 'delete' },
      { title: 'Share', icon:'share', link: 'share' },
      { title: 'Rename', icon:'spellcheck', link: 'rename' },
      { title: 'Download', icon:'cloud_download', link: 'download' },
      { title: 'Change Color', icon:'color_lens', link: 'changeColor' },
      { title: 'Stars', icon:'stars', link: 'stars' },
      { title: 'View Details', icon:'priority_high', link: 'viewDetails' },
      { title: 'Get shareable link', icon:'link', link: 'getShareableLink' }
    ]
  }),
  computed: {
    rand : function() {
      return Math.floor((Math.random() * 100000000) + 1);
    },
    menuState: {
      get: function() {
        return this.$store.state.showFolderMenu;
      },
      set: function() {
        // think about this
        // this.$store.commit(types.HIDE_FOLDER_MENU);
      }
    }
  },
  methods: {
    delete : function(e){
      this.showConfirmDeleteModal();
      console.log(e);
    },
    getShareableLink : function(e){
      console.log(e);
    },
    changeColor : function(e){
      console.log(e);
    },
    download: function(e){
      console.log(e);
    },
    getShareableLike: function(e){
      console.log(e);
    },
    viewDetails: function(e){
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
      console.log('share')
    },
    fire: function(a, itemId){
      this.$store.commit(types.HIDE_FOLDER_MENU);
      this[a](itemId);
    }
  }
}
</script>

<style>

.folder{
  margin: 10px 12px;
}

.chip-size{
  padding: 3px 19px;
}

.chip-size .v-chip__content{
  cursor: pointer!important;
}

.folder-text{
  font-size: 15px;
  padding: 0 16px!important;
  text-align: center!important;
}

</style>
