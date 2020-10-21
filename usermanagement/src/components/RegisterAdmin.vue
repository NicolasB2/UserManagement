<template>
  <v-flex class="vux-center">
      <div class="register-form">  
      <v-card elevation="10" class = "form-wrapper">
        <h2> Register </h2>
        <v-form>
          <v-text-field
            v-model="admin.name"
            required
            label="Name"
          ></v-text-field>
          <v-text-field
            v-model="admin.lastname"
            required
            label="Last name"
          ></v-text-field>
          <v-text-field
            v-model="admin.email"
            label="E-mail"
            :rules="emailRules"
          ></v-text-field>
          <v-text-field
            v-model="admin.password"
            label="Password"
            :rules="passwordRule"
          ></v-text-field>
          
          
          <v-btn
            class="mr-4"
            @click="save"
            router
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
  import { db } from "../main";

  export default {


    data: () => ({
      admin: {
        name: '',
        lastname: '',
        email: '',
        password: '',
      },
      
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
      async save(){

        var CryptoJS = require("crypto-js");

        // Encrypt
        var ciphertext = CryptoJS.AES.encrypt(this.admin.password, 'secret key 123').toString();

        await db.collection("admins").add({
          name: this.admin.name,
          lastname: this.admin.name,
          email: this.admin.name,
          password: ciphertext,
        });

        this.$router.push('/users')
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