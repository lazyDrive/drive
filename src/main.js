import Vue from 'vue'
import App from './App.vue'
import Event from './app/Event'
import router from './router'
import store from './store/store'
import './registerServiceWorker'
import VueAnalytics from 'vue-analytics'

import './styles/lazydrive.scss'

Vue.use(VueAnalytics, {
  id: 'UA-131081167-1',
  router
})

// Register MediaManager namespace
window.LazyDrive = window.LazyDrive || {};
// Register the media manager event bus
window.LazyDrive.Event = new Event();

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
