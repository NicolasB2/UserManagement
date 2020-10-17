import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router';

import Home from './components/Home';
import Login from './components/Login';
import Dependencies from './components/Dependencies';
import Users from './components/Users';
import Search from './components/Search';


const routes = [
  {
    path: '/',
    component: Login
  },
  {
    path: '/home',
    component: Home
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
    path: '/search',
    component: Search
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
