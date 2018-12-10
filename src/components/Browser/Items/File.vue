<template>
  <div class="file" @contextmenu="show(this, itemId)" :item-data="itemId" id="media-file">
    <v-hover>
      <v-card
      slot-scope="{ hover }"
      :class="`elevation-${hover ? 12 : 2} ${selectedState ? 'selected' : 'unselected'}`"
      class="mx-auto"
      width="150"
      height="140"
      >
      <v-img
      :aspect-ratio="16/9"
      :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
      :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
      >
      <v-layout
      slot="placeholder"
      fill-height
      align-center
      justify-center
      ma-0
      >
      <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
    </v-layout>
  </v-img>
  <v-card-title>
    <span class="file-text">Cafe Badilico</span>
  </v-card-title>
</v-card>
</v-hover>
</div>
</template>

<script>
import * as types from "./../../../store/mutation-types";

export default {
  name: 'media-file',
  data: () => ({
    showMenu: false,
    itemId: Math.floor((Math.random() * 100000000) + 1),
    n: Math.floor((Math.random() * 17) + 1),
    selectedState: false ,
    mediaItemId: null,
    items: [
      { title: 'Preview', icon:'remove_red_eye', link: 'preview' },
      { title: 'Edit', icon:'edit', link: 'edit' },
      { title: 'Delete', icon:'delete', link: 'delete' },
      { title: 'Share', icon:'share', link: 'settings' },
      { title: 'Rename', icon:'spellcheck', link: 'settings' },
      { title: 'Download', icon:'cloud_download', link: 'settings' },
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
    show : function(e, id){
      e = e || window.event;
      e.preventDefault()

      this.$store.commit(types.HIDE_FOLDER_MENU, id);
      this.$store.commit(types.HIDE_FILE_MENU, id);
      this.$store.commit(types.SHOW_FILE_MENU, id);

      this.$nextTick(() => {
        this.$store.state.showFileMenu = true;
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
      this.$store.commit(types.HIDE_FILE_MENU);
      this[a](itemId);
    }
  }
}
</script>

<style>

.file {
  margin: 15px 0 15px 10px;
  cursor: pointer;
}

.selected {
  background-color: #8cccc382!important;
}
</style>
