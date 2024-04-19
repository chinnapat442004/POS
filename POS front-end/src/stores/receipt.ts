import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useReceiptItemStore } from './receiptItem'

export const useReceiptStore = defineStore('receipt', () => {
  const receiptItemStore = useReceiptItemStore()
  const receipts = ref(<Receipt[]>[])

  const initialRecipt = {
    total: 0
  }

  const receipt = ref(<Receipt>JSON.parse(JSON.stringify(initialRecipt)))

  function calTotal() {
    clearReceipt()
    receiptItemStore.receiptItems.forEach((item) => {
      receipt.value.total += item.total
    })
  }

  function clearReceipt() {
    receipt.value = JSON.parse(JSON.stringify(initialRecipt))
  }

  return {
    receipts,
    receipt,
    calTotal
  }
})
