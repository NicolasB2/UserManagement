import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router';

import firebase from 'firebase/app';
import 'firebase/firestore'

import Login from './components/Login';
import Dependencies from './components/Dependencies';
import Users from './components/Users';
import RegisterAdmin from './components/RegisterAdmin'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAynqRkqrMf3OwshaaxKZOOzlidDPhl-DE",
  authDomain: "user-management-8e6de.firebaseapp.com",
  databaseURL: "https://user-management-8e6de.firebaseio.com",
  projectId: "user-management-8e6de",
  storageBucket: "user-management-8e6de.appspot.com",
  messagingSenderId: "1016170815027",
  appId: "1:1016170815027:web:eb7f06f9d8f757d9adcd46"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();

const routes = [
  {
    path: '/',
    component: Login
  },
  {
    path: '/dependencies',
    component: Dependencies
  },
  {
    path: '/users',
    component: Users
  },
  {
    path: '/register',
    component: RegisterAdmin
  }
  
]

Vue.config.productionTip = false
Vue.use(VueRouter);

const router = new VueRouter({ routes })

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
