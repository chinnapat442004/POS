import type { Product } from './Product'

type ReceiptItme = {
  id?: number
  quantity: number
  amount: number
  product: Product
}
export { type ReceiptItme }
