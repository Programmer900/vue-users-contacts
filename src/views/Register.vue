<template>
    <div>
        <form novalidate class="md-layout registerForm" @submit.prevent="validateAndSubmitHandler">
            <md-card class="md-layout-item md-size-100 md-small-size-100">
                <md-card-header>
                    <div class="md-title">Sign Up</div>
                </md-card-header>

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
                                        :class="{invalid: ($v.form.phone.$dirty && !$v.form.phone.required) || ($v.form.phone.$dirty && $v.form.phone.phone)}"
                                />
                                <span class="md-error" v-if="$v.form.phone.$dirty && !$v.form.phone.required">The phone is required</span>
                                <span class="md-error" v-else-if="$v.form.phone.$dirty && !$v.form.phone.phone">Invalid phone</span>
                            </md-field>
                        </div>
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
                        <div class="md-layout-item md-small-size-100">
                            <md-field :class="getValidationClass('name')">
                                <label for="email">Name</label>
                                <md-input
                                        type="name"
                                        name="name" id="name" autocomplete="name"
                                        v-model.trim="form.name"
                                        :disabled="sending"
                                        :class="{invalid: ($v.form.name.$dirty && !$v.form.name.required) || ($v.form.name.$dirty && !$v.form.name.minLength)}"
                                />
                                <span class="md-error" v-if="$v.form.name.$dirty && !$v.form.name.required">The name is required</span>
                                <span class="md-error" v-else-if="$v.form.name.$dirty && !$v.form.name.minLength">Min count symbols is {{$v.form.name.$params.minLength.min}}</span>
                            </md-field>
                        </div>
                    </div>
                    <div class="md-layout md-gutter">
                        <div class="md-layout-item md-small-size-100"
                             :class="{invalid_agree: ($v.form.agree.$dirty && !$v.form.agree.checked)}"
                        >
                            <md-checkbox
                                    v-model="form.agree" class="md-primary"
                                    :class="{invalid: ($v.form.agree.$dirty && !$v.form.agree.checked)}"
                            >I agree with everything :)</md-checkbox>
                            <span class="md-error" v-if="$v.form.agree.$dirty && !$v.form.agree.checked">Do you agree with the rules of the game ? :)</span>
                        </div>
                    </div>
                </md-card-content>

                <md-progress-bar md-mode="indeterminate" v-if="sending" />

                <md-card-actions>
                    <md-button @click="clearForm" type="submit" class="md-primary" :disabled="sending">Clear</md-button>
                    <md-button type="submit" class="md-primary" :disabled="sending">Register</md-button>
                </md-card-actions>
                <div class="help">
                    <span>Have an account?</span>&nbsp;&nbsp;👉&nbsp;&nbsp;<router-link to="/auth">Sign In</router-link>
                </div>
            </md-card>
            <md-snackbar
                    :md-active.sync="message.status"
                    md-persistent
            >{{message.text}}</md-snackbar>
        </form>
    </div>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import showMessage from '@/mixins/showMessage'
  import textMessages from '@/utils/textMessage'
  import {required, email, minLength, helpers} from 'vuelidate/lib/validators'

  const phoneRegexp = helpers.regex('phone', /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/)

  export default {
    name: 'Register',
    mixins: [validationMixin, showMessage],
    data: () => ({
      form: {email: null, phone: null, password: null, name: '', agree: false},
      sending: false,
      lastUser: null,
    }),
    validations: {
      form: {
        email: {required, email},
        phone: {required, phoneRegexp},
        password: {required, minLength: minLength(6)},
        name: {required, minLength: minLength(2)},
        agree: {checked: v => v}
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
      clearForm () {
        this.$v.$reset()
      },
      async registerUser () {
        this.sending = true
        const formData = {
          email: this.form.email,
          phone: this.form.phone,
          password: this.form.password,
          name: this.form.name
        }
        this.lastUser = `📧: ${this.form.email} - 👤: ${this.form.name}`

        try {
          await this.$store.dispatch('register', formData)
          this.clearForm()
          this.messageShow(`The user ${this.lastUser} was authorized with success! 👍`, true, 6000)
          this.$router.push('/?message=register')
        } catch (e) {
          this.sending = false
          this.messageShow(`Error 😱: ${e.message} !!!`, true, 3000)
        }
      },
      validateAndSubmitHandler () {
        if (this.$v.$invalid) {
          this.$v.$touch()
          return
        }
        this.registerUser()
      },
    },
    mounted() {
      this.messageShow('От увлекательного путешествия, Вас отделяет регистрация 🤗', true, 5000)
      if(textMessages[this.$route.query.message]) {
        this.messageShow(`${textMessages[this.$route.query.message]}`, true, 5000)
      }
    }
  }
</script>

<style lang="sass" scoped>
    .md-progress-bar
        position: absolute
        top: 0
        right: 0
        left: 0
    .invalid_agree .md-error
        opacity: 1
        color: #ff1744 !important
        transform: translateZ(0)
        display: block
</style>
