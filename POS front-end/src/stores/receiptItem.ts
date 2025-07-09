import type { ReceiptItem } from '@/types/ReceiptItem'
import { defineStore } from 'pinia'
import { ref } from 'vue'

import type { Product } from '@/types/Product'
import { useReceiptStore } from './receipt'

export const useReceiptItemStore = defineStore('receiptItem', () => {
  const receiptStore = useReceiptStore()
  const initialReceiptItem: ReceiptItem = {
    quantity: 1,
    total: 0,
    product: {
      name: '',
      price: 0,
      image: 'noimage.jpg',
      category: ''
    }
  }
  const receiptItems = ref(<ReceiptItem[]>[])

  const receiptItem = ref(<ReceiptItem>JSON.parse(JSON.stringify(initialReceiptItem)))

  function addProduct(product: Product) {
    receiptItem.value.product = product
  }

  async function addReceiptItem(receiptItem: ReceiptItem) {
    const index = receiptItems.value.findIndex(
      (item) => item.product?.id === receiptItem.product?.id
    )

    if (index == -1 && receiptItem) {
      receiptItems.value.push(receiptItem)
      receiptItem.total = receiptItem.quantity * receiptItem.product.price
    } else {
      receiptItems.value[index].quantity += 1
      receiptItems.value[index].total =
        receiptItems.value[index].quantity * receiptItems.value[index].product.price
    }

    receiptStore.calTotal()
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
