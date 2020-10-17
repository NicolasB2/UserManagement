<template>
  <v-app>
    <v-main>
      <Menu v-if="isNotInLogin()" />
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

  methods: {
    isNotInLogin() {
      return this.$router.history.current["path"] !== "/";
    }
  },
};
</script>
