<template>
  <div class="media-model">
    <media-rename-model></media-rename-model>
    <media-confirm-delete-model></media-confirm-delete-model>
    <media-create-folder-model></media-create-folder-model>
    <media-preview-model></media-preview-model>
  </div>
</template>

<script>
export default {
  name: "media-model",
  computed: {
    isActivePreview() {
      return this.$store.state.showPreviewModal;
    }
  }
};
</script>
