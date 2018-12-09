<template>
  <div id="confirmModel">
<v-dialog v-model="confirmModel" width="500px">
  <v-card>
    <v-card-title
    class="grey lighten-4 title"
    >
    Confirm Delete
      <v-spacer></v-spacer>
    <v-icon >delete</v-icon>
  </v-card-title>
  <v-container>
    <div class="confirm-text">
    <strong>{{ text }}</strong>
  </div>
  </v-container>
  <v-card-actions>
    <v-spacer></v-spacer>
    <v-btn color="success">Confirm</v-btn>
  <v-btn color="error" @click="confirmModel = false">Cancel</v-btn>
  </v-card-actions>
</v-card>
</v-dialog>
</div>
</template>

<script>
export default {
  name: 'ConfirmModel',
  data: () => ({

  }),
  props: {
    confirmModel: {
      type: Boolean,
      required: false,
      default: false
    },
    text: {
      type: String,
      required: false,
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
