<template>
  <div id="media-audio" class="media-audio">
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
  }
};
</script>
