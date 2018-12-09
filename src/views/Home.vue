<template>
  <div class="home">
    <v-navigation-drawer
    :clipped="$vuetify.breakpoint.lgAndUp"
    v-model="drawer"
    fixed
    app
    width="250"
    >
    <v-list dense>
      <template v-for="item in items">
        <v-layout
        v-if="item.heading"
        :key="item.heading"
        row
        align-center
        >
        <v-flex xs6>
          <v-subheader v-if="item.heading">
            {{ item.heading }}
          </v-subheader>
        </v-flex>
        <v-flex xs6 class="text-xs-center">
          <a href="#!" class="body-2 black--text">EDIT</a>
        </v-flex>
      </v-layout>
      <v-list-group
      v-else-if="item.children"
      v-model="item.model"
      :key="item.text"
      :prepend-icon="item.model ? item.icon : item['icon-alt']"
      append-icon=""
      >
      <v-list-tile slot="activator">
        <v-list-tile-content>
          <v-list-tile-title>
            {{ item.text }}
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile
      v-for="(child, i) in item.children"
      :key="i"
      @click="1"
      >
      <v-list-tile-action v-if="child.icon">
        <v-icon>{{ child.icon }}</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>
          {{ child.text }}
        </v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-list-group>
  <v-list-tile v-else :key="item.text" @click="fire(item.link)">
    <v-list-tile-action>
      <v-icon>{{ item.icon }}</v-icon>
    </v-list-tile-action>
    <v-list-tile-content>
      <v-list-tile-title>
        {{ item.text }}
      </v-list-tile-title>
    </v-list-tile-content>
  </v-list-tile>
</template>
</v-list>
</v-navigation-drawer>

<v-toolbar
:clipped-left="$vuetify.breakpoint.lgAndUp"
color="blue darken-3"
dark
app
fixed
>
<v-toolbar-title style="width: 300px" class="ml-0">
  <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
  <span class="hidden-sm-and-down">Media Manager</span>
</v-toolbar-title>
<v-text-field
flat
solo-inverted
hide-details
prepend-inner-icon="search"
label="Search"
class="hidden-sm-and-down"
></v-text-field>
<v-spacer></v-spacer>
<v-btn icon>
  <v-icon>apps</v-icon>
</v-btn>
<v-btn icon>
  <v-icon>notifications</v-icon>
</v-btn>
<v-btn icon large>
  <v-avatar size="32px" tile>
    <img
    src="https://cdn.vuetifyjs.com/images/logos/logo.svg"
    alt="Vuetify"
    >
  </v-avatar>
</v-btn>
</v-toolbar>
<v-content>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <media-file />
      <media-file />
      <media-file />
      <media-file />
      <media-file />
      <media-file />
      <media-file />
      <media-file />
      <media-file />
      <media-file />
      <media-file />
      <media-file />
      <media-file />
      <media-file />
      <media-file />
      <media-file />
      <media-file />
      <media-file />
      <media-file />
      <media-file />
      <media-file />
      <media-file />
      <media-file />
      <media-file />
      <media-online-state />
    </v-layout>
  </v-container>
</v-content>
<v-btn
fab
bottom
right
color="pink"
dark
fixed
@click="dialog = !dialog"
>
<v-icon>add</v-icon>
</v-btn>
<v-dialog v-model="dialog" width="800px">
  <v-card>
    <v-card-title
    class="grey lighten-4 py-4 title"
    >
    Create contact
  </v-card-title>
  <v-container grid-list-sm class="pa-4">

  </v-container>
  <v-card-actions>
    <v-btn flat color="primary">More</v-btn>
    <v-spacer></v-spacer>
    <v-btn flat color="primary" @click="dialog = false">Cancel</v-btn>
    <v-btn flat @click="dialog = false">Save</v-btn>
  </v-card-actions>
</v-card>
</v-dialog>
</div>
</template>

<script>

export default {
  data: () => ({
    dialog: false,
    drawer: null,
    items: [
      { icon: 'contacts', text: 'Contacts' , link: 'about'},
      { icon: 'history', text: 'Frequently contacted' , link: 'about'},
      { icon: 'content_copy', text: 'Duplicates' , link: 'about'},
      {
        icon: 'keyboard_arrow_up',
        'icon-alt': 'keyboard_arrow_down',
        text: 'Labels',
        model: true,
        link: 'about',
        children: [
          { icon: 'add', text: 'Create label' }
        ]
      },
      {
        icon: 'keyboard_arrow_up',
        'icon-alt': 'keyboard_arrow_down',
        text: 'More',
        model: false,
        children: [
          { text: 'Import' },
          { text: 'Export' },
          { text: 'Print' },
          { text: 'Undo changes' },
          { text: 'Other contacts' }
        ]
      },
      { icon: 'settings', text: 'Settings', link: 'settings' },
      { icon: 'chat_bubble', text: 'Send feedback', link: 'about' },
      { icon: 'help', text: 'Help', link: 'about' },
      { icon: 'phonelink', text: 'App downloads', link: 'about' },
      { icon: 'keyboard', text: 'Go to the old version', link: 'about' }
    ]
  }),
  props: {
    source: String
  },
  components :{

  },
  methods :{
    about: function(a) {
      console.log(a);
    },
    settings: function(a) {
      console.log(a);
    },
    fire: function(a){
      this[a](a);
    }
  }
}
</script>

<style>
.v-toolbar__title{
  text-align: left!important;
}
</style>
