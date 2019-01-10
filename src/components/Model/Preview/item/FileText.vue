<template>
  <div id="media-file" class="media-file">
    <div class="file-data">
      <pre class="file-data-view">
          {{ item.fileData }}
        </pre>
    </div>
    <div class="previewtool">
      <v-icon color="white" class="toolBox">file_copy</v-icon>
    </div>
  </div>
</template>

<script>
export default {
  name: "media-video",
  data: () => ({}),
  props: ["item"]
};
</script>
