<script setup>
definePageMeta({
  layout: "admin",
  middleware: ["admin"],
});
const config = useRuntimeConfig();

const { data: order } = await useAsyncData("order", () =>
  $fetch(`${config.baseUrl}order`)
);
</script>
<template>
  <v-container>
    <v-card>
      <v-card-text>
        <v-table density="compact">
          <thead>
            <tr>
              <th>Nama Pelanggan</th>
              <th>Order barang</th>
              <th>Alamat Pengiriman</th>
              <th>Harga Barang</th>
              <th>Jumlah</th>
              <th>Total Bayar</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in order" :key="item.id">
              <td>{{ item.profile.nama }}</td>
              <td>{{ item.product.title }}</td>
              <td>{{ item.profile.address }}</td>
              <td>{{ item.product.price }}</td>
              <td>{{ item.qt }}</td>
              <td>{{ item.total }}</td>
              <td>{{ item.status }}</td>
            </tr>
          </tbody>
        </v-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<style scoped></style>
