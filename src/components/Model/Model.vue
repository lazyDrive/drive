<template>
  <div class="media-model">
    <lazy-preview-model></lazy-preview-model>
  </div>
</template>

<script>
import previewModel from "./Preview/PreviewModel";

export default {
  name: "media-model",
  components: {
    "lazy-preview-model": previewModel
  },
  computed: {
    isActivePreview() {
      return this.$store.state.showPreviewModal;
    }
  }
};
</script>
