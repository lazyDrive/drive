<template>
  <div v-if="isActive" class="modal media-preview-modal">
    <lazy-switch v-model="val" :sid="1"></lazy-switch>
    <lazy-switch :sid="2"></lazy-switch>
    <p v-if="val">ANurag</p>
    <!-- <span color="white" @click.prevent="hidePreviewModal()" size="25" class="close">arrow_back</span> -->
    <!-- <span color="white" @click.prevent="prev()" size="25" class="prev">arrow_back_ios</span> -->

    <!-- <media-image
      v-if="item.imgUrl && item.extension.toLowerCase() != 'pdf' && item.extension.toLowerCase() != 'mp4'"
      :item="item"
    ></media-image>

    <media-video v-else-if="video" :item="item"></media-video>

    <media-audio v-else-if="audio" :item="item"></media-audio>

    <div class="media-pdf" v-else-if="item.extension.toLowerCase() == 'pdf'">
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

    <span color="white" @click.prevent="next()" class="next">next</span>
    <div class="caption">
      <img v-if="item.extImg" class="extensionImage" :src="item.extImg">
      &nbsp;&nbsp;{{getName()}}
    </div>-->

    <!-- <div class="right-tool">
      <div class="right-tool-item">
        <p color="white" size="25" @click.prevent="download(item)">get_app</p>
      </div>
      <div class="right-tool-item">
        <p color="white" size="25">more_vert</p>
      </div>
    </div>-->
  </div>
</template>

<script>
import * as types from './../../../store/mutation-types'
import pdf from 'vue-pdf'

export default {
  name: 'media-create-folder',
  data: () => ({
    val: true,
    files: [],
    numPages: undefined,
    videoExt: ['mp4', 'ogv', 'avi', 'webm'],
    audioExt: ['mp3'],
    fileExt: [
      'txt',
      'js',
      'css',
      'php',
      'vue',
      'go',
      'html',
      'c',
      'cpp',
      'c++',
      'sql',
      'java',
      'shell'
    ]
  }),
  components: {},
  watch: {
    isActive: function (val) {
      document
        .querySelector('html')
        .classList.toggle('app--modal--opened', val)

      if (this.item.extension == 'pdf') {
        this.pdfsrc.then(pdf => {
          this.numPages = pdf.numPages
        })
      }
    }
  },
  computed: {
    pdfsrc: function () {
      return pdf.createLoadingTask(this.item.filePath)
    },
    item: function () {
      return this.$store.state.previewItem
    },
    isActive: function () {
      return this.$store.state.showPreviewModal
    },
    video: function () {
      if (this.videoExt.indexOf(this.item.extension.toLowerCase()) != -1) {
        return true
      } else {
        return false
      }
    },
    fileText: function () {
      if (this.fileExt.indexOf(this.item.extension.toLowerCase()) != -1) {
        return true
      } else {
        return false
      }
    },
    audio: function () {
      if (this.audioExt.indexOf(this.item.extension.toLowerCase()) != -1) {
        return true
      } else {
        return false
      }
    },
    audioFile: function () {
      return this.item.filePath
    }
  },
  methods: {
    hidePreviewModal: function () {
      this.$store.commit(types.HIDE_PREVIEW_MODAL)
    },
    download: function () {
      const items = []
      items.push(this.item)
      this.$store.dispatch('download', items)
    },
    getName: function () {
      if (this.item.name.length >= 20 && this.$store.state.isMobile) {
        return this.item.name.substring(0, 20) + '..'
      } else {
        return this.item.name
      }
    },
    print: function () {
      this.$refs.myPdfComponent[0].print()
    },
    current: function () {
      if (this.item.extension == 'pdf') {
        this.pdfsrc.then(pdf => {
          this.numPages = pdf.numPages
        })
      }

      this.files = this.$store.state.contents.filter(
        item => item.type != 'dir'
      )

      return this.files.findIndex(file => {
        if (file.id === this.item.id) {
          return true
        }
      })
    },
    next: function () {
      var current = this.current()
      if (current < this.files.length - 1) {
        this.$store.state.previewItem = this.files[current + 1]
      } else {
        this.$store.state.previewItem = this.files[current]
      }
    },
    prev: function () {
      var current = this.current()
      if (current > 0) {
        this.$store.state.previewItem = this.files[current - 1]
      }
    },
    keyup: function (event) {
      event.preventDefault()

      if (this.$store.state.showPreviewModal) {
        if (event.keyCode == 27) {
          this.hidePreviewModal()
        } else if (event.keyCode == 39) {
          this.next()
        } else if (event.keyCode == 37) {
          this.prev()
        }
      }
    }
  },
  created () {
    window.addEventListener('keyup', this.keyup)
  },
  destroyed () {
    window.removeEventListener('keyup', this.keyup)
  }
}
</script>
