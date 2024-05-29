import type { Promotion } from '@/types/Promotion'
import http from './http'

function getPromotions() {
  return http.get('/promotions')
}

function getPromotion(item: Promotion) {
  return http.get(`/promotions/${item.id}`)
}

function addPromotion(item: Promotion) {
  return http.post('/promotions', item)
}

function updatePromotion(item: Promotion) {
  return http.patch(`/promotions/${item.id}`)
}
export default { getPromotions, getPromotion, addPromotion, updatePromotion }
