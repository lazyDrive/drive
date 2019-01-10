<template>
  <div id="media-preview-modal" v-if="isActive" class="modal">
    <v-icon color="white" @click.prevent="hidePreviewModal()" class="close">arrow_back</v-icon>
    <v-icon color="white" @click.prevent="prev()" class="prev">arrow_back_ios</v-icon>

    <media-image
      v-if="item.imgUrl && item.extension != 'pdf' && item.extension != 'mp4'"
      :item="item"
    ></media-image>

    <media-video v-else-if="video" :item="item"></media-video>

    <media-audio v-else-if="audio" :item="item"></media-audio>

    <div class="media-pdf" v-else-if="item.extension == 'pdf'">
      <pdf
        ref="myPdfComponent"
        class="media-pdf-view"
        v-for="i in numPages"
        :key="i"
        :src="pdfsrc"
        :page="i"
      ></pdf>
    </div>

    <media-file v-else-if="fileText" :item="item"></media-file>

    <div class="noPreview" v-else>
      <h1 style="color:white">No preview available</h1>
      <div>
        <v-btn color="info" dark large @click.prevent="download(item)">Download</v-btn>
      </div>
    </div>

    <v-icon color="white" @click.prevent="next()" class="next">arrow_forward_ios</v-icon>
    <div class="caption">
      <img v-if="item.extImg" class="extensionImage" :src="item.extImg">
      &nbsp;&nbsp;{{item.name}}
    </div>

    <div class="right-tool">
      <div class="right-tool-item">
        <v-icon color="white" size="30" @click.prevent="download(item)">get_app</v-icon>
      </div>
      <div class="right-tool-item">
        <v-icon color="white" size="30">more_vert</v-icon>
      </div>
    </div>
  </div>
</template>

<script>
import * as types from "./../../../store/mutation-types";
import Video from "./item/Video";
import Audio from "./item/Audio";
import Image from "./item/Image";
import FileText from "./item/FileText";
import pdf from "vue-pdf";

export default {
  name: "media-create-folder",
  data: () => ({
    files: [],
    numPages: undefined,
    videoExt: ["mp4", "ogv", "avi"],
    audioExt: ["mp3", "webm"],
    fileExt: ["txt", "js", "css", "php", "vue", "go", "html", "c", "c++", "sql", "java", "shell"],
  }),
  components: {
    pdf,
    "media-video": Video,
    "media-audio": Audio,
    "media-image": Image,
    "media-file": FileText
  },
  watch: {
    isActive: function(val) {
      document
        .querySelector("html")
        .classList.toggle("app--modal--opened", val);

      if (this.item.extension == "pdf") {
        this.pdfsrc.then(pdf => {
          this.numPages = pdf.numPages;
        });
      }
    }
  },
  computed: {
    pdfsrc: function() {
      return pdf.createLoadingTask(this.item.filePath);
    },
    item: function() {
      return this.$store.state.previewItem;
    },
    isActive: function() {
      return this.$store.state.showPreviewModal;
    },
    video: function() {
      if (this.videoExt.indexOf(this.item.extension) != -1) {
        return true;
      } else {
        return false;
      }
    },
    fileText: function() {
      if (this.fileExt.indexOf(this.item.extension) != -1) {
        return true;
      } else {
        return false;
      }
    },
    audio: function() {
      if (this.audioExt.indexOf(this.item.extension) != -1) {
        return true;
      } else {
        return false;
      }
    },
    audioFile: function() {
      return this.item.filePath;
    }
  },
  methods: {
    hidePreviewModal: function() {
      this.$store.commit(types.HIDE_PREVIEW_MODAL);
    },
    download: function() {
      const items = [];
      items.push(this.item);
      this.$store.dispatch("download", items);
    },
    print: function() {
      this.$refs.myPdfComponent[0].print();
    },
    current: function() {
      if (this.item.extension == "pdf") {
        this.pdfsrc.then(pdf => {
          this.numPages = pdf.numPages;
        });
      }

      this.files = this.$store.state.contents.filter(
        item => item.type != "dir"
      );

      return this.files.findIndex(file => {
        if (file.id === this.item.id) {
          return true;
        }
      });
    },
    next: function() {
      var current = this.current();
      if (current < this.files.length - 1) {
        this.$store.state.previewItem = this.files[current + 1];
      } else {
        this.$store.state.previewItem = this.files[current];
      }
    },
    prev: function() {
      var current = this.current();
      if (current > 0) {
        this.$store.state.previewItem = this.files[current - 1];
      }
    },
    keyup: function(event) {
      event.preventDefault();

      if (this.$store.state.showPreviewModal) {
        if (event.keyCode == 27) {
          this.hidePreviewModal();
        } else if (event.keyCode == 39) {
          this.next();
        } else if (event.keyCode == 37) {
          this.prev();
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
