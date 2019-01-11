<template>
  <div id="media-file" class="media-file">
    <div class="file-data">
      <pre class="file-data-view">
          {{ item.fileData }}
        </pre>
    </div>
    <div class="previewtool">
      <v-icon color="white" class="toolBox" @click="copyToclip()">file_copy</v-icon>
    </div>
  </div>
</template>

<script>
import * as types from "./../../../../store/mutation-types.js";

export default {
  name: "media-video",
  data: () => ({}),
  props: ["item"],
  methods: {
    copyToclip: function() {
      const el = document.createElement("textarea");
      el.value = this.item.fileData;
      el.setAttribute("readonly", "");
      el.style.position = "absolute";
      el.style.left = "-9999px";
      document.body.appendChild(el);
      const selected =
        document.getSelection().rangeCount > 0
          ? document.getSelection().getRangeAt(0)
          : false;
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      if (selected) {
        document.getSelection().removeAllRanges();
        document.getSelection().addRange(selected);
      }

      const data = {
        data: "Copied"
      };
      this.$store.commit(types.SHOW_SNACKBAR, data);
    }
  }
};
</script>
