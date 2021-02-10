import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase/app'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      meta: { layout: 'main', auth: true },
      component: () => import('../components/app/Home.vue')
    },
    {
      path: '/auth',
      name: 'auth',
      meta: { layout: 'empty' },
      component: () => import('../views/Auth.vue')
    },
    {
      path: '/register',
      name: 'register',
      meta: { layout: 'empty' },
      component: () => import('../views/Register.vue')
    },
    {
      path: '/contacts ',
      name: 'Contacts',
      meta: { layout: 'empty', auth: true },
      component: () => import('../views/Contacts.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser
  const requireAuth = to.matched.some(record => record.meta.auth)

  if(requireAuth && !currentUser) {
    next('/auth?message=login')
  } else {
    next()
  }
})

export default router