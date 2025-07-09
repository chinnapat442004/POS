import { defineStore } from 'pinia'

import { ref } from 'vue'
import typeService from '@/service/type'
import type { Type } from '@/types/Type'
export const useTypeStore = defineStore('type', () => {
  const types = ref<Type[]>([])

  async function getTypes() {
    const res = await typeService.getTyeps()
    types.value = res.data
  }

  return { types, getTypes }
})
