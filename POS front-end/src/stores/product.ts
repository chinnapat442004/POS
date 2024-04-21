import type { Product } from '@/types/Product'
import { defineStore } from 'pinia'
import porductService from '@/service/product'
import { ref } from 'vue'

export const useProductStore = defineStore('product', () => {
  const products = ref<Product[]>([])

  const initialProduct: Product = {
    name: '',
    price: 0,
    image: 'noimage.jpg'
  }

  const editedProduct = ref(<Product>JSON.parse(JSON.stringify(initialProduct)))

  async function getPorducts() {
    const res = await porductService.getProduct()
    products.value = res.data
  }

  function clear() {
    editedProduct.value = JSON.parse(JSON.stringify(initialProduct))
  }
  return {
    getPorducts,
    clear,
    products,
    editedProduct
  }
})
