<template>
    <div>
        <router-view />
    </div>
</template>

<script>
  import textMessages from '@/utils/textMessage'

    export default {
      name: 'empty',
      data(){ return {} },
      computed: {
        error() {
          return this.$store.getters.error
        }
      },
      watch: {
        error(fbError) {
          console.log(fbError)
        }
      }
    }
</script>

<style lang="sass" scoped>
    div
        background-color: #f0f0f0
        width: 100%
        height: 100vh
        display: flex
        align-items: center
        justify-content: center
</style>