<template>
  <div class="text-xs-center folder" @contextmenu="show(this, item.id)" id="media-folder">
    <v-tooltip top>
      <v-chip v-bind:color="item.color" text-color="white" width="100px" class="chip-size" slot="activator">
        <v-avatar>
          <v-icon class="chip-folder">folder</v-icon>
        </v-avatar>
        {{ item.name }}
      </v-chip>
      <span>{{ item.name }}</span>
    </v-tooltip>
  </div>
</template>

<script>
import * as types from "./../../../store/mutation-types";

export default {
  name: 'media-folder',
  data: () => ({

  }),
  props: ['item'],
  methods: {
    show : function(e,id){
      e = e || window.event;
      e.preventDefault()

      this.$store.commit(types.HIDE_FILE_MENU, id);
      this.$store.commit(types.HIDE_FOLDER_MENU, id);
      this.$store.commit(types.SHOW_FOLDER_MENU, id);

      this.$nextTick(() => {
        this.$store.state.showFolderMenu = true;
      })
    }
  }
}
</script>

<style>
.folder{
  margin: 10px 12px;
}
.chip-size{
  padding: 3px 19px;
}
.chip-size .v-chip__content{
  cursor: pointer!important;
}
.folder-text{
  font-size: 15px;
  padding: 0 16px!important;
  text-align: center!important;
}
</style>
