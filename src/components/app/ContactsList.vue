<template>
    <div class="create-contact">
        <md-content class="md-scrollbar block-content">
            <div v-if="contacts.length">
                <md-field>
                    <label>Найти контакт</label>
                    <span class="md-prefix"><md-icon>search</md-icon></span>
                    <md-input v-model="searchContact"></md-input>
                </md-field>
            </div>
            <md-list v-if="contacts.length" class="md-double-line">
                <md-list-item v-for="contact in onSearchContact" :key="contact.id">
                    <div class="md-list-item-text">
                        <span>{{contact.phone}}</span>
                        <span>{{contact.address}}</span>
                    </div>
                    <md-button class="md-accent md-rounded" @click="editContact(contact.id)"><md-icon>edit</md-icon></md-button>
                    <md-button class="md-accent md-rounded" @click="deleteContact(contact.id)"><md-icon>clear</md-icon></md-button>
                </md-list-item>
            </md-list>
            <md-empty-state
                v-else
                class="md-accent"
                md-rounded
                md-icon="highlight_off"
                md-label="У Вас нет, созданных контактов"
                md-description="Создайте их :)"
            >
            </md-empty-state>
        </md-content>
        <EditContactDialog
                v-if="statusDialog"
                :current="current"
                @edited="findAndEditContact"
                @closeDialog="statusDialog = false"
        ></EditContactDialog>
    </div>
</template>

<script>
  import EditContactDialog from '@/components/app/EditContactDialog'

  export default {
    name: "ContactsList",
    data() {
      return {
        statusDialog: false,
        current: null,
        searchContact: ''
      }
    },
    props: {
      contacts: {
        type: Array,
        required: true
      }
    },
    components: {
      EditContactDialog
    },
    methods: {
      editContact(id) {
        const result = this.contacts.filter(c => c.id == id)
        this.current = [...result]
        this.statusDialog = true
      },
      findAndEditContact(contact) {
        const idx = this.contacts.findIndex(c => c.id === contact.id)
        console.log(idx)
        this.contacts[idx].phone = contact.phone
        this.contacts[idx].address = contact.address
      },
      async deleteContact(contact) {
        const idx = this.contacts.findIndex(c => c.id === contact)
        this.contacts.splice(idx, 1)

        try {
          console.log(contact)
          await this.$store.dispatch('deleteContact', contact)
        } catch (e) {
          this.messageShow(`Error 😱: ${e.message} !!!`, true, 4000)
        }
      }
    },
    computed: {
      onSearchContact() {
        console.log(this.contacts)
        return this.contacts.filter(c => {
          return c.address.indexOf(this.searchContact) > -1 || c.phone.indexOf(this.searchContact) > -1
        })
      }
    }
  }
</script>

<style lang="sass" scoped>
    .create-contact, .block-content
        background-color: #f0f0f0
    .md-list-item
        z-index: 0
</style>
