import type { ReceiptItem } from '@/types/ReceiptItem'
import http from './http'
import type { Receipt } from '@/types/Receipt'
import type { Product } from '@/types/Product'
import type { Employee } from '@/types/Employee'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
type ReceiptDto = {
  receiptItems: {
    quantity: number
    total: number
    product: Product
  }[]
  employee?: Employee
}

async function createReceipt(receipt: Receipt, receiptItems: ReceiptItem[]) {
  const receiptDto: ReceiptDto = {
    receiptItems: []
  }
  receiptDto.receiptItems = receiptItems.map((item) => {
    return { product: item.product, quantity: item.quantity, total: item.total }
  })
  receiptDto.employee = await authStore.currentEmployee

  return http.post('/receipts', receiptDto)
}

function getReceipts() {
  return http.get('/receipts')
}

function getReceipt(receipt: Receipt) {
  return http.get(`/receipts/${receipt.id}`)
}

export default { createReceipt, getReceipts, getReceipt }
