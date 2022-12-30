<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4">
        <v-img
          class="bg-white"
          width="300"
          :aspect-ratio="1"
          :src="poruduct.image"
          cover
        ></v-img>
      </v-col>
      <v-col cols="12" md="8">
        <v-card variant="outlined">
          <v-card-item>
            <div>
              <div class="text-h6 mb-1">{{ poruduct.title }}</div>
              <div class="text-caption">
                {{ poruduct.description }}
              </div>
            </div>
          </v-card-item>
          <v-divider class="mx-4 mb-1"></v-divider>
          <v-card-title>Rp.{{ poruduct.price }}</v-card-title>
          <v-card-actions>
            <v-btn variant="outlined" @click="addCart()"> Add Cart </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              icon
              variant="outlined"
              color="red"
              class="mr-2"
              @click="counter++"
              ><v-icon>mdi-plus</v-icon></v-btn
            >
            <v-text-field
              v-model="Qt"
              type="text"
              style="width: 1px"
            ></v-text-field>

            <v-btn
              icon
              variant="outlined"
              color="blue"
              class="ml-2"
              @click="counter > 1 ? counter-- : 1"
              ><v-icon>mdi-minus</v-icon></v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <div class="text-center">
    <TheSnackbar />
  </div>
</template>

<script setup>
import { useCart } from "~/stores/cart";
import { useSnackbar } from "~/stores/snackbar";
import { useAuth } from "~/stores/auth";
const authStore = useAuth();
const snackbars = useSnackbar();
const cartStore = useCart();
const user = useCookie("auth");
const route = useRoute();
const { data: poruduct } = await useFetch(
  `http://localhost:5000/product/${route.params.id}`
);

const counter = useState("counter", () => 1);
const Qt = ref(counter);

const addCart = () => {
  if (!authStore.Authenticator) {
    navigateTo("/login");
  } else {
    const carts = {
      id: poruduct.value.id,
      price: poruduct.value.price,
      title: poruduct.value.title,
      quantity: Qt.value,
    };

    cartStore.add(carts);
    snackbars.setSnackbar({
      text: `Barang Anda berhasil Dimasukkan Kekeranjang.`,
    });
  }
};
</script>

<style lang="scss" scoped></style>
