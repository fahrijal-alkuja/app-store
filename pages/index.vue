<template>
  <VContainer fluid>
    <v-row>
      <v-col cols="12" md="2">
        <v-card class="py-2 px-3">
          <v-text-field placeholder="Search" v-model="search"></v-text-field>
          <v-radio-group v-model="sortBy">
            <template v-slot:label>
              <h3>Sort By :</h3>
            </template>
            <v-radio value="title">
              <template v-slot:label>
                <div>By <strong class="text-success">Name</strong></div>
              </template>
            </v-radio>
            <v-radio value="price">
              <template v-slot:label>
                <div>By <strong class="text-primary">Price</strong></div>
              </template>
            </v-radio>
          </v-radio-group>
          <v-radio-group v-model="order">
            <template v-slot:label>
              <h3>Sort Order :</h3>
            </template>
            <v-radio value="asending">
              <template v-slot:label>
                <div><strong class="text-success">Asendig</strong></div>
              </template>
            </v-radio>
            <v-radio value="deasending">
              <template v-slot:label>
                <div><strong class="text-primary">Deasending</strong></div>
              </template>
            </v-radio>
          </v-radio-group>
        </v-card>
      </v-col>
      <v-col cols="12" md="10">
        <v-row>
          <!-- masukan pada looping filterproduc -->
          <v-col
            v-for="(product, i) in filterProducts"
            :key="i"
            cols="12"
            md="4"
            sm="6"
            lg="3"
          >
            <v-card class="mx-auto">
              <!-- <v-img :src="product.image" height="200px" cover></v-img> -->
              <nuxt-img
                fit="cover"
                :src="product.image"
                :modifiers="{ roundCorner: '0:100' }"
                height="200px"
                loading="lazy"
              />
              <v-card-title class="text-capitalize">
                {{ product.title }}
              </v-card-title>

              <v-card-subtitle> Rp.{{ product.price }} </v-card-subtitle>

              <v-card-actions>
                <NuxtLink :to="`/${product.id}`">
                  <v-btn color="orange-lighten-2" variant="text">
                    Read More
                  </v-btn>
                </NuxtLink>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
        <v-pagination
          class="mt-6"
          v-model="page"
          :length="length"
          rounded="circle"
          prev-icon="mdi-menu-left"
          next-icon="mdi-menu-right"
        ></v-pagination>
      </v-col>
    </v-row>
  </VContainer>
</template>

<script setup>
const config = useRuntimeConfig();

const { data: products } = await useAsyncData("product", () =>
  $fetch(`${config.baseUrl}product`)
);

const sortBy = ref("");
const order = ref("asending");
const search = ref("");
let perPage = 10;
let length = Math.ceil(products.value.length / perPage);
const page = ref(1);

const filterProducts = computed(() => {
  if (search.value) {
    return [...products.value].filter((i) => {
      return search.value
        .toLocaleLowerCase()
        .split("")
        .every((v) => i.title.toLocaleLowerCase().includes(v));
    });
  } else {
    return [...products.value].slice(
      (page.value - 1) * perPage,
      page.value * perPage
    );
  }
});

const dynamicSort = (property) => {
  let sortOrder = 1;
  if (property[0] === "-") {
    sortOrder = -1;
    property = property.substr(1);
  }
  return (a, b) => {
    const result =
      a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
    return result * sortOrder;
  };
};

const sortProducts = () => {
  if (order.value == "deasending") {
    products.value.sort(dynamicSort("-" + sortBy.value));
  } else {
    products.value.sort(dynamicSort(sortBy.value));
  }
};

watch(sortBy, () => {
  sortProducts();
});

watch(order, () => {
  sortProducts();
});
</script>

<style scoped></style>
