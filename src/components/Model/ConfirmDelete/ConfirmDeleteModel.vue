<template>
  <div class="media-confirm-model">
    <v-dialog v-model="this.$store.state.showConfirmDeleteModal" persistent width="500px" transition="fade-transition">
      <v-card>
        <v-card-title class="grey lighten-4 title">Confirm Delete
          <v-spacer></v-spacer>
          <v-icon>delete</v-icon>
        </v-card-title>
        <v-container>
          <div class="confirm-text">
            <strong>{{ text }}</strong>
          </div>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat color="error" @click.prevent="hideConfirmDeleteModal()">Cancel</v-btn>
          <v-btn flat color="success" @click.prevent="deleteFile()">Confirm</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import * as types from './../../../store/mutation-types'

export default {
  name: 'media-confirm-model',
  data: () => ({}),

  props: {
    text: {
      type: String,
      required: false,
      default: 'Are you sure want to delete ?'
    }
  },

  computed: {},

  methods: {
    hideConfirmDeleteModal: function () {
      this.$store.commit(types.HIDE_CONFIRM_DELETE_MODAL)
    },
    deleteFile: async function () {
      this.$store.commit(types.SET_IS_LOADING, true)
      let response = ''
      const items = this.$store.state.selectedItems

      for (var i = 0; i < items.length; i++) {
        const item = items[i]
        response = await this.$store.dispatch('deleteFile', item)
      }

      this.$store.commit(types.UNSELECT_ALL_BROWSER_ITEMS)

      var data = {
        data: response.data.message,
        color: 'success'
      }
      this.$store.commit(types.SET_IS_LOADING, false)
      this.$store.commit(types.SHOW_SNACKBAR, data)
      this.$store.dispatch('update', {
        path: this.$store.state.selectedDirectory
      })
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
