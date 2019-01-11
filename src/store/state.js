// The initial state
export default {
  // The loaded files
  contents: [],
  // The currently selected items
  selectedItems: [],
  // The currently selected items
  uploadItems: [],
  // The currently selected items
  diskLoaded: [],
  // The currently selected dir
  selectedDirectory: 'my-drive',
  // The state of confirm delete model
  showConfirmDeleteModal: false,
  // The state of create folder model
  showCreateFolderModal: false,
  // The state of preview model
  showPreviewModal: false,
  // The state of share model
  showShareModal: false,
  // The state of  model
  showRenameModal: false,
  // The state of  settings
  showSettings: false,
  // The state of file menu
  showFileMenu: false,
  // The state of x in settings
  showFileMenuX: 0,
  // The state of y in settings
  showFileMenuY: 0,
  // The state of settings
  showFolderMenu: false,
  // The state of x in folder menu
  showFolderMenuX: 0,
  // The state of y in folder menu
  showFolderMenuY: 0,
  // The state of tools
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
  // Is mobile
  isMobile: false,
  // Token
  token: '',
  // Islogged in
  isUserLoggedIn: false,
  // The Search Query
  search: '',
}
