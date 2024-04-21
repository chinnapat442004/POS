<script setup lang="ts">
import { useProductStore } from '@/stores/product'
import { inject, type Ref } from 'vue'
const productStore = useProductStore()
const dialog = inject<Ref<boolean>>('editedProcuctDialog')

async function close() {
  if (dialog) dialog.value = false
  await productStore.clear()
}
</script>

<template>
  <v-dialog v-model="dialog" max-width="600px" width="600">
    <template v-slot:activator="{ props }">
      <v-btn class="mb-2" color="primary" dark v-bind="props" @click="dialog = true">
        New Item
      </v-btn>
    </template>
    <v-card>
      <v-card-title style="background-color: #415a77; color: white">
        <span class="text-h5"> Product </span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                variant="outlined"
                v-model="productStore.editedProduct.id"
                label="Id"
                bg-color="blue-grey-lighten-5
"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field
                variant="outlined"
                v-model="productStore.editedProduct.name"
                label="Name"
                bg-color="blue-grey-lighten-5"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="12" sm="12">
              <v-text-field
                variant="outlined"
                v-model="productStore.editedProduct.price"
                label="Price"
                bg-color="blue-grey-lighten-5"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" sm="6">
              <v-card height="150" width="160">
                <v-img
                  :src="`http://localhost:3000/images/products/${productStore.editedProduct.image}`"
                  height="150"
                  width="160"
                  cover
                ></v-img>
              </v-card>
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-file-input
                style="margin-top: 50px"
                label="File input"
                variant="outlined"
                bg-color="blue-grey-lighten-5"
              ></v-file-input>
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
</template>
