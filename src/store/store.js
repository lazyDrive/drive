/** @format */

import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'
import createPersistedState from 'vuex-persistedstate'
import { persistedStateOptions } from './plugins/persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  plugins: [createPersistedState(persistedStateOptions)],
  strict: false
})
