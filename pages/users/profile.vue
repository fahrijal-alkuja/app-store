<template>
  <v-container>
    <h1>user profile</h1>
    <v-card class="mx-auto">
      {{ profile }}
    </v-card>
  </v-container>
</template>

<script setup>
import { useAuth } from "~/stores/auth";

definePageMeta({
  layout: "default",
  middleware: ["user"],
});
const authStore = useAuth();
const { data: profile } = await useAsyncData("profile", () =>
  $fetch(`http://localhost:5000/profile/${authStore.Authenticator.sub}`)
);
</script>

<style lang="scss" scoped></style>
