import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import info from './info'
import contact from './contact'

import textMessages from '@/utils/textMessage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null,
    dialog: false,
    dialogEdit: false
  },
  mutations: {
    setError(state, error) {
      console.log(error)
      alert(`${textMessages[error.code] || 'Что то пошло не так ☹️☹️☹️'}`)
      state.error = error
    },
    clearError(state) {
      state.error = null
    },
    viewDialog(state, status) {
      state.dialog = status
    },
    viewEditDialog(state, status) {
      state.dialogEdit = status
    }
  },
  actions: {
    setDialogStatus({commit}, status) {
      commit('viewDialog', status)
    },
    setDialogEditStatus({commit}, status) {
      commit('viewEditDialog', status)
    }
  },
  getters: {
    error: s => s.error,
    dialogStatus: s => s.dialog,
    dialogEditStatus: s => s.dialogEdit
  },
  modules: {
    auth,
    info,
    contact
  }
})
