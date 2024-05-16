import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useReceiptItemStore } from './receiptItem'
import receiptService from '@/service/receipt'
import type { Receipt } from '@/types/Receipt'
import { format } from 'date-fns'

export const useReceiptStore = defineStore('receipt', () => {
  const receiptItemStore = useReceiptItemStore()
  const receipts = ref(<Receipt[]>[])

  const initialRecipt = {
    total: 0
  }

  const receipt = ref(<Receipt>JSON.parse(JSON.stringify(initialRecipt)))

  async function getReceipts() {
    const res = await receiptService.getReceipts()

    receipts.value = res.data
    receipts.value.forEach((item) => {
      if (item.created && typeof item.created === 'string') {
        const date = new Date(item.created)
        item.created = format(date, 'dd/MM/yyyy HH:mm:ss')
      }
    })
  }

  async function getReceipt(item: Receipt) {
    const res = await receiptService.getReceipt(item)
    receipt.value = res.data
    formatDate()
  }

  function calTotal() {
    clearReceipt()
    receiptItemStore.receiptItems.forEach((item) => {
      receipt.value.total += item.total
    })
  }

  async function formatDate() {
    const date = new Date()
    const formattedDate: string = format(date, 'dd/MM/yyyy HH:mm')
    receipt.value.created = await formattedDate
  }

  function createReceipt() {
    formatDate()
    receiptService.createReceipt(receipt.value, receiptItemStore.receiptItems)
  }

  function clearReceipt() {
    receipt.value = JSON.parse(JSON.stringify(initialRecipt))
  }

  return {
    receipts,
    receipt,
    calTotal,
    createReceipt,
    getReceipts,
    getReceipt
  }
})
