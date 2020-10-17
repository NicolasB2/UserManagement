<template>
  <v-app>
    <v-main>
      <Menu/>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import Menu from './components/Menu';
export default {
  name: 'App',

  components: {
    Menu,
  },

  data: () => ({
    //
  }),
};
</script>
