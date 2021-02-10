<template>
    <div v-if="loading">
        <Loader />
    </div>
    <div v-else>
        <router-view />
    </div>
</template>

<script>
  export default {
    name: 'main-layout',
    data() {
      return {
        loading: true,
      }
    },
    async mounted() {
      setTimeout(() => this.loading = false, 2000)
      await this.$store.dispatch('fetchInfo')
    }
  }
</script>

<style lang="sass" scoped>
    div
        background-color: #f0f0f0
        width: 100%
        height: 100%
        padding: 30px 0
        display: flex
        align-items: center
        justify-content: center
</style>