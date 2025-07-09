import type { RawMaterial } from '@/types/RawMaterail'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import rawMaterialService from '@/service/rawMaterial'
import { useLoaderStore } from './loader'

export const useRawMaterailStore = defineStore('rawMaterial', () => {
  const loadingStore = useLoaderStore()
  const rawMaterials = ref(<RawMaterial[]>[])
  const initialRawMaterial: RawMaterial = {
    name: '',
    minimum: 0,
    price: 0,
    quantity: 0,
    status: '',
    unit: ''
  }

  const editedRawMaterial = ref(<RawMaterial>JSON.parse(JSON.stringify(initialRawMaterial)))

  async function gerRawMaterials() {
    await loadingStore.doLoad()
    const res = await rawMaterialService.getRawMaterials()
    rawMaterials.value = res.data
    await loadingStore.finishLoad()
  }

  async function gerRawMaterialsByStatus(status: string) {
    await loadingStore.doLoad()
    const res = await rawMaterialService.getRawMaterialsByStatus(status)
    rawMaterials.value = res.data
    await loadingStore.finishLoad()
  }
  async function getRawMaterial(rawMaterial: RawMaterial) {
    const res = await rawMaterialService.getRawMaterial(rawMaterial)
    editedRawMaterial.value = res.data
  }

  function save() {
    const rawMaterial = editedRawMaterial
    if (!rawMaterial.value.id) {
      rawMaterialService.addRawMaterial(rawMaterial.value)
    } else {
      rawMaterialService.updateRawMaterial(rawMaterial.value)
    }
  }

  function deleteRawMaterial() {
    rawMaterialService.removeRawMaterial(editedRawMaterial.value)
  }
  function clear() {
    editedRawMaterial.value = JSON.parse(JSON.stringify(initialRawMaterial))
  }

  return {
    gerRawMaterials,
    getRawMaterial,
    clear,
    save,
    deleteRawMaterial,
    gerRawMaterialsByStatus,
    rawMaterials,
    editedRawMaterial
  }
})
