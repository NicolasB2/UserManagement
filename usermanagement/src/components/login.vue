<template>
    <div id = "login">
        <v-flex  class="vux-center">
            <div class = "login-form" >
            <v-card elevation="10" class = "form-wrapper">
                <v-form v-model="valid">
                    <v-text-field prepend-icon="mdi-eye" label="Email" required :rules="emailRules" v-model.lazy="email"></v-text-field>
                    <v-text-field prepend-icon="mdi-eye"
                        autocomplete="current-password"
                        :value="password"
                        label="Enter password"
                        :append-icon="value ? 'mdi-eye' : 'mdi-eye-off'"
                        @click:append="() => (value = !value)"
                        :type="value ? 'password' : 'text'"
                        :rules="passwordRule"
                        :v-model="password"
                    ></v-text-field>
                    <v-btn to="/home" :disabled="!valid">Login</v-btn>
                </v-form>
            </v-card>
            </div>
        </v-flex>
    </div>
</template>

<script>

export default {

    data(){
        return{
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