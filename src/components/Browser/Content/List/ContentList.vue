<template>
  <div class="media-content-list">
    <v-layout row wrap class="m-section" v-if="isEmpty.length > 0">
      <v-spacer></v-spacer>
      <div class="empty-folder">
        <strong>Drop your files here or use upload button.</strong>
      </div>
      <v-spacer></v-spacer>
    </v-layout>
    <v-data-table
      v-model="selected"
      :headers="headers"
      hide-actions
      :items="getContent"
      select-all
      item-key="name"
      class="elevation-1"
      v-else
    >
      <template slot="headers" slot-scope="props">
        <tr>
          <th>
            <v-checkbox color="indigo" primary hide-details v-model="selectAllFiles"></v-checkbox>
          </th>
          <th
            v-for="header in props.headers"
            :key="header.text"
            class=""
            :class="header.text =='Name' ? 'text-xs-left' : ''"
            @click="changeSort(header.value)"
          >
            {{ header.text }}
          </th>
        </tr>
      </template>
      <template slot="items" slot-scope="props">
        <tr
          @dblclick.prevent="doubleAction(props.item)"
          @contextmenu="show($event, props.item)"
          @click="select($event, props.item)"
          :class="`m-listView ${selectedState(props.item) ? 'selected' : ''}`"
          :item-id="props.item.id"
        >
          <td>
            <v-checkbox disabled :input-value="selectedState(props.item)" primary hide-details></v-checkbox>
          </td>
          <td>
            <v-icon>{{ icon(props.item) }}</v-icon>
          </td>
          <td class="text-xs-left">{{ props.item.name }}</td>
          <td>{{ props.item.owner }}</td>
          <td class="text-xs-right">{{ props.item.created_date }}</td>
          <td class="text-xs-right">{{ getSize(props.item.size) }}</td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import * as types from "./../../../../store/mutation-types";

export default {
  data: () => ({
    pagination: {
      sortBy: "name"
    },
    selected: [],
    iconsMap: {
      mp3: "library_music",
      zip: "archive",
      mp4: "movie",
      dir: "folder",
      png: "insert_photo",
      jpeg: "insert_photo",
      jpg: "insert_photo",
      gif: "insert_photo",
      default: "insert_drive_file"
    },
    headers: [
      {
        text: "Type",
        align: "left"
      },
      {
        text: "Name",
        align: "left",
        value: "name"
      },
      {
        text: "Owner",
        align: "left",
        value: "owner"
      },
      { text: "Created date", value: "created_date" },
      { text: "Size", value: "size" }
    ]
  }),
  watch: {
    selectAllFiles: function(val) {
      if (val) {
        this.selectAll();
      } else {
        this.unselectAll();
      }
    }
  },
  computed: {
    diskLoaded: function() {
      return this.$store.state.diskLoaded;
    },
    selectAllFiles: {
      get: function() {
        return this.$store.state.selectAll;
      },
      set: function(val) {
        this.$store.state.selectAll = val;
      }
    },
    getContent: function() {
      return this.$store.state.contents.filter(item =>
        item.name.toLowerCase().includes(this.$store.state.search.toLowerCase())
      );
    },
    isEmpty: function() {
      return this.$store.state.contents.filter(item => item.type == "empty");
    }
  },
  methods: {
    selectAll: function() {
      const files = this.getContent;
      this.$store.commit(types.UNSELECT_ALL_BROWSER_ITEMS);
      files.forEach(item => {
        this.$store.commit(types.SELECT_BROWSER_ITEM, item);
      });
    },
    unselectAll: function() {
      this.$store.state.selectAll = false;
      this.$store.commit(types.UNSELECT_ALL_BROWSER_ITEMS);
    },
    doubleAction: function name(item) {
      if (item.type == "dir") {
        this.openFolder(item);
      } else if (item.type == "file") {
        this.preview(item);
      }
    },
    openFolder: function(item) {
      this.$store.dispatch("getContents", item);
    },
    show: function(event, item) {
      var e = event || window.event;
      e.preventDefault();

      if (!(e.shiftKey || e.ctrlKey) || item.type == "quick") {
        this.select(e, item);
      }

      this.$store.commit(types.HIDE_MENU);
      this.$store.commit(types.SHOW_MENU, { event: e });

      this.$nextTick(() => {
        this.$store.state.showMenu.state = true;
      });
    },
    icon: function(item) {
      if (
        this.iconsMap[item.extension] &&
        this.iconsMap[item.extension] != ""
      ) {
        return this.iconsMap[item.extension];
      } else if (item.type == "dir") {
        return this.iconsMap["dir"];
      } else {
        return this.iconsMap["default"];
      }
    },
    selectedState: function(item) {
      var res = this.$store.state.selectedItems.filter(file => {
        return file.id === item.id;
      });

      if (res.length != 0) {
        return true;
      } else {
        return false;
      }
    },
    getSize: function(_size) {
      var fSExt = new Array("Bytes", "KB", "MB", "GB"),
        i = 0;
      while (_size > 900) {
        _size /= 1024;
        i++;
      }
      return Math.round(_size * 100) / 100 + " " + fSExt[i];
    },
    changeSort(column) {
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending;
      } else {
        this.pagination.sortBy = column;
        this.pagination.descending = false;
      }
    },
    select: function(event, item) {
      var e = event || window.event;
      e.preventDefault();

      if (!(e.shiftKey || e.ctrlKey) || item.type == "quick") {
        this.$store.commit(types.UNSELECT_ALL_BROWSER_ITEMS);
      }

      if (this.selectedState(item)) {
        this.$store.commit(types.UNSELECT_BROWSER_ITEM, item);
      } else {
        this.$store.commit(types.SELECT_BROWSER_ITEM, item);
      }
    },
    preview: function(item) {
      this.$store.commit(types.LOAD_FULL_CONTENTS_SUCCESS, item);
      this.$store.commit(types.SHOW_PREVIEW_MODAL);
    },
    current: function() {
      const selected = this.$store.state.selectedItems[0];

      return this.$store.state.contents.findIndex(file => {
        if (file.id === selected.id) {
          return true;
        }
      });
    },
    keyup: function(event) {
      if (
        this.$store.state.selectedItems.length == 1 &&
        !this.$store.state.modelBackdrop
      ) {
        if (event.keyCode == 40) {
          event.preventDefault();
          const current = this.current();
          if (current < this.$store.state.contents.length - 1) {
            this.$store.commit(types.UNSELECT_ALL_BROWSER_ITEMS);
            this.$store.commit(
              types.SELECT_BROWSER_ITEM,
              this.$store.state.contents[current + 1]
            );
          }
        } else if (event.keyCode == 38) {
          event.preventDefault();
          const current = this.current();
          if (current > 0) {
            this.$store.commit(types.UNSELECT_ALL_BROWSER_ITEMS);
            this.$store.commit(
              types.SELECT_BROWSER_ITEM,
              this.$store.state.contents[current - 1]
            );
          }
        } else if (event.keyCode == 13) {
          const item = this.$store.state.selectedItems[0];
          if (item.type == "dir") {
            this.$store.dispatch("getContents", item);
          } else {
            this.$store.commit(
              types.LOAD_FULL_CONTENTS_SUCCESS,
              this.$store.state.selectedItems[0]
            );
            this.$store.commit(types.SHOW_PREVIEW_MODAL);
          }
        }
      }
    }
  },
  created() {
    document.body.addEventListener("keydown", this.keyup, false);
  },
  destroyed() {
    document.body.removeEventListener("keydown", this.keyup, false);
  }
};
</script>
