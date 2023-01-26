<template>
  <v-container>
    <v-table density="compact">
      <thead>
        <tr>
          <th>Barang</th>
          <th>Jumlah</th>
          <th>Harga</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in order" :key="item.id">
          <td>{{ item.product.title }}</td>
          <td>{{ item.qt }}</td>
          <td>{{ item.total }}</td>
          <td>{{ item.status }}</td>
        </tr>
      </tbody>
    </v-table>
  </v-container>
</template>

<script setup>
import { useOrder } from "~/stores/order";
import { useAuth } from "~/stores/auth";

definePageMeta({
  layout: "default",
  middleware: ["user"],
});
const orderStore = useOrder();
const authStore = useAuth();
const config = useRuntimeConfig();
const { data: order } = await useAsyncData("order", () =>
  $fetch(`${config.baseUrl}order/product/${authStore.Authenticator.sub}`)
);
</script>

<style lang="scss" scoped></style>
