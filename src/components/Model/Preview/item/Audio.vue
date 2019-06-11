<template>
  <div class="media-audio">
    <audio
      ref="mAudio"
      id="media-audio"
      class="media-audio-player-preview"
      controls
      controlslist="nodownload"
    >
      <source ref="mAudioSrc" :src="item.filePath" type="audio/mpeg">
    </audio>
    <div class="circle-ripple"></div>
  </div>
</template>

<script>
export default {
  name: "media-audio",
  data: () => ({}),
  props: ["item"],
  watch: {
    item: function(val) {
      const audio = this.$refs.mAudio;
      const audioSrc = this.$refs.mAudioSrc;
      audioSrc.src = val.filePath;
      audio.load();
    }
  },
  methods: {
    keyup: function(event) {
      event.preventDefault();
      const audio = this.$refs.mAudio;
      // const audioSrc = this.$refs.mAudioSrc;
      if (this.$store.state.showPreviewModal) {
        if (event.keyCode == 32) {
          if (audio.paused) {
            audio.play();
          } else {
            audio.pause();
          }
        } else if (event.keyCode == 38) {
          if (audio.volume <= 0.9) {
            audio.volume = audio.volume + 0.1;
          } else {
            audio.volume = 1;
          }
        } else if (event.keyCode == 40) {
          if (audio.volume >= 0.1) {
            audio.volume = audio.volume - 0.1;
          } else {
            audio.volume = 0;
          }
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
