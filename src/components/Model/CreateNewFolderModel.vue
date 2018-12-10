<template>
  <div id="showCreateFolderModal">
    <v-dialog v-model="this.$store.state.showCreateFolderModal" persistent width="500px">
      <v-card>
        <v-card-title
        class="grey lighten-4 title"
        >
        New Folder
        <v-spacer></v-spacer>
        <v-icon >folder</v-icon>
      </v-card-title>
      <v-container >
        <v-flex>
          <v-text-field
          v-model="defaultData"
          solo
          @focus="$event.target.select()"
          autofocus
          label="Folder name"
          ></v-text-field>
        </v-flex>
      </v-container>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" @click="hideCreateFolderModal()">Cancel</v-btn>
        <v-btn color="success">Create</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</div>
</template>

<script>
import * as types from "./../../store/mutation-types";

export default {
  name: 'showCreateFolderModal',
  data: () => ({
    defaultData:'Untitled Folder'
  }),

  props: {
    text: {
      type: String,
      default: ''
    }
  },

  methods:{
    hideCreateFolderModal: function() {
      this.$store.commit(types.HIDE_CREATE_FOLDER_MODAL);
    }
  }
}
</script>
<style>
.confirm-text {
  text-align: left;
  font-size: 20px;
}
</style>
