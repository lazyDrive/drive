<template>
  <div id="createnewfoldermodel">
    <v-dialog v-model="modelState" width="500px">
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
        <v-btn color="error" @click="modelState = false">Cancel</v-btn>
        <v-btn color="success">Create</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</div>
</template>

<script>
export default {
  name: 'createnewfoldermodel',
  data: () => ({
    defaultData:'Untitled Folder'
  }),
  props: {
    modelState: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      default: 'Are you sure want to delete ?'
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
