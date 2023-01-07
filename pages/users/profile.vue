<template>
  <v-container>
    <h1>User profile</h1>
    <v-card class="mx-auto">
      <v-form v-model="valid">
        <v-container>
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                label="Nama"
                v-model="profileItem.nama"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                label="Phone"
                v-model="profileItem.phone"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                label="E-mail"
                v-model="profileItem.email"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                label="Alamat"
                v-model="profileItem.address"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                label="City"
                v-model="profileItem.city"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                label="Country"
                v-model="profileItem.country"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                label="Zip"
                v-model="profileItem.zip"
                required
              ></v-text-field>
            </v-col>
          </v-row>

          <v-btn color="error" class="mr-4" @click="edit"> Update Profile </v-btn>
        </v-container>
      </v-form>
    </v-card>
  </v-container>
  <TheSnackbar />
</template>

<script setup>
import { useAuth } from "~/stores/auth";
import { useProfile } from "~/stores/profile";
import { useSnackbar } from "~/stores/snackbar";

definePageMeta({
  layout: "default",
  middleware: ["user"],
});
const snackbars = useSnackbar();
const valid = ref(false);
const authStore = useAuth();
const profileStore = useProfile();
const config = useRuntimeConfig();
const { data: profile } = await useAsyncData("profile", () =>
  $fetch(`${config.baseUrl}profile/${authStore.Authenticator.sub}`)
);

const profileItem = ref({
  id: profile.value.id,
  user_id: authStore.Authenticator.sub,
  nama: profile.value.nama,
  email: profile.value.email,
  phone: profile.value.phone,
  address: profile.value.address,
  city: profile.value.city,
  state: profile.value.state,
  zip: profile.value.zip,
  country: profile.value.country,
  image: profile.value.image,
});

const edit = async () => {
  await profileStore.updateProfile(profileItem.value);
  snackbars.setSnackbar({
      text: `Data Berhasil Diubah.`,
    });
};
</script>

<style lang="scss" scoped></style>
