<script setup>
const user = useCookie("user");
const token = useCookie("token");
const logout = () => {
  user.value = null;
  token.value = null;
  navigateTo("/");
};
</script>

<template>
  <v-app-bar>
    <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

    <v-toolbar-title to="/">Lapak KU</v-toolbar-title>
    <!-- home button -->
    <v-spacer></v-spacer>
    <v-btn icon to="/admin/user">
      <v-icon>mdi-account</v-icon>
    </v-btn>
    <v-btn icon to="/admin">
      <v-icon>mdi-home</v-icon>
    </v-btn>
    <!-- logout -->
    <v-btn icon v-if="user" @click="logout()">
      <v-icon>mdi-account</v-icon>
    </v-btn>
  </v-app-bar>
</template>
