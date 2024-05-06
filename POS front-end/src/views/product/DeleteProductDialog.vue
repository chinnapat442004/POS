<script setup lang="ts">
import { useProductStore } from '@/stores/product'

import { inject, type Ref } from 'vue'

const productStore = useProductStore()

const dialog = inject<Ref<boolean>>('deleteDialog')

function closeDelete() {
  if (dialog) dialog.value = false
}

async function deleteItemConfirm() {
  await productStore.deleteProduct(productStore.editedProduct)
  await productStore.getProducts()
  if (dialog) dialog.value = false
}
</script>
<template>
  <v-dialog v-model="dialog" max-width="500px">
    <v-card height="170px">
      <v-card-title
        class="text-h5"
        style="font-family: 'Varela Round', sans-serif; font-weight: 500; font-style: normal"
        >Confirm Delete</v-card-title
      >
      <v-card-text>Are you sure you want to delete this item?</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-btn style="background-color: #f0f8ff" @click="closeDelete">Cancel</v-btn>
        <v-btn style="background-color: #fe6d73" color="white" @click="deleteItemConfirm"
          >Delete</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
