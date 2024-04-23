<script setup lang="ts">
import { useProductStore } from '@/stores/product'
import { onMounted, ref, provide } from 'vue'
import EditedProductDialog from './EditedProductDialog.vue'
import type { Product } from '@/types/Product'

const productStore = useProductStore()
const search = ref('')

const dialog = ref(false)
provide('editedProcuctDialog', dialog)

onMounted(async () => {
  await productStore.getProducts()
})

function open(item: Product & { files: File[] }) {
  productStore.getProduct(item)
  // productStore.editedProduct = Object.assign({}, item)
  console.log(item)
  dialog.value = true
}

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
              <v-toolbar-title style="background-color: #0d1b2a; color: white">
                <v-row
                  ><v-col md="5">
                    <div style="margin: 10px 0px 0px 10px; font-size: 25px">Product</div>
                  </v-col>
                  <v-col md="5">
                    <v-text-field
                      style="background: white; color: #0d1b2a; border-radius: 15px"
                      v-model="search"
                      label="Search"
                      prepend-inner-icon="mdi-magnify"
                      variant="outlined"
                      hide-details
                      single-line
                      color="white"
                    ></v-text-field
                  ></v-col>
                  <v-col md="2">
                    <div style="margin: 10px 10px 0px 0px">
                      <edited-product-dialog></edited-product-dialog></div></v-col></v-row
              ></v-toolbar-title>

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
              style="
                border-radius: 15px;
                margin-top: 10px;
                margin-bottom: 10px;
                pointer-events: none;
              "
            >
            </v-img>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon class="me-2" size="small" @click="open(item)"> mdi-pencil </v-icon>
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
