import type { Product } from './Product'

type ReceiptItme = {
  id?: number
  quantity: number | null
  total: number | null
  product?: Product
}
export { type ReceiptItme }
