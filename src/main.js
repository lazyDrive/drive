import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import router from './router'
import store from './store'
import Alert from '@/components/Alert.vue'
import './registerServiceWorker'
import 'babel-polyfill'

import 'vuetify/dist/vuetify.min.css'
import '@uppy/dashboard/dist/style.css'
import '@uppy/core/dist/style.css'

Vue.use(Vuetify)

// Load components
Vue.component('media-alert', Alert)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
