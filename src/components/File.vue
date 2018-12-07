<template>
  <!-- File -->

  <div class="file" @contextmenu="show" :item-data="itemId">
    <v-hover>
      <v-card
      slot-scope="{ hover }"
      :class="`elevation-${hover ? 12 : 2}`"
      class="mx-auto"
      width="256"
      height="200"
      >
      <v-img
      :aspect-ratio="16/9"
      src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
      ></v-img>
      <v-card-title>
        <span class="file-text">Cafe Badilico</span>
      </v-card-title>
    </v-card>
  </v-hover>

  <!-- Popup model -->

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
  data: () => ({
    showMenu: false,
    itemId: Math.floor((Math.random() * 100000000) + 1),
    x: 0,
    y: 0,
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
    show : function(e){
      e.preventDefault()
      this.showMenu = false
      this.x = e.clientX
      this.y = e.clientY
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

.file {
  margin: 0 0 15px 10px;
  cursor: pointer;
}

.file-text{
  font-size: 15px;
  text-align: center;
}

</style>
