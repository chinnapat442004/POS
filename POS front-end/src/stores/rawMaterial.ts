import type { RawMaterial } from '@/types/RawMaterail'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import rawMaterialService from '@/service/rawMaterial'
import { useLoaderStore } from './loader'

export const useRawMaterailStore = defineStore('rawMaterial', () => {
  const loadingStore = useLoaderStore()
  const rawMaterials = ref(<RawMaterial[]>[])

  async function gerRawMaterials() {
    await loadingStore.doLoad()
    const res = await rawMaterialService.getRawMaterial()
    rawMaterials.value = res.data
    await loadingStore.finishLoad()
  }

  return { gerRawMaterials, rawMaterials }
})
