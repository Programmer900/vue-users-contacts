import firebase from 'firebase/app'
import 'firebase/database'

export default {
  actions: {
    async login({dispatch, commit}, {email, password}) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async logout({commit}) {
      await firebase.auth().signOut()
      commit('clearInfo')
    },
    async register({dispatch, commit}, {email, phone, password, name}) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        const uid = await dispatch('getUid')
        await firebase.database().ref(`/users/${uid}/info`).set({
          name, phone
        })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async getUid() {
      const user = await firebase.auth().currentUser
      return user ? user.uid : null
    }
  }
}