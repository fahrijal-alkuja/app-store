<template>
  <v-container>
    <h1>Welcome Admin</h1>
    <h3>{{ authStore.Authenticator.username }} ! 👋</h3>
  </v-container>
</template>

<script setup>
import { useAuth } from "~/stores/auth";

definePageMeta({
  layout: "admin",
  middleware: ["admin"],
});
const authStore = useAuth();
</script>

<style scoped></style>
