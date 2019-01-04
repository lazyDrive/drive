<template>
  <div id="media-preview-modal" v-if="isActive" class="modal">
    <v-icon color="white" @click="hidePreviewModal()" class="close">arrow_back</v-icon>
    <v-icon color="white" @click="prev()" class="prev">arrow_back_ios</v-icon>
    <v-img
      class="modal-content"
      :src="item.imgUrl"
      ref="prevImage"
      v-if="item.imgUrl"
      :width="width"
      contain
      :alt="item.name"
      :height="height"
      :lazy-src="item.imgLazyUrl"
    >
      <v-layout slot="placeholder" fill-height align-center justify-center ma-0>
        <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
      </v-layout>
    </v-img>

    <div class="video" v-if="video">
      <video id="media-video" class="media-video-player-preview" controls controlslist="nodownload">
        <source :src="item.filePath" type="video/mp4">
      </video>
    </div>

    <div class="pdf" v-if="item.extension == 'pdf'">
      <pdf
        ref="myPdfComponent"
        class="media-pdf"
        v-for="i in numPages"
        :key="i"
        :src="pdfsrc"
        :page="i"
      ></pdf>
    </div>

    <div class="audio" v-if="audio">
      <audio id="media-audio" class="media-audio-player-preview" controls controlslist="nodownload">
        <source :src="audioFile" type="audio/mpeg">
      </audio>
      <div class="circle-ripple"></div>
    </div>

    <v-icon color="white" @click="next()" class="next">arrow_forward_ios</v-icon>
    <div class="caption">
      <img
        v-if="item.extImg"
        class="extensionImage"
        :src="item.extImg"
      >
      &nbsp;&nbsp;{{item.name}}
    </div>

    <div class="right-tool">
      <div class="right-tool-item">
        <v-icon color="white" size="30" @click="download(item)">save_alt</v-icon>
      </div>
      <div class="right-tool-item">
        <v-icon color="white" size="30">more_vert</v-icon>
      </div>
    </div>

    <div class="previewtool" v-if="item.imgUrl || item.extension == 'pdf'">
      <v-icon color="white" @click="dec()" class="remove">remove</v-icon>
      <v-icon color="white" @click="reset()" class="refresh">refresh</v-icon>
      <v-icon color="white" @click="inc()" class="add">add</v-icon>
    </div>
  </div>
</template>

<script>
import * as types from "./../../../store/mutation-types";
import pdf from "vue-pdf";

export default {
  name: "media-create-folder",
  data: () => ({
    width: 800,
    height: 450,
    files: [],
    numPages: undefined,
    videoExt: ["mp4"],
    audioExt: ["mp3", "webm"]
  }),
  components: {
    pdf
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
      this.reset();
    },
    download: function() {
      const items = [];
      items.push(this.item);
      this.$store.dispatch("download", items);
    },
    print: function(){
      this.$refs.myPdfComponent[0].print();
    },
    current: function() {
      if (this.item.extension == "pdf") {
        this.pdfsrc.then(pdf => {
          this.numPages = pdf.numPages;
        });
      }

      this.files = this.$store.state.contents.filter(
        item => item.type != "folders"
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
    reset: function() {
      this.width = 800;
      this.height = 450;
    },
    dec: function() {
      this.width = this.width - 150;
      this.height = this.height - 150;
    },
    inc: function() {
      this.width = this.width + 150;
      this.height = this.height + 150;
    },
    keyup: function(event) {
      event.preventDefault();

      if (this.$store.state.showPreviewModal) {
        if (event.keyCode == 27) {
          this.hidePreviewModal();
        } else if (event.keyCode == 39) {
          this.next();
        } else if (event.keyCode == 38) {
          this.inc();
        } else if (event.keyCode == 37) {
          this.prev();
        } else if (event.keyCode == 40) {
          this.dec();
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
