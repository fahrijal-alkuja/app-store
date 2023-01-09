<template>
  <v-container>
    <v-card class="mx-auto mt-4" max-width="500" variant="outlined">
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            variant="outlined"
            v-model="registerUser.name"
            label="Nama Lengkap"
            name="Nama"
            prepend-icon="mdi-account"
            type="email"
          ></v-text-field>
          <v-text-field
            variant="outlined"
            v-model="registerUser.email"
            :rules="emailRules"
            label="Email"
            name="email"
            prepend-icon="mdi-account"
            type="email"
          ></v-text-field>
          <v-text-field
            variant="outlined"
            v-model="registerUser.password"
            :rules="passwordRules"
            label="Password"
            name="password"
            prepend-icon="mdi-account"
            type="email"
          ></v-text-field>

          <v-btn
            color="error"
            class="mr-4"
            @click="register"
            :disabled="!valid"
          >
            Register</v-btn
          >
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { useUsersStore } from "~/stores/users";
import { useAuth } from "~/stores/auth";
const config = useRuntimeConfig();
const usersStore = useUsersStore();
const authStore = useAuth();
const valid = ref(false);
const emailRules = [
  (v) => !!v || "Email is required",
  (v) => /.+@.+/.test(v) || "Email must be valid",
];
const passwordRules = [
  (v) => !!v || "Password is required",
  (v) => v.length >= 8 || "Password must be at least 8 characters",
];
const daftar = ref({
  user_id: "",
  nama: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  country: "",
  image: "",
});
const registerUser = ref({
  email: "",
  password: "",
  name: "",
  rules: "user",
});

const register = async () => {
  if (!valid) return;
  try {
    await usersStore.addNewUsers(registerUser.value);

    const user = await useFetch(`${config.baseUrl}auth/signin`, {
      method: "POST",
      body: registerUser,
    });

    const userInfo = await useFetch(`${config.baseUrl}auth`, {
      method: "Get",
      headers: {
        Authorization: `Bearer ${user.data.value.accessToken}`,
      },
    });

    await authStore.setauth(userInfo.data.value);
    await authStore.getToken(user.data.value.accessToken);
    if (!usersStore.users.profile) {
      navigateTo("/users/profile");
    }
  } catch (error) {
    console.log(error);
  }
};
</script>

<style></style>
