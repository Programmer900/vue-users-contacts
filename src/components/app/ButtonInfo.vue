<template>
    <div>
        <md-speed-dial :class="bottomPosition">
            <md-speed-dial-target>
                <md-icon>add</md-icon>
            </md-speed-dial-target>
            <md-speed-dial-content>
                <md-button class="md-icon-button" @click="logOut">
                    <md-icon>exit_to_app</md-icon>
                </md-button>
                <md-button class="md-icon-button" @click="showDialog">
                    <md-icon>add</md-icon>
                    <md-tooltip md-direction="left">Add to contact</md-tooltip>
                </md-button>
            </md-speed-dial-content>
        </md-speed-dial>
    </div>
</template>

<script>
  export default {
    name: "ButtonInfo",
    data: () => ({
      showFormContactAdd: false,
      bottomPosition: 'md-bottom-right'
    }),
    methods: {
      async logOut() {
        await this.$store.dispatch('logout')
        this.$router.push('/auth?message=logout')
      },
      showDialog() {
        this.$store.dispatch('setDialogStatus', true)
      }
    }
  }
</script>