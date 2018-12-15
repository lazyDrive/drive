import Vue from 'vue'
import App from './App.vue'
import Event from './app/Event'
import Vuetify from 'vuetify'
import router from './router'
import store from './store/store'
import './registerServiceWorker'
import VueAnalytics from 'vue-analytics'
import Browser from '@/components/Browser/Browser'
import Content from '@/components/Browser/Content/Content'
import File from '@/components/Browser/Items/File'
import InfoBar from '@/components/Browser/InfoBar/InfoBar'
import Folder from '@/components/Browser/Items/Folder'
import Navbar from '@/components/Browser/NavBar/NavBar'
import QuickUpload from '@/components/Browser/QuickUpload/QuickUpload'
import Settings from '@/components/Browser/Settings/Settings'
import UploadMenu from '@/components/Browser/UploadMenu/UploadMenu'
import Model from '@/components/Model/Model'
import RenameModel from '@/components/Model/Rename/RenameModel'
import ConfirmDeleteModel from '@/components/Model/ConfirmDelete/ConfirmDeleteModel'
import CreateNewFolderModel from '@/components/Model/CreateFolder/CreateNewFolderModel'
import Menu from '@/components/Menu/Menu';
import FileMenu from '@/components/Menu/FileMenu/FileMenu';
import FolderMenu from '@/components/Menu/FolderMenu/FolderMenu'
import OnlineState from '@/components/Tool/OnlineState'
import Alert from '@/components/Tool/Alert'

import 'vuetify/dist/vuetify.min.css'
import './styles/mediamanager.scss'

Vue.use(Vuetify)
Vue.use(VueAnalytics, {
    id: 'UA-131081167-1',
    router
})

// Load components
Vue.component('media-alert', Alert)
Vue.component('media-file', File)
Vue.component('media-folder', Folder)
Vue.component('media-online-state', OnlineState)
Vue.component('media-content', Content)
Vue.component('media-nav-bar', Navbar)
Vue.component('media-infrobar', InfoBar)
Vue.component('media-quick-upload', QuickUpload)
Vue.component('media-confirm-delete-model', ConfirmDeleteModel)
Vue.component('media-create-folder-model', CreateNewFolderModel)
Vue.component('media-rename-model', RenameModel)
Vue.component('media-settings', Settings)
Vue.component('media-file-menu', FileMenu)
Vue.component('media-folder-menu', FolderMenu)
Vue.component('media-browser', Browser)
Vue.component('media-model', Model)
Vue.component('media-menu', Menu)
Vue.component('media-upload-menu', UploadMenu)

// Register MediaManager namespace
window.MediaManager = window.MediaManager || {};
// Register the media manager event bus
window.MediaManager.Event = new Event();

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
