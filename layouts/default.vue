<template>
  <v-app id="inspire">
    <v-system-bar>
      <v-spacer></v-spacer>
      <v-btn
        @click="toggleTheme"
        icon="mdi-theme-light-dark"
        variant="text"
        class="ml-2"
      ></v-btn>
      <span class="ml-2">{{ theme.global.name.value }}</span>
    </v-system-bar>

    <v-app-bar :elevation="2" rounded>
      <v-app-bar-title>Title</v-app-bar-title>
      <!-- home button -->
      <v-spacer></v-spacer>
      <v-btn icon to="/">
        <v-icon>mdi-store-outline</v-icon>
      </v-btn>
      <!-- end home button -->
      <v-btn v-if="authStore.Authenticator" icon to="/cart">
        <v-badge :content="count" color="error">
          <v-icon>mdi-cart</v-icon>
        </v-badge>
      </v-btn>
      <v-btn icon v-if="authStore.Authenticator" to="/users">
        <v-icon>mdi-account</v-icon>
      </v-btn>
      <v-divider vertical></v-divider>
      <!-- login -->
      <v-btn v-if="authStore.Authenticator" @click="logout()">
        <v-icon>mdi-account-remove</v-icon> Logout
      </v-btn>
      <v-btn v-else to="/login"> <v-icon>mdi-account-key</v-icon> Login </v-btn>
      <!-- login -->
    </v-app-bar>
    <v-main>
      <slot />
    </v-main>
  </v-app>
</template>

<script setup>
import { useTheme } from "vuetify";
import { useCart } from "~/stores/cart";
import { useAuth } from "~/stores/auth";

const menu = ref(false);
const authStore = useAuth();
const theme = useTheme();
const cartStore = useCart();
const count = computed(() => cartStore.count);
const logout = () => {
  authStore.logout();
  navigateTo("/");
};

const toggleTheme = () =>
  (theme.global.name.value = theme.global.current.value.dark
    ? "light"
    : "dark");
</script>
