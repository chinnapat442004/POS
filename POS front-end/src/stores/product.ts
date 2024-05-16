import type { Product } from '@/types/Product'
import { defineStore } from 'pinia'
import productService from '@/service/product'
import { ref } from 'vue'

export const useProductStore = defineStore('product', () => {
  const products = ref<Product[]>([])

  const labels = ref()
  const data = ref()

  const initialProduct: Product & { files: File[] } = {
    name: '',
    price: 0,
    category: '',
    image: 'noimage.jpg',
    files: []
  }

  const editedProduct = ref(<Product & { files: File[] }>JSON.parse(JSON.stringify(initialProduct)))

  async function getProducts() {
    const res = await productService.getProducts()
    products.value = res.data
  }

  async function getProduct(product: Product) {
    const res = await productService.getProduct(product)
    editedProduct.value = res.data
  }

  async function addProcduct() {
    const product = editedProduct.value

    if (!product.id) {
      await productService.addProcduct(product)
    } else {
      await productService.updateProduct(product)
    }
  }

  async function deleteProduct(product: Product) {
    await productService.deleteProduct(product)
  }

  function clear() {
    editedProduct.value = JSON.parse(JSON.stringify(initialProduct))
  }

  async function getTopProduct() {
    const res = await productService.getTopProduct()

    labels.value = res.data.map((item: any) => {
      return item.name
    })

    data.value = res.data.map((item: any) => {
      return item.qty
    })
  }
  return {
    getProducts,
    getProduct,
    clear,
    addProcduct,
    deleteProduct,
    getTopProduct,
    products,
    editedProduct,
    labels,
    data
  }
})
