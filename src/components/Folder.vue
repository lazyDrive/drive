<template>
  <div class="text-xs-center folder" @contextmenu="show(this, itemId)">
    <v-chip v-bind:color="folderColor" text-color="white" width="100px" class="chip-size">
      <v-avatar class="chip-folder">
        <v-icon>folder</v-icon>
      </v-avatar>
      Ranee
    </v-chip>

    <v-menu
    v-model="showMenu"
    :position-x="x"
    :position-y="y"
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

</div>
</template>

<script>

export default {
  name: 'Folder',
  data: () => ({
    showMenu: false,
    folderColor : 'teal',
    itemId: Math.floor((Math.random() * 100000000) + 1),
    x: 0,
    y: 0,
    mediaItemId: null,
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
      this.showMenu = false
      this.x = e.clientX
      this.y = e.clientY
      this.mediaItemId = id;
      this.$nextTick(() => {
        this.showMenu = true
      })
    },
    delete : function(e){
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
    fire: function(a, itemId){
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

.chip-folder{
  cursor: pointer!important;
}

.folder-text{
  font-size: 15px;
  padding: 0 16px!important;
  text-align: center!important;
}

</style>
