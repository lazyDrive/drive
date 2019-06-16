/** @format */

// The initial state
export default {
  // The loaded files
  contents: [],
  // Files loaded limit
  loadLimit: 30,
  // Settings
  settings: {
    dropbox: {},
    google: {}
  },
  // The currently selected items
  selectedItems: [],
  // The currently selected items
  uploadItems: [],
  // View
  view: 'grid',
  // The currently selected items
  uploadItemsMenu: [],
  // The currently selected items
  diskLoaded: [],
  // The currently selected dir
  selectedDirectory: 'my-drive',
  // The state of confirm delete model
  showConfirmDeleteModal: false,
  // The state of create folder model
  showCreateFolderModal: false,
  // The state of showUploadMenu
  showUploadMenu: false,
  // The state of preview model
  showPreviewModal: false,
  // The state of share model
  showShareModal: false,
  // The state of  model
  showRenameModal: false,
  // The state of  settings
  showSettings: false,
  // The state of file menu
  showMenu: {
    state: false,
    x: 0,
    y: 0
  },
  // The state of x in settings
  showToolModal: false,
  // The state of the infobar
  showInfoBar: false,
  // The snackbar
  showsnackbar: {
    state: false,
    data: '',
    color: 'default',
    time: 6000
  },
  // The snackbar
  previewItem: null,
  // The backdrop
  modelBackdrop: false,
  // The loading state
  isLoading: false,
  // The loading state
  isUploading: false,
  // Is mobile
  isMobile: false,
  // Token
  token: '',
  // Select all files
  selectAllFile: false,
  // Select all files
  selectAll: false,
  // Select all folders
  selectAllFolder: false,
  // Islogged in
  isUserLoggedIn: false,
  // The Search Query
  search: ''
}
