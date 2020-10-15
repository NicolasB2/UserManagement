<template>
  <v-app>
    <v-main>
      <v-container>
        <login/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import login from './components/Login';

export default {
  name: 'App',

  components: {
    login,
  },

  data: () => ({
    //
  }),
};
</script>
