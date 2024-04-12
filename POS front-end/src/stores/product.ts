import type { Product } from '@/types/Procuct'
import { defineStore } from 'pinia'
import porductService from '@/service/product'
import { ref } from 'vue'

export const useProductStore = defineStore('product', () => {
  const products = ref<Product[]>([])

  async function getPorducts() {
    const res = await porductService.getProduct()
    products.value = res.data
  }
  return {
    getPorducts,
    products
  }
})
