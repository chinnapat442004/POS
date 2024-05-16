import type { Employee } from './Employee'

import type { ReceiptItme } from './ReceiptItem'

type Receipt = {
  id: number
  total: number
  receiptItems?: ReceiptItme[]
  created?: string
  employee?: Employee
}
export { type Receipt }
