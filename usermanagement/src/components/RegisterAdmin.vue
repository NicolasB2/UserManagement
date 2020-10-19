<template>
  <v-flex class="vux-center">
      <div class="register-form">  
      <v-card elevation="10" class = "form-wrapper">
        <h2> Register </h2>
        <v-form>
          <v-text-field
            v-model="name"
            :error-messages="nameErrors"
            :counter="10"
            label="Name"
            required
            @input="$v.name.$touch()"
            @blur="$v.name.$touch()"
          ></v-text-field>
          <v-text-field
            v-model="lastname"
            :error-messages="lastnameErrors"
            label="Last name"
            required
            @input="$v.lastname.$touch()"
            @blur="$v.lastname.$touch()"
          ></v-text-field>
          <v-text-field
            v-model="email"
            :error-messages="emailErrors"
            label="E-mail"
            required
            @input="$v.email.$touch()"
            @blur="$v.email.$touch()"
          ></v-text-field>
          <v-text-field
            v-model="password"
            :error-messages="passwordErrors"
            label="Password"
            required
            :rules="passwordRule"
          ></v-text-field>
          
          
          <v-btn
            class="mr-4"
            @click="submit"
            to="/users" 
          >
            Register
          </v-btn>
          <v-btn @click="clear">
            Clear
          </v-btn>
        </v-form>
      </v-card>
      </div>
  </v-flex>  
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import { required, maxLength, email } from 'vuelidate/lib/validators'

  export default {
    mixins: [validationMixin],

    validations: {
      name: { required, maxLength: maxLength(10) },
      lastname: {required, maxLength: maxLength(10)},
      email: { required, email },
      checkbox: {
        checked (val) {
          return val
        },
      },
    },

    data: () => ({
      name: '',
      lastname: '',
      email: '',
      password: '',
      passwordRule: [
        (Password) => !!Password || "Password is required",
        (Password) => Password.length >=7 || "Password is too short"
      ]
    }),

    computed: {

      nameErrors () {
        const errors = []
        if (!this.$v.name.$dirty) return errors
        !this.$v.name.maxLength && errors.push('Name must be at most 10 characters long')
        !this.$v.name.required && errors.push('Name is required.')
        return errors
      },
      lastnameErrors () {
        const errors = []
        if (!this.$v.lastname.$dirty) return errors
        !this.$v.lastname.maxLength && errors.push('Last name must be at most 10 characters long')
        !this.$v.lastname.required && errors.push('Last name is required.')
        return errors
      },
      emailErrors () {
        const errors = []
        if (!this.$v.email.$dirty) return errors
        !this.$v.email.email && errors.push('Must be valid e-mail')
        !this.$v.email.required && errors.push('E-mail is required')
        return errors
      },
    },

    methods: {
      submit () {
        this.$v.$touch()
      },
      clear () {
        this.$v.$reset()
        this.name = ''
        this.lastname = ''
        this.password = ''
        this.email = ''
      },
    },
  }
</script>

<style>
    .form-wrapper{
        padding: 50px;
        border-top:200px;
    }
    .register-form{
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
    }
</style>