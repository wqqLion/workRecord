import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const NavigatorLang = navigator.language.substr(0, 2) 
export default new Vuex.Store({
  state: {
    currentLang: localStorage.getItem('UserLang') || NavigatorLang
  },
  mutations: {
    updateLang(state, value) {
      state.currentLang = value
      localStorage.setItem('UserLang', state.currentLang)
    }
  },
  actions: {
  },
  modules: {
  }
})
