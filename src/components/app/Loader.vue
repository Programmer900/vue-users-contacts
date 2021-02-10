<template>
    <div class="app-loader">
        <md-progress-spinner
                class="md-accent"
                :md-stroke="3"
                md-mode="indeterminate"
        ></md-progress-spinner>
    </div>
</template>

<script>
  export default {
    name: "Loader",
    computed: {
      color() {
        const colors = ['blue', 'red', 'green', 'yellow', 'gray']
        return colors[Math.floor(Math.random() * 5)]
      }
    }
  }
</script>

<style lang="sass" scoped>
    .md-progress-spinner.md-theme-demo-light
        stroke: green !important
</style>