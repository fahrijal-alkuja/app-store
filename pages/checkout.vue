<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6" md="8" lg="12">
        <v-card>
          <v-card-title>Data Pengiriman </v-card-title>
          <v-card-text>
            <v-table>
              <tr>
                <td>Nama</td>
                <td><span>:</span> {{ profile.nama }}</td>
              </tr>
              <tr>
                <td>Phone</td>
                <td><span>:</span> {{ profile.phone }}</td>
              </tr>
              <tr>
                <td>Alamat</td>
                <td><span>:</span> {{ profile.address }}</td>
              </tr>
            </v-table>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="8" lg="12">
        <v-card>
          <v-card-title>Data Barang</v-card-title>
          <v-card-text>
            <v-table>
              <thead>
                <tr>
                  <th>Nama Barang</th>
                  <th>Jumlah</th>
                  <th>Harga</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in Products" :key="item.id">
                  <td>{{ item.title }}</td>
                  <td>{{ item.quantity }}</td>
                  <td>{{ item.price }}</td>
                </tr>
                <tr>
                  <td>Total</td>
                  <td>Rp.{{ cartStore.total }}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <v-btn @click="orderNow">Buat Pesanan</v-btn>
                </tr>
              </tfoot>
            </v-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useCart } from "~/stores/cart";
import { useAuth } from "~/stores/auth";
import { useOrder } from "~/stores/order";
const cartStore = useCart();
const authStore = useAuth();
const orderStore = useOrder();
const { data: profile } = await useAsyncData("profile", () =>
  $fetch(`http://localhost:5000/profile/${authStore.Authenticator.sub}`)
);
const Products = computed(() => {
  return Object.keys(cartStore.cart).map((id) => {
    return {
      title: cartStore.cart[id].title,
      price: cartStore.cart[id].price,
      quantity: cartStore.cart[id].quantity,
    };
  });
});

const orderNow = async () => {
  const order = Object.keys(cartStore.cart).map((id) => {
    return {
      user_id: authStore.Authenticator.sub,
      product_id: cartStore.cart[id].id,
      // price: cartStore.cart[id].price,
      qt: cartStore.cart[id].quantity.toString(),
      tanggal: Date.now().toString(),
      total: cartStore.total.toString(),
      status: "Pending",
    };
  });
  await orderStore.addNewOrder(order);
  cartStore.clear();
  navigateTo("/users/history");
};
</script>

<style lang="scss" scoped></style>
