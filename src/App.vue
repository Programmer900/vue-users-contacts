<template>
  <div id="app">
    <Navbar v-if="layout != 'empty-layout'" />
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<script>
  import EmptyLayout from '@/layouts/EmptyLayout'
  import MainLayout from '@/layouts/MainLayout'
  import Navbar from '@/components/app/Navbar'

  export default {
    computed: {
      layout() {
        return (this.$route.meta.layout || 'empty') + '-layout'
      }
    },
    components: {
      Navbar,
      EmptyLayout,
      MainLayout
    }
  }
</script>

<style lang="sass">
  body
    background-color: #f0f0f0
  #app
    font-family: Avenir, Helvetica, Arial, sans-serif
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
    text-align: center
    color: #2c3e50

  #nav
    padding: 30px
    a
      font-weight: bold
      color: #2c3e50
      &.router-link-exact-active
        color: #42b983
  .router-link-exact-active
    background-color: #f0f0f0 !important
  .help
    padding: 10px 0

</style>
