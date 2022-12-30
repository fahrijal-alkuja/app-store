<template>
  <client-only>
    <v-container>
      <v-card class="mx-auto mt-4" variant="outlined">
        <v-card-item>
          <v-table density="compact">
            <thead>
              <tr>
                <th>Nama</th>
                <th>Email</th>
                <th>Rule</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in usersStore.users" :key="user.id">
                <td>
                  {{ user.name }}
                </td>
                <td>{{ user.email }}</td>
                <td>{{ user.rules }}</td>
                <td>
                  <!-- button color -->
                  <v-btn icon size="x-small" @click="edits(user)">
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                  <v-btn icon size="x-small" @click="deleteItem(user.id)">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </td>
              </tr>
            </tbody>
            <template #top>
              <v-toolbar color="blue">
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" persistent>
                  <template v-slot:activator="{ props }">
                    <v-btn color="red" v-bind="props"> Open Dialog </v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="text-h5">User Profile</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.name"
                              label="Nama"
                              :rules="[rules.required]"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.email"
                              label="Email"
                              :rules="[rules.required]"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.password"
                              label="Password"
                              :rules="[rules.required]"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-autocomplete
                              v-model="editedItem.rules"
                              :items="['admin', 'user']"
                              label="Rules"
                            ></v-autocomplete>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="blue-darken-1"
                        variant="text"
                        @click="dialog = false"
                      >
                        Close
                      </v-btn>
                      <v-btn
                        color="blue-darken-1"
                        variant="text"
                        @click="addUsers"
                      >
                        Save
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-dialog v-model="dialogDelete" max-width="500px">
                  <v-card>
                    <v-card-title class="text-h5"
                      >Are you sure you want to delete this item?</v-card-title
                    >
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="blue-darken-1"
                        variant="text"
                        @click="dialogDelete = false"
                      >
                        Close
                      </v-btn>
                      <v-btn color="blue darken-1" variant="text" @click="hapus"
                        >OK</v-btn
                      >
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>
          </v-table>
        </v-card-item>
      </v-card>
    </v-container>
  </client-only>
</template>
<script setup>
import { useUsersStore } from "~/stores/users";
const usersStore = useUsersStore();
definePageMeta({
  layout: "admin",
  middleware: ["admin"],
});

const rules = {
  required: (v) => !!v || "Required.",
};
const dialog = ref(false);
const dialogDelete = ref(false);
const editedIndex = ref(-1);
const editedItem = ref({
  email: "",
  password: "",
  name: "",
  rules: "",
});
const deleteItems = ref({ id: "" });

const clear = () => {
  editedItem.value.email = "";
  editedItem.value.password = "";
  editedItem.value.name = "";
  editedItem.value.rules = "";
};

const formTitle = computed(() => {
  return editedIndex.value === -1 ? "New User" : "Edit User";
});

onMounted(async () => {
  await usersStore.getUsers();
});

const edits = (user) => {
  editedIndex.value = usersStore.users.indexOf(user);
  editedItem.value = {
    id: user.id,
    email: user.email,
    password: user.password,
    name: user.name,
    rules: user.rules,
  };
  dialog.value = true;
};

const deleteItem = (id) => {
  deleteItems.value = id;
  dialogDelete.value = true;
};

const addUsers = async () => {
  if (editedIndex.value === -1) {
    await usersStore.addNewUsers(editedItem.value);
  } else {
    await usersStore.updateUsers(editedItem.value);
  }
  clear();
  dialog.value = false;
};

const hapus = async () => {
  await usersStore.deleteUsers(deleteItems.value);
  dialogDelete.value = false;
};
</script>
<style lang="scss" scoped></style>
