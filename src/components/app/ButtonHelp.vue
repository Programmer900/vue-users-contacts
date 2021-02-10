<template>
    <md-speed-dial :class="topPosition">
        <md-speed-dial-target>
            <router-link to="/">
                <md-button  class="md-icon-button" >
                    <md-icon>home</md-icon>
                </md-button>
            </router-link>
        </md-speed-dial-target>
    </md-speed-dial>
</template>

<script>
  export default {
    name: "ButtonInfo",
    data: () => ({
      topPosition: 'md-top-right',
      isAuth: true
    }),
    methods: {
      logOut() {
        this.$router.push('/')

      }
    }
  }
</script>