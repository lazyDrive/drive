<template>
  <div id="quicktools">
  <v-btn
  fab
  bottom
  right
  color="purple"
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
    <!-- dialog content -->
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
  name: 'QuickTools',
  data: () => ({
    dialog: false
  }),
}
</script>
