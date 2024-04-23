import type { Product } from '@/types/Product'
import http from './http'

function getProduct() {
  return http.get('/products')
}

function addProcduct(product: Product & { files: File[] }) {
  const formData = new FormData()
  formData.append('name', product.name)
  formData.append('price', product.price + '')
  formData.append('category', product.category)
  if (product.files && product.files.length > 0) {
    formData.append('file', product.files[0])
  }
  return http.post('/products', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
}

export default { getProduct, addProcduct }
