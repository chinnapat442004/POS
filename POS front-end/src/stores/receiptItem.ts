import type { ReceiptItme } from '@/types/ReceiptItem'
import { defineStore } from 'pinia'
import { ref } from 'vue'

import type { Product } from '@/types/Product'

export const useReceiptItemStore = defineStore('receiptItem', () => {
  const initialReceiptItem: ReceiptItme = {
    quantity: null,
    total: null,
    product: {
      name: '',
      price: 0
    }
  }
  const receiptItems = ref(<ReceiptItme[]>[])

  const receiptItem = ref(<ReceiptItme>JSON.parse(JSON.stringify(initialReceiptItem)))

  function addProduct(product: Product) {
    receiptItem.value.product = product
  }

  function addReceiptItem(receiptItem: ReceiptItme) {
    const index = receiptItems.value.findIndex(
      (item) => item.product?.id === receiptItem.product?.id
    )

    if (index == -1) {
      receiptItems.value.push(receiptItem)
    }
    console.log(index)
  }

  function clear() {
    receiptItem.value = JSON.parse(JSON.stringify(initialReceiptItem))
  }

  return {
    receiptItems,
    receiptItem,
    addProduct,
    addReceiptItem,
    clear
  }
})
