<template>
    <div class="navbar">
        <md-menu md-direction="bottom-end">
            <md-speed-dial class="time" :class="topPosition"><div>{{date | date('time')}}</div></md-speed-dial>
            <md-button v-for="link in links" :exact="link.exact" :key="link.url" :to="link.url" md-menu-trigger>{{link.title}}</md-button>
        </md-menu>
        <md-menu md-direction="bottom-end">
            <md-speed-dial class="item_menu"><div class="">{{info.name}}</div></md-speed-dial>
        </md-menu>
        <md-menu md-direction="bottom-end">
            <md-speed-dial class="item_menu __phone"><div class="">{{info.phone}}</div></md-speed-dial>
        </md-menu>
    </div>
</template>

<script>
  export default {
    name: 'Navbar',
    data() {
      return ({
        links: [
          {title: 'Log in as a different user', url: '/auth'}
        ],
        topPosition: 'md-top-left',
        date: new Date(),
        interval: null
      })
    },
    computed: {
      info() {
        return this.$store.getters.info
      }
    },
    mounted() {
      this.interval = setInterval(()=>{
        this.date = new Date()
      }, 1000)
    },
    beforeDestroy() {
      clearInterval(this.interval)
    }
  }
</script>

<style lang="sass" scoped>
    .navbar
        background-color: #8fbcbb
        .md-menu
            margin: 24px
            .time
                font-weight: 600
                top: 35px
                font-size: 17px
            .item_menu
                position: absolute
                font-weight: 600
                right: 2%
                top: 20px
                font-size: 17px
                color: #ff5252
            .__phone
                top: 40px
                color: #2c3e50

</style>