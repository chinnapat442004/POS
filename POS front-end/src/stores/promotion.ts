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

  function formatDate(date: Date): string {
    const newDateFormat = [
      date.getFullYear(),
      (date.getMonth() + 1).toString().padStart(2, '0'),
      date.getDate().toString().padStart(2, '0')
    ].join('-')
    return newDateFormat
  }

  async function getPromotions() {
    await loaderStore.doLoad()
    const res = await promotionService.getPromotions()
    promotions.value = res.data
    promotions.value.map(async (promotion) => {
      promotion.start_date = await formatDate(new Date(promotion.start_date))
      promotion.end_date = await formatDate(new Date(promotion.end_date))
    })
    await loaderStore.finishLoad()
  }

  async function getPromotion(item: Promotion) {
    const res = await promotionService.getPromotion(item)
    editedPromotion.value = res.data
    editedPromotion.value.start_date = await formatDate(new Date(editedPromotion.value.start_date))
    editedPromotion.value.end_date = await formatDate(new Date(editedPromotion.value.end_date))
  }

  function clear() {
    editedPromotion.value = JSON.parse(JSON.stringify(initialPromotion))
  }

  async function addPromotion() {
    const promotion = editedPromotion.value

    if (!promotion.id) {
      await promotionService.addPromotion(promotion)
    } else {
      await promotionService.updatePromotion(promotion)
    }
  }

  async function removePromotion() {
    const promotion = editedPromotion.value
    await console.log(promotion)
    await promotionService.removePromotion(promotion)
  }

  return {
    getPromotions,
    getPromotion,
    clear,
    addPromotion,
    removePromotion,
    promotions,
    editedPromotion
  }
})
