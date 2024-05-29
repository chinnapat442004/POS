import { defineStore } from 'pinia'
import { ref } from 'vue'

import promotionService from '@/service/promotion'

import { useLoaderStore } from './loader'

import type { Promotion } from '@/types/Promotion'

export const usePromotionStore = defineStore('promotion', () => {
  const loaderStore = useLoaderStore()
  const promotions = ref(<Promotion[]>[])

  const initialPromotion: Promotion = {
    name: '',
    start_date: '',
    end_date: '',
    status: '',
    mininum: 0,
    maxinum: 0,
    discount_late: 0,
    discount_price: 0,
    products: []
  }

  const editedPromotion = ref(<Promotion>JSON.parse(JSON.stringify(initialPromotion)))

  async function getPromotions() {
    await loaderStore.doLoad()
    const res = await promotionService.getPromotions()

    promotions.value = res.data

    await loaderStore.finishLoad()
  }

  async function getPromotion(item: Promotion) {
    const res = await promotionService.getPromotion(item)
    editedPromotion.value = res.data
  }

  function clear() {
    editedPromotion.value = JSON.parse(JSON.stringify(initialPromotion))
  }

  async function addPromotion() {
    const promotion = editedPromotion.value
    if (promotion.id) {
      await promotionService.addPromotion(promotion)
    } else {
      await promotionService.updatePromotion(promotion)
    }
  }

  return {
    getPromotions,
    getPromotion,
    clear,
    addPromotion,
    promotions,
    editedPromotion
  }
})
