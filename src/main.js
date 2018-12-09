import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import router from './router'
import store from './store/store'
import './registerServiceWorker'
import Alert from '@/components/Alert'
import ProgressBar from '@/components/ProgressBar'
import File from '@/components/File';
import Folder from '@/components/Folder';
import OnlineState from '@/components/OnlineState'

import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

// Load components
Vue.component('media-alert', Alert)
Vue.component('media-file', File)
Vue.component('media-folder', Folder)
Vue.component('media-online-state', OnlineState)
Vue.component('media-progress-bar', ProgressBar)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
