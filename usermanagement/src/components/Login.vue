<template>
    <div id = "Login">
        <v-flex  class="vux-center">
            <div class = "login-form" >
            <v-card elevation="10" class = "form-wrapper">
                <v-form v-model="valid">
                    <v-text-field prepend-icon='mdi-email' label="Email" required :rules="emailRules" v-model.lazy="email"></v-text-field>
                    <v-text-field prepend-icon='mdi-lock'
                        autocomplete="current-password"
                        :value="password"
                        label="Enter password"
                        :append-icon="value ? 'mdi-eye' : 'mdi-eye-off'"
                        @click:append="() => (value = !value)"
                        :type="value ? 'password' : 'text'"
                        :rules="passwordRule"
                        v-model="password"
                    ></v-text-field>
                    <v-btn  :disabled="!valid" @click="verifyAdmin" router>Login</v-btn>
                    <v-btn to="/register" > Register</v-btn>    
                </v-form>
            </v-card>
            <v-dialog v-model="error" max-width="400px">
                <v-alert type="error">The user email or password is incorrect</v-alert>
            </v-dialog>
            </div>
        </v-flex>
    </div>
</template>

<script>
import { db } from "../main";

export default {

    data(){
        return{
            error: false,
            email:"",
            password: "",
            value: true,
            submitted:false,
            valid:false,
            emailRules: [ 
                (email) => !!email || "Email is required",
                (email) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email) || "Email is invalid",
            ],
            passwordRule: [ 
                (Password) => !!Password || "password is required",
                (Password) => Password.length >=7 || "Password is too short",
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
        }
    },

    methods: {

        async verifyAdmin(){
            
            var CryptoJS = require("crypto-js");
            const snapshot = await db.collection("admins").where("email", "==", this.email).get();
            
            if(snapshot.size==0){
                 this.error = true;
            }

            snapshot.forEach((doc) => {

                let adminData = doc.data();  
                var bytes  = CryptoJS.AES.decrypt(adminData.password, 'secret key 123');
                var originalText = bytes.toString(CryptoJS.enc.Utf8);
                
                if(originalText===this.password){
                    this.$router.push('/users')
                }else{
                    this.error = true;
                }
            });

        }



    }

}
</script>

<style scoped>
    .form-wrapper{
        padding:40px;
        border-top:200px;
    }
    .login-form{
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
    }
</style>