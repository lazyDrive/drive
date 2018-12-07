import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import router from './router'
import store from './store'
import './registerServiceWorker'
import VueProgressBar from 'vue-progressbar'
import Alert from '@/components/Alert.vue'
import HelloWorld from '@/components/File.vue';

import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)
Vue.use(VueProgressBar, {
  color: 'rgb(143, 255, 199)',
  failedColor: 'red',
  height: '2px'
})

// Load components
Vue.component('media-alert', Alert)
Vue.component('media-file', HelloWorld)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
