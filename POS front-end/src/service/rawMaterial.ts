import type { RawMaterial } from '@/types/RawMaterail'
import http from './http'

function getRawMaterials() {
  return http.get('/raw-materials')
}

function getRawMaterial(rawMaterial: RawMaterial) {
  return http.get(`/raw-materials/${rawMaterial.id}`)
}

function addRawMaterial(rawMaterial: RawMaterial) {
  return http.post('/raw-materials', rawMaterial)
}

function updateRawMaterial(rawMaterial: RawMaterial) {
  return http.patch(`/raw-materials/${rawMaterial.id}`, rawMaterial)
}
function removeRawMaterial(rawMaterial: RawMaterial) {
  return http.delete(`/raw-materials/${rawMaterial.id}`)
}

function getRawMaterialsByStatus(status: string) {
  return http.get(`/raw-materials/status/${status}`)
}
export default {
  getRawMaterials,
  getRawMaterial,
  addRawMaterial,
  updateRawMaterial,
  removeRawMaterial,
  getRawMaterialsByStatus
}
