import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import router from './router'
import store from './store/store'
import './registerServiceWorker'
import Alert from '@/components/Alert'
import ProgressBar from '@/components/ProgressBar'
import File from '@/components/File'
import Folder from '@/components/Folder'
import OnlineState from '@/components/OnlineState'
import Content from '@/components/Content'
import ToolModel from '@/components/Model/ToolModel'
import Navbar from '@/components/NavBar'
import Details from '@/components/Details'
import ConfirmDeleteModel from '@/components/Model/ConfirmDeleteModel'
import CreateNewFolderModel from '@/components/Model/CreateNewFolderModel'
import RenameModel from '@/components/Model/RenameModel'
import Settings from '@/components/Settings';

import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

// Load components
Vue.component('media-alert', Alert)
Vue.component('media-file', File)
Vue.component('media-folder', Folder)
Vue.component('media-online-state', OnlineState)
Vue.component('media-progress-bar', ProgressBar)
Vue.component('media-content', Content)
Vue.component('media-nav-bar', Navbar)
Vue.component('media-details', Details)
Vue.component('media-tool-model', ToolModel)
Vue.component('media-confirm-delete-model', ConfirmDeleteModel)
Vue.component('media-create-new-folder-model', CreateNewFolderModel)
Vue.component('media-rename-model', RenameModel)
Vue.component('media-settings', Settings)


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
