import type { Product } from './Product'

type ReceiptItme = {
  id?: number
  quantity: number
  total: number
  product: Product
}
export { type ReceiptItme }
