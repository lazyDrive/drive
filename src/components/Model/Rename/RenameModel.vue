<template>
  <div id="media-rename">
    <v-dialog v-model="this.$store.state.showRenameModal" persistent width="500px">
      <v-card>
        <v-card-title class="grey lighten-4 title">Rename
          <v-spacer></v-spacer>
          <v-icon>folder</v-icon>
        </v-card-title>
        <v-container>
          <v-flex>
            <v-text-field
              v-model="selectedName"
              solo
              @focus="$event.target.select()"
              autofocus
              label="Folder name"
            ></v-text-field>
          </v-flex>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat color="error" @click.prevent="hideRenameModal()">Cancel</v-btn>
          <v-btn flat color="success" @click.prevent="rename()">Ok</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import * as types from "./../../../store/mutation-types";

export default {
  name: "media-rename",
  data: () => ({
    defaultData: ''
  }),

  computed: {
    selectedName: {
      get: function() {
        if (this.$store.state.showRenameModal) {
          return this.$store.state.selectedItems[0].name;
        } else {
          return '';
        }
      },
      set: function(data) {
          this.defaultData = data;
      }
    }
  },
  methods: {
    hideRenameModal: function() {
      this.$store.commit(types.HIDE_RENAME_MODAL);
    },
    rename: function() {
        if (this.defaultData != '') {
            const item = this.$store.state.selectedItems[0];
            item.newName = this.defaultData;
            this.$store.dispatch("rename", item);
        } else {
            this.hideRenameModal();
        }
    }
  }
};
</script>
<style>
.confirm-text {
  text-align: left;
  font-size: 20px;
}
</style>
