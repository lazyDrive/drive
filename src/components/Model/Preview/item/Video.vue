<template>
  <div class="media-video">
    <video
      ref="mVideo"
      class="media-video-player-preview"
      controls
      controlslist="nodownload"
    >
      <source ref="mVideoSrc" :src="item.filePath" type="video/mp4">
    </video>
  </div>
</template>

<script>
export default {
  name: 'media-video',
  data: () => ({}),
  props: ['item'],
  watch: {
    item: function (val) {
      const video = this.$refs.mVideo
      const videoSrc = this.$refs.mVideoSrc
      videoSrc.src = val.filePath
      video.load()
    }
  },
  methods: {
    keyup: function (event) {
      event.preventDefault()
      const video = this.$refs.mVideo
      // const videoSrc = this.$refs.mVideoSrc;
      if (this.$store.state.showPreviewModal) {
        if (event.keyCode == 32) {
          if (video.paused) {
            video.play()
          } else {
            video.pause()
          }
        } else if (event.keyCode == 38) {
          if (video.volume <= 0.9) {
            video.volume = video.volume + 0.1
          } else {
            video.volume = 1
          }
        } else if (event.keyCode == 40) {
          if (video.volume >= 0.1) {
            video.volume = video.volume - 0.1
          } else {
            video.volume = 0
          }
        }
      }
    }
  },
  created () {
    window.addEventListener('keyup', this.keyup, false)
  },
  destroyed () {
    window.removeEventListener('keyup', this.keyup, false)
  }
}
</script>
