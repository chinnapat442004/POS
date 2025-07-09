import type { Bill } from '@/types/Bill'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import billService from '@/service/bill'

export const useBillStore = defineStore('bill', () => {
  const bills = ref(<Bill[]>[])

  async function getBills() {
    const res = await billService.getBills()
    bills.value = res.data
  }

  return { bills, getBills }
})
