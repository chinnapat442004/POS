import type { Size } from '@/types/Size'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import sizeService from '@/service/size'

export const useSizeStore = defineStore('size', () => {
  const sizes = ref<Size[]>([])

  async function getSizes() {
    const res = await sizeService.getSizes()
    sizes.value = res.data
  }

  return { sizes, getSizes }
})
