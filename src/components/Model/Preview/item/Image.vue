<template>
  <div>
    <v-img
      class="modal-content"
      :src="item.filePath"
      ref="prevImage"
      :width="width"
      contain
      :alt="item.name"
      :height="height"
      :lazy-src="item.filePath"
    >
      <v-layout slot="placeholder" fill-height align-center justify-center ma-0>
        <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
      </v-layout>
    </v-img>
    <div class="previewtool">
      <v-icon color="white" @click="dec()" class="remove">remove</v-icon>
      <v-icon color="white" @click="reset()" class="refresh">refresh</v-icon>
      <v-icon color="white" @click="inc()" class="add">add</v-icon>
    </div>
  </div>
</template>

<script>
export default {
  name: "media-video",
  data: () => ({
    width: 800,
    height: 450
  }),
  props: ["item"],
  watch: {
    item: function() {
      this.reset();
    }
  },
  methods: {
    reset: function() {
      this.width = 800;
      this.height = 450;
    },
    dec: function() {
      if (this.item.imgUrl) {
        this.width = this.width - 150;
        this.height = this.height - 150;
      }
    },
    inc: function() {
      if (this.item.imgUrl) {
        this.width = this.width + 150;
        this.height = this.height + 150;
      }
    },
    keyup: function(event) {
      event.preventDefault();

      if (this.$store.state.showPreviewModal) {
        if (event.keyCode == 38) {
          this.inc();
        } else if (event.keyCode == 40) {
          this.dec();
        }
      }
    }
  },
  created() {
    window.addEventListener("keyup", this.keyup);
  },
  destroyed() {
    window.removeEventListener("keyup", this.keyup);
  }
};
</script>
