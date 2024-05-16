import type { Product } from '@/types/Product'
import http from './http'

function getProducts() {
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

function updateProduct(product: Product & { files: File[] }) {
  const formData = new FormData()
  formData.append('name', product.name)
  formData.append('price', product.price + '')
  formData.append('category', product.category)
  if (product.files && product.files.length > 0) {
    formData.append('file', product.files[0])
  }
  return http.post(`/products/${product.id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

function getProduct(product: Product) {
  return http.get(`/products/${product.id}`)
}

function deleteProduct(product: Product) {
  return http.delete(`/products/${product.id}`)
}
function getTopProduct() {
  return http.get('products/top')
}
export default { getProducts, getProduct, addProcduct, updateProduct, deleteProduct, getTopProduct }
