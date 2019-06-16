<template>
  <div class="media-image">
    <img
      class="modal-content"
      :src="item.filePath"
      ref="prevImage"
      :width="width"
      contain
      :alt="item.name"
      :height="height"
      :lazy-src="item.filePath"
    >
    <div class="previewtool">
      <span color="white" @click="dec()" class="remove">remove</span>
      <span color="white" @click="reset()" class="refresh">refresh</span>
      <span color="white" @click="inc()" class="add">add</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'media-video',
  data: () => ({
    width: 1000,
    height: 500
  }),
  props: ['item'],
  watch: {
    item: function () {
      this.reset()
    }
  },
  methods: {
    reset: function () {
      this.width = 1000
      this.height = 500
    },
    dec: function () {
      if (this.item.imgUrl) {
        this.width = this.width - 150
        this.height = this.height - 150
      }
    },
    inc: function () {
      if (this.item.imgUrl) {
        this.width = this.width + 150
        this.height = this.height + 150
      }
    },
    keyup: function (event) {
      event.preventDefault()

      if (this.$store.state.showPreviewModal) {
        if (event.keyCode == 38) {
          this.inc()
        } else if (event.keyCode == 40) {
          this.dec()
        }
      }
    }
  },
  created () {
    window.addEventListener('keyup', this.keyup)
  },
  destroyed () {
    window.removeEventListener('keyup', this.keyup)
  }
}
</script>
