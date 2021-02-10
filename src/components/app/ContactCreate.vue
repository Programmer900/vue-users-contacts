<template>
    <md-dialog :md-active.sync="statusForm">
        <md-dialog-actions>
            <md-button class="md-accent md-rounded" @click="closeDialog"><md-icon>clear</md-icon></md-button>
        </md-dialog-actions>
        <md-progress-bar md-mode="indeterminate" v-if="sending" />
        <md-dialog-title>Add Contact</md-dialog-title>
        <form novalidate class="md-layout" @submit.prevent="validateAndSubmitHandler">
            <md-card class="md-layout-item md-size-100 md-small-size-100">
                <md-card-content>
                    <div class="md-layout md-gutter">
                        <div class="md-layout-item md-small-size-100">
                            <md-field :class="getValidationClass('phone')">
                                <label for="phone">Phone</label>
                                <md-input
                                        type="phone"
                                        name="phone" id="phone" autocomplete="phone"
                                        v-model.trim="form.phone"
                                            :disabled="sending"
                                            :class="{invalid:
                                            ($v.form.phone.$dirty && !$v.form.phone.required) ||
                                            ($v.form.phone.$dirty && $v.form.phone.minLength) ||
                                            ($v.form.phone.$dirty && $v.form.phone.maxLength)
                                            }
                                        "
                                />
                                <span class="md-error" v-if="$v.form.phone.$dirty && !$v.form.phone.required">The phone is required</span>
                                <span class="md-error" v-else-if="$v.form.phone.$dirty && !$v.form.phone.minLength">Invalid phone, min symbols {{$v.form.phone.$params.minLength.min}}</span>
                                <span class="md-error" v-else-if="$v.form.phone.$dirty && !$v.form.phone.maxLength">Invalid phone, max symbols {{$v.form.phone.$params.maxLength.max}}</span>
                            </md-field>
                        </div>

                        <div class="md-layout-item md-small-size-100">
                            <md-field :class="getValidationClass('address')">
                                <label for="password">Address</label>
                                <md-input
                                        name="address" id="address" autocomplete="address"
                                        v-model="form.address"
                                        type="text"
                                        :disabled="sending"
                                        :class="{invalid: ($v.form.address.$dirty && !$v.form.address.required)}"
                                />
                                <span class="md-error" v-if="$v.form.address.$dirty && !$v.form.address.required">The address is required</span>
                            </md-field>
                        </div>
                    </div>
                </md-card-content>

                <md-card-actions>
                    <div v-if="sending">
                        <Loader />
                    </div>
                    <md-button v-else type="submit" class="md-primary" :disabled="sending">Add Contact</md-button>
                </md-card-actions>
                <div class="help">
                    <span>Fill in your contact details 👉 📑📑📑</span>
                </div>
            </md-card>
        </form>
        <md-snackbar
                :md-active.sync="message.status"
                md-persistent
        >{{message.text}}</md-snackbar>
    </md-dialog>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import {required, minLength, maxLength} from 'vuelidate/lib/validators'
  import Loader from '@/components/app/Loader'
  import showMessage from '@/mixins/showMessage'

  export default {
    name: "ContactCreate",
    mixins: [validationMixin, showMessage],
    components: {Loader},
    data() {
      return {
        sending: false,
        form: {phone: '', address: ''},
      }
    },
    validations: {
      form: {
        phone: {required, minLength: minLength(11), maxLength: maxLength(11)},
        address: {required}
      }
    },
    methods: {
      getValidationClass (fieldName) {
        const field = this.$v.form[fieldName]
        if (field) {
          return {
            'md-invalid': field.$invalid && field.$dirty
          }
        }
      },
      async addContact() {
        this.sending = true
        const formData = {phone: this.form.phone, address: this.form.address}
        try {
          const c = await this.$store.dispatch('addContact', formData)
          this.messageShow(`The contact data: |${formData.phone}| and |${formData.address}| was been created! 👍`, true, 6000)
          this.clearForm()
          this.sending = false
          this.$emit('created', c)
        } catch (e) {
          this.sending = false // add preload
          this.messageShow(`Error 😱: ${e.message} !!!`, true, 5000)
        }
      },
      validateAndSubmitHandler() {
        if (this.$v.$invalid) {
          this.$v.$touch()
          return
        }
        this.addContact()
      },
      closeDialog() {
        this.$store.dispatch('setDialogStatus', false)
      },
      clearForm() {
        this.$v.$reset()
        this.form.phone = ''
        this.form.address = ''
      },
    },
    computed: {
      statusForm() {
        return this.$store.getters.dialogStatus
      }
    },
    mounted() {}
  }
</script>

<style lang="sass" scoped>
    .help
        text-align: center
        display: block
</style>