<template>
  <div class="text-xs-center folder" @contextmenu="show(this, itemId)" id="media-folder">
    <v-tooltip top>
      <v-chip v-bind:color="folderColor" text-color="white" width="100px" class="chip-size" slot="activator">
        <v-avatar>
          <v-icon class="chip-folder">folder</v-icon>
        </v-avatar>
        Ranee
      </v-chip>
      <span>Top Very Very Long</span>
    </v-tooltip>
  </div>
</template>

<script>
import * as types from "./../../../store/mutation-types";

export default {
  name: 'media-folder',
  data: () => ({
    folderColor : 'teal',
    itemId: Math.floor((Math.random() * 100000000) + 1),
    items: [
      { title: 'Delete', icon:'delete', link: 'delete' },
      { title: 'Share', icon:'share', link: 'settings' },
      { title: 'Rename', icon:'spellcheck', link: 'settings' },
      { title: 'Download', icon:'cloud_download', link: 'settings' },
      { title: 'Change Color', icon:'color_lens', link: 'settings' },
      { title: 'Stars', icon:'stars', link: 'settings' },
      { title: 'View Details', icon:'priority_high', link: 'settings' },
      { title: 'Get shareable link', icon:'link', link: 'settings' }
    ]
  }),
  computed: {
    rand : function() {
      return Math.floor((Math.random() * 100000000) + 1);
    }
  },
  methods: {
    show : function(e,id){
      e = e || window.event;
      e.preventDefault()

      this.$store.commit(types.HIDE_FILE_MENU, id);
      this.$store.commit(types.HIDE_FOLDER_MENU, id);
      this.$store.commit(types.SHOW_FOLDER_MENU, id);

      this.$nextTick(() => {
        this.$store.state.showFolderMenu = true;
      })
    },
    delete : function(e){
      this.showConfirmDeleteModal();
      console.log(e);
    },
    edit : function(e){
      console.log(e);
    },
    preview : function(e){
      console.log(e);
    },
    settings: function(e){
      console.log(e);
    },
    showConfirmDeleteModal: function() {
      this.$store.commit(types.SHOW_CONFIRM_DELETE_MODAL);
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
