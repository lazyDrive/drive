<template>
  <div id="media-video">
    <video ref="mVideo" id="media-video" class="media-video-player-preview" controls controlslist="nodownload">
      <source ref="mVideoSrc" :src="item.filePath" type="video/mp4">
    </video>
  </div>
</template>

<script>
export default {
  name: "media-video",
  data: () => ({}),
  props: ['item'],
  watch: {
    item: function(val){
      const video = this.$refs.mVideo;
      const videoSrc = this.$refs.mVideoSrc;
      videoSrc.src = val.filePath;
      video.load();
    }
  },
};
</script>
