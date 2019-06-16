import Vue from 'vue'
import App from './App.vue'
import Event from './app/Event'
import router from './router'
import store from './store/store'
import './registerServiceWorker'
import VueAnalytics from 'vue-analytics'
import Snackbar from '@/components/Tool/SnackBar'
import ContextMenu from '@/components/Tool/ContextMenu'
import Switch from '@/components/Tool/Switch'
import Model from '@/components/Model/Model'

import './styles/lazydrive.scss'

Vue.use(VueAnalytics, {
  id: 'UA-131081167-1',
  router
})

// Load components
Vue.component('lazySnackBar', Snackbar)
Vue.component('lazyModel', Model)
Vue.component('lazyContext', ContextMenu)
Vue.component('lazySwitch', Switch)

// Register MediaManager namespace
window.LazyDrive = window.LazyDrive || {}
// Register the media manager event bus
window.LazyDrive.Event = new Event()

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
