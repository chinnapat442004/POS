import type { Product } from './Product'

type Promotion = {
  id?: number
  name: string
  start_date: string
  end_date: string
  status: string
  mininum: number
  maxinum: number
  discount_late: number
  discount_price: number

  products: Product[]
}
export { type Promotion }
