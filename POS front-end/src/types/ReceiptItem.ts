import type { Product } from './Procuct'

type ReceiptItme = {
  id?: number
  quantity: number | null
  total: number | null
  product?: Product
}
export { type ReceiptItme }
