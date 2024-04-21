<script setup lang="ts">
import { useProductStore } from '@/stores/product'
import { onMounted, ref } from 'vue'

const productStore = useProductStore()

onMounted(async () => {
  await productStore.getPorducts()
})

const search = ref('')

const headers = [
  { title: 'Id', value: 'id', key: 'id' },
  { title: 'Image', value: 'image', key: 'image' },
  { title: 'Name', value: 'name', key: 'name' },
  { title: 'Price', value: 'price', key: 'price' },
  { title: 'Actions', key: 'actions', sortable: false }
]
</script>
<template>
  <v-container>
    <v-card elevation="5" height="650">
      <v-row>
        <v-data-table
          height="530"
          :headers="headers"
          :items="productStore.products"
          :search="search"
          :header-props="{ style: 'background-color: #e1e5f2;  font-weight: 800; ' }"
        >
          <template v-slot:top>
            <v-toolbar flat style="background-color: #0d1b2a; color: white; margin-top: 12px">
              <v-toolbar-title style="background-color: #0d1b2a; color: white"
                >Product</v-toolbar-title
              >

              <v-text-field
                style="background: white; color: #0d1b2a; border-radius: 15px"
                v-model="search"
                label="Search"
                prepend-inner-icon="mdi-magnify"
                variant="outlined"
                hide-details
                single-line
                color="white"
              ></v-text-field>

              <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ props }">
                  <v-btn class="mb-2" color="primary" dark v-bind="props"> New Item </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="text-h5">{{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" md="4" sm="6">
                          <v-text-field
                            v-model="productStore.products"
                            label="Id"
                            value="id"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4" sm="6">
                          <v-text-field
                            v-model="editedItem.calories"
                            label="Calories"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4" sm="6">
                          <v-text-field v-model="editedItem.fat" label="Fat (g)"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4" sm="6">
                          <v-text-field v-model="editedItem.carbs" label="Carbs (g)"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4" sm="6">
                          <v-text-field
                            v-model="editedItem.protein"
                            label="Protein (g)"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue-darken-1" variant="text" @click="close"> Cancel </v-btn>
                    <v-btn color="blue-darken-1" variant="text" @click="save"> Save </v-btn>
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
                    <v-btn color="blue-darken-1" variant="text" @click="closeDelete">Cancel</v-btn>
                    <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm"
                      >OK</v-btn
                    >
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:item.image="{ item }">
            <v-img
              :src="`http://localhost:3000/images/products/${item.image}`"
              width="150"
              height="130"
              cover
              style="border-radius: 15px; margin-top: 10px; margin-bottom: 10px"
            >
            </v-img>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon class="me-2" size="small" @click="editItem(item)"> mdi-pencil </v-icon>
            <v-icon size="small" @click="deleteItem(item)"> mdi-delete </v-icon>
          </template>
          <template v-slot:no-data>
            <v-btn color="primary" @click="initialize"> Reset </v-btn>
          </template>
        </v-data-table>
      </v-row>
    </v-card>
  </v-container>
</template>
