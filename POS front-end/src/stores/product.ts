import type { Product } from '@/types/Product'
import { defineStore } from 'pinia'
import porductService from '@/service/product'
import { ref } from 'vue'

export const useProductStore = defineStore('product', () => {
  const products = ref<Product[]>([])

  const initialProduct: Product & { files: File[] } = {
    name: '',
    price: 0,
    category: '',
    image: 'noimage.jpg',
    files: []
  }

  const editedProduct = ref(<Product & { files: File[] }>JSON.parse(JSON.stringify(initialProduct)))

  async function getPorducts() {
    const res = await porductService.getProduct()
    products.value = res.data
  }

  async function addProcduct() {
    const product = editedProduct.value
    console.log(product.id)

    if (!product.id) {
      const res = await porductService.addProcduct(product)
      console.log(res)
    }
  }

  function clear() {
    editedProduct.value = JSON.parse(JSON.stringify(initialProduct))
  }
  return {
    getPorducts,
    clear,
    addProcduct,
    products,
    editedProduct
  }
})
