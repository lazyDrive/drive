<template>
  <div
    class="lazy_file"
    @dblclick.stop="preview()"
    @click.stop="select($event, item)"
    @contextmenu="show($event, item.id)"
    :data-item="item.id"
  >
    <div>
      <img
        v-if="item.imgUrl"
        :src="item.imgUrl || item.extImg"
        :alt="item.name"
        class="lazy_file_image"
      >
    </div>
    <div class="desc">{{ getName }}</div>
  </div>
</template>

<script>
import * as types from "./../../../store/mutation-types";

export default {
  name: "media-file",
  data() {
    return {
      iconsMap: {
        mp3: "library_music",
        zip: "archive",
        mp4: "music_video",
        default: "insert_drive_file"
      }
    };
  },
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
    },
    icon: function() {
      if (
        this.iconsMap[this.item.extension] &&
        this.iconsMap[this.item.extension] != ""
      ) {
        return this.iconsMap[this.item.extension];
      } else {
        return this.iconsMap["default"];
      }
    }
  },
  methods: {
    show: function(event, item) {
      var e = event || window.event;
      e.preventDefault();

      if (!(e.shiftKey || e.ctrlKey) || item.type == "quick") {
        this.select(e, this.item);
      }

      this.$store.commit(types.HIDE_MENU);
      this.$store.commit(types.SHOW_MENU, { event: e });

      this.$nextTick(() => {
        this.$store.state.showMenu.state = true;
      });
    },
    select: function(event, item) {
      var e = event || window.event;
      e.preventDefault();

      if (!(e.shiftKey || e.ctrlKey) || item.type == "quick") {
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
    preview: function() {
      this.$store.commit(types.LOAD_FULL_CONTENTS_SUCCESS, this.item);
      this.$store.commit(types.SHOW_PREVIEW_MODAL);
    }
  }
};
</script>
