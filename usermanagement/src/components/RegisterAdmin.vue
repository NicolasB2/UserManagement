<template>
  <v-flex class="vux-center">
      <div class="register-form">  
      <v-card elevation="10" class = "form-wrapper">
        <h2> Register </h2>
        <v-form>
          <v-text-field
            v-model="name"
            label="Name"
          ></v-text-field>
          <v-text-field
            v-model="lastname"
            label="Last name"
          ></v-text-field>
          <v-text-field
            v-model="email"
            label="E-mail"
            :rules="emailRules"
          ></v-text-field>
          <v-text-field
            v-model="password"
            label="Password"
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
      ],
      
      emailRules: [ 
        (email) => !!email || "Email is required",
        (email) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email) || "Email is invalid",
      ],

      rules: {
        required: value => !!value || "Required.",
        password: value => {
            const pattern = /^(?=.*[a-z])/;
            return (
              pattern.test(value) ||
              "Min. 8 characters with at least one capital letter, a number and a special character."
            );
        }
      }
    }),

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