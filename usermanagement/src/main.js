import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueRouter from 'vue-router'

import Home from './components/Home'
import Login from './components/Login'


const routes = [
  {
    path: '/home',
    component: Home
  },
  {
    path: '/login',
    component: Login
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
