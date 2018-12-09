<template>
  <div id="renameModel">
    <v-dialog v-model="renameModel" width="500px">
      <v-card>
        <v-card-title
        class="grey lighten-4 title"
        >
        Rename
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
        <v-btn color="error" @click="renameModel = !renameModel">Cancel</v-btn>
        <v-btn color="success">Ok</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</div>
</template>

<script>
export default {
  name: 'renameModel',
  data: () => ({
    defaultData:'Untitled Folder'
  }),
  props: {
    renameModel: {
      type: Boolean,
      default: false
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
