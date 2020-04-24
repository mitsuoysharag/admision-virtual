import Vue from 'vue'
import Vuex from 'vuex'
import { getSession } from '@/services/session'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    session: getSession()
  },
  mutations: {
    setSession(state, session) {
      state.session = session
    }
  },
  actions: {
  },
  modules: {
  }
})
