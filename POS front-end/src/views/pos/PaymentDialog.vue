<script setup lang="ts">
import { useReceiptStore } from '@/stores/receipt'
import { inject, type Ref, ref, provide } from 'vue'
import ReceiptDialog from './ReceiptDialog.vue'
const payment = ref('cash')
const receiptStore = useReceiptStore()
import Swal from 'sweetalert2'
const dialog = inject<Ref<boolean>>('paymentDialog')

const receiptDialog = ref(false)
function openReceipt() {
  receiptStore.createReceipt()
}

provide('receiptDialog', receiptDialog)

function cancel() {
  if (dialog) dialog.value = false
}
function pay() {
  if (dialog) dialog.value = false
  Swal.fire({
    title: 'Do you want to save the changes?',
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: 'Save',
    denyButtonText: `Don't save`
  }).then(async (result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      await Swal.fire({ timer: 1000, title: 'Saved!', icon: 'success', showConfirmButton: false })

      receiptDialog.value = true
      // openReceipt()
    } else if (result.isDenied) {
      if (dialog) dialog.value = true
    }
  })
}
</script>
<template>
  <v-dialog v-model="dialog" max-width="500"
    ><v-card height="600">
      <v-card-title style="background-color: #415a77; color: white">
        <span class="style"> Payment </span>
      </v-card-title>

      <div style="padding: 20px 60px 0 60px">
        <div style="display: flex; justify-content: space-between">
          <div>Sub Total</div>
          <div>{{ receiptStore.receipt.before_total }}</div>
        </div>
        <div style="display: flex; justify-content: space-between">
          <div>Discount</div>
          <div style="color: red">-{{ receiptStore.receipt.discount }}</div>
        </div>
        <div style="display: flex; justify-content: space-between">
          <div>Total</div>
          <div>{{ receiptStore.receipt.after_total }}</div>
        </div>
      </div>
      <div style="margin: 20px auto 20px">
        <v-radio-group v-model="payment" inline>
          <v-radio label="Cash" value="cash"></v-radio>
          <v-radio label="Scan" value="scan"></v-radio>
        </v-radio-group>
      </div>
      <div v-if="payment === 'cash'">
        <div style="width: 350px; margin: 10px auto">
          <v-sheet style="border: 1px solid #415a77" height="270" color="blue-grey-lighten-5">
            <v-container>
              <v-row>
                <v-col md="2"></v-col>
                <v-col md="3"><div style="text-align: center; margin: 10px">Cash</div></v-col>
                <v-col md="5">
                  <v-text-field type="number" bg-color="white"></v-text-field>
                </v-col>
                <v-col md="2"></v-col>
                <v-col md="2"></v-col>
                <v-col md="3"><div style="text-align: center">change</div></v-col>
                <v-col md="5"> 30 </v-col>
                <v-row md="2"></v-row>
              </v-row>
            </v-container>
          </v-sheet>
        </div>
      </div>
      <div v-else-if="payment === 'scan'">
        <div style="width: 350px; margin: 10px auto">
          <v-sheet style="border: 1px solid #415a77" height="270" color="blue-grey-lighten-5">
            <v-img src="./img/QRcode.png"></v-img>
          </v-sheet>
        </div>
      </div>
      <v-container>
        <v-row>
          <v-col md="6"
            ><v-btn width="100%" style="background-color: #fe6d73; color: white" @click="cancel()"
              >cancle</v-btn
            ></v-col
          >
          <v-col md="6"
            ><v-btn width="100%" style="background-color: #588157; color: white" @click="pay()"
              >pay</v-btn
            ></v-col
          >
        </v-row>
      </v-container>
    </v-card></v-dialog
  >
  <ReceiptDialog></ReceiptDialog>
</template>
