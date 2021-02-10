<template>
    <div>
        <md-dialog
                :md-active.sync="showDialog"
                @md-clicked-outside="$emit('closeDialog')"
                @md-cancel="$emit('closeDialog')"
                @md-confirm="$emit('closeDialog')">
            <md-progress-bar md-mode="indeterminate" v-if="sending" />
            <md-dialog-actions>
                <md-button class="md-accent md-rounded" @click="$emit('closeDialog')"><md-icon>clear</md-icon></md-button>
            </md-dialog-actions>
            <md-dialog-title>Edit Contact</md-dialog-title>
            <form novalidate class="md-layout" @submit.prevent="validateAndSubmitHandler">
                <md-card class="md-layout-item md-size-100 md-small-size-100">
                    <md-card-content>
                        <div class="md-layout md-gutter">
                            <div class="md-layout-item md-small-size-100">
                                <md-field :class="getValidationClass('phone')">
                                    <label for="phone">{{current[0].phone}}</label>
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
                                    <label for="address">{{current[0].address}}</label>
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
                        <md-button v-else type="submit" class="md-primary" :disabled="sending">Edit Contact</md-button>
                    </md-card-actions>
                    <div class="help">
                        <span>Correct in your contact details 👉 📑📑📑</span>
                    </div>
                </md-card>
            </form>
            <md-snackbar
                    :md-active.sync="message.status"
                    md-persistent
            >{{message.text}}</md-snackbar>
        </md-dialog>
    </div>
</template>

<script>
  import Loader from '@/components/app/Loader'
  import { validationMixin } from 'vuelidate'
  import {required, minLength, maxLength} from 'vuelidate/lib/validators'
  import showMessage from '@/mixins/showMessage'

  export default {
    name: 'DialogConfirm',
    props: ['status', 'current'],
    mixins: [validationMixin, showMessage],
    components: {Loader},

    data: () => ({
      showDialog: true,
      sending: false,
      form: {phone: '', address: ''},
    }),
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
      async editContact() {
        this.sending = true
        const formData = {phone: this.form.phone, address: this.form.address, id: this.current[0].id}
        console.log(this.current)
        try {
          await this.$store.dispatch('editContact', formData)
          this.clearForm()
          this.sending = false
          this.$emit('edited', formData)
          this.messageShow(`The contact data: |${formData.phone}| and |${formData.address}| was been edited! 👍`, true, 6000)
        } catch (e) {
          this.sending = false // add preload
          this.messageShow(`Error 😱: ${e.message} !!!`, true, 5000)
        }
      },
      clearForm() {
        this.$v.$reset()
        this.form.phone = ''
        this.form.address = ''
      },
      validateAndSubmitHandler() {
        if (this.$v.$invalid) {
          this.$v.$touch()
          return
        }
        this.editContact()
      },
    },
    computed: {},
    beforeMount() {
      this.form.phone = this.current[0].phone // Initial data for our model form
      this.form.address = this.current[0].address // Initial data for our model form
    }
  }
</script>
<style lang="sass" scoped>
    .md-dialog-title
        padding-top: 0
        display: block
        text-align: center

    .help
        text-align: center
        display: block

</style>