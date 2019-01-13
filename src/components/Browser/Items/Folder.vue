<template>
  <div
    @dblclick.prevent="openFolder()"
    class="text-xs-center folder"
    @click="select($event, item)"
    @contextmenu="show($event, item.id)"
    id="media-folder"
  >
    <v-chip
      disabled
      :class="` ${selectedState ? 'selected' : ''} ${isMobile ? 'm-mobile-chip-size' : (menuState ? 'info-chip-size' : 'm-chip-size')}`"
      color="#CFD8DC"
      text-color="black"
      slot="activator"
    >
      <v-avatar :class="`m-f-pointer`">
        <v-icon :color="item.color">folder</v-icon>
      </v-avatar>
      <span :class="`m-f-pointer`">{{ getName }}</span>
    </v-chip>
  </div>
</template>

<script>
import * as types from "./../../../store/mutation-types";

export default {
  name: "media-folder",
  data: () => ({}),
  props: ["item"],
  computed: {
    selectedState: function() {
      var res = this.$store.state.selectedItems.filter(file => {
        return file.id === this.item.id;
      });

      if (res.length != 0) {
        return true;
      } else {
        return false;
      }
    },
    getName: function() {
      const len = this.$store.state.isMobile ? 13 : 15;
      if (this.item.name.length >= len) {
        return this.item.name.substring(0, len) + "..";
      } else {
        return this.item.name;
      }
    },
    menuState: function() {
      return this.$store.state.showInfoBar;
    },
    isMobile: function() {
      return this.$store.state.isMobile;
    }
  },
  methods: {
    show: function(event, item) {
      var e = event || window.event;
      e.preventDefault();

      if (!(e.shiftKey || e.ctrlKey) || item.type == "quick") {
        this.select(e, this.item);
      }

      this.$store.commit(types.HIDE_FILE_MENU);
      this.$store.commit(types.HIDE_FOLDER_MENU);
      this.$store.commit(types.SHOW_FOLDER_MENU, { event: e });

      this.$nextTick(() => {
        this.$store.state.showFolderMenu = true;
      });
    },
    select: function(event, item) {
      var e = event || window.event;
      e.preventDefault();

      if (!(e.shiftKey || e.ctrlKey)) {
        // this.$store.state.selectAllFile = false;
        // this.$store.state.selectAllFolder = false;
        this.$store.commit(types.UNSELECT_ALL_BROWSER_ITEMS);
      }

      if (this.selectedState) {
        this.$store.commit(types.UNSELECT_BROWSER_ITEM, item);
      } else {
        this.$store.commit(types.SELECT_BROWSER_ITEM, item);
      }
    },
    openFolder: function() {
      this.$store.dispatch("getContents", this.item);
    }
  }
};
</script>
