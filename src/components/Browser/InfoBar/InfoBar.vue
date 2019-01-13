<template>
  <v-navigation-drawer
    v-model="menuState"
    right
    :app="!this.$store.state.isMobile"
    :width="width"
    fixed
    :stateless="true"
  >
    <div class="m-d" style="max-width: 400px; margin: auto;">
      <v-toolbar color="white" light flat class="m-over-toolbar">
        <v-btn icon @click="hideInforbar()">
          <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title style="color:black!important" class="m-d-title">Items Details</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>

      <v-container fluid grid-list-lg class="infoBar">
        <v-layout row wrap>
          <v-flex>
            <div v-if="this.$store.state.selectedItems.length <= 0">
              <v-icon size="100">description</v-icon>
              <h3 class="plz-select headline mb-0">Select file or folder to view its details.</h3>
            </div>
            <div v-if="this.$store.state.selectedItems.length > 0">
              <media-info-file v-for="item in files" :item="item" :key="item.id"></media-info-file>
            </div>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
  </v-navigation-drawer>
</template>

<script>
import * as types from "./../../../store/mutation-types";
import InfoFile from "@/components/Browser/InfoBar/InfoFile";

export default {
  name: "media-infoBar",
  data: () => ({
    right: true
  }),
  components: {
    "media-info-file": InfoFile
  },
  computed: {
    menuState: {
      get: function() {
        return this.$store.state.showInfoBar;
      },
      set: function(val) {
        this.$store.state.showInfoBar = val;
      }
    },
    width: function(){
      return this.$store.state.isMobile ? '100%' : '343';
    },
    files: function() {
      return this.$store.state.selectedItems;
    }
  },
  methods: {
    about: function() {},
    settings: function() {},
    hideInforbar: function() {
      this.$store.commit(types.HIDE_INFOBAR);
    },
    fire: function(a) {
      this[a](a);
    }
  }
};
</script>
