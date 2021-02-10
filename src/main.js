import Vue from 'vue'
import VueMaterial from 'vue-material'
import App from './App.vue'

import router from './router'
import store from './store'

import dateFilter from '@/filters/date.filter.js'
import messagePlugin from '@/utils/message.plugin'
import Loader from '@/components/app/Loader'

import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.use(VueMaterial)
Vue.use(messagePlugin)
Vue.filter('date', dateFilter)
Vue.component('Loader', Loader)

firebase.initializeApp({
  apiKey: "AIzaSyA17AGHlFFXXklZ9FuftJdOP27XAPAhBiE",
  authDomain: "vue-contacts-bdb75.firebaseapp.com",
  databaseURL: "https://vue-contacts-bdb75-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "vue-contacts-bdb75",
  storageBucket: "vue-contacts-bdb75.appspot.com",
  messagingSenderId: "246427293822",
  appId: "1:246427293822:web:a2cf17679a7e953c9a202f"
})

let app
firebase.auth().onAuthStateChanged(() => {
  if(!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})

Vue.config.productionTip = false