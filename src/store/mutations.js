/** @format */

import * as types from './mutation-types'

// The only way to actually change state in a store is by committing a mutation.
// Mutations are very similar to events: each mutation has a string type and a handler.
// The handler function is where we perform actual state modifications, and it will receive the state as the first argument.

// The grid item sizes
const gridItemSizes = ['xs', 'sm', 'md', 'lg', 'xl']

export default {
  /**
   * Select a directory
   * @param state
   * @param payload
   */
  [types.SELECT_DIRECTORY]: (state, payload) => {
    state.selectedDirectory = payload
  },

  /**
   * Set settings
   * @param state
   * @param payload
   */
  [types.SET_SETTINGS]: (state, payload) => {
    state.settings = payload.data.settings
  },

  /**
   * The load content success mutation
   * @param state
   * @param payload
   */
  [types.LOAD_CONTENTS_SUCCESS]: (state, payload) => {
    state.contents = payload
    state.isContentsLoaded = true
  },

  /**
   * The load more content success mutation
   * @param state
   * @param payload
   */
  [types.LOAD_MORE_CONTENTS_SUCCESS]: (state, payload) => {
    state.contents.push(payload)
  },

  /**
   * The upload success mutation
   * @param state
   * @param payload
   */
  // eslint-disable-next-line
  [types.UPLOAD_SUCCESS]: (state, payload) => {},

  /**
   * The create directory success mutation
   * @param state
   * @param payload
   */
  // eslint-disable-next-line
  [types.CREATE_DIRECTORY_SUCCESS]: (state, payload) => {},

  /**
   * The rename success handler
   * @param state
   * @param payload
   */
  // eslint-disable-next-line
  [types.RENAME_SUCCESS]: (state, payload) => {},

  /**
   * The delete success mutation
   * @param state
   * @param payload
   */
  [types.DELETE_SUCCESS]: (state, payload) => {
    const item = payload

    // Delete file
    if (item.type === 'file') {
      state.files.splice(
        state.files.findIndex(file => file.path === item.path),
        1
      )
    }

    // Delete dir
    if (item.type === 'dir') {
      state.directories.splice(
        state.directories.findIndex(directory => directory.path === item.path),
        1
      )
    }
  },

  /**
   * Select a browser item
   * @param state
   * @param payload the item
   */
  [types.SELECT_BROWSER_ITEM]: (state, payload) => {
    state.selectedItems.push(payload)
  },

  /**
   * Select browser items
   * @param state
   * @param payload the items
   */
  [types.SELECT_BROWSER_ITEMS]: (state, payload) => {
    state.selectedItems = payload
  },

  /**
   * Unselect a browser item
   * @param state
   * @param payload the item
   */
  [types.UNSELECT_BROWSER_ITEM]: (state, payload) => {
    const item = payload
    state.selectedItems.splice(
      state.selectedItems.findIndex(
        selectedItem => selectedItem.id === item.id
      ),
      1
    )
  },

  /**
   * Unselect all browser items
   * @param state
   * @param payload the item
   */
  // eslint-disable-next-line
  [types.UNSELECT_ALL_BROWSER_ITEMS]: (state, payload) => {
    state.selectAllFile = false
    state.selectAllFolder = false
    if (payload) {
      state.selectedItems.splice(
        state.selectedItems.findIndex(file => file.type === payload.type)
      )
    } else {
      state.selectedItems = []
    }
  },

  /**
   * Show the create folder modal
   * @param state
   */
  [types.SHOW_CREATE_FOLDER_MODAL]: state => {
    state.modelBackdrop = true
    state.showCreateFolderModal = true
  },

  /**
   * Hide the create folder modal
   * @param state
   */
  [types.HIDE_CREATE_FOLDER_MODAL]: state => {
    state.modelBackdrop = false
    state.showCreateFolderModal = false
  },

  /**
   * Show the tool modal
   * @param state
   */
  [types.SHOW_TOOL_MODAL]: state => {
    state.showToolModal = true
  },

  /**
   * Hide the tool modal
   * @param state
   */
  [types.HIDE_TOOL_MODAL]: state => {
    state.showToolModal = false
  },

  /**
   * Show the menu
   * @param state
   */
  [types.SHOW_MENU]: (state, payload) => {
    var e = payload.event || window.event
    e.preventDefault()

    state.showMenu.x = e.clientX
    state.showMenu.y = e.clientY
  },

  /**
   * Hide the menu
   * @param state
   */
  [types.HIDE_MENU]: state => {
    state.showMenu.state = false
  },

  /**
   * Show the info bar
   * @param state
   */
  [types.SHOW_INFOBAR]: state => {
    state.showInfoBar = true
  },

  /**
   * Show the info bar
   * @param state
   */
  [types.HIDE_INFOBAR]: state => {
    state.showInfoBar = false
  },

  /**
   * Define the list grid view
   * @param state
   */
  [types.CHANGE_VIEW]: (state, view) => {
    state.view = view
  },

  /**
   * FUll content is loaded
   * @param state
   * @param payload
   */
  [types.LOAD_FULL_CONTENTS_SUCCESS]: (state, payload) => {
    state.previewItem = payload
  },

  /**
   * Show the preview modal
   * @param state
   */
  [types.SHOW_PREVIEW_MODAL]: state => {
    state.modelBackdrop = true
    state.showPreviewModal = true
  },

  /**
   * Hide the preview modal
   * @param state
   */
  [types.HIDE_PREVIEW_MODAL]: state => {
    state.modelBackdrop = false
    state.showPreviewModal = false
  },

  /**
   * Set the is loading state
   * @param state
   */
  [types.SET_IS_LOADING]: (state, payload) => {
    state.isLoading = payload
  },

  /**
   * Set the is loading state
   * @param state
   */
  [types.SET_IS_UPLOADING]: (state, payload) => {
    state.isUploading = payload
  },

  /**
   * Set is mobile
   * @param state
   */
  [types.IS_MOBILE]: (state, payload) => {
    state.isMobile = payload
  },

  /**
   * Set the is loading state
   * @param state
   */
  [types.SET_IS_LOADING_MORE]: (state, payload) => {
    state.loadMoreProgress = payload.value
    state.loadingValue = payload.per
  },

  /**
   * Show the rename modal
   * @param state
   */
  [types.SHOW_RENAME_MODAL]: state => {
    state.modelBackdrop = true
    state.showRenameModal = true
  },

  /**
   * Hide the rename modal
   * @param state
   */
  [types.HIDE_RENAME_MODAL]: state => {
    state.showRenameModal = false
    state.modelBackdrop = false
  },

  /**
   * Show the settings
   * @param state
   */
  [types.SHOW_SETTINGS]: state => {
    state.showSettings = true
  },

  /**
   * Hide the settings
   * @param state
   */
  [types.HIDE_SETTINGS]: state => {
    state.showSettings = false
  },

  /**
   * Show the snackbar
   * @param state
   */
  [types.SHOW_SNACKBAR]: (state, payload) => {
    state.showsnackbar.state = true
    state.showsnackbar.data = payload.data

    if (payload.color) {
      state.showsnackbar.color = payload.color
    }

    if (payload.time == 0) {
      state.showsnackbar.time = payload.time
    }
  },

  /**
   * Hide the snackbar
   * @param state
   */
  [types.HIDE_SNACKBAR]: state => {
    state.showsnackbar.state = false
    state.showsnackbar.data = ''
  },

  /**
   * Show the share modal
   * @param state
   */
  [types.SHOW_SHARE_MODAL]: state => {
    state.showShareModal = true
  },

  /**
   * Hide the share modal
   * @param state
   */
  [types.HIDE_SHARE_MODAL]: state => {
    state.showShareModal = false
  },

  /**
   * Increase the size of the grid items
   * @param state
   */
  [types.INCREASE_GRID_SIZE]: state => {
    let currentSizeIndex = gridItemSizes.indexOf(state.gridSize)
    if (currentSizeIndex >= 0 && currentSizeIndex < gridItemSizes.length - 1) {
      state.gridSize = gridItemSizes[++currentSizeIndex]
    }
  },

  /**
   * Increase the size of the grid items
   * @param state
   */
  [types.DECREASE_GRID_SIZE]: state => {
    let currentSizeIndex = gridItemSizes.indexOf(state.gridSize)
    if (currentSizeIndex > 0 && currentSizeIndex < gridItemSizes.length) {
      state.gridSize = gridItemSizes[--currentSizeIndex]
    }
  },

  /**
   * Set search query
   * @param state
   * @param query
   */
  [types.SET_SEARCH_QUERY]: (state, query) => {
    state.search = query
  },

  /**
   * Show the confirm modal
   * @param state
   */
  [types.SHOW_CONFIRM_DELETE_MODAL]: state => {
    state.modelBackdrop = true
    state.showConfirmDeleteModal = true
  },

  /**
   * Hide the confirm modal
   * @param state
   */
  [types.HIDE_CONFIRM_DELETE_MODAL]: state => {
    state.modelBackdrop = false
    state.showConfirmDeleteModal = false
  }
}
