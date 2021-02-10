<template>
  <div class="home">
    <Loader v-if="loading"></Loader>
    <div v-else>
      <ContactsList :contacts="getContacts"></ContactsList>
      <ContactCreate @created="addNewContact"></ContactCreate>
    </div>
    <ButtonInfo></ButtonInfo>
    <md-snackbar
            :md-active.sync="message.status"
            md-persistent
    >{{message.text}}</md-snackbar>
  </div>
</template>

<script>
  import ContactCreate from '@/components/app/ContactCreate'
  import ContactsList from '@/components/app/ContactsList'
  import ButtonInfo from '@/components/app/ButtonInfo'
  import textMessages from '@/utils/textMessage'
  import showMessage from '@/mixins/showMessage'

  export default {
    name: 'Home',
    components: {
      ButtonInfo, ContactCreate, ContactsList
    },
    mixins: [showMessage],
    data: () => ({
      contacts: [],
      loading: true
    }),
    methods: {
      addNewContact(contact) {
        this.contacts.push(contact)
      }
    },
    computed: {
      getContacts() {
        return this.contacts
      }
    },
    async mounted() {
      this.contacts = await this.$store.dispatch('fetchContacts')
      this.loading = false
      if(textMessages[this.$route.query.message]) {
        this.messageShow(`${textMessages[this.$route.query.message]}`, true, 5000)
      }
    }
  }
</script>

<style lang="sass" scoped>
  .home
    background-color: #f0f0f0
    height: 100%
    display: flex
    flex-direction: column
</style>
