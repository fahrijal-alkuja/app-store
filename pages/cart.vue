<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>Shopping Cart</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="8">
        <v-card>
          <v-card-title>Shopping Cart</v-card-title>
          <v-card-text>
            <v-table>
              <tbody>
                <tr v-for="item in cartStore.cart" :key="item.id">
                  <td>{{ item.title }}</td>
                  <td>{{ item.quantity }}</td>
                  <td>Rp.{{ item.price }}</td>
                  <td>
                    <v-btn
                      icon
                      size="20pt"
                      color="error"
                      @click="cartStore.remove(item.id)"
                    >
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card variant="outlined">
          <v-card-item>
            <div>
              <div class="text-overline mb-1">Total Belanja</div>
              <div class="text-h6 mb-1">Rp{{ cartStore.total }}</div>
            </div>
          </v-card-item>
          <v-card-actions>
            <v-btn variant="outlined" to="/checkout"> Checkout </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useCart } from "~/stores/cart";
definePageMeta({
  middleware: ["user"],
});
const user = useCookie("auth");
const cartStore = useCart();

const cekOut = () => {
  const getCart = Object.keys(cartStore.cart).map((id) => {
    return {
      userId: user.value.Authenticator.sub,
      productId: cartStore.cart[id].id,
      price: cartStore.cart[id].price,
      qt: cartStore.cart[id].quantity,
    };
  });
  const cart = {
    data: getCart,
    total: cartStore.total,
  };
  console.log(cart);
};
</script>

<style lang="scss" scoped></style>
