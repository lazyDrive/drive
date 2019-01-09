<template>
  <div id="media-video">
    <video id="media-video" class="media-video-player-preview" controls controlslist="nodownload">
      <source :src="item.filePath" type="video/mp4">
    </video>
  </div>
</template>

<script>
export default {
  name: "media-video",
  data: () => ({}),
  props: ['item']
};
</script>
