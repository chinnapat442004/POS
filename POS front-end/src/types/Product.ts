import type { ReceiptItem } from './ReceiptItem'
import type { Size } from './Size'
import type { Type } from './Type'

type Product = {
  id?: number
  name: string
  price: number
  image: string
  category: string
  sizes?: Size[]
  types?: Type[]
  receiptItmes?: ReceiptItem
}
export { type Product }
