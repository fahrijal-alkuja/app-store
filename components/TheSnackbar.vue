<template>
  <client-only>
    <v-snackbar
      v-model="snackbars.snackbars.showing"
      :timeout="snackbars.snackbars.timeout"
      :color="snackbars.snackbars.color"
    >
      {{ snackbars.snackbars.text }}
      <template v-slot:actions>
        <v-btn
          color="pink"
          variant="text"
          @click="snackbars.snackbars.showing = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </client-only>
</template>

<script setup>
import { useSnackbar } from "~/stores/snackbar";
const snackbars = useSnackbar();
const snackbar = ref(false);
</script>
