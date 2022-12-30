<template>
  <client-only>
    <v-container>
      <v-dialog v-model="dialog" persistent>
        <template v-slot:activator="{ props }">
          <v-btn color="red" v-bind="props"> Add Product </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="text-h5">Product</span>
          </v-card-title>
          <v-card-text>
            <v-form ref="form">
              <v-card>
                <v-card-item>
                  <v-container>
                    <v-row>
                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model="productItem.title"
                          label="Title"
                          required
                        ></v-text-field>
                        <v-text-field
                          v-model="productItem.price"
                          label="Price"
                          required
                        ></v-text-field>
                        <v-text-field
                          v-model="productItem.image"
                          label="Image"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-autocomplete
                          v-model="productItem.category"
                          label="Kategori"
                          :items="['Lapotop', 'Monitor', 'HP']"
                        ></v-autocomplete>
                        <v-textarea
                          v-model="productItem.description"
                          label="Deskripsi"
                        ></v-textarea>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-item>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="warning" @click="add">Seve Data </v-btn>
                  <v-btn color="blue-darken-1" variant="text" @click="close()">
                    Close
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog>
      <v-card class="mx-auto mt-4" variant="outlined">
        <v-card-item>
          <v-table density="compact">
            <thead>
              <tr>
                <th>Title</th>
                <th>Price</th>
                <th>Kategori</th>
                <th>Diskripsi</th>
                <th>Image</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <thead>
              <tr v-for="item in product.items" :key="item.id">
                <td>{{ item.title }}</td>
                <td>{{ item.price }}</td>
                <td>{{ item.category }}</td>
                <td>{{ item.description }}</td>
                <td>
                  <nuxt-img
                    :src="item.image"
                    width="200"
                    height="100"
                    :modifiers="{ roundCorner: '0:100' }"
                    loading="lazy"
                  />
                </td>
                <td>
                  <v-btn icon size="x-small" @click="edits(item)">
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                  <v-btn icon size="x-small">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </td>
              </tr>
            </thead>
          </v-table>
        </v-card-item>
      </v-card>
    </v-container>
  </client-only>
</template>

<script setup>
import { useProductStore } from "~/stores/products";
const product = useProductStore();
definePageMeta({
  layout: "admin",
  middleware: ["admin"],
});
const dialog = ref(false);
onMounted(async () => {
  await product.getAll();
});
const editedIndex = ref(-1);
const productItem = ref({
  title: "",
  price: "",
  category: "",
  description: "",
  image: "",
});
const clear = () => {
  productItem.value.title = "";
  productItem.value.price = "";
  productItem.value.category = "";
  productItem.value.description = "";
  productItem.value.image = "";
};

const add = async () => {
  if (editedIndex.value === -1) {
    await product.addNewProduct(productItem.value);
  } else {
    await product.updateProduct(productItem.value);
  }
  close();
};

const edits = (item) => {
  editedIndex.value = product.items.indexOf(item);
  productItem.value = item;
  dialog.value = true;
};

const close = () => {
  dialog.value = false;
  productItem.value = Object.assign({});
  editedIndex.value = -1;
};
</script>

<style lang="scss" scoped></style>
