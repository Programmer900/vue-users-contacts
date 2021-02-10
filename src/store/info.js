import firebase from 'firebase/app'
import 'firebase/database'

export default {
  state: {
    info: {}
  },
  mutations: {
    setInfo(state, info) { state.info = info },
    clearInfo(state) { state.info = {} }
  },
  actions: {
    async fetchInfo({dispatch, commit}) {
      try {
        const uid = await dispatch('getUid')
        const info = (await firebase.database().ref(`/users/${uid}/info`).once('value')).val()
        info ? commit('setInfo', info) : commit('setInfo', {name: 'Гость'})
      } catch (e) {
        console.log('fetchInfo:', e.message) // To connect the bus error 🤫
      }
    }
  },
  getters: {
    info: s => s.info
  }

}