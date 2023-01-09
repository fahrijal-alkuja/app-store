<template>
  <v-card class="mx-auto mt-4" max-width="500" variant="outlined">
    <v-card-title class="justify-center">Login</v-card-title>
    <v-card-text>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          variant="outlined"
          v-model="email"
          :rules="emailRules"
          label="Email"
          name="email"
          prepend-icon="mdi-account"
          type="email"
        ></v-text-field>
        <v-text-field
          variant="outlined"
          v-model="password"
          :rules="passwordRules"
          label="Password"
          name="password"
          prepend-icon="mdi-lock"
          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show ? 'text' : 'password'"
          @click:append="show = !show"
          required
        ></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" text @click="login" :disabled="!valid"
        >Login</v-btn
      >
    </v-card-actions>
  </v-card>
  <!-- <div class="text-center">
    <TheSnackbar />
  </div> -->
</template>
<script setup>
import { useAuth } from "~/stores/auth";
import { useSnackbar } from "~/stores/snackbar";
const snackbars = useSnackbar();
const authStore = useAuth();
const config = useRuntimeConfig();
const email = ref("rizal.alkuja@gmail.com");
const password = ref("alkuja07");
const valid = ref(false);
const show = ref(false);
const emailRules = [
  (v) => !!v || "Email is required",
  (v) => /.+@.+/.test(v) || "Email must be valid",
];
const passwordRules = [
  (v) => !!v || "Password is required",
  (v) => v.length >= 8 || "Password must be at least 8 characters",
];

const login = async () => {
  if (!valid) return;

  try {
    const form = {
      email: email.value,
      password: password.value,
    };

    const user = await useFetch(`${config.baseUrl}auth/signin`, {
      method: "POST",
      body: form,
    });

    const userInfo = await useFetch(`${config.baseUrl}auth`, {
      method: "Get",
      headers: {
        Authorization: `Bearer ${user.data.value.accessToken}`,
      },
    });

    authStore.setauth(userInfo.data.value);
    authStore.getToken(user.data.value.accessToken);

    if (authStore.Authenticator.rule === "admin") {
      navigateTo("/admin");
    } else if (authStore.Authenticator.rule === "user") {
      navigateTo("/");
    } else {
      navigateTo("/login");
    }
  } catch (error) {
    snackbars.setSnackbar({
      text: `email or password is wrong`,
    });
  }
};
</script>
