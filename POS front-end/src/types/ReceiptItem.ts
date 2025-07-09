import type { Product } from './Product'

type ReceiptItem = {
  id?: number
  quantity: number
  total: number
  product: Product
}
export { type ReceiptItem }
