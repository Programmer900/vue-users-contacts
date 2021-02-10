import firebase from 'firebase/app'

export default {
 actions: {
   async fetchContacts({commit, dispatch}) {
     try {
       const uid = await dispatch('getUid')

       if(!uid) {
         const custom_error = {
           code: 'no-auth'
         }
         commit('setError', custom_error)
         return
       }
       const contacts = (await firebase.database().ref(`/users/${uid}/contacts`).once('value')).val() || {}
       return Object.keys(contacts).map(key => ({...contacts[key], id: key}))
     } catch (e) {
       commit('setError', e)
     }
   },
   async addContact({commit, dispatch}, {phone, address}) {
     try {
       const uid = await dispatch('getUid')

       if(!uid) {
         const custom_error = {
           code: 'no-auth'
         }
         commit('setError', custom_error)
         return
       }
       const contact = await firebase.database().ref(`/users/${uid}/contacts`).push({phone, address})
       return {phone, address, id: contact.key}
     } catch (e) {
       commit('setError', e)
     }
   },
   async editContact({commit, dispatch}, {phone, address, id}) {
     try {
       const uid = await dispatch('getUid')

       if(!uid) {
         const custom_error = { code: 'no-auth' }
         commit('setError', custom_error)
         return
       }
       await firebase.database().ref(`/users/${uid}/contacts`).child(id).update({phone, address})
     } catch (e) {
       commit('setError', e)
     }
   },
   async deleteContact({commit, dispatch}, id) {
     try {
       const uid = await dispatch('getUid')
       await firebase.database().ref(`/users/${uid}/contacts`).child(id).remove()
     } catch (e) {
       commit('setError', e)
     }
   }
 }
}