import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useReceiptItemStore } from './receiptItem'
import receiptService from '@/service/receipt'
import type { Receipt } from '@/types/Receipt'
import { format } from 'date-fns'
import { useLoaderStore } from './loader'
import { usePromotionStore } from './promotion'

const promotion = ref(false)
const promotionStore = usePromotionStore()

export const useReceiptStore = defineStore('receipt', () => {
  const receiptItemStore = useReceiptItemStore()
  const loaderStore = useLoaderStore()
  const receipts = ref(<Receipt[]>[])

  const initialRecipt = {
    before_total: 0,
    discount: 0,
    after_total: 0
  }

  const receipt = ref(<Receipt>JSON.parse(JSON.stringify(initialRecipt)))

  async function getReceipts() {
    await loaderStore.doLoad()
    const res = await receiptService.getReceipts()

    receipts.value = res.data
    receipts.value.forEach((item) => {
      if (item.created && typeof item.created === 'string') {
        const date = new Date(item.created)
        item.created = format(date, 'dd/MM/yyyy HH:mm:ss')
      }
    })
    await loaderStore.finishLoad()
  }

  async function getReceipt(item: Receipt) {
    const res = await receiptService.getReceipt(item)
    receipt.value = res.data
    formatDate()
  }

  async function calTotal() {
    // clearReceipt()

    receipt.value.before_total = 0
    receiptItemStore.receiptItems.forEach((item) => {
      receipt.value.before_total += item.total
    })

    if (promotion.value == true) {
      if (
        receipt.value.before_total * promotionStore.editedPromotion.discount_late >=
        promotionStore.editedPromotion.maxinum
      ) {
        receipt.value.discount = await promotionStore.editedPromotion.maxinum
      } else {
        const beforeTotal = await receipt.value.before_total
        receipt.value.discount = await Math.floor(
          beforeTotal * promotionStore.editedPromotion.discount_late
        )
      }
      receipt.value.after_total = receipt.value.before_total - receipt.value.discount
    }
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
    promotion,
    calTotal,
    createReceipt,
    getReceipts,
    getReceipt,
    clearReceipt
  }
})
