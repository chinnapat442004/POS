<script setup lang="ts">
import { useReceiptStore } from '@/stores/receipt'
import { useReceiptItemStore } from '@/stores/receiptItem'

import { inject, type Ref } from 'vue'

const dialog = inject<Ref<boolean>>('clearDialog')

const receiptItemStore = useReceiptItemStore()
const receiptStore = useReceiptStore()

function closeDelete() {
  if (dialog) dialog.value = false
}

async function clearReceiptItems() {
  if (dialog) {
    receiptItemStore.receiptItems = []
    receiptStore.receipt.total = 0
    dialog.value = false
  }
}
</script>
<template>
  <v-dialog v-model="dialog" max-width="500px">
    <v-card height="170px">
      <v-card-title
        class="text-h5"
        style="font-family: 'Varela Round', sans-serif; font-weight: 500; font-style: normal"
        >Confirm Clear</v-card-title
      >
      <v-card-text>Are you sure you want to clear receipt item?</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-btn style="background-color: #f0f8ff" @click="closeDelete">Cancel</v-btn>
        <v-btn style="background-color: #76abae" color="white" @click="clearReceiptItems()"
          >clear</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
