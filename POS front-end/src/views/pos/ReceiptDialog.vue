<script setup lang="ts">
import { useReceiptStore } from '@/stores/receipt'
import { useReceiptItemStore } from '@/stores/receiptItem'

import { inject, type Ref } from 'vue'

const dialog = inject<Ref<boolean>>('receiptDialog')

const receiptItemStore = useReceiptItemStore()
const receiptStore = useReceiptStore()
</script>
<template>
  <v-dialog v-model="dialog" max-width="450px">
    <v-card height="650px">
      <div style="height: 25px"></div>
      <v-card-title
        class="text-h5"
        style="
          font-family: 'Varela Round', sans-serif;
          font-weight: 500;
          font-style: normal;
          text-align: center;
        "
        >Receipt</v-card-title
      >

      <div style="font-size: 27px; text-align: center">--------------------------------------</div>
      <v-table max-height="1300px" class="no-header-scroll" style="margin: 0px 30px">
        <thead class="thead">
          <tr>
            <th class="th">Name</th>
            <th class="th">Unit Price</th>
            <th class="th">Quantity</th>
            <th class="th">Total</th>
          </tr>
        </thead>

        <tbody style="background-color: white">
          <tr v-for="item in receiptItemStore.receiptItems" :key="item.id">
            <td class="td">{{ item.product?.name }}</td>
            <td class="td">{{ item.product?.price }}</td>
            <td class="td">{{ item.quantity }}</td>
            <td class="td">{{ item.total }}</td>
          </tr>
        </tbody>
      </v-table>

      <div style="font-size: 27px; text-align: center; margin: 20px 0px">
        --------------------------------------
      </div>

      <v-table class="no-header-scroll" style="margin: 0px 30px">
        <tbody style="background-color: white">
          <tr class="text-center">
            <td class="td">Total</td>
            <td class="td"></td>
            <td class="td"></td>
            <td class="td">{{ receiptStore.receipt.total }}</td>
          </tr>
        </tbody>
      </v-table>
      <div style="font-size: 27px; text-align: center">--------------------</div>
      <div style="text-align: center">Thank you</div>
      <div style="height: 40px"></div>
    </v-card>
  </v-dialog>
</template>
<style scoped>
.th,
.td {
  border: none !important;
}
</style>
