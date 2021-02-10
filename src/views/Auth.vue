<template>
    <div>
        <!--<ButtonHelp></ButtonHelp>-->
        <form novalidate class="md-layout" @submit.prevent="validateAndSubmitHandler">
            <md-card class="md-layout-item md-size-100 md-small-size-100">
                <md-card-header>
                    <div class="md-title">Login</div>
                </md-card-header>

                <md-card-content>
                    <div class="md-layout md-gutter">
                        <div class="md-layout-item md-small-size-100">
                            <md-field :class="getValidationClass('email')">
                                <label for="email">Email</label>
                                <md-input
                                        type="email"
                                        name="email" id="email" autocomplete="email"
                                        v-model.trim="form.email"
                                        :disabled="sending"
                                        :class="{invalid: ($v.form.email.$dirty && !$v.form.email.required) || ($v.form.email.$dirty && $v.form.email.email)}"
                                />
                                <span class="md-error" v-if="$v.form.email.$dirty && !$v.form.email.required">The email is required</span>
                                <span class="md-error" v-else-if="$v.form.email.$dirty && !$v.form.email.email">Invalid email</span>
                            </md-field>
                        </div>

                        <div class="md-layout-item md-small-size-100">
                            <md-field :class="getValidationClass('password')">
                                <label for="password">Password</label>
                                <md-input
                                        name="password" id="password" autocomplete="password"
                                        v-model="form.password"
                                        type="password"
                                        :disabled="sending"
                                        :class="{invalid: ($v.form.password.$dirty && !$v.form.password.required) || ($v.form.password.$dirty && $v.form.password.minlength)}"
                                />
                                <span class="md-error" v-if="$v.form.password.$dirty && !$v.form.password.required">The password is required</span>
                                <span class="md-error" v-else-if="$v.form.password.$dirty && !$v.form.password.minlength">The password min is {{$v.form.password.$params.minLength.min}} symbols. {{form.password.length}} symbols.</span>
                            </md-field>
                        </div>
                    </div>
                </md-card-content>

                <md-progress-bar md-mode="indeterminate" v-if="sending" />

                <md-card-actions>
                    <md-button @click="clearForm" type="submit" class="md-primary" :disabled="sending">Clear</md-button>
                    <md-button type="submit" class="md-primary" :disabled="sending">Login</md-button>
                </md-card-actions>
                <div class="help">
                    <span>No account?</span>&nbsp;&nbsp;👉&nbsp;&nbsp;<router-link to="/register">Register</router-link>
                </div>
            </md-card>

            <md-snackbar
                    :md-active.sync="message.status"
                    md-persistent
                    @md-closed="closedMessage"
            >{{message.text}}</md-snackbar>
        </form>
    </div>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import showMessage from '@/mixins/showMessage'
  import ButtonHelp from '@/components/app/ButtonHelp'
  import textMessages from '@/utils/textMessage'
  import {required, email, minLength,} from 'vuelidate/lib/validators'

  export default {
    name: 'Auth',
    components: {
      ButtonHelp
    },
    mixins: [validationMixin, showMessage],
    data: () => ({
      form: {email: null, password: null},
      sending: false,
      lastUser: null
    }),
    validations: {
      form: {
        password: {required, minLength: minLength(6)},
        email: {required, email}
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
      clearForm() {
        this.$v.$reset()
        this.form.password = null
        this.form.email = null
      },
      async saveUser() {
        this.sending = true // add preload
        const formData = {email: this.form.email, password: this.form.password} // generate object user
        this.lastUser = `${this.form.email}`

        try {
          await this.$store.dispatch('login', formData)
          this.clearForm()
          this.messageShow(`The user 📧: ${this.lastUser} was authorized with success! 👍`, true, 6000)
          this.$router.push('/?message=auth')
        } catch (e) {
          this.sending = false // add preload
          this.messageShow(`Error 😱: ${e.message} !!!`, true, 6000)
        }
      },
      validateAndSubmitHandler () {
        if (this.$v.$invalid) {
          this.$v.$touch()
          return
        }
        this.saveUser()
      },
      closedMessage() {
        console.log('Closed')
      }
    },
    mounted() {
      this.messageShow('Приветствуем, дорогой дрyг 😎', true, 3000)
      if(textMessages[this.$route.query.message]) {
        this.messageShow(`${textMessages[this.$route.query.message]}`, true, 5000)
      }
    },
    created() {}
  }
</script>

<style lang="sass" scoped>
    .md-progress-bar
        position: absolute
        top: 0
        right: 0
        left: 0
</style>