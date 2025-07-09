import type { Employee } from './Employee'

import type { ReceiptItem } from './ReceiptItem'

type Receipt = {
  id: number
  before_total: number
  discount: number
  after_total: number
  receiptItems?: ReceiptItem[]
  created?: string
  employee?: Employee
}
export { type Receipt }
