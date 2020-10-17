<template>
  <div id="menu">
    <v-app>
      <v-container fluid class="pa-0 menu">
            <div class="text-center">
              <div class="my-2">
                <v-btn to="/dependencies" class = "btn_menu" elevation="14" x-large color="secondary" dark> Dependencies </v-btn>
              </div>
              <div class="my-2">
                <v-btn to="/Users" class = "btn_menu" elevation="14" x-large  color="primary" dark> Users </v-btn>
              </div>
              <div class="my-2">
                <v-btn to="/search" class = "btn_menu" elevation="14" x-large color="error" dark  > Search </v-btn>
              </div>
            </div>
      </v-container>
    </v-app>
  </div>
</template>

<script>
export default {};
</script>
<style>
.menu{
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
.btn_menu{
  height:200px;
  width:200px;
}
</style>