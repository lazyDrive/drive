<template>
  <div class="media-content-grid">
    <div class="grid_section folders" v-if="folders.length > 0">
      <h3>Folders</h3>
      <div class="lazy_folders_container">
        <lazy-folder v-for="item in folders" :item="item" :key="item.id"></lazy-folder>
      </div>
      <span class="clear"></span>
    </div>
    <div class="grid_section files" v-if="files.length > 0">
      <h3>Files</h3>
      <div class="lazy_files_container">
        <lazy-file v-for="item in files" :item="item" :key="item.id"></lazy-file>
      </div>
      <span class="clear"></span>
    </div>
  </div>
</template>

<script>
import * as types from './../../../../store/mutation-types'

import itemFolder from './../../Items/Folder'
import itemFile from './../../Items/File'

export default {
  name: 'media-content-grid',
  data: () => ({}),
  components: {
    'lazy-folder': itemFolder,
    'lazy-file': itemFile
  },
  watch: {
    selectAllFile: function (val) {
      if (val) {
        this.selectAllFiles()
      } else {
        this.unselectAllFiles()
      }
    },
    selectAllFolder: function (val) {
      if (val) {
        this.selectAllFolders()
      } else {
        this.unselectAllFolders()
      }
    }
  },
  computed: {
    selectAllFile: {
      get: function () {
        return this.$store.state.selectAllFile
      },
      set: function (val) {
        this.$store.state.selectAllFile = val
      }
    },
    selectAllFolder: {
      get: function () {
        return this.$store.state.selectAllFolder
      },
      set: function (val) {
        this.$store.state.selectAllFolder = val
      }
    },
    quick: function () {
      return this.$store.state.contents.filter(item => item.type == 'quick')
    },
    isEmpty: function () {
      return this.$store.state.contents.filter(item => item.type == 'empty')
    },
    folders: function () {
      return this.$store.state.contents.filter(
        item =>
          item.type == 'dir' &&
          item.name
            .toLowerCase()
            .includes(this.$store.state.search.toLowerCase())
      )
    },
    files: function () {
      return this.$store.state.contents.filter(
        item =>
          item.type == 'file' &&
          item.name
            .toLowerCase()
            .includes(this.$store.state.search.toLowerCase())
      )
    }
  },
  methods: {
    selectAllFiles: function () {
      const files = this.files
      files.forEach(item => {
        this.$store.commit(types.SELECT_BROWSER_ITEM, item)
      })
    },
    unselectAllFiles: function () {
      this.$store.commit(types.UNSELECT_ALL_BROWSER_ITEMS, { type: 'file' })
    },
    selectAllFolders: function () {
      const folders = this.folders
      folders.forEach(item => {
        this.$store.commit(types.SELECT_BROWSER_ITEM, item)
      })
    },
    unselectAllFolders: function () {
      this.$store.commit(types.UNSELECT_ALL_BROWSER_ITEMS, { type: 'dir' })
    },
    /* Unselect all browser items */
    // unselectAllBrowserItems: function(event) {
    //   const notClickedBrowserItems =
    //     (this.$refs.browserItems &&
    //       !this.$refs.browserItems.contains(event.target)) ||
    //     event.target === this.$refs.browserItems;

    //   const notClickedInfobar =
    //     this.$refs.infobar !== undefined &&
    //     !this.$refs.infobar.$el.contains(event.target);
    //   const clickedOutside = notClickedBrowserItems && notClickedInfobar;

    //   const notMediaFolder =
    //     this.$refs.mediaFolder !== undefined &&
    //     !this.$refs.mediaFolder.contains(event.target);

    //   if (clickedOutside && !this.$store.state.modelBackdrop) {
    //     // s
    //   } else if(notMediaFolder){
    //     this.$store.dispatch("update", {
    //       path: this.$store.state.selectedDirectory
    //     });
    //   }
    // },
    findNext: function (code) {
      const current = this.current()
      const total = this.$store.state.contents.length
      const infobar = this.$store.state.showInfoBar
      const next = current

      if (code == 40) {
        if (infobar) {
          if (total > current + 6) {
            return current + 6
          } else {
            return next
          }
        } else {
          if (total > current + 7) {
            return current + 7
          } else {
            return next
          }
        }
      }

      if (code == 38) {
        if (infobar) {
          if (current - 6 >= 0) {
            return current - 6
          } else {
            return next
          }
        } else {
          if (current - 7 >= 0) {
            return current - 7
          } else {
            return next
          }
        }
      }
    },
    current: function () {
      const selected = this.$store.state.selectedItems[0]

      return this.$store.state.contents.findIndex(file => {
        if (file.id === selected.id) {
          return true
        }
      })
    },
    keyup: function (event) {
      if (
        this.$store.state.selectedItems.length == 1 &&
        !this.$store.state.modelBackdrop
      ) {
        if (event.keyCode == 27) {
          event.preventDefault()
        } else if (event.keyCode == 39) {
          const current = this.current()
          if (current < this.$store.state.contents.length - 1) {
            this.$store.commit(types.UNSELECT_ALL_BROWSER_ITEMS)
            this.$store.commit(
              types.SELECT_BROWSER_ITEM,
              this.$store.state.contents[current + 1]
            )
          }
        } else if (event.keyCode == 38) {
          event.preventDefault()
          const next = this.findNext(event.keyCode)
          this.$store.commit(types.UNSELECT_ALL_BROWSER_ITEMS)
          this.$store.commit(
            types.SELECT_BROWSER_ITEM,
            this.$store.state.contents[next]
          )
        } else if (event.keyCode == 37) {
          const current = this.current()
          if (current > 0) {
            this.$store.commit(types.UNSELECT_ALL_BROWSER_ITEMS)
            this.$store.commit(
              types.SELECT_BROWSER_ITEM,
              this.$store.state.contents[current - 1]
            )
          }
        } else if (event.keyCode == 40) {
          event.preventDefault()
          const next = this.findNext(event.keyCode)
          this.$store.commit(types.UNSELECT_ALL_BROWSER_ITEMS)
          this.$store.commit(
            types.SELECT_BROWSER_ITEM,
            this.$store.state.contents[next]
          )
        } else if (event.keyCode == 13) {
          const item = this.$store.state.selectedItems[0]
          if (item.type == 'dir') {
            try {
              let path = item.path
              if (path != 'my-drive') {
                this.$router.push({
                  path: `/drive/u/0/folder/${path}`
                })
              } else {
                this.$router.push({
                  path: `/drive/u/0/my-drive`
                })
              }
            } catch (err) {
              console.log(err)
            }
          } else {
            this.$store.commit(
              types.LOAD_FULL_CONTENTS_SUCCESS,
              this.$store.state.selectedItems[0]
            )
            this.$store.commit(types.SHOW_PREVIEW_MODAL)
          }
        }
      }
    }
  },
  created () {
    document.body.addEventListener('keydown', this.keyup, false)
    // document.body.addEventListener(
    //   "click",
    //   this.unselectAllBrowserItems,
    //   false
    // );
  },
  destroyed () {
    document.body.removeEventListener('keydown', this.keyup, false)
    // document.body.removeEventListener(
    //   "click",
    //   this.unselectAllBrowserItems,
    //   false
    // );
  }
}
</script>
