<template>
  <div class = "form-wrapper">
      <v-form v-model="valid">
          <v-text-field label="Name" required :rules="nameRules" v-model="name"></v-text-field>
          <v-text-field label="Email" required :rules="emailRules" v-model.lazy="email"></v-text-field>
          <v-text-field label="Phone" required :rules="phoneRules"  v-model="phone"></v-text-field>
          <v-btn @click="submit" :disabled="!valid">Submit</v-btn>
      </v-form>
  </div>
</template>

<script>
//import { mask } from 'vue-the-mask';

export default {
    directives:{
        //mask,
    },

    data(){
        return{
            name:"",
            email:"",
            phone:"",
            submitted:false,
            valid:false,
            nameRules: [ 
                (name) => !!name || "Name is required",
                (name) => name.length > 2 || "Name is too short",
            ],
            emailRules: [ 
                (email) => !!email || "Email is required",
                (email) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email) || "Email is invalid",
            ],
            phoneRules: [ 
                (phone) => !!phone || "Phone is required",
                (phone) => phone.length >=7 || "Phone is too short",
            ]
        }
    },
    methods: {
        submit(){
            this.submitted=true,
            console.log("Name",this.name,"Phone",this.phone,"Name",this.email)
        }
    }
}
</script>

<style scoped>
    .form-wrepper{
        padding:40px;
    }
</style>