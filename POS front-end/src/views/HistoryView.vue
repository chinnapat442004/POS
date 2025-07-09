<script lang="ts" setup>
import { useReceiptStore } from '@/stores/receipt'
import type { Receipt } from '@/types/Receipt'
import ReceiptDialog from './ReceiptDialog.vue'
import { onMounted, provide, ref } from 'vue'
const receiptStore = useReceiptStore()

const headers = [
  { title: 'Id', value: 'id', key: 'id' },
  { title: 'Date', value: 'created', key: 'created' },
  { title: 'Employee', value: 'employee.name', key: 'employee.name' },
  { title: 'Total', value: 'total', key: 'total' },
  { title: 'Actions', key: 'actions', sortable: false }
]

const dialog = ref(false)
provide('receiptDialog2', dialog)

onMounted(async () => {
  await receiptStore.getReceipts()
})

const role = localStorage.getItem('role')

async function open(item: Receipt) {
  await receiptStore.getReceipt(item)

  dialog.value = true
}
</script>

<template>
  <v-card elevation="5" height="648" style="margin: 30px 50px">
    <v-row>
      <v-data-table
        :headers="headers"
        :items="receiptStore.receipts"
        height="530"
        :header-props="{ style: 'background-color: #e1e5f2;  font-weight: 800; ' }"
      >
        <template v-slot:top>
          <v-toolbar flat style="background-color: #0d1b2a; color: white; margin-top: 12px">
            <v-toolbar-title style="background-color: #0d1b2a; color: white">
              <v-row
                ><v-col md="4">
                  <div style="margin: 10px 0px 0px 10px; font-size: 25px">Receipt History</div>
                </v-col>
                <v-col md="3">
                  <v-text-field
                    style="background: white; color: #0d1b2a; border-radius: 15px"
                    variant="outlined"
                    hide-details
                    single-line
                    color="white"
                    type="date"
                  ></v-text-field
                ></v-col>
                <v-col md="3">
                  <v-text-field
                    style="background: white; color: #0d1b2a; border-radius: 15px"
                    variant="outlined"
                    hide-details
                    single-line
                    color="white"
                    type="date"
                  ></v-text-field
                ></v-col> </v-row
            ></v-toolbar-title>
          </v-toolbar>
        </template>

        <template v-slot:[`item.actions`]="{ item }">
          <v-btn @click="open(item)"><v-icon>mdi-eye-outline</v-icon></v-btn>
        </template>
      </v-data-table>
    </v-row>
  </v-card>

  <ReceiptDialog></ReceiptDialog>
</template>
