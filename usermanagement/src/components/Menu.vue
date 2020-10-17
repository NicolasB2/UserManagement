<template>
      <v-toolbar dark >
        <v-toolbar-title>Desktop Menu</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
         <v-btn
           v-for="item in nav"
           :key="item.icon"
           :to="item.to"
           :title="item.title"
           text
         >{{ item.text }}</v-btn>
        </v-toolbar-items>
      </v-toolbar>

</template>

<script>
//import HelloWorld from "./components/HelloWorld";

export default {
  data () {
    return {
      dialog: false,
      nav: [
        {
          icon: 'mdi-home',
          text: 'Users',
          to: "/users",
          title: 'Users Table',
          active: true
        },
        {
          icon: 'mdi-info',
          text: 'Dependencies',
          to: "/dependencies",
          title: 'Dependencies list',
          active: false
        }
      ]
    }
  }
};
</script>
<style>

</style>
