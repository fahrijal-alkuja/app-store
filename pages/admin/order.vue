<script setup>
import { useOrder } from "~/stores/order";
const orderProduct = useOrder();
definePageMeta({
  layout: "admin",
  middleware: ["admin"],
});
const config = useRuntimeConfig();

const { data: order } = await useAsyncData("order", () =>
  $fetch(`${config.baseUrl}order`)
);
const dialog = ref(false);
const editedIndex = ref(-1);
const orders = ref({
  id: "",
  status: "",
});
const statusOrder = ["Menunggu Pembayaran", "Pengiriman"];
const proses = (item) => {
  editedIndex.value = orderProduct.items.indexOf(item);
  orders.value = item;
  dialog.value = true;
};
const close = () => {
  dialog.value = false;
};
const save = async () => {
  const dataOrder = {
    id: orders.value.id,
    status: orders.value.status,
  };
  await orderProduct.updateOrder(dataOrder);
  close();
};
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
              <td>
                <v-btn icon size="x-small" @click="proses(item)">
                  <v-icon>mdi-cube-send</v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-card-text>
    </v-card>
    <v-dialog v-model="dialog">
      <v-card>
        <v-card-title>
          <span class="text-h5">Status Oerder</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form">
            <v-card>
              <v-card-item>
                <v-container>
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-select
                        v-model="orders.status"
                        label="Status"
                        :items="statusOrder"
                      ></v-select>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-item>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="warning" @click="save">Seve Data </v-btn>
                <v-btn color="blue-darken-1" variant="text" @click="close()">
                  Close
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>
