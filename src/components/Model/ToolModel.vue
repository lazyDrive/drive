<template>
  <div id="media-tool">
    <v-btn
    fab
    bottom
    right
    color="purple"
    dark
    fixed
    @click="showToolModal()"
    >
    <v-icon>add</v-icon>
  </v-btn>

  <v-dialog v-model="this.$store.state.showToolModal" persistent width="800px">
    <v-card>
      <v-card-title class="grey lighten-4 py-4 title"> Create contact</v-card-title>
      <v-container grid-list-sm class="pa-4">
        <!-- dialog content -->
      </v-container>

      <v-card-actions>
        <v-btn flat color="primary">More</v-btn>
        <v-spacer></v-spacer>
        <v-btn flat color="primary" @click="hideToolModal()">Cancel</v-btn>
        <v-btn flat @click="hideToolModal()">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

</div>
</template>

<script>
import * as types from "./../../store/mutation-types";

export default {
  name: 'media-tool',
  data: () => ({
    dialog: false
  }),

  methods:{
    hideToolModal: function() {
      this.$store.commit(types.HIDE_TOOL_MODAL);
    },
    showToolModal: function() {
      this.$store.commit(types.SHOW_TOOL_MODAL);
    }
  }
}
</script>
