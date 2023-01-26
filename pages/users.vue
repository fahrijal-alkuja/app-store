<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="2" sm="2" lg="2">
        <v-card class="py-2 px-3">
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
        </v-card>
      </v-col>
      <v-col cols="12" sm="10" md="10" lg="10">
        <NuxtPage />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useAuth } from "~/stores/auth";
const authStore = useAuth();
definePageMeta({
  middleware: ["user"],
});

const items = [
  {
    icon: "mdi-apps",
    title: "Profile",
    to: "/users/profile",
  },
  {
    icon: "mdi-store",
    title: "History Belanja",
    to: "/users/history",
  },
];
</script>
