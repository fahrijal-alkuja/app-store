<template>
  <v-app id="admin">
    <v-navigation-drawer v-model="drawer">
      <v-sheet color="grey-lighten-4" class="pa-4">
        <v-avatar class="mb-4" color="grey-darken-1" size="64"></v-avatar>

        <div>{{ authStore.Authenticator.username }}</div>
      </v-sheet>
      <v-divider></v-divider>
      <v-list density="compact">
        <v-list-subheader>Manu Admin</v-list-subheader>

        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          active-color="primary"
        >
          <template v-slot:prepend>
            <v-icon :icon="item.icon"></v-icon>
          </template>

          <v-list-item-title v-text="item.title"></v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Application</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click="logout()">
        <v-icon>mdi-account-remove</v-icon> Logout
      </v-btn>
    </v-app-bar>

    <v-main>
      <slot />
    </v-main>
  </v-app>
</template>

<script>
import { useAuth } from "~/stores/auth";
const authStore = useAuth();
export default {
  data: () => ({ drawer: null }),
};
</script>

<script setup>
const items = [
  {
    icon: "mdi-apps",
    title: "Users",
    to: "/admin/user",
  },
  {
    icon: "mdi-store",
    title: "Product",
    to: "/admin/product",
  },
];

const logout = () => {
  authStore.logout();
  navigateTo("/");
};
</script>

<style scoped></style>
